import { Course, TranslationDictionary } from './types';

export const UI_TEXT: TranslationDictionary = {
  welcome: {
    en: "Welcome back",
    es: "Bienvenido de nuevo",
    fr: "Bon retour",
    de: "Willkommen zurück",
    zh: "欢迎回来"
  },
  continue_learning: {
    en: "Continue Learning",
    es: "Continuar aprendiendo",
    fr: "Continuer à apprendre",
    de: "Weiterlernen",
    zh: "继续学习"
  },
  settings: {
    en: "Settings",
    es: "Ajustes",
    fr: "Paramètres",
    de: "Einstellungen",
    zh: "设置"
  },
  ai_tutor: {
    en: "AI Tutor",
    es: "Tutor IA",
    fr: "Tuteur IA",
    de: "KI-Tutor",
    zh: "AI 导师"
  },
  flashcards: {
    en: "Flashcards",
    es: "Tarjetas",
    fr: "Cartes mémo",
    de: "Lernkarten",
    zh: "抽认卡"
  },
  generate_flashcards: {
    en: "Generate Cards",
    es: "Generar Tarjetas",
    fr: "Générer des cartes",
    de: "Karten erstellen",
    zh: "生成卡片"
  },
  quiz: {
    en: "Quiz",
    es: "Cuestionario",
    fr: "Quiz",
    de: "Quiz",
    zh: "测验"
  },
  learn: {
    en: "Learn",
    es: "Aprender",
    fr: "Apprendre",
    de: "Lernen",
    zh: "学习"
  },
  submit: {
    en: "Submit",
    es: "Enviar",
    fr: "Soumettre",
    de: "Einreichen",
    zh: "提交"
  },
  next_unit: {
    en: "Next Unit",
    es: "Siguiente Unidad",
    fr: "Unité Suivante",
    de: "Nächste Einheit",
    zh: "下一个单元"
  },
  type_message: {
    en: "Ask me anything about code...",
    es: "Pregúntame lo que sea sobre código...",
    fr: "Posez-moi une question...",
    de: "Frag mich alles über Code...",
    zh: "问我任何关于代码的问题..."
  },
  back: {
    en: "Back",
    es: "Atrás",
    fr: "Retour",
    de: "Zurück",
    zh: "返回"
  },
  design_path: {
    en: "Design Your Path",
    es: "Diseña tu Camino",
    fr: "Concevez votre parcours",
    de: "Gestalte deinen Weg",
    zh: "设计你的路线"
  },
  tell_ai: {
    en: "Tell the AI what you want to focus on (e.g., 'Game Development' or 'Basics'), or leave blank for standard.",
    es: "Dile a la IA en qué quieres enfocarte (ej. 'Desarrollo de Juegos'), o déjalo en blanco.",
    fr: "Dites à l'IA sur quoi vous concentrer (ex. 'Jeux'), ou laissez vide.",
    de: "Sag der KI, worauf du dich konzentrieren willst, oder lass es leer.",
    zh: "告诉AI你想专注于什么（例如“游戏开发”），或留空。"
  },
  generate_syllabus: {
    en: "Generate Syllabus",
    es: "Generar Temario",
    fr: "Générer le programme",
    de: "Lehrplan erstellen",
    zh: "生成教学大纲"
  },
  generating_syllabus: {
    en: "Generating Syllabus...",
    es: "Generando Temario...",
    fr: "Génération du programme...",
    de: "Erstelle Lehrplan...",
    zh: "正在生成大纲..."
  },
  generating_lesson: {
    en: "Generating Lesson...",
    es: "Generando Lección...",
    fr: "Génération de la leçon...",
    de: "Erstelle Lektion...",
    zh: "正在生成课程..."
  },
  crafting_lesson: {
    en: "AI is crafting a custom lesson on",
    es: "La IA está creando una lección sobre",
    fr: "L'IA crée une leçon sur",
    de: "Die KI erstellt eine Lektion über",
    zh: "AI正在制作关于...的课程"
  },
  reset_syllabus: {
    en: "Reset and create new syllabus",
    es: "Reiniciar y crear nuevo temario",
    fr: "Réinitialiser et créer un nouveau programme",
    de: "Zurücksetzen und neuen Lehrplan erstellen",
    zh: "重置并创建新大纲"
  },
  units_created: {
    en: "Units Created",
    es: "Unidades Creadas",
    fr: "Unités créées",
    de: "Einheiten erstellt",
    zh: "已创建单元"
  },
  create_custom_syllabus: {
    en: "Create Custom Syllabus",
    es: "Crear Temario Personalizado",
    fr: "Créer un programme personnalisé",
    de: "Benutzerdefinierten Lehrplan erstellen",
    zh: "创建自定义大纲"
  },
  select_unit_prompt: {
    en: "Select a unit or create a new syllabus.",
    es: "Selecciona una unidad o crea un nuevo temario.",
    fr: "Sélectionnez une unité ou créez un nouveau programme.",
    de: "Wähle eine Einheit oder erstelle einen neuen Lehrplan.",
    zh: "选择一个单元或创建新大纲。"
  },
  light_mode: {
    en: "Light Mode",
    es: "Modo Claro",
    fr: "Mode Clair",
    de: "Heller Modus",
    zh: "日间模式"
  },
  dark_mode: {
    en: "Dark Mode",
    es: "Modo Oscuro",
    fr: "Mode Sombre",
    de: "Dunkler Modus",
    zh: "夜间模式"
  },
  language_label: {
    en: "Language",
    es: "Idioma",
    fr: "Langue",
    de: "Sprache",
    zh: "语言"
  },

  // Course Names and Descriptions
  course_python: { en: "Python", es: "Python", fr: "Python", de: "Python", zh: "Python" },
  desc_python: { en: "Data science, AI, and web development.", es: "Ciencia de datos, IA y desarrollo web.", fr: "Science des données, IA et développement web.", de: "Data Science, KI und Webentwicklung.", zh: "数据科学、人工智能和Web开发。" },
  
  course_cpp: { en: "C++", es: "C++", fr: "C++", de: "C++", zh: "C++" },
  desc_cpp: { en: "High-performance systems and game engines.", es: "Sistemas de alto rendimiento y motores de juegos.", fr: "Systèmes haute performance et moteurs de jeux.", de: "Hochleistungssysteme und Game Engines.", zh: "高性能系统和游戏引擎。" },
  
  course_js: { en: "JavaScript", es: "JavaScript", fr: "JavaScript", de: "JavaScript", zh: "JavaScript" },
  desc_js: { en: "Interactive web development.", es: "Desarrollo web interactivo.", fr: "Développement web interactif.", de: "Interaktive Webentwicklung.", zh: "交互式Web开发。" },
  
  course_ts: { en: "TypeScript", es: "TypeScript", fr: "TypeScript", de: "TypeScript", zh: "TypeScript" },
  desc_ts: { en: "JavaScript with syntax for types.", es: "JavaScript con sintaxis para tipos.", fr: "JavaScript avec syntaxe pour les types.", de: "JavaScript mit Syntax für Typen.", zh: "具有类型语法的JavaScript。" },
  
  course_java: { en: "Java", es: "Java", fr: "Java", de: "Java", zh: "Java" },
  desc_java: { en: "Enterprise applications and Android apps.", es: "Aplicaciones empresariales y apps de Android.", fr: "Applications d'entreprise et applications Android.", de: "Unternehmensanwendungen und Android-Apps.", zh: "企业应用程序和Android应用程序。" },
  
  course_sql: { en: "SQL", es: "SQL", fr: "SQL", de: "SQL", zh: "SQL" },
  desc_sql: { en: "Database management and queries.", es: "Gestión de bases de datos y consultas.", fr: "Gestion de bases de données et requêtes.", de: "Datenbankmanagement und Abfragen.", zh: "数据库管理和查询。" },
  
  course_html: { en: "HTML/CSS", es: "HTML/CSS", fr: "HTML/CSS", de: "HTML/CSS", zh: "HTML/CSS" },
  desc_html: { en: "The structure and style of the web.", es: "La estructura y el estilo de la web.", fr: "La structure et le style du web.", de: "Die Struktur und der Stil des Webs.", zh: "Web的结构和样式。" },
  
  course_excel: { en: "Excel", es: "Excel", fr: "Excel", de: "Excel", zh: "Excel" },
  desc_excel: { en: "Spreadsheets, formulas, and VBA.", es: "Hojas de cálculo, fórmulas y VBA.", fr: "Feuilles de calcul, formules et VBA.", de: "Tabellenkalkulationen, Formeln und VBA.", zh: "电子表格、公式和VBA。" },
  
  course_rust: { en: "Rust", es: "Rust", fr: "Rust", de: "Rust", zh: "Rust" },
  desc_rust: { en: "Memory safety without garbage collection.", es: "Seguridad de memoria sin recolección de basura.", fr: "Sécurité de la mémoire sans garbage collection.", de: "Speichersicherheit ohne Garbage Collection.", zh: "无垃圾回收的内存安全。" },
  
  course_c: { en: "C", es: "C", fr: "C", de: "C", zh: "C" },
  desc_c: { en: "Low-level system programming.", es: "Programación de sistemas de bajo nivel.", fr: "Programmation système de bas niveau.", de: "Systemprogrammierung auf niedriger Ebene.", zh: "低级系统编程。" },
  
  course_csharp: { en: "C#", es: "C#", fr: "C#", de: "C#", zh: "C#" },
  desc_csharp: { en: "Windows apps and Unity game dev.", es: "Apps de Windows y desarrollo de juegos en Unity.", fr: "Applications Windows et développement de jeux Unity.", de: "Windows-Apps und Unity-Spieleentwicklung.", zh: "Windows应用程序和Unity游戏开发。" },

  level_beg: { en: "Beginner", es: "Principiante", fr: "Débutant", de: "Anfänger", zh: "初学者" },
  level_int: { en: "Intermediate", es: "Intermedio", fr: "Intermédiaire", de: "Mittelstufe", zh: "中级" },
  level_adv: { en: "Advanced", es: "Avanzado", fr: "Avancé", de: "Fortgeschritten", zh: "高级" },
};

// Helper to create empty levels
const createLevels = () => [
  { id: 'beginner' as const, title: 'Beginner', units: [] },
  { id: 'intermediate' as const, title: 'Intermediate', units: [] },
  { id: 'advanced' as const, title: 'Advanced', units: [] }
];

export const COURSES: Course[] = [
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    description: '',
    levels: createLevels()
  },
  {
    id: 'cpp',
    name: 'C++',
    icon: '🚀',
    description: '',
    levels: createLevels()
  },
  {
    id: 'js',
    name: 'JavaScript',
    icon: '⚡',
    description: '',
    levels: createLevels()
  },
  {
    id: 'ts',
    name: 'TypeScript',
    icon: '📘',
    description: '',
    levels: createLevels()
  },
  {
    id: 'java',
    name: 'Java',
    icon: '☕',
    description: '',
    levels: createLevels()
  },
  {
    id: 'csharp',
    name: 'C#',
    icon: '♯',
    description: '',
    levels: createLevels()
  },
  {
    id: 'sql',
    name: 'SQL',
    icon: '🗄️',
    description: '',
    levels: createLevels()
  },
  {
    id: 'html',
    name: 'HTML/CSS',
    icon: '🌐',
    description: '',
    levels: createLevels()
  },
  {
    id: 'rust',
    name: 'Rust',
    icon: '🦀',
    description: '',
    levels: createLevels()
  },
  {
    id: 'c',
    name: 'C',
    icon: '🇨',
    description: '',
    levels: createLevels()
  },
  {
    id: 'excel',
    name: 'Excel',
    icon: '📊',
    description: '',
    levels: createLevels()
  },
];
