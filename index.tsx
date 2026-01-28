
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Trophy, RefreshCw, CheckCircle2, XCircle, Flag, Star, BarChart3, 
  ArrowRight, TrendingUp, History, Target, Clock, Settings, 
  Languages, Type, Sun, Moon, Palette, Search, X, Download, 
  Info, Volume2, BookOpen, Trash2
} from 'lucide-react';

// --- Data ---

const COUNTRIES = [
  { code: 'il', name: 'ישראל', en: 'Israel' },
  { code: 'us', name: 'ארצות הברית', en: 'United States' },
  { code: 'fr', name: 'צרפת', en: 'France' },
  { code: 'it', name: 'איטליה', en: 'Italy' },
  { code: 'de', name: 'גרמניה', en: 'Germany' },
  { code: 'jp', name: 'יפן', en: 'Japan' },
  { code: 'br', name: 'ברזיל', en: 'Brazil' },
  { code: 'gb', name: 'בריטניה', en: 'United Kingdom' },
  { code: 'ca', name: 'קנדה', en: 'Canada' },
  { code: 'au', name: 'אוסטרליה', en: 'Australia' },
  { code: 'es', name: 'ספרד', en: 'Spain' },
  { code: 'ar', name: 'ארגנטינה', en: 'Argentina' },
  { code: 'gr', name: 'יוון', en: 'Greece' },
  { code: 'tr', name: 'טורקיה', en: 'Turkey' },
  { code: 'nl', name: 'הולנד', en: 'Netherlands' },
  { code: 'mx', name: 'מקסיקו', en: 'Mexico' },
  { code: 'pt', name: 'פורטוגל', en: 'Portugal' },
  { code: 'ch', name: 'שוויץ', en: 'Switzerland' },
  { code: 'se', name: 'שוודיה', en: 'Sweden' },
  { code: 'no', name: 'נורווגיה', en: 'Norway' },
  { code: 'dk', name: 'דנמרק', en: 'Denmark' },
  { code: 'fi', name: 'פינלנד', en: 'Finland' },
  { code: 'ru', name: 'רוסיה', en: 'Russia' },
  { code: 'cn', name: 'סין', en: 'China' },
  { code: 'in', name: 'הודו', en: 'India' },
  { code: 'kr', name: 'דרום קוריאה', en: 'South Korea' },
  { code: 'eg', name: 'מצרים', en: 'Egypt' },
  { code: 'za', name: 'דרום אפריקה', en: 'South Africa' },
  { code: 'th', name: 'תאילנד', en: 'Thailand' },
  { code: 'vn', name: 'וייטנאם', en: 'Vietnam' },
  { code: 'be', name: 'בלגיה', en: 'Belgium' },
  { code: 'at', name: 'אוסטריה', en: 'Austria' },
  { code: 'pl', name: 'פולין', en: 'Poland' },
  { code: 'ie', name: 'אירלנד', en: 'Ireland' },
  { code: 'nz', name: 'ניו זילנד', en: 'New Zealand' },
  { code: 'sg', name: 'סינגפור', en: 'Singapore' },
  { code: 'ua', name: 'אוקראינה', en: 'Ukraine' },
  { code: 'cl', name: "צ'ילה", en: 'Chile' },
  { code: 'co', name: 'קולומביה', en: 'Colombia' },
  { code: 'pe', name: 'פרו', en: 'Peru' },
  { code: 'ma', name: 'מרוקו', en: 'Morocco' },
  { code: 'is', name: 'איסלנד', en: 'Iceland' },
  { code: 'hu', name: 'הונגריה', en: 'Hungary' },
  { code: 'cz', name: "צ'כיה", en: 'Czech Republic' },
  { code: 'ro', name: 'רומניה', en: 'Romania' },
  { code: 'cy', name: 'קפריסין', en: 'Cyprus' },
  { code: 'id', name: 'אינדונזיה', en: 'Indonesia' },
  { code: 'my', name: 'מלזיה', en: 'Malaysia' },
  { code: 'ph', name: 'פיליפינים', en: 'Philippines' },
  { code: 'sa', name: 'ערב הסעודית', en: 'Saudi Arabia' },
  { code: 'tw', name: 'טאיוואן', en: 'Taiwan' },
  { code: 'bg', name: 'בולגריה', en: 'Bulgaria' },
  { code: 'hr', name: 'קרואטיה', en: 'Croatia' },
  { code: 'rs', name: 'סרביה', en: 'Serbia' },
  { code: 'ee', name: 'אסטוניה', en: 'Estonia' },
  { code: 'lt', name: 'ליטא', en: 'Lithuania' },
  { code: 'lu', name: 'לוקסמבורג', en: 'Luxembourg' },
  { code: 'mt', name: 'מלטה', en: 'Malta' },
  { code: 'ng', name: 'ניגריה', en: 'Nigeria' },
  { code: 'ke', name: 'קניה', en: 'Kenya' },
  { code: 'et', name: 'אתיופיה', en: 'Ethiopia' },
  { code: 'dz', name: "אלג'יריה", en: 'Algeria' },
  { code: 'uy', name: 'אורוגוואי', en: 'Uruguay' },
  { code: 'cr', name: 'קוסטה ריקה', en: 'Costa Rica' },
  { code: 'jm', name: "ג'מייקה", en: 'Jamaica' },
  { code: 'jo', name: 'ירדן', en: 'Jordan' },
  { code: 'lb', name: 'לבנון', en: 'Lebanon' },
  { code: 'ae', name: 'איחוד האמירויות', en: 'UAE' },
  { code: 'qa', name: 'קטאר', en: 'Qatar' },
  { code: 'ge', name: 'גאורגיה', en: 'Georgia' },
  { code: 'pk', name: 'פקיסטן', en: 'Pakistan' },
  { code: 'kz', name: 'קזחסטן', en: 'Kazakhstan' },
  { code: 'az', name: "אזרבייג'ן", en: 'Azerbaijan' },
  { code: 'am', name: 'ארמניה', en: 'Armenia' },
  { code: 'uz', name: 'אוזבקיסטן', en: 'Uzbekistan' },
  { code: 'lv', name: 'לטביה', en: 'Latvia' },
  { code: 'sk', name: 'סלובקיה', en: 'Slovakia' },
  { code: 'si', name: 'סלובניה', en: 'Slovenia' },
  { code: 'gh', name: 'גאנה', en: 'Ghana' },
  { code: 'sn', name: 'סנגל', en: 'Senegal' },
  { code: 'tz', name: 'טנזניה', en: 'Tanzania' },
  { code: 'tn', name: 'תוניסיה', en: 'Tunisia' },
  { code: 'py', name: 'פרגוואי', en: 'Paraguay' },
  { code: 'bo', name: 'בוליביה', en: 'Bolivia' },
  { code: 'ec', name: 'אקוודור', en: 'Ecuador' },
  { code: 'pa', name: 'פנמה', en: 'Panama' },
  { code: 'cu', name: 'קובה', en: 'Cuba' },
  { code: 'do', name: 'הרפובליקה הדומיניקנית', en: 'Dominican Republic' },
  { code: 'hn', name: 'הונדורס', en: 'Honduras' },
  { code: 'sv', name: 'אל סלבדור', en: 'El Salvador' },
  { code: 'ni', name: 'ניקרגואה', en: 'Nicaragua' },
  { code: 'gt', name: 'גואטמלה', en: 'Guatemala' },
  { code: 'pr', name: 'פורטו ריקו', en: 'Puerto Rico' },
  { code: 'mg', name: 'מדגסקר', en: 'Madagascar' },
  { code: 'lk', name: 'סרי לנקה', en: 'Sri Lanka' },
  { code: 'np', name: 'נפאל', en: 'Nepal' },
  { code: 'bd', name: 'בנגלדש', en: 'Bangladesh' },
  { code: 'kh', name: 'קמבודיה', en: 'Cambodia' },
  { code: 'la', name: 'לאוס', en: 'Laos' },
  { code: 'mn', name: 'מונגוליה', en: 'Mongolia' },
  { code: 'al', name: 'אלבניה', en: 'Albania' },
  { code: 'lu', name: 'לוקסמבורג', en: 'Luxembourg' },
  { code: 'mc', name: 'מונקו', en: 'Monaco' },
  { code: 'ad', name: 'אנדורה', en: 'Andorra' },
  { code: 'li', name: 'ליכטנשטיין', en: 'Liechtenstein' },
  { code: 'sm', name: 'סן מרינו', en: 'San Marino' },
  { code: 'va', name: 'ותיקן', en: 'Vatican City' },
];

const TRANSLATIONS: Record<string, any> = {
  he: {
    title: 'אלוף הדגלים',
    start: 'התחל משחק',
    study: 'מצב עיון',
    stats: 'סטטיסטיקות',
    settings: 'הגדרות',
    score: 'נקודות',
    streak: 'רצף',
    timeLeft: 'שניות',
    question: 'שאלה',
    finished: 'כל הכבוד!',
    playAgain: 'שחק שוב',
    personalStats: 'סטטיסטיקות אישיות',
    totalGames: 'משחקים',
    highScore: 'שיא אישי',
    avgScore: 'ממוצע',
    totalPoints: 'סה"כ נקודות',
    noGames: 'אין משחקים רשומים עדיין.',
    theme: 'ערכת נושא',
    fontSize: 'גודל גופן',
    language: 'שפה',
    search: 'חפש מדינה...',
    export: 'ייצוא רשימה',
    clear: 'נקה',
    feedback: 'שלחו משוב',
    copyright: '© נועם גולד AI 2026',
    timeout: 'נגמר הזמן!',
  },
  en: {
    title: 'Flag Champion',
    start: 'Start Game',
    study: 'Study Mode',
    stats: 'Statistics',
    settings: 'Settings',
    score: 'Score',
    streak: 'Streak',
    timeLeft: 'sec',
    question: 'Question',
    finished: 'Well Done!',
    playAgain: 'Play Again',
    personalStats: 'Personal Stats',
    totalGames: 'Games',
    highScore: 'High Score',
    avgScore: 'Average',
    totalPoints: 'Total Points',
    noGames: 'No games played yet.',
    theme: 'Theme',
    fontSize: 'Font Size',
    language: 'Language',
    search: 'Search country...',
    export: 'Export List',
    clear: 'Clear',
    feedback: 'Send Feedback',
    copyright: '© Noam Gold AI 2026',
    timeout: 'Time out!',
  }
};

// --- Utils ---

const STATS_KEY = 'flag_quiz_stats_v2';
const QUESTION_TIME_LIMIT = 15;

const speak = (text: string) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'he-IL';
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  }
};

const saveGameResult = (score: number) => {
  const existing = localStorage.getItem(STATS_KEY);
  const results = existing ? JSON.parse(existing) : [];
  results.push({ date: Date.now(), score });
  localStorage.setItem(STATS_KEY, JSON.stringify(results));
};

const getStatsData = () => {
  const existing = localStorage.getItem(STATS_KEY);
  const results = existing ? JSON.parse(existing) : [];
  if (results.length === 0) return null;
  const totalGames = results.length;
  const highestScore = Math.max(...results.map((r: any) => r.score));
  const totalPoints = results.reduce((acc: number, r: any) => acc + r.score, 0);
  const averageScore = Math.round(totalPoints / totalGames);
  return { totalGames, highestScore, averageScore, results };
};

// --- Components ---

function ThemeToggle({ theme, setTheme }: { theme: string, setTheme: (t: string) => void }) {
  return (
    <button 
      onClick={() => setTheme(theme === 'theme-dark' ? 'theme-bright' : 'theme-dark')}
      className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
      aria-label="Toggle Theme"
    >
      {theme === 'theme-dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

function LanguageSwitcher({ lang, setLang }: { lang: string, setLang: (l: string) => void }) {
  const langs = ['he', 'en', 'zh', 'hi', 'de', 'es', 'fr'];
  return (
    <div className="flex gap-2">
      <Languages size={20} />
      <select 
        value={lang} 
        onChange={(e) => setLang(e.target.value)}
        className="bg-transparent border-none text-sm outline-none cursor-pointer"
      >
        {langs.map(l => <option key={l} value={l} className="bg-slate-800 text-white">{l.toUpperCase()}</option>)}
      </select>
    </div>
  );
}

function StudyMode({ lang }: { lang: string }) {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const filtered = useMemo(() => {
    return COUNTRIES.filter(c => 
      c.name.toLowerCase().includes(search.toLowerCase()) || 
      c.en.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const handleExport = () => {
    const data = JSON.stringify(COUNTRIES, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flag-list.json';
    a.click();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigate('/')} className="p-2 hover:bg-white/10 rounded-full">
          <ArrowRight className="rtl-only w-6 h-6" />
          <ArrowRight className="ltr-only w-6 h-6 rotate-180" />
        </button>
        <h2 className="text-2xl font-bold">{t.study}</h2>
        <button onClick={handleExport} className="p-2 bg-blue-500 rounded-full"><Download size={20} /></button>
      </div>

      <div className="relative group">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input 
          type="text" 
          placeholder={t.search} 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onDrop={(e) => { e.preventDefault(); setSearch(e.dataTransfer.getData('text')); }}
          className="w-full py-4 pr-12 pl-12 bg-white/10 rounded-2xl border border-white/10 focus:border-blue-500 outline-none"
        />
        {search && <button onClick={() => setSearch('')} className="absolute left-4 top-1/2 -translate-y-1/2"><X size={20} /></button>}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {filtered.map(c => (
          <div key={c.code} className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center hover:scale-105 transition-transform group">
            <img 
              src={`https://flagcdn.com/w160/${c.code}.png`} 
              alt={c.name} 
              className="w-full aspect-[3/2] object-cover rounded shadow-md mb-2"
            />
            <div className="font-bold text-sm">{lang === 'en' ? c.en : c.name}</div>
            <button 
              onClick={() => speak(c.name)} 
              className="mt-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Volume2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsPage({ 
  theme, setTheme, 
  lang, setLang, 
  fontSize, setFontSize 
}: any) {
  const navigate = useNavigate();
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
       <div className="flex items-center justify-between">
        <button onClick={() => navigate('/')} className="p-2 hover:bg-white/10 rounded-full">
          <ArrowRight className="rtl-only w-6 h-6" />
          <ArrowRight className="ltr-only w-6 h-6 rotate-180" />
        </button>
        <h2 className="text-2xl font-bold">{t.settings}</h2>
        <div className="w-10"></div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
          <div className="flex items-center gap-3"><Palette /> <span>{t.theme}</span></div>
          <div className="flex gap-2">
            <button onClick={() => setTheme('theme-dark')} className={`w-8 h-8 rounded-full bg-slate-900 border ${theme === 'theme-dark' ? 'border-blue-500 ring-2' : 'border-transparent'}`} />
            <button onClick={() => setTheme('theme-bright')} className={`w-8 h-8 rounded-full bg-white border ${theme === 'theme-bright' ? 'border-blue-500 ring-2' : 'border-transparent'}`} />
            <button onClick={() => setTheme('theme-colorful')} className={`w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-indigo-500 border ${theme === 'theme-colorful' ? 'border-blue-500 ring-2' : 'border-transparent'}`} />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
          <div className="flex items-center gap-3"><Type /> <span>{t.fontSize}</span></div>
          <div className="flex gap-2">
            {['small', 'medium', 'large'].map(sz => (
              <button 
                key={sz}
                onClick={() => setFontSize(`font-size-${sz}`)} 
                className={`px-3 py-1 rounded-lg border ${fontSize === `font-size-${sz}` ? 'bg-blue-500 border-blue-400' : 'bg-white/10 border-transparent'}`}
              >
                {sz.charAt(0).toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
          <div className="flex items-center gap-3"><Languages /> <span>{t.language}</span></div>
          <LanguageSwitcher lang={lang} setLang={setLang} />
        </div>
      </div>
    </div>
  );
}

function QuizGame({ lang, setScore, score, setStreak, streak }: any) {
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'FINISHED'>('START');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizData, setQuizData] = useState<any[]>([]);
  const navigate = useNavigate();
  const timerRef = useRef<number | null>(null);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const startGame = () => {
    const shuffled = [...COUNTRIES].sort(() => Math.random() - 0.5);
    const gameQuestions = shuffled.slice(0, 10).map(correct => {
      const distractors = COUNTRIES.filter(c => c.code !== correct.code).sort(() => Math.random() - 0.5).slice(0, 3);
      const options = [correct, ...distractors].sort(() => Math.random() - 0.5);
      return { correct, options };
    });
    setQuizData(gameQuestions);
    setScore(0);
    setStreak(0);
    setCurrentQuestion(0);
    setTimeLeft(QUESTION_TIME_LIMIT);
    setSelectedAnswer(null);
    setGameState('PLAYING');
    speak(t.start);
  };

  const handleAnswer = (countryCode: string | null) => {
    if (selectedAnswer !== null) return;
    if (timerRef.current) window.clearInterval(timerRef.current);
    
    const correctCode = quizData[currentQuestion].correct.code;
    setSelectedAnswer(countryCode || 'TIMEOUT');
    const isCorrect = countryCode === correctCode;

    if (isCorrect) {
      const bonus = Math.floor(timeLeft / 2);
      setScore((prev: number) => prev + 10 + (streak * 2) + bonus);
      setStreak((prev: number) => prev + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setTimeLeft(QUESTION_TIME_LIMIT);
      } else {
        setScore((prev: number) => { saveGameResult(prev); return prev; });
        setGameState('FINISHED');
      }
    }, 1500);
  };

  useEffect(() => {
    if (gameState === 'PLAYING' && selectedAnswer === null) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleAnswer(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) window.clearInterval(timerRef.current); };
  }, [gameState, currentQuestion, selectedAnswer]);

  return (
    <div className="animate-in fade-in duration-500">
      {gameState === 'START' && (
        <div className="text-center space-y-8 py-10">
          <div className="w-32 h-32 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto animate-bounce"><Flag size={64} className="text-blue-400" /></div>
          <h2 className="text-4xl font-black">{t.title}</h2>
          <div className="grid grid-cols-1 gap-4">
            <button onClick={startGame} className="w-full py-5 bg-blue-600 rounded-3xl font-black text-2xl hover:bg-blue-500 transition-all transform hover:scale-105 active:scale-95 shadow-xl">{t.start}</button>
            <div className="flex gap-4">
              <button onClick={() => navigate('/study')} className="flex-1 py-4 bg-white/10 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/20"><BookOpen size={20} /> {t.study}</button>
              <button onClick={() => navigate('/stats')} className="flex-1 py-4 bg-white/10 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/20"><BarChart3 size={20} /> {t.stats}</button>
            </div>
          </div>
        </div>
      )}

      {gameState === 'PLAYING' && quizData[currentQuestion] && (
        <div key={currentQuestion} className="quiz-enter space-y-6">
          <div className="flex justify-between items-center text-sm font-bold opacity-60">
            <span>{t.question} {currentQuestion + 1} / 10</span>
            <span className={timeLeft < 5 ? 'text-red-500 animate-pulse' : ''}>{timeLeft} {t.timeLeft}</span>
          </div>

          <div className="bg-white p-3 rounded-3xl shadow-2xl relative overflow-hidden aspect-[3/2] flex items-center justify-center">
            {selectedAnswer === 'TIMEOUT' && <div className="absolute inset-0 bg-red-600/60 backdrop-blur-sm z-20 flex items-center justify-center font-black text-3xl">{t.timeout}</div>}
            <img 
              src={`https://flagcdn.com/w640/${quizData[currentQuestion].correct.code}.png`} 
              className="w-full h-full object-cover rounded-2xl animate-subtle-zoom" 
              alt="Guess the flag"
            />
          </div>

          <div className="grid grid-cols-1 gap-3">
            {quizData[currentQuestion].options.map((opt: any) => {
              const isCorrect = opt.code === quizData[currentQuestion].correct.code;
              const isSel = selectedAnswer === opt.code;
              let btnClass = "bg-white/10 hover:bg-white/20 border-white/10";
              if (selectedAnswer) {
                if (isCorrect) btnClass = "bg-green-600 border-green-400";
                else if (isSel) btnClass = "bg-red-600 border-red-400";
                else btnClass = "opacity-40 bg-white/5 border-transparent";
              }
              return (
                <button 
                  key={opt.code} 
                  disabled={!!selectedAnswer}
                  onClick={() => { handleAnswer(opt.code); speak(opt.name); }}
                  className={`w-full p-5 rounded-2xl border text-xl font-bold transition-all flex justify-between items-center ${btnClass}`}
                >
                  <div className="flex items-center gap-4">
                    {selectedAnswer && <img src={`https://flagcdn.com/w40/${opt.code}.png`} className="w-8 h-6 rounded" alt="" />}
                    <span>{lang === 'en' ? opt.en : opt.name}</span>
                  </div>
                  {selectedAnswer && isCorrect && <CheckCircle2 />}
                  {selectedAnswer && isSel && !isCorrect && <XCircle />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {gameState === 'FINISHED' && (
        <div className="text-center space-y-8 py-10 animate-in zoom-in">
          <Trophy size={80} className="mx-auto text-yellow-400" />
          <h2 className="text-4xl font-black">{t.finished}</h2>
          <div className="text-6xl font-mono font-black text-blue-500">{score}</div>
          <button onClick={startGame} className="w-full py-5 bg-white text-blue-900 rounded-3xl font-black text-2xl hover:bg-gray-100 transition-all">{t.playAgain}</button>
          <button onClick={() => navigate('/stats')} className="w-full py-4 bg-white/10 rounded-2xl font-bold flex items-center justify-center gap-2">{t.stats}</button>
        </div>
      )}
    </div>
  );
}

function App() {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lang, setLang] = useState('he');
  const [theme, setTheme] = useState('theme-dark');
  const [fontSize, setFontSize] = useState('font-size-medium');

  useEffect(() => {
    document.body.className = `${theme} ${fontSize}`;
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [theme, fontSize, lang]);

  return (
    <HashRouter>
      <div className="max-w-xl mx-auto px-4 py-8 pb-32">
        <header className="flex justify-between items-center mb-10 bg-white/10 p-4 rounded-3xl backdrop-blur-xl border border-white/20 sticky top-4 z-50">
          <Link to="/" className="flex items-center gap-2 group">
             <div className="bg-blue-600 p-2 rounded-xl group-hover:rotate-12 transition-transform"><Flag size={24} /></div>
             <h1 className="text-xl font-black">{TRANSLATIONS[lang]?.title || 'Flags'}</h1>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/settings" className="p-2 hover:bg-white/10 rounded-full transition-colors"><Settings size={20} /></Link>
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </header>

        <main className="min-h-[60vh]">
          <Routes>
            <Route path="/" element={<QuizGame lang={lang} score={score} setScore={setScore} streak={streak} setStreak={setStreak} />} />
            <Route path="/study" element={<StudyMode lang={lang} />} />
            <Route path="/settings" element={<SettingsPage theme={theme} setTheme={setTheme} lang={lang} setLang={setLang} fontSize={fontSize} setFontSize={setFontSize} />} />
            <Route path="/stats" element={<StatsView lang={lang} />} />
          </Routes>
        </main>

        <footer className="mt-20 border-t border-white/10 pt-10 text-center space-y-4 opacity-50">
           <div className="flex justify-center gap-6 text-sm">
              <a href="mailto:goldnoamai@gmail.com" className="hover:text-blue-400">{TRANSLATIONS[lang]?.feedback}</a>
              <p>{TRANSLATIONS[lang]?.copyright}</p>
           </div>
           
           {/* AdSense Placeholder Area */}
           <div className="w-full h-24 bg-white/5 border border-dashed border-white/20 rounded-xl flex items-center justify-center text-xs">
              Advertisement Placeholder
           </div>
        </footer>
      </div>
    </HashRouter>
  );
}

function StatsView({ lang }: { lang: string }) {
  const stats = getStatsData();
  const navigate = useNavigate();
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const clearStats = () => {
    if (confirm('Are you sure?')) {
      localStorage.removeItem(STATS_KEY);
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigate('/')} className="p-2 hover:bg-white/10 rounded-full">
           <ArrowRight className="rtl-only w-6 h-6" />
           <ArrowRight className="ltr-only w-6 h-6 rotate-180" />
        </button>
        <h2 className="text-2xl font-bold">{t.personalStats}</h2>
        <button onClick={clearStats} className="p-2 text-red-400 hover:bg-red-400/10 rounded-full"><Trash2 size={20} /></button>
      </div>

      {!stats ? (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
          <History size={64} className="mx-auto mb-4 opacity-20" />
          <p>{t.noGames}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 p-6 rounded-3xl border border-white/10 text-center">
            <div className="text-3xl font-black mb-1">{stats.totalGames}</div>
            <div className="text-xs uppercase opacity-60">{t.totalGames}</div>
          </div>
          <div className="bg-white/5 p-6 rounded-3xl border border-white/10 text-center">
            <div className="text-3xl font-black mb-1">{stats.highestScore}</div>
            <div className="text-xs uppercase opacity-60">{t.highScore}</div>
          </div>
          <div className="bg-white/5 p-6 rounded-3xl border border-white/10 text-center">
            <div className="text-3xl font-black mb-1">{stats.averageScore}</div>
            <div className="text-xs uppercase opacity-60">{t.avgScore}</div>
          </div>
          <div className="bg-white/5 p-6 rounded-3xl border border-white/10 text-center">
            <div className="text-3xl font-black mb-1">{stats.results.reduce((a: any, b: any) => a + b.score, 0)}</div>
            <div className="text-xs uppercase opacity-60">{t.totalPoints}</div>
          </div>

          <div className="col-span-2 bg-white/5 p-6 rounded-3xl border border-white/10">
             <h3 className="text-lg font-bold mb-4">{t.stats}</h3>
             <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {stats.results.slice().reverse().map((r: any, i: number) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
                    <span className="text-xs opacity-50">{new Date(r.date).toLocaleDateString()}</span>
                    <span className="font-bold">{r.score}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}
    </div>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
