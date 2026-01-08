
import React, { useState, useEffect, useRef } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Settings } from './components/Settings';
import { AIChat } from './components/AIChat';
import { UnitView } from './components/UnitView';
import { generateSyllabus } from './services/geminiService';
import { LayoutGrid, BookOpen, Settings as SettingsIcon, ChevronRight, Wand2, Sparkles, X } from 'lucide-react';
import { generateText } from './services/api'

const handleGenerate = async () => {
  const result = await generateText("Hello AI")
  console.log(result)
}


const MainContent = () => {
  const { 
    t, 
    courses,
    selectedCourse, 
    selectCourse, 
    selectedLevel, 
    selectLevel, 
    selectedUnit, 
    selectUnit,
    updateCourseUnits,
    language
  } = useApp();
  
  const [showSettings, setShowSettings] = useState(false);
  const [syllabusFocus, setSyllabusFocus] = useState('');
  const [customSubject, setCustomSubject] = useState('');
  const [subjectError, setSubjectError] = useState(false);
  const [generatingSyllabus, setGeneratingSyllabus] = useState(false);

  // Cancellation Ref
  const syllabusRequestId = useRef<number>(0);

  // Reset custom fields when course/level changes
  useEffect(() => {
    setSyllabusFocus('');
    setCustomSubject('');
    setSubjectError(false);
    setGeneratingSyllabus(false);
    syllabusRequestId.current = 0;
  }, [selectedCourse?.id, selectedLevel?.id]);

  const handleGenerateSyllabus = async () => {
    if (!selectedCourse || !selectedLevel) return;

    let targetCourseName = selectedCourse.name;
    let targetFocus = syllabusFocus;

    if (selectedCourse.id === 'other') {
      if (!customSubject.trim()) {
        setSubjectError(true);
        return;
      }
      targetCourseName = customSubject;
    }

    const requestId = Date.now();
    syllabusRequestId.current = requestId;
    setGeneratingSyllabus(true);

    try {
      const units = await generateSyllabus(
        targetCourseName, 
        selectedLevel.id, 
        targetFocus || `General ${targetCourseName} concepts`,
        language
      );
      
      if (syllabusRequestId.current === requestId) {
        updateCourseUnits(selectedCourse.id, selectedLevel.id, units);
        setGeneratingSyllabus(false);
        setSyllabusFocus('');
        setCustomSubject('');
      }
    } catch (error) {
       if (syllabusRequestId.current === requestId) {
         setGeneratingSyllabus(false);
       }
    }
  };

  const handleCancelSyllabus = () => {
    syllabusRequestId.current = 0;
    setGeneratingSyllabus(false);
  };

  // If viewing a unit
  if (selectedUnit) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6 py-8">
           <UnitView />
        </div>
        <AIChat />
        {showSettings && <Settings onClose={() => setShowSettings(false)} />}
        
        {/* Fixed Settings Button for Unit View */}
        <button 
           onClick={() => setShowSettings(true)}
           className={`fixed top-6 ${language === 'ar' ? 'left-6' : 'right-6'} p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-30`}
        >
          <SettingsIcon size={20} className="dark:text-white" />
        </button>
      </div>
    );
  }

  // Dashboard / Navigation View
  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#121212] transition-colors duration-300 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white/80 dark:bg-[#1c1c1e]/80 backdrop-blur-xl border-r border-gray-200 dark:border-gray-800 p-6 flex flex-col hidden md:flex sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">C</div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">CodeCanvas</h1>
        </div>
        
        <nav className="space-y-2 flex-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl font-medium transition-colors">
            <LayoutGrid size={20} />
            {t('welcome')}
          </button>
        </nav>

        <button 
          onClick={() => setShowSettings(true)}
          className="flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-medium transition-colors mt-auto"
        >
          <SettingsIcon size={20} />
          {t('settings')}
        </button>
      </div>

      {/* Main Area */}
      <div className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          
          {/* Mobile Header */}
          <div className="flex md:hidden justify-between items-center mb-8">
             <h1 className="text-xl font-bold dark:text-white">CodeCanvas</h1>
             <button onClick={() => setShowSettings(true)} className="p-2 dark:text-white"><SettingsIcon /></button>
          </div>

          {!selectedCourse ? (
             <>
               <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">{t('welcome')}</h2>
               <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg">{t('continue_learning')}</p>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {courses.map(course => (
                   <button
                     key={course.id}
                     onClick={() => selectCourse(course)}
                     className="group bg-white dark:bg-[#1c1c1e] p-6 rounded-3xl shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-gray-100 dark:border-gray-800 text-left"
                   >
                     <div className="w-14 h-14 bg-gray-50 dark:bg-gray-700 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                       {course.icon}
                     </div>
                     <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t(`course_${course.id}`) || course.name}</h3>
                     <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{t(`desc_${course.id}`)}</p>
                   </button>
                 ))}
               </div>
             </>
          ) : !selectedLevel ? (
            <>
              <button onClick={() => selectCourse(null)} className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 transition-colors">
                <ChevronRight size={16} className={`rotate-180 ${language === 'ar' ? 'rotate-0' : ''}`} /> {t('back')}
              </button>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl">{selectedCourse.icon}</span>
                <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">{t(`course_${selectedCourse.id}`) || selectedCourse.name}</h2>
              </div>
              
              <div className="space-y-4">
                {selectedCourse.levels.map(level => (
                  <button
                    key={level.id}
                    onClick={() => selectLevel(level)}
                    className="w-full bg-white dark:bg-[#1c1c1e] p-6 rounded-3xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-800 flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">{t(`level_${level.id.substring(0,3)}`) || level.title}</h4>
                      <p className="text-sm text-gray-500">{level.units.length > 0 ? `${level.units.length} ${t('units_created')}` : t('create_custom_syllabus')}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <ChevronRight size={20} className={language === 'ar' ? 'rotate-180' : ''} />
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
               <button onClick={() => selectLevel(null)} className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 transition-colors">
                <ChevronRight size={16} className={`rotate-180 ${language === 'ar' ? 'rotate-0' : ''}`} /> {t('back')}
              </button>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">{t(`level_${selectedLevel.id.substring(0,3)}`)}</h2>
              <p className="text-gray-500 mb-8">{t('select_unit_prompt')}</p>
              
              <div className="grid gap-4">
                {selectedLevel.units.length > 0 ? (
                  <>
                    {selectedLevel.units.map((unit, idx) => (
                      <button
                        key={unit.id}
                        onClick={() => selectUnit(unit)}
                        className="bg-white dark:bg-[#1c1c1e] p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                      >
                        <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                          {idx + 1}
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white flex-1">{unit.title}</span>
                        <BookOpen size={18} className="text-gray-400" />
                      </button>
                    ))}
                    <button 
                       onClick={() => updateCourseUnits(selectedCourse.id, selectedLevel.id, [])}
                       className="mt-6 text-sm text-red-500 hover:underline"
                    >
                      {t('reset_syllabus')}
                    </button>
                  </>
                ) : (
                  <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-8 border border-gray-200 dark:border-gray-800 text-center">
                    <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                      <Wand2 size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('design_path')}</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
                      {selectedCourse.id === 'other' ? t('other_prompt_desc') : t('tell_ai')}
                    </p>
                    
                    <div className="max-w-md mx-auto space-y-4">
                      {selectedCourse.id === 'other' ? (
                        <>
                          <div className="text-left">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 ml-1">
                                {t('subject_label')} <span className="text-red-500">*</span>
                            </label>
                            <input 
                              type="text" 
                              value={customSubject}
                              onChange={(e) => { setCustomSubject(e.target.value); setSubjectError(false); }}
                              placeholder={t('subject_placeholder')}
                              className={`w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 ${subjectError ? 'border-red-500 focus:ring-red-500' : 'border-transparent focus:ring-blue-500'} focus:ring-2 outline-none text-gray-900 dark:text-white transition-all`}
                            />
                            {subjectError && <p className="text-red-500 text-xs mt-1 ml-1">This field is required</p>}
                          </div>
                          
                          <div className="text-left">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 ml-1">
                                {t('focus_label')} <span className="text-gray-400 font-normal text-xs">({t('optional')})</span>
                            </label>
                            <input 
                              type="text" 
                              value={syllabusFocus}
                              onChange={(e) => setSyllabusFocus(e.target.value)}
                              placeholder={t('focus_placeholder')}
                              className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white"
                            />
                          </div>
                        </>
                      ) : (
                        <input 
                          type="text" 
                          value={syllabusFocus}
                          onChange={(e) => setSyllabusFocus(e.target.value)}
                          placeholder="E.g. Web scraping, APIs..."
                          className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white"
                        />
                      )}
                      
                      {generatingSyllabus ? (
                        <button 
                          onClick={handleCancelSyllabus}
                          className="w-full py-4 bg-red-100 hover:bg-red-200 text-red-600 dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-400 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                        >
                          <X size={20} />
                          {t('cancel')}
                        </button>
                      ) : (
                        <button 
                          onClick={handleGenerateSyllabus}
                          disabled={generatingSyllabus}
                          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                          <Sparkles size={20} />
                          {t('generate_syllabus')}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      
      <AIChat />
      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
