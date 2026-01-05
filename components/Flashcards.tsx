import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { generateFlashcardsForTopic } from '../services/geminiService';
import { Flashcard } from '../types';
import { Brain, RotateCw, ChevronLeft, ChevronRight, Wand2 } from 'lucide-react';

export const Flashcards: React.FC = () => {
  const { t, selectedUnit, selectedCourse, language } = useApp();
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!selectedUnit) return;
    setLoading(true);
    const topic = `${selectedCourse?.name} - ${selectedUnit.title}`;
    const generated = await generateFlashcardsForTopic(topic, language, 'Beginner');
    setCards(generated);
    setCurrentIndex(0);
    setIsFlipped(false);
    setLoading(false);
  };

  if (!selectedUnit) return null;

  return (
    <div className="mt-12 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
          <Brain className="text-purple-500" />
          {t('flashcards')}
        </h3>
        {cards.length === 0 && (
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl text-sm font-semibold hover:opacity-90 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? <RotateCw className="animate-spin" size={16} /> : <Wand2 size={16} />}
            {t('generate_flashcards')}
          </button>
        )}
      </div>

      {loading && (
        <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">
           <div className="text-center">
             <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
             <p className="text-gray-500 text-sm">Generating AI Cards...</p>
           </div>
        </div>
      )}

      {!loading && cards.length > 0 && (
        <div className="relative h-64 perspective-1000 group cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
          <div className={`relative w-full h-full duration-500 preserve-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}>
            
            {/* Front */}
            <div className="absolute w-full h-full backface-hidden bg-white dark:bg-gray-800 rounded-3xl shadow-xl shadow-purple-500/5 dark:shadow-purple-900/10 border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center p-8 text-center hover:scale-[1.02] transition-transform">
              <span className="text-xs font-bold tracking-wider text-purple-500 mb-4 uppercase">Question</span>
              <p className="text-xl font-medium text-gray-800 dark:text-gray-100">{cards[currentIndex].front}</p>
              <p className="absolute bottom-4 text-xs text-gray-400">Click to flip</p>
            </div>

            {/* Back */}
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 text-center">
              <span className="text-xs font-bold tracking-wider text-white/60 mb-4 uppercase">Answer</span>
              <p className="text-lg font-medium">{cards[currentIndex].back}</p>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      {!loading && cards.length > 0 && (
        <div className="flex items-center justify-center gap-6 mt-6">
          <button 
            onClick={() => { setCurrentIndex(prev => Math.max(0, prev - 1)); setIsFlipped(false); }}
            disabled={currentIndex === 0}
            className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-30 dark:text-white"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {currentIndex + 1} / {cards.length}
          </span>
          <button 
            onClick={() => { setCurrentIndex(prev => Math.min(cards.length - 1, prev + 1)); setIsFlipped(false); }}
            disabled={currentIndex === cards.length - 1}
            className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-30 dark:text-white"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};
