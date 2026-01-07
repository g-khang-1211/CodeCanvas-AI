
export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'vi' | 'it' | 'hi' | 'ar' | 'ja' | 'ko' | 'pt' | 'ru' | 'tr';

export type AppTheme = 'light' | 'dark';

export interface TranslationDictionary {
  [key: string]: {
    [code in LanguageCode]: string;
  };
}

export type QuestionType = 'mcq' | 'frq' | 'matching';

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  // For MCQ
  options?: string[];
  correctIndex?: number;
  // For FRQ
  answer?: string; // Model answer
  // For Matching
  pairs?: { term: string; definition: string }[]; 
}

export interface Unit {
  id: string;
  title: string;
  content: string; // Markdown-like text
  questions: Question[];
}

export interface Level {
  id: 'beginner' | 'intermediate' | 'advanced';
  title: string;
  units: Unit[];
}

export interface Course {
  id: string;
  name: string;
  icon: string; // Lucide icon name or emoji
  description: string;
  levels: Level[];
}

export interface Flashcard {
  front: string;
  back: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface Video {
  videoId: string;
  title: string;
  description: string;
}
