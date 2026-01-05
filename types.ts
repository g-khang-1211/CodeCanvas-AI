export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'zh';

export type AppTheme = 'light' | 'dark';

export interface TranslationDictionary {
  [key: string]: {
    [code in LanguageCode]: string;
  };
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
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
