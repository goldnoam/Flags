// Extend window for AdSense and AdBlocker detection
declare global {
  interface Window {
    adsbygoogle: any[];
    adsByGoogleBlocked?: boolean;
  }
}

import './index.css';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Trophy, CheckCircle2, XCircle, Flag, BarChart3, 
  ArrowRight, Settings, Languages, Type, Sun, Moon, 
  Palette, Search, X, Download, Volume2, BookOpen, Trash2,
  Sparkles, History, Star, Share2, Mail
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
];

const TRANSLATIONS: Record<string, any> = {
  he: {
    title: 'אלוף הדגלים', start: 'התחל משחק', study: 'מצב עיון', stats: 'סטטיסטיקות', settings: 'הגדרות', score: 'נקודות', streak: 'רצף', timeLeft: 'שניות', question: 'שאלה', finished: 'כל הכבוד!', playAgain: 'שחק שוב', personalStats: 'סטטיסטיקות אישיות', totalGames: 'משחקים', highScore: 'שיא אישי', avgScore: 'ממוצע', totalPoints: 'סה"כ נקודות', noGames: 'אין משחקים רשומים עדיין.', theme: 'ערכת נושא', fontSize: 'גודל גופן', language: 'שפה', search: 'חפש מדינה...', export: 'ייצוא רשימה', share: 'שתף', clear: 'נקה', feedback: 'משוב', copyright: '© נועם גולד AI 2026', timeout: 'נגמר הזמן!', copied: 'הקישור הועתק!', adPlaceholder: 'פרסומת תומכת באתר',
  },
  en: {
    title: 'Flag Champion', start: 'Start Game', study: 'Study Mode', stats: 'Statistics', settings: 'Settings', score: 'Score', streak: 'Streak', timeLeft: 'sec', question: 'Question', finished: 'Well Done!', playAgain: 'Play Again', personalStats: 'Personal Stats', totalGames: 'Games', highScore: 'High Score', avgScore: 'Average', totalPoints: 'Total Points', noGames: 'No games played yet.', theme: 'Theme', fontSize: 'Font Size', language: 'Language', search: 'Search country...', export: 'Export List', share: 'Share', clear: 'Clear', feedback: 'Feedback', copyright: '© Noam Gold AI 2026', timeout: 'Time out!', copied: 'Copied!', adPlaceholder: 'Advertisement supports us',
  },
  zh: {
    title: '国旗冠军', start: '开始游戏', study: '学习模式', stats: '统计数据', settings: '设置', score: '得分', streak: '连胜', timeLeft: '秒', question: '问题', finished: '做得好！', playAgain: '再玩一次', personalStats: '个人统计', totalGames: '游戏场数', highScore: '最高分', avgScore: '平均分', totalPoints: '总分', noGames: '还没有记录。', theme: '主题', fontSize: '字体大小', language: '语言', search: '搜索国家...', export: '导出', share: '分享', clear: '清除', feedback: '反馈', copyright: '© Noam Gold AI 2026', timeout: '时间到！', copied: '已复制！', adPlaceholder: '广告支持我们',
  },
  hi: {
    title: 'ध्वज चैंपियन', start: 'खेल शुरू करें', study: 'अध्ययन मोड', stats: 'आंकड़े', settings: 'सेटिंग्स', score: 'स्कोर', streak: 'लगातार जीत', timeLeft: 'सेकंड', question: 'प्रश्न', finished: 'शाबाश!', playAgain: 'फिर से खेलें', personalStats: 'व्यक्तिगत आंकड़े', totalGames: 'कुल खेल', highScore: 'उच्चतम', avgScore: 'औसत', totalPoints: 'कुल अंक', noGames: 'कोई रिकॉर्ड नहीं।', theme: 'थीम', fontSize: 'फ़ॉन्ट', language: 'भाषा', search: 'खोजें...', export: 'निर्यात', share: 'साझा करें', clear: 'साफ़ करें', feedback: 'प्रतिक्रिया', copyright: '© Noam Gold AI 2026', timeout: 'समय समाप्त!', copied: 'कॉपी किया गया!', adPlaceholder: 'विज्ञापन हमारा समर्थन करते हैं',
  },
  de: {
    title: 'Flaggen-Champion', start: 'Start', study: 'Lernen', stats: 'Statistiken', settings: 'Optionen', score: 'Punkte', streak: 'Serie', timeLeft: 'Sek', question: 'Frage', finished: 'Super!', playAgain: 'Nochmal', personalStats: 'Statistik', totalGames: 'Spiele', highScore: 'Bestwert', avgScore: 'Schnitt', totalPoints: 'Gesamt', noGames: 'Keine Spiele.', theme: 'Thema', fontSize: 'Größe', language: 'Sprache', search: 'Suchen...', export: 'Export', share: 'Teilen', clear: 'Löschen', feedback: 'Feedback', copyright: '© Noam Gold AI 2026', timeout: 'Zeit um!', copied: 'Kopiert!', adPlaceholder: 'Werbung unterstützt uns',
  },
  es: {
    title: 'Campeón de Banderas', start: 'Jugar', study: 'Estudiar', stats: 'Estadísticas', settings: 'Ajustes', score: 'Puntos', streak: 'Racha', timeLeft: 'seg', question: 'Pregunta', finished: '¡Muy bien!', playAgain: 'Otra vez', personalStats: 'Mis Stats', totalGames: 'Juegos', highScore: 'Récord', avgScore: 'Media', totalPoints: 'Total', noGames: 'Sin juegos.', theme: 'Tema', fontSize: 'Tamaño', language: 'Idioma', search: 'Buscar...', export: 'Exportar', share: 'Compartir', clear: 'Limpiar', feedback: 'Feedback', copyright: '© Noam Gold AI 2026', timeout: '¡Tiempo!', copied: '¡Copiado!', adPlaceholder: 'Publicidad nos apoya',
  },
  fr: {
    title: 'Champion des Drapeaux', start: 'Jouer', study: 'Étudier', stats: 'Stats', settings: 'Réglages', score: 'Score', streak: 'Série', timeLeft: 'sec', question: 'Question', finished: 'Bravo !', playAgain: 'Rejouer', personalStats: 'Stats', totalGames: 'Jeux', highScore: 'Record', avgScore: 'Moyenne', totalPoints: 'Total', noGames: 'Aucun jeu.', theme: 'Thème', fontSize: 'Taille', language: 'Langue', search: 'Chercher...', export: 'Exporter', share: 'Partager', clear: 'Effacer', feedback: 'Feedback', copyright: '© Noam Gold AI 2026', timeout: 'Temps fini !', copied: 'Copié !', adPlaceholder: 'Soutenu par la pub',
  }
};

// --- Utils ---
const STATS_KEY = 'flag_quiz_stats_v2';
const QUESTION_TIME_LIMIT = 15;

const speak = (text: string, langCode: string) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    const langMap: Record<string, string> = {
      'he': 'he-IL', 'en': 'en-US', 'zh': 'zh-CN', 'hi': 'hi-IN', 'de': 'de-DE', 'es': 'es-ES', 'fr': 'fr-FR'
    };
    utterance.lang = langMap[langCode] || 'en-US';
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

// --- Robust Ad Unit ---
function AdUnit({ lang }: { lang: string }) {
  const [isBlocked, setIsBlocked] = useState(false);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  useEffect(() => {
    // Check if script was already flagged as blocked by the onerror in index.html
    if (window.adsByGoogleBlocked) {
      setIsBlocked(true);
      return;
    }

    const timer = setTimeout(() => {
      try {
        // If adsbygoogle is present but blocked, or not defined at all
        if (typeof window.adsbygoogle !== 'undefined' && Array.isArray(window.adsbygoogle)) {
           window.adsbygoogle.push({});
        } else {
           setIsBlocked(true);
        }
      } catch (e) {
        setIsBlocked(true);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="ad-wrapper my-6 overflow-hidden rounded-2xl border border-white/5 bg-white/5 transition-all duration-300 backdrop-blur-sm" aria-hidden="true">
      {!isBlocked ? (
        <ins className="adsbygoogle"
             style={{ display: 'block', minHeight: '100px', width: '100%' }}
             data-ad-client="ca-pub-0274741291001288"
             data-ad-slot="auto"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      ) : (
        <div className="flex h-24 items-center justify-center text-center p-4">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-20">{t.adPlaceholder}</p>
        </div>
      )}
    </div>
  );
}

// --- Components ---
function LanguageSwitcher({ lang, setLang }: { lang: string, setLang: (l: string) => void }) {
  const langs = ['he', 'en', 'zh', 'hi', 'de', 'es', 'fr'];
  return (
    <div className="flex items-center gap-2">
      <Languages size={18} className="opacity-50" />
      <select 
        value={lang} 
        onChange={(e) => setLang(e.target.value)}
        className="bg-transparent border-none text-xs font-black outline-none cursor-pointer focus:ring-0"
        aria-label="Select Language"
      >
        {langs.map(l => <option key={l} value={l} className="bg-slate-900 text-white">{l.toUpperCase()}</option>)}
      </select>
    </div>
  );
}

function ThemeToggle({ theme, setTheme }: any) {
  const cycle = () => {
    if (theme === 'theme-dark') setTheme('theme-bright');
    else if (theme === 'theme-bright') setTheme('theme-colorful');
    else setTheme('theme-dark');
  };
  return (
    <button onClick={cycle} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all active:scale-90" aria-label="Toggle Theme">
      {theme === 'theme-dark' ? <Moon size={18} /> : theme === 'theme-bright' ? <Sun size={18} /> : <Palette size={18} />}
    </button>
  );
}

function StudyMode({ lang }: { lang: string }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const navigate = useNavigate();
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const filtered = useMemo(() => COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || c.en.toLowerCase().includes(search.toLowerCase())
  ), [search]);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(filtered, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'flags.json';
    a.click();
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) await navigator.share({ title: t.title, url });
    else { await navigator.clipboard.writeText(url); alert(t.copied); }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/')} className="p-2 hover:bg-white/10 rounded-full"><ArrowRight className="rtl-only" /><ArrowRight className="ltr-only rotate-180" /></button>
        <h2 className="text-xl font-black">{t.study}</h2>
        <div className="flex gap-2">
          <button onClick={handleShare} className="p-2 bg-indigo-500 rounded-full text-white"><Share2 size={18} /></button>
          <button onClick={handleExport} className="p-2 bg-blue-500 rounded-full text-white"><Download size={18} /></button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30" />
        <input 
          type="text" list="countries-list" placeholder={t.search} value={search}
          onChange={(e) => setSearchParams(val => { e.target.value ? val.set('search', e.target.value) : val.delete('search'); return val; })}
          className="w-full py-4 pr-12 pl-4 bg-white/10 rounded-2xl border border-white/5 focus:border-blue-500 outline-none backdrop-blur-md"
        />
        <datalist id="countries-list">
          {COUNTRIES.map(c => <option key={c.code} value={lang === 'en' ? c.en : c.name} />)}
        </datalist>
        {search && <button onClick={() => setSearchParams({})} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50"><X size={18} /></button>}
      </div>

      <AdUnit lang={lang} />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {filtered.map((c, i) => (
          <React.Fragment key={c.code}>
            <div className="group bg-white/5 p-4 rounded-3xl border border-white/5 text-center transition-all hover:scale-105 active:scale-95">
              <img src={`https://flagcdn.com/w160/${c.code}.png`} alt={c.name} className="w-full aspect-video object-cover rounded-xl shadow-lg mb-3" loading="lazy" />
              <div className="font-bold text-sm truncate">{lang === 'en' ? c.en : c.name}</div>
              <button onClick={() => speak(lang === 'en' ? c.en : c.name, lang)} className="mt-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/10 rounded-full"><Volume2 size={16} /></button>
            </div>
            {(i + 1) % 12 === 0 && <div className="col-span-full"><AdUnit lang={lang} /></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function SettingsPage({ theme, setTheme, lang, setLang, fontSize, setFontSize }: any) {
  const navigate = useNavigate();
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/')} className="p-2 hover:bg-white/10 rounded-full"><ArrowRight className="rtl-only" /><ArrowRight className="ltr-only rotate-180" /></button>
        <h2 className="text-xl font-black">{t.settings}</h2>
        <div className="w-10"></div>
      </div>
      <div className="space-y-4">
        <SettingItem icon={<Palette size={20} />} label={t.theme}>
           <div className="flex gap-2">
             <button onClick={() => setTheme('theme-dark')} className={`w-8 h-8 rounded-full bg-slate-900 border-2 ${theme === 'theme-dark' ? 'border-blue-500 scale-110' : 'border-transparent opacity-50'}`} />
             <button onClick={() => setTheme('theme-bright')} className={`w-8 h-8 rounded-full bg-white border-2 ${theme === 'theme-bright' ? 'border-blue-500 scale-110' : 'border-transparent opacity-50'}`} />
             <button onClick={() => setTheme('theme-colorful')} className={`w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-indigo-500 border-2 ${theme === 'theme-colorful' ? 'border-blue-500 scale-110' : 'border-transparent opacity-50'}`} />
           </div>
        </SettingItem>
        <SettingItem icon={<Type size={20} />} label={t.fontSize}>
           <div className="flex gap-1 bg-white/5 p-1 rounded-xl">
             {['small', 'medium', 'large'].map(s => (
               <button key={s} onClick={() => setFontSize(`font-size-${s}`)} className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${fontSize === `font-size-${s}` ? 'bg-blue-600 text-white' : 'opacity-40 hover:opacity-100'}`}>{s[0].toUpperCase()}</button>
             ))}
           </div>
        </SettingItem>
        <SettingItem icon={<Languages size={20} />} label={t.language}>
           <LanguageSwitcher lang={lang} setLang={setLang} />
        </SettingItem>
      </div>
    </div>
  );
}

function SettingItem({ icon, label, children }: any) {
  return (
    <div className="flex items-center justify-between p-5 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-md">
      <div className="flex items-center gap-4">{icon} <span className="font-bold">{label}</span></div>
      {children}
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
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const timerRef = useRef<number | null>(null);

  const startGame = () => {
    const shuffled = [...COUNTRIES].sort(() => Math.random() - 0.5).slice(0, 10).map(correct => {
      const distractors = COUNTRIES.filter(c => c.code !== correct.code).sort(() => Math.random() - 0.5).slice(0, 3);
      return { correct, options: [correct, ...distractors].sort(() => Math.random() - 0.5) };
    });
    setQuizData(shuffled); setScore(0); setStreak(0); setCurrentQuestion(0); setTimeLeft(QUESTION_TIME_LIMIT); setSelectedAnswer(null); setGameState('PLAYING');
  };

  const handleAnswer = (code: string | null) => {
    if (selectedAnswer !== null) return;
    if (timerRef.current) window.clearInterval(timerRef.current);
    const correct = quizData[currentQuestion].correct.code;
    setSelectedAnswer(code || 'TIMEOUT');
    if (code === correct) { setScore((s: number) => s + 10 + streak * 2); setStreak((s: number) => s + 1); } else setStreak(0);
    setTimeout(() => {
      if (currentQuestion < 9) { setCurrentQuestion(q => q + 1); setTimeLeft(QUESTION_TIME_LIMIT); setSelectedAnswer(null); }
      else { saveGameResult(score); setGameState('FINISHED'); }
    }, 1500);
  };

  useEffect(() => {
    if (gameState === 'PLAYING' && !selectedAnswer) {
      timerRef.current = window.setInterval(() => setTimeLeft(t => { if (t <= 1) handleAnswer(null); return t - 1; }), 1000);
    }
    return () => { if (timerRef.current) window.clearInterval(timerRef.current); };
  }, [gameState, currentQuestion, selectedAnswer]);

  return (
    <div className="animate-fade-in">
      {gameState === 'START' && (
        <div className="text-center py-12 space-y-12">
          <div className="relative inline-block"><div className="w-32 h-32 bg-blue-600/20 rounded-full flex items-center justify-center animate-bounce"><Flag size={64} className="text-blue-500" /></div><Sparkles className="absolute -top-4 -right-4 text-yellow-500 animate-pulse" /></div>
          <h2 className="text-4xl font-black tracking-tighter">{t.title}</h2>
          <div className="space-y-4">
             <button onClick={startGame} className="w-full py-5 bg-blue-600 text-white rounded-3xl font-black text-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl">{t.start}</button>
             <div className="grid grid-cols-2 gap-4">
               <button onClick={() => navigate('/study')} className="py-4 bg-white/5 rounded-2xl font-bold border border-white/5 flex items-center justify-center gap-2"><BookOpen size={18} /> {t.study}</button>
               <button onClick={() => navigate('/stats')} className="py-4 bg-white/5 rounded-2xl font-bold border border-white/5 flex items-center justify-center gap-2"><BarChart3 size={18} /> {t.stats}</button>
             </div>
          </div>
          <AdUnit lang={lang} />
        </div>
      )}

      {gameState === 'PLAYING' && quizData[currentQuestion] && (
        <div key={currentQuestion} className="space-y-8 animate-quiz-enter">
          <div className="flex justify-between items-center text-xs font-black opacity-50 uppercase tracking-widest">
            <div className="flex items-center gap-4"><span>Q {currentQuestion + 1} / 10</span> {streak > 1 && <span className="text-orange-500">🔥 {streak}</span>}</div>
            <span className={timeLeft < 5 ? 'text-red-500 animate-pulse' : ''}>{timeLeft} {t.timeLeft}</span>
          </div>
          <div className="aspect-video bg-white/5 rounded-[2.5rem] border border-white/10 p-2 relative overflow-hidden flex items-center justify-center shadow-inner">
             {selectedAnswer === 'TIMEOUT' && <div className="absolute inset-0 bg-red-600/80 backdrop-blur-sm z-50 flex items-center justify-center text-4xl font-black text-white">{t.timeout}</div>}
             <img src={`https://flagcdn.com/w640/${quizData[currentQuestion].correct.code}.png`} alt="Flag" className="max-h-full max-w-full rounded-2xl shadow-2xl animate-subtle-zoom" />
          </div>
          <div className="grid grid-cols-1 gap-3">
             {quizData[currentQuestion].options.map((opt: any) => {
               const isCorrect = opt.code === quizData[currentQuestion].correct.code;
               const isSel = selectedAnswer === opt.code;
               let cls = "bg-white/5 hover:bg-white/10 border-white/5";
               if (selectedAnswer) {
                 if (isCorrect) cls = "bg-green-600 text-white border-green-400 ring-4 ring-green-500/20";
                 else if (isSel) cls = "bg-red-600 text-white border-red-400 animate-incorrect-shake";
                 else cls = "opacity-30 scale-95";
               }
               return (
                 <button key={opt.code} disabled={!!selectedAnswer} onClick={() => { handleAnswer(opt.code); speak(lang === 'en' ? opt.en : opt.name, lang); }} className={`p-5 rounded-2xl border transition-all flex items-center gap-4 text-left font-bold ${cls}`}>
                    {selectedAnswer && <img src={`https://flagcdn.com/w40/${opt.code}.png`} className="w-8 rounded-sm shadow" alt="" />}
                    <span className="flex-1 truncate">{lang === 'en' ? opt.en : opt.name}</span>
                    {selectedAnswer && isCorrect && <CheckCircle2 size={24} />}
                    {selectedAnswer && isSel && !isCorrect && <XCircle size={24} />}
                 </button>
               );
             })}
          </div>
        </div>
      )}

      {gameState === 'FINISHED' && (
        <div className="text-center py-12 space-y-8 animate-zoom-in">
          <Trophy size={120} className="mx-auto text-yellow-500 drop-shadow-2xl" />
          <h2 className="text-4xl font-black">{t.finished}</h2>
          <div className="text-8xl font-black text-blue-500 drop-shadow-lg">{score}</div>
          <div className="space-y-4">
             <button onClick={startGame} className="w-full py-5 bg-blue-600 text-white rounded-3xl font-black text-2xl hover:scale-105 active:scale-95 transition-all shadow-xl">{t.playAgain}</button>
             <button onClick={() => navigate('/stats')} className="w-full py-4 bg-white/5 rounded-2xl font-bold">{t.stats}</button>
          </div>
          <AdUnit lang={lang} />
        </div>
      )}
    </div>
  );
}

function StatsView({ lang }: { lang: string }) {
  const stats = getStatsData();
  const navigate = useNavigate();
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/')} className="p-2 hover:bg-white/10 rounded-full"><ArrowRight className="rtl-only" /><ArrowRight className="ltr-only rotate-180" /></button>
        <h2 className="text-xl font-black">{t.personalStats}</h2>
        <button onClick={() => { localStorage.removeItem(STATS_KEY); window.location.reload(); }} className="p-2 text-red-500 opacity-50 hover:opacity-100"><Trash2 size={20} /></button>
      </div>
      {!stats ? <div className="p-20 text-center opacity-20"><History size={64} className="mx-auto mb-4" />{t.noGames}</div> : (
        <div className="grid grid-cols-2 gap-4">
          <StatBox val={stats.totalGames} label={t.totalGames} />
          <StatBox val={stats.highestScore} label={t.highScore} />
          <StatBox val={stats.averageScore} label={t.avgScore} />
          <StatBox val={stats.results.reduce((a:any, b:any) => a + b.score, 0)} label={t.totalPoints} />
          <div className="col-span-2 bg-white/5 p-6 rounded-3xl border border-white/5 space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
            {stats.results.slice().reverse().map((r: any, i: number) => (
              <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-[10px] opacity-40 uppercase font-black">{new Date(r.date).toLocaleDateString()}</span>
                <span className="font-black text-blue-400">{r.score}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatBox({ val, label }: any) {
  return <div className="bg-white/5 p-6 rounded-3xl border border-white/5 text-center backdrop-blur-md"><div className="text-3xl font-black mb-1">{val}</div><div className="text-[10px] uppercase font-black opacity-30">{label}</div></div>;
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
      <div className="max-w-xl mx-auto px-4 py-8 pb-32 min-h-screen flex flex-col">
        <header className="flex justify-between items-center mb-10 bg-white/10 p-4 rounded-[2rem] backdrop-blur-2xl border border-white/20 sticky top-4 z-50 shadow-2xl">
          <Link to="/" className="flex items-center gap-3 group">
             <div className="bg-blue-600 p-2.5 rounded-2xl group-hover:rotate-12 transition-transform text-white shadow-lg"><Flag size={20} /></div>
             <h1 className="text-lg font-black tracking-tight">{TRANSLATIONS[lang]?.title || 'Flags'}</h1>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/settings" className="p-2 hover:bg-white/10 rounded-full transition-all" aria-label="Settings"><Settings size={18} /></Link>
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </header>
        <AdUnit lang={lang} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<QuizGame lang={lang} score={score} setScore={setScore} streak={streak} setStreak={setStreak} />} />
            <Route path="/study" element={<StudyMode lang={lang} />} />
            <Route path="/settings" element={<SettingsPage theme={theme} setTheme={setTheme} lang={lang} setLang={setLang} fontSize={fontSize} setFontSize={setFontSize} />} />
            <Route path="/stats" element={<StatsView lang={lang} />} />
          </Routes>
        </main>
        <footer className="mt-20 border-t border-white/10 pt-10 text-center space-y-6 opacity-60">
           <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-[11px] font-black uppercase tracking-widest">
              <a href="mailto:goldnoamai@gmail.com" className="hover:text-blue-400 flex items-center gap-2 transition-colors"><Mail size={14} /> Send Feedback</a>
              <span className="opacity-20 hidden md:block">|</span>
              <p>{TRANSLATIONS[lang]?.copyright}</p>
           </div>
           <AdUnit lang={lang} />
        </footer>
      </div>
    </HashRouter>
  );
}

createRoot(document.getElementById('root')!).render(<App />);