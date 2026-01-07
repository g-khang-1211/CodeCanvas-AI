
import React from 'react';
import { useApp } from '../context/AppContext';
import { Moon, Sun, X, Globe } from 'lucide-react';

interface SettingsProps {
  onClose: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const { theme, toggleTheme, language, setLanguage, t } = useApp();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'zh', label: '中文 (Chinese)' },
    { code: 'ja', label: '日本語 (Japanese)' },
    { code: 'ko', label: '한국어 (Korean)' },
    { code: 'pt', label: 'Português' },
    { code: 'ru', label: 'Русский (Russian)' },
    { code: 'tr', label: 'Türkçe' },
    { code: 'it', label: 'Italiano' },
    { code: 'vi', label: 'Tiếng Việt' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'ar', label: 'العربية' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-3xl shadow-2xl p-6 border border-gray-100 dark:border-gray-800 transform transition-all scale-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white">{t('settings')}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
            <div className="flex items-center gap-3">
              {theme === 'light' ? <Sun className="text-orange-500" /> : <Moon className="text-blue-400" />}
              <span className="font-medium dark:text-white">{theme === 'light' ? t('light_mode') : t('dark_mode')}</span>
            </div>
            <button 
              onClick={toggleTheme}
              className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${theme === 'dark' ? 'bg-blue-500' : 'bg-gray-300'}`}
            >
              <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${theme === 'dark' ? 'translate-x-6' : ''}`} />
            </button>
          </div>

          {/* Language Selection */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
              <Globe size={16} /> {t('language_label')}
            </label>
            <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as any)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                    language === lang.code 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                      : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span>{lang.label}</span>
                  {language === lang.code && <div className="w-2 h-2 bg-white rounded-full" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
