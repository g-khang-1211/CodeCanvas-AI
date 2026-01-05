import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Flashcards } from './Flashcards';
import { generateUnitContent } from '../services/geminiService';
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const UnitView: React.FC = () => {
  const { selectedUnit, selectedCourse, selectedLevel, selectUnit, updateUnitContent, t, language } = useApp();
  const [activeTab, setActiveTab] = useState<'learn' | 'quiz'>('learn');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      if (selectedUnit && !selectedUnit.content && selectedCourse && selectedLevel) {
        setLoading(true);
        const data = await generateUnitContent(selectedCourse.name, selectedUnit.title, selectedLevel.id, language);
        updateUnitContent(selectedCourse.id, selectedLevel.id, selectedUnit.id, data.content, data.questions);
        setLoading(false);
      }
    };
    fetchContent();
  }, [selectedUnit, selectedCourse, selectedLevel, updateUnitContent, language]);

  if (!selectedUnit) return null;

  const handleAnswer = (qId: string, idx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: idx }));
  };

  const submitQuiz = () => {
    setQuizSubmitted(true);
  };

  const score = selectedUnit.questions.reduce((acc, q) => {
    return acc + (selectedAnswers[q.id] === q.correctIndex ? 1 : 0);
  }, 0);

  if (loading) {
     return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center animate-fade-in">
           <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6" />
           <h2 className="text-xl font-bold dark:text-white mb-2">{t('generating_lesson')}</h2>
           <p className="text-gray-500">{t('crafting_lesson')} {selectedUnit.title}</p>
        </div>
     )
  }

  return (
    <div className="animate-fade-in pb-20">
      <button 
        onClick={() => selectUnit(null)} 
        className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
      >
        <ArrowLeft size={16} /> {t('back')}
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {selectedUnit.title}
        </h1>
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl self-start">
          <button
            onClick={() => setActiveTab('learn')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'learn' 
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
            }`}
          >
            {t('learn')}
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'quiz' 
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
            }`}
          >
            {t('quiz')}
          </button>
        </div>
      </div>

      {activeTab === 'learn' ? (
        <div className="max-w-4xl">
          <div className="prose prose-lg dark:prose-invert prose-blue max-w-none">
            <ReactMarkdown 
               components={{
                 code: ({node, inline, className, children, ...props}: any) => {
                   if (inline) {
                     return (
                       <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-pink-600 dark:text-pink-400" {...props}>
                         {children}
                       </code>
                     );
                   }
                   // MacOS Window Style for Code Blocks
                   return (
                     <div className="my-6 rounded-xl overflow-hidden shadow-2xl bg-[#1e1e1e] border border-gray-700/50">
                       <div className="flex items-center gap-2 px-4 py-3 bg-[#2d2d2d] border-b border-gray-700/50">
                         <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                         <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                         <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                         <div className="ml-2 text-xs text-gray-500 font-mono">code</div>
                       </div>
                       <div className="p-4 overflow-x-auto">
                         <code className="font-mono text-sm text-gray-200 leading-relaxed" {...props}>
                           {children}
                         </code>
                       </div>
                     </div>
                   );
                 }
               }}
            >
              {selectedUnit.content}
            </ReactMarkdown>
          </div>
          <div className="my-12 border-t border-gray-100 dark:border-gray-800 pt-8">
            <Flashcards />
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto space-y-8">
          {selectedUnit.questions.length === 0 ? (
            <div className="text-center text-gray-500">No questions generated for this unit.</div>
          ) : (
             selectedUnit.questions.map((q, idx) => {
                const isCorrect = selectedAnswers[q.id] === q.correctIndex;
                return (
                  <div key={q.id} className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                      <span className="text-gray-400 mr-2">{idx + 1}.</span>
                      {q.text}
                    </h4>
                    <div className="space-y-3">
                      {q.options.map((opt, optIdx) => {
                        let btnClass = "w-full text-left p-4 rounded-xl border transition-all text-sm font-medium ";
                        
                        if (quizSubmitted) {
                          if (optIdx === q.correctIndex) btnClass += "bg-green-100 border-green-500 text-green-700 dark:bg-green-900/30 dark:text-green-300 ";
                          else if (selectedAnswers[q.id] === optIdx) btnClass += "bg-red-50 border-red-200 text-red-600 dark:bg-red-900/20 dark:text-red-300 ";
                          else btnClass += "border-transparent bg-gray-50 dark:bg-gray-700/50 opacity-50 dark:text-gray-400 ";
                        } else {
                          if (selectedAnswers[q.id] === optIdx) btnClass += "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 ";
                          else btnClass += "border-transparent bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700 dark:text-gray-300 ";
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleAnswer(q.id, optIdx)}
                            className={btnClass}
                          >
                            <div className="flex items-center justify-between">
                              {opt}
                              {quizSubmitted && optIdx === q.correctIndex && <CheckCircle size={16} className="text-green-600" />}
                              {quizSubmitted && selectedAnswers[q.id] === optIdx && optIdx !== q.correctIndex && <AlertCircle size={16} className="text-red-500" />}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                );
            })
          )}

          <div className="sticky bottom-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg p-4 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between">
             <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">
               {quizSubmitted ? `Score: ${score} / ${selectedUnit.questions.length}` : 'Complete all questions'}
             </div>
             <button
               onClick={submitQuiz}
               disabled={quizSubmitted || Object.keys(selectedAnswers).length < selectedUnit.questions.length || selectedUnit.questions.length === 0}
               className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 shadow-lg shadow-blue-500/30"
             >
               {t('submit')}
             </button>
          </div>
        </div>
      )}
    </div>
  );
};
