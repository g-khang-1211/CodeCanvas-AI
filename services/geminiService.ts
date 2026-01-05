
import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage, Flashcard, Unit, Question, QuestionType } from "../types";

const API_KEY = process.env.API_KEY || '';

// Initialize safely
let ai: GoogleGenAI | null = null;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

// Helper to get full language name
const getLanguageName = (code: string) => {
  const map: Record<string, string> = {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
    zh: "Chinese (Simplified)",
    vi: "Vietnamese",
    it: "Italian",
    hi: "Hindi",
    ar: "Arabic"
  };
  return map[code] || "English";
}

export const generateChatResponse = async (
  history: ChatMessage[], 
  currentMessage: string, 
  context: string,
  languageCode: string = 'en'
): Promise<string> => {
  if (!ai) return "API Key not configured.";

  const lang = getLanguageName(languageCode);

  try {
    const model = ai.models;
    const response = await model.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: You are a friendly, expert coding tutor. The user is currently studying: ${context}.
      
      User History: ${JSON.stringify(history.slice(-5))}
      
      User Question: ${currentMessage}
      
      Instructions:
      1. Provide a concise, helpful explanation in ${lang}.
      2. Use Markdown for formatting. 
      3. Use code blocks with the appropriate language tag for any code.
      4. Keep it encouraging and clean.
      5. Ensure all information included is correct and up-to-date.`,
    });
    
    return response.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "Sorry, I encountered an error connecting to the AI.";
  }
};

export const generateFlashcardsForTopic = async (
  topic: string, 
  languageCode: string, 
  difficulty: string,
  count: number = 5
): Promise<Flashcard[]> => {
  if (!ai) return [{ front: "API Key Missing", back: "Please check metadata.json" }];

  const lang = getLanguageName(languageCode);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate ${count} educational flashcards for the coding topic: "${topic}". 
      Target audience: ${difficulty} level.
      Output Language: ${lang}.
      
      Return ONLY a JSON array of objects with "front" (question/concept) and "back" (answer/explanation) properties.
      Ensure the content is in ${lang}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              front: { type: Type.STRING },
              back: { type: Type.STRING }
            },
            required: ['front', 'back']
          }
        }
      }
    });

    const jsonText = response.text || "[]";
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Flashcard Gen Error:", error);
    return [{ front: "Error", back: "Could not generate cards." }];
  }
};

export const generateSyllabus = async (
  courseName: string,
  level: string,
  focus: string = "general",
  languageCode: string = "en"
): Promise<Unit[]> => {
  if (!ai) return [];

  const lang = getLanguageName(languageCode);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Create a syllabus of 5 units for learning ${courseName} at a ${level} level.
      Focus area: ${focus}.
      Output Language: ${lang}.
      
      Return a JSON array of objects with 'id', 'title', 'content' (empty string), and 'questions' (empty array).
      The 'id' should be unique-ish (e.g., 'unit_1').`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              content: { type: Type.STRING }, // Initial empty
              questions: { type: Type.ARRAY, items: { type: Type.STRING } } // Initial empty
            },
            required: ['id', 'title']
          }
        }
      }
    });
    
    const units = JSON.parse(response.text || "[]");
    // Ensure structure
    return units.map((u: any, i: number) => ({
      id: `${courseName}_${level}_${i}_${Date.now()}`,
      title: u.title,
      content: "",
      questions: []
    }));

  } catch (error) {
    console.error("Syllabus Gen Error:", error);
    return [];
  }
};

export const generateUnitContent = async (
  courseName: string,
  unitTitle: string,
  level: string,
  languageCode: string = "en",
  quizConfig: { count: number; types: QuestionType[] } = { count: 3, types: ['mcq'] }
): Promise<{ content: string; questions: Question[] }> => {
  if (!ai) return { content: "Error loading content.", questions: [] };

  const lang = getLanguageName(languageCode);
  const typeStr = quizConfig.types.join(', ');

  try {
    // Split into two parallel requests to avoid token limits/truncation issues with large JSON responses
    const [contentResponse, quizResponse] = await Promise.all([
      // 1. Generate Lesson Content (Text/Markdown)
      ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Write a comprehensive educational lesson for ${courseName} (${level}) on the topic: "${unitTitle}".
        Output Language: ${lang}.
        Format: Markdown. Use Headers, bold text, and code blocks.
        Explain concepts clearly with examples.`,
      }),
      
      // 2. Generate Quiz Questions (JSON)
      ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate ${quizConfig.count} quiz questions for ${courseName} (${level}) on topic "${unitTitle}".
        Allowed Question Types: ${typeStr}.
        Output Language: ${lang}.
        IMPORTANT: The 'text', 'options', 'answer', and 'pairs' MUST be in ${lang}. However, keep specific code syntax or keywords in English/Code format if required.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    type: { type: Type.STRING },
                    text: { type: Type.STRING },
                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                    correctIndex: { type: Type.INTEGER },
                    answer: { type: Type.STRING },
                    pairs: { 
                      type: Type.ARRAY, 
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          term: { type: Type.STRING },
                          definition: { type: Type.STRING }
                        }
                      } 
                    }
                  },
                  required: ['text', 'type']
                }
              }
            },
            required: ['questions']
          }
        }
      })
    ]);

    const contentText = contentResponse.text || "No content generated.";
    const quizJson = JSON.parse(quizResponse.text || "{\"questions\": []}");
    
    // Add IDs if missing
    const questions = (quizJson.questions || []).map((q: any, i: number) => ({
      ...q,
      id: q.id || `q_${Date.now()}_${i}`
    }));

    return {
      content: contentText,
      questions: questions
    };

  } catch (error) {
    console.error("Unit Content Gen Error:", error);
    return {
      content: "Failed to generate content. Please try again.",
      questions: []
    };
  }
};
