
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppTheme, LanguageCode, Course, Level, Unit } from '../types';
import { UI_TEXT, COURSES as DEFAULT_COURSES } from '../constants';

interface AppContextType {
  theme: AppTheme;
  toggleTheme: () => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  courses: Course[];
  updateCourseUnits: (courseId: string, levelId: string, units: Unit[]) => void;
  updateUnitContent: (courseId: string, levelId: string, unitId: string, content: string, questions: any[]) => void;
  selectedCourse: Course | null;
  selectCourse: (course: Course | null) => void;
  selectedLevel: Level | null;
  selectLevel: (level: Level | null) => void;
  selectedUnit: Unit | null;
  selectUnit: (unit: Unit | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<AppTheme>('dark');
  const [language, setLanguage] = useState<LanguageCode>('en');
  
  // Local state copy of courses to allow mutation (adding generated content)
  const [courses, setCourses] = useState<Course[]>(DEFAULT_COURSES);

  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);

  // Apply theme to html element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Apply direction for RTL languages
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const t = (key: string): string => {
    const entry = UI_TEXT[key];
    if (!entry) return key;
    return entry[language] || entry['en'];
  };

  // Helper getters
  const selectedCourse = courses.find(c => c.id === selectedCourseId) || null;
  const selectedLevel = selectedCourse?.levels.find(l => l.id === selectedLevelId) || null;
  const selectedUnit = selectedLevel?.units.find(u => u.id === selectedUnitId) || null;

  const updateCourseUnits = (courseId: string, levelId: string, units: Unit[]) => {
    setCourses(prev => prev.map(c => {
      if (c.id !== courseId) return c;
      return {
        ...c,
        levels: c.levels.map(l => {
          if (l.id !== levelId) return l;
          return { ...l, units };
        })
      };
    }));
  };

  const updateUnitContent = (courseId: string, levelId: string, unitId: string, content: string, questions: any[]) => {
    setCourses(prev => prev.map(c => {
      if (c.id !== courseId) return c;
      return {
        ...c,
        levels: c.levels.map(l => {
          if (l.id !== levelId) return l;
          return {
            ...l,
            units: l.units.map(u => {
              if (u.id !== unitId) return u;
              return { ...u, content, questions };
            })
          };
        })
      };
    }));
  };

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      language,
      setLanguage,
      t,
      courses,
      updateCourseUnits,
      updateUnitContent,
      selectedCourse,
      selectCourse: (c) => { 
        setSelectedCourseId(c ? c.id : null); 
        setSelectedLevelId(null); 
        setSelectedUnitId(null); 
      },
      selectedLevel,
      selectLevel: (l) => { 
        setSelectedLevelId(l ? l.id : null); 
        setSelectedUnitId(null); 
      },
      selectedUnit,
      selectUnit: (u) => setSelectedUnitId(u ? u.id : null)
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
