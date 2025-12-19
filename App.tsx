import React, { useState, useRef, useEffect } from 'react';
import { DIFFICULTY_LEVELS, TOPIC_CATEGORIES, TopicItem } from './constants';
import { generateGrammarPractice, scoreWriting, WritingScore } from './services/geminiService';
import { QuizSession, UserAnswers } from './types';
import { QuestionCard } from './components/QuestionCard';
import { Button } from './components/Button';
import { BookOpen, GraduationCap, RefreshCw, Trophy, ChevronDown, X, Flame, Search, Moon, Sun, Camera, CheckCircle, XCircle, Library, PenTool, PlayCircle, Bold, Italic, List, Underline, Eraser, Circle } from 'lucide-react';
import html2canvas from 'html2canvas';

const App: React.FC = () => {
  // Theme State - Default to DARK (true)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('grammarAppTheme');
      return saved !== null ? saved === 'dark' : true; // Changed default to true
    } catch {
      return true;
    }
  });

  // Pull Cord Animation State
  // 'idle': Swinging gently
  // 'pulling': Moving down fast, straight
  // 'releasing': Moving up slow, straight
  const [ropeState, setRopeState] = useState<'idle' | 'pulling' | 'releasing'>('idle');

  // Navigation State
  const [currentView, setCurrentView] = useState<'practice' | 'learning'>('practice');

  // Config State
  const [selectedLevel, setSelectedLevel] = useState<string>(DIFFICULTY_LEVELS[2]);
  const [topic, setTopic] = useState<string>('');

  // Title Animation Refs
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const charPositions = useRef<{ x: number, y: number }[]>([]);

  // Dropdown State
  const [isTopicDropdownOpen, setIsTopicDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Quiz State
  const [isLoading, setIsLoading] = useState(false);
  const [quizSession, setQuizSession] = useState<QuizSession | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [error, setError] = useState<string | null>(null);

  // Persistence: Global Session Stats & Streak
  const [cumulativeStats, setCumulativeStats] = useState(() => {
    try {
      const saved = localStorage.getItem('grammarAppStats');
      return saved ? JSON.parse(saved) : { correct: 0, total: 0 };
    } catch (e) {
      return { correct: 0, total: 0 };
    }
  });

  const [streak, setStreak] = useState(() => {
    try {
      return parseInt(localStorage.getItem('grammarAppStreak') || '0');
    } catch (e) {
      return 0;
    }
  });

  // UI State
  const [showResultModal, setShowResultModal] = useState(false);

  // Refs for scrolling
  const resultsRef = useRef<HTMLDivElement>(null);
  const inlineResultRef = useRef<HTMLDivElement>(null);

  // Theme Effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('grammarAppTheme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('grammarAppTheme', 'light');
    }
  }, [isDarkMode]);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('grammarAppStats', JSON.stringify(cumulativeStats));
  }, [cumulativeStats]);

  useEffect(() => {
    localStorage.setItem('grammarAppStreak', streak.toString());
  }, [streak]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsTopicDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    if (ropeState !== 'idle') return; // Prevent interaction during animation

    // 1. Pull Down Phase (Fast)
    setRopeState('pulling');
    setIsDarkMode(!isDarkMode);

    // 2. Release Phase (Start moving up after 300ms)
    setTimeout(() => {
      setRopeState('releasing');

      // 3. Back to Idle (Resume swing after full return - 1000ms)
      setTimeout(() => {
        setRopeState('idle');
      }, 1000);
    }, 300);
  };

  const handleScreenshot = async () => {
    try {
      const canvas = await html2canvas(document.body, {
        useCORS: true,
        backgroundColor: isDarkMode ? '#020617' : '#E6DEC8',
        scale: 2 // Higher quality
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = image;
      link.download = `Matab-ul-Lugha-Snapshot-${Date.now()}.png`;
      link.click();
    } catch (error) {
      console.error("Screenshot failed:", error);
    }
  };

  // Helper to get topic info from constants
  const getTopicInfo = (topicName: string): TopicItem | undefined => {
    for (const items of Object.values(TOPIC_CATEGORIES)) {
      const found = items.find(item => item.name === topicName);
      if (found) return found;
    }
    return undefined;
  };

  // Writing Mode State
  const [isWritingMode, setIsWritingMode] = useState(false);

  // Topic Completion State
  const [completedTopics, setCompletedTopics] = useState<string[]>(() => {
    const saved = localStorage.getItem('completedTopics');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleTopicCompletion = (topicName: string) => {
    setCompletedTopics(prev => {
      const newSet = prev.includes(topicName)
        ? prev.filter(t => t !== topicName)
        : [...prev, topicName];
      localStorage.setItem('completedTopics', JSON.stringify(newSet));
      return newSet;
    });
  };
  const [writingContent, setWritingContent] = useState('');
  const [writingSubmitted, setWritingSubmitted] = useState(false);
  const [writingScore, setWritingScore] = useState<WritingScore | null>(null);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [isScoring, setIsScoring] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(5);

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    // Reset UI state immediately
    setQuizSession(null);
    setIsLoading(true);
    setError(null);
    setUserAnswers({});
    setShowResultModal(false);
    setIsTopicDropdownOpen(false);
    setWritingContent('');
    setWritingSubmitted(false);
    setWritingScore(null);

    // Check if this is a writing topic
    const topicInfo = getTopicInfo(topic);
    if (topicInfo?.type === 'writing') {
      setIsWritingMode(true);
      setIsLoading(false);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    setIsWritingMode(false);

    try {
      const data = await generateGrammarPractice(topic, selectedLevel, numberOfQuestions);
      setQuizSession(data);
      // Slight delay to ensure render before scroll
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setError(err.message || "The system could not generate the lesson.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopicSelect = (selectedTopic: string) => {
    setTopic(selectedTopic);
    setIsTopicDropdownOpen(false);
  };

  const handleLibraryTopicClick = (selectedTopic: string) => {
    setTopic(selectedTopic);
    // Reset all session state to ensure fresh start
    setQuizSession(null);
    setIsWritingMode(false);
    setWritingContent('');
    setWritingSubmitted(false);
    setWritingScore(null);
    setShowResultModal(false);
    setUserAnswers({});
    setError(null);
    setCurrentView('practice');
  };

  const handleAnswer = (questionId: number, answer: string, isCorrect: boolean) => {
    if (userAnswers[questionId]) return;

    setUserAnswers(prev => ({
      ...prev,
      [questionId]: { answer, isCorrect }
    }));

    setCumulativeStats((prev: { correct: number; total: number }) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
  };

  const calculateScore = () => {
    if (!quizSession) return 0;
    const correctCount = Object.values(userAnswers).filter((a: any) => a.isCorrect).length;
    return Math.round((correctCount / quizSession.questions.length) * 100);
  };

  const getCorrectCount = () => {
    if (!quizSession) return 0;
    return Object.values(userAnswers).filter((a: any) => a.isCorrect).length;
  };

  const isQuizComplete = quizSession && Object.keys(userAnswers).length === quizSession.questions.length;

  // Video Modal State
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const getResultMessage = (percentage: number) => {
    if (percentage >= 90) return "Mashallah! Excellence Achieved.";
    if (percentage >= 70) return "Great Progress!";
    if (percentage >= 50) return "Good Effort.";
    return "Keep Practicing, Knowledge is Light.";
  };

  useEffect(() => {
    if (isQuizComplete) {
      const today = new Date().toDateString();
      const lastDate = localStorage.getItem('grammarAppLastDate');

      if (lastDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastDate === yesterday.toDateString()) {
          setStreak(s => s + 1);
        } else {
          setStreak(1);
        }
        localStorage.setItem('grammarAppLastDate', today);
      }

      setTimeout(() => {
        setShowResultModal(true);
        // Scroll to inline result after modal might be closed or simultaneously
        inlineResultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    }
  }, [isQuizComplete]);

  // Title Animation Logic
  const handleTitleMouseEnter = () => {
    // Cache character positions to avoid layout thrashing during animation
    charPositions.current = charRefs.current.map(span => {
      if (!span) return { x: 0, y: 0 };
      const rect = span.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    });
  };

  const handleTitleMouseMove = (e: React.MouseEvent) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const radius = 80; // Interaction radius

    charRefs.current.forEach((span, i) => {
      if (!span) return;
      const pos = charPositions.current[i];
      if (!pos) return;

      const dx = mouseX - pos.x;
      const dy = mouseY - pos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < radius) {
        // Calculate repulsion force (closer = stronger push)
        const force = (1 - distance / radius) * 20; // Move up to 20px
        const angle = Math.atan2(dy, dx);

        // Move opposite to mouse
        const moveX = -Math.cos(angle) * force;
        const moveY = -Math.sin(angle) * force;

        span.style.transform = `translate(${moveX}px, ${moveY}px)`;
      } else {
        span.style.transform = 'translate(0, 0)';
      }
    });
  };

  const handleTitleMouseLeave = () => {
    charRefs.current.forEach(span => {
      if (span) span.style.transform = 'translate(0, 0)';
    });
  };

  const renderInteractiveChar = (char: string, index: number, className: string) => (
    <span
      key={index}
      ref={el => charRefs.current[index] = el}
      className={`inline-block transition-transform duration-100 ease-out cursor-default ${className}`}
      style={{ willChange: 'transform' }}
    >
      {char}
    </span>
  );

  const getFilteredCategories = () => {
    if (!topic.trim()) return TOPIC_CATEGORIES;

    const filtered: Record<string, TopicItem[]> = {};
    let hasResults = false;

    Object.entries(TOPIC_CATEGORIES).forEach(([category, items]) => {
      const matchingItems = items.filter(item =>
        item.name.toLowerCase().includes(topic.toLowerCase())
      );
      if (matchingItems.length > 0) {
        filtered[category] = matchingItems;
        hasResults = true;
      }
    });

    return hasResults ? filtered : TOPIC_CATEGORIES;
  };

  // Helper for Rub el Hizb SVG Icon (Small)
  const RubElHizbIcon = ({ size = 24, className = "" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fillRule="evenodd" />
      <rect x="6" y="6" width="12" height="12" transform="rotate(45 12 12)" fillOpacity="0.3" />
    </svg>
  );

  // Rope Style Helpers
  const getRopeOuterClass = () => {
    switch (ropeState) {
      case 'pulling': return 'translate-y-12 duration-300 ease-out';
      case 'releasing': return 'translate-y-0 duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)]'; // Bouncy return
      case 'idle': return 'translate-y-0';
    }
  };

  const getRopeInnerClass = () => {
    switch (ropeState) {
      case 'idle': return 'animate-pendulum';
      default: return 'rotate-0'; // Keep straight while moving vertically
    }
  };

  // Sidebar Geometric Button Component
  const SidebarButton = ({
    icon: Icon,
    label,
    isActive,
    onClick
  }: {
    icon: React.ElementType,
    label: string,
    isActive: boolean,
    onClick: () => void
  }) => {
    return (
      <div className="relative group flex items-center">
        <button
          onClick={onClick}
          className="relative w-16 h-16 flex items-center justify-center focus:outline-none z-20"
        >
          {/* Geometric Background (Rub el Hizb) */}
          <div className={`absolute inset-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
            <svg
              viewBox="0 0 100 100"
              className={`w-full h-full drop-shadow-md filter transition-all duration-300 ${isActive
                ? 'drop-shadow-[0_0_8px_rgba(74,55,40,0.6)] dark:drop-shadow-[0_0_10px_rgba(245,158,11,0.6)]'
                : 'group-hover:drop-shadow-[0_0_8px_rgba(74,55,40,0.6)] dark:group-hover:drop-shadow-[0_0_10px_rgba(245,158,11,0.6)]'
                }`}
            >
              {/* Using a group to center and rotate */}
              <g transform="translate(50 50)">
                {/* Square 1 */}
                <rect
                  x="-32" y="-32" width="64" height="64" rx="4"
                  className={`transition-all duration-300 stroke-2 ${isActive
                    ? 'fill-[#4A3728] dark:fill-amber-500 stroke-[#2C1810] dark:stroke-amber-400'
                    : 'fill-[#E6DEC8] dark:fill-slate-800 stroke-[#8D6E63] dark:stroke-slate-600 group-hover:stroke-[#4A3728] dark:group-hover:stroke-amber-500'}`}
                />
                {/* Square 2 (Rotated) */}
                <rect
                  x="-32" y="-32" width="64" height="64" rx="4" transform="rotate(45)"
                  className={`transition-all duration-300 stroke-2 ${isActive
                    ? 'fill-[#4A3728] dark:fill-amber-500 stroke-[#2C1810] dark:stroke-amber-400'
                    : 'fill-[#E6DEC8] dark:fill-slate-800 stroke-[#8D6E63] dark:stroke-slate-600 group-hover:stroke-[#4A3728] dark:group-hover:stroke-amber-500'}`}
                />
              </g>
            </svg>
          </div>

          {/* Icon */}
          <Icon
            size={24}
            className={`relative z-10 transition-colors duration-300 ${isActive
              ? 'text-[#E6DEC8] dark:text-slate-900'
              : 'text-[#8D6E63] dark:text-gray-400 group-hover:text-[#4A3728] dark:group-hover:text-amber-400'}`}
          />
        </button>

        {/* Label - Premium Plaque Style */}
        <div className={`absolute left-full ml-6 px-5 py-2 bg-[#F0EAD6] dark:bg-slate-900 border-2 border-[#5D4037] dark:border-amber-500 text-[#4A3728] dark:text-amber-500 rounded-lg font-messiri text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_15px_rgba(74,55,40,0.3)] dark:shadow-[0_0_15px_rgba(245,158,11,0.3)] pointer-events-none z-50 uppercase tracking-wider transform translate-x-[-10px] group-hover:translate-x-0`}>
          {label}
          {/* Little triangle pointing to button - styled to match border */}
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-3 h-3 bg-[#F0EAD6] dark:bg-slate-900 border-l-2 border-b-2 border-[#5D4037] dark:border-amber-500 rotate-45"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-20 selection:bg-[#8D6E63] dark:selection:bg-amber-900 selection:text-[#F0EAD6] dark:selection:text-amber-400">

      {/* --- FLOATING SIDEBAR NAVIGATION --- */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-8 hidden sm:flex">

        {/* Learning Area Button */}
        <SidebarButton
          icon={Library}
          label="Learning Area"
          isActive={currentView === 'learning'}
          onClick={() => setCurrentView('learning')}
        />

        {/* Practice Studio Button */}
        <SidebarButton
          icon={PenTool}
          label="Practice Studio"
          isActive={currentView === 'practice'}
          onClick={() => setCurrentView('practice')}
        />

      </div>
      {/* ---------------------------------- */}


      {/* --- LAMP PULL ROPE TOGGLE --- */}
      {/* Outer container handles vertical translation (The Pull) */}
      <div
        onClick={toggleTheme}
        className={`fixed top-0 right-4 sm:right-8 lg:right-12 z-30 cursor-pointer group select-none transition-transform ${getRopeOuterClass()}`}
        title="Pull to switch theme"
      >
        {/* Inner container handles rotation (The Sway) */}
        <div className={`flex flex-col items-center origin-top transition-transform duration-500 ${getRopeInnerClass()}`}>
          {/* The String */}
          <div className="w-0.5 h-32 sm:h-40 bg-gradient-to-b from-[#8D6E63] via-[#5D4037] to-[#D97706] dark:from-slate-700 dark:via-amber-700 dark:to-amber-500 shadow-md relative group-hover:h-[10.2rem] transition-[height] duration-300">
            {/* Top attachment circle */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#5D4037] dark:bg-slate-600"></div>
          </div>

          {/* The Handle / Tassel */}
          <div className="relative -mt-1 flex flex-col items-center">
            {/* Knot */}
            <div className="w-3 h-3 rounded-full bg-[#4A3728] dark:bg-amber-500 shadow-sm z-10"></div>

            {/* Decorative Body */}
            <div className="w-6 h-10 -mt-1 bg-[#F0EAD6] dark:bg-slate-900 border-2 border-[#5D4037] dark:border-amber-500 rounded-lg flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(74,55,40,0.6)] dark:group-hover:shadow-[0_0_20px_rgba(245,158,11,0.6)]">
              {/* Internal Symbol */}
              {isDarkMode ? (
                <Moon size={14} className="text-amber-500 fill-amber-500" />
              ) : (
                <Sun size={14} className="text-[#4A3728]" />
              )}
            </div>

            {/* Tassel Bottom */}
            <div className="w-0.5 h-6 bg-[#4A3728] dark:bg-amber-500 -mt-px opacity-60"></div>
            <div className="flex gap-0.5 -mt-1">
              <div className="w-0.5 h-3 bg-[#5D4037]/60 dark:bg-amber-500/60 rounded-full"></div>
              <div className="w-0.5 h-4 bg-[#5D4037] dark:bg-amber-500 rounded-full"></div>
              <div className="w-0.5 h-3 bg-[#5D4037]/60 dark:bg-amber-500/60 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      {/* --------------------------- */}

      {/* Header */}
      <header className="bg-[#E6DEC8]/95 dark:bg-slate-900/90 border-b border-[#5D4037]/10 dark:border-amber-500/20 sticky top-0 z-40 shadow-sm backdrop-blur-md bg-opacity-95 transition-colors duration-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center bg-[#4A3728] dark:bg-amber-500 text-[#E6DEC8] dark:text-slate-900 rounded-lg shadow-lg relative overflow-hidden group transition-all duration-300 hover:scale-110 shadow-[0_0_15px_rgba(74,55,40,0.5)] dark:shadow-[0_0_20px_rgba(245,158,11,0.5)]">
              <div className="absolute inset-0 bg-[#2C1810] dark:bg-amber-600 transform rotate-45 scale-50 opacity-20 group-hover:rotate-90 transition-transform duration-700"></div>
              <BookOpen size={24} className="relative z-10" />
            </div>

            {/* Interactive Title Container - Characters move independently */}
            <div
              className="p-2"
              onMouseEnter={handleTitleMouseEnter}
              onMouseMove={handleTitleMouseMove}
              onMouseLeave={handleTitleMouseLeave}
            >
              <div>
                <h1 className="text-3xl font-messiri leading-none flex gap-1.5 items-baseline">
                  <span className="flex">
                    {"Matab".split('').map((char, i) =>
                      renderInteractiveChar(char, i, "text-[#2C1810] dark:text-slate-100 transition-colors duration-500")
                    )}
                  </span>
                  <span className="flex mx-0.5">
                    {"-ul-".split('').map((char, i) =>
                      renderInteractiveChar(char, i + 6, "text-[#5D4037] dark:text-slate-400 text-2xl transition-colors duration-500")
                    )}
                  </span>
                  <span className="flex">
                    {"Lugha".split('').map((char, i) =>
                      renderInteractiveChar(char, i + 10, "text-[#4A3728] dark:text-amber-500 transition-colors duration-500")
                    )}
                  </span>
                </h1>
                <p className="text-xs text-[#8D6E63] dark:text-slate-400 font-markazi font-bold mt-1 tracking-widest uppercase transition-colors duration-500">
                  The School of Language
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mr-10 sm:mr-16">
            {/* Added Margin Right to account for the Rope */}

            {/* Screenshot Button */}
            <button
              onClick={handleScreenshot}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F0EAD6] dark:bg-slate-800 border border-[#D7Cea7] dark:border-slate-600 text-[#4A3728] dark:text-amber-500 hover:bg-[#E6DEC8] dark:hover:bg-slate-700 transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-[0_0_15px_rgba(74,55,40,0.3)] dark:hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]"
              title="Take Screenshot"
            >
              <Camera size={20} />
            </button>

            {/* Stats Display */}
            <div className="hidden sm:flex flex-row items-center gap-6 font-messiri border-l border-[#D7Cea7] dark:border-slate-700 pl-6 ml-2">
              {/* Streak */}
              <div className="flex flex-col items-center group cursor-default">
                <span className="text-[10px] uppercase tracking-widest text-[#8D6E63] dark:text-slate-500 mb-1 font-bold">Streak</span>
                <div className="flex items-center gap-2 px-3 py-1 bg-[#F0EAD6] dark:bg-slate-800 rounded-full border border-[#D7Cea7] dark:border-slate-600 group-hover:border-[#D97706]/30 dark:group-hover:border-amber-500/30 transition-all dark:shadow-[0_0_10px_rgba(0,0,0,0.3)] group-hover:shadow-[0_0_10px_rgba(217,119,6,0.1)]">
                  <Flame size={16} className={`${streak > 0 ? "fill-[#D97706] text-[#D97706] animate-pulse drop-shadow-[0_0_8px_rgba(217,119,6,0.8)]" : "text-[#D7Cea7] dark:text-slate-500"}`} />
                  <span className={`text-lg font-bold ${streak > 0 ? "text-[#D97706] dark:text-amber-500" : "text-[#8D6E63] dark:text-slate-500"}`}>{streak}</span>
                </div>
              </div>

              {/* Progress */}
              <div className="flex flex-col items-end">
                <span className="text-[10px] uppercase tracking-widest text-[#8D6E63] dark:text-slate-500 mb-1 font-bold">Total Knowledge</span>
                <div className="flex items-center gap-1.5 text-sm font-bold bg-[#F0EAD6] dark:bg-slate-800 px-3 py-1 rounded-full border border-[#D7Cea7] dark:border-slate-600 dark:shadow-[0_0_10px_rgba(0,0,0,0.3)]">
                  <span className="text-xs text-[#8D6E63] dark:text-slate-500 uppercase mr-1 font-messiri">Correct</span>
                  <span className="text-lg text-[#4A3728] dark:text-amber-500 transition-colors duration-500">{cumulativeStats.correct}</span>
                  <span className="text-[#D7Cea7] dark:text-slate-600">/</span>
                  <span className="text-[#8D6E63] dark:text-slate-400">{cumulativeStats.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* VIEW: LEARNING AREA (Path Style) */}
        {currentView === 'learning' && (
          <div className="animate-in fade-in zoom-in-95 duration-500 relative min-h-screen">

            {/* Background Pattern - Geometric */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234A3728' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative z-10 pb-32">
              <div className="text-center mb-16 pt-8">
                {/* Main Title Badge */}
                <div className="inline-block relative">
                  <div className="absolute inset-0 bg-[#D97706]/20 dark:bg-amber-500/10 blur-xl rounded-full"></div>
                  <h2 className="relative text-5xl font-messiri text-[#2C1810] dark:text-amber-500 mb-2 drop-shadow-sm">The Path of Knowledge</h2>
                </div>
                <p className="text-xl font-markazi text-[#5D4037] dark:text-slate-400 italic">Traverse the valley of eloquence</p>
              </div>

              <div className="relative max-w-2xl mx-auto">
                {/* SVG Path Line - Behind Nodes */}
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible" style={{ zIndex: -1 }}>
                  <defs>
                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#D97706', stopOpacity: 0 }} />
                      <stop offset="10%" style={{ stopColor: '#D97706', stopOpacity: 0.5 }} />
                      <stop offset="90%" style={{ stopColor: '#D97706', stopOpacity: 0.5 }} />
                      <stop offset="100%" style={{ stopColor: '#D97706', stopOpacity: 0 }} />
                    </linearGradient>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  {/* Render the winding path */}
                  {(() => {
                    // Calculate total height based on items
                    let yOffset = 0;
                    const pathPoints: string[] = [];
                    let firstPoint = true;

                    Object.entries(TOPIC_CATEGORIES).forEach(([category, items], catIndex) => {
                      // Unit Header Space
                      yOffset += 120;

                      items.forEach((_, index) => {
                        // Node Spacing
                        yOffset += 140;

                        // Zig Zag Logic
                        // Center is 50%
                        // Amplitude is ~120px
                        const isEven = (catIndex * 100 + index) % 2 === 0;
                        const x = isEven ? 35 : 65; // Percentage

                        // For SVG path, we need absolute pixels approx.
                        // Assuming container width ~ 672px (max-w-2xl)
                        const xPx = isEven ? 235 : 437; // Approx for 672 width

                        if (firstPoint) {
                          pathPoints.push(`M ${xPx} ${yOffset}`);
                          firstPoint = false;
                        } else {
                          // Curved bezier connection
                          const prevX = isEven ? 437 : 235;
                          const prevY = yOffset - 140;
                          const cp1x = prevX;
                          const cp1y = prevY + 70;
                          const cp2x = xPx;
                          const cp2y = yOffset - 70;
                          pathPoints.push(`C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${xPx} ${yOffset}`);
                        }
                      });
                    });

                    return (
                      <path
                        d={pathPoints.join(' ')}
                        fill="none"
                        stroke="url(#pathGradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="20 10"
                        className="opacity-60 dark:opacity-40"
                      />
                    );
                  })()}
                </svg>

                {/* Nodes Loop */}
                {Object.entries(TOPIC_CATEGORIES).map(([category, items], catIdx) => (
                  <div key={category} className="mb-12 relative z-10">

                    {/* Unit Header - Sticky-ish visual separator */}
                    <div className="flex justify-center mb-12">
                      <div className="relative bg-[#F0EAD6] dark:bg-slate-900 border-2 border-[#D97706] dark:border-amber-600 px-8 py-4 rounded-xl shadow-[0_4px_20px_rgba(74,55,40,0.15)] dark:shadow-[0_0_20px_rgba(217,119,6,0.2)] transform hover:scale-105 transition-transform duration-300 max-w-md w-full text-center">
                        {/* Decorative corners */}
                        <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#4A3728] dark:bg-amber-500 rounded-full border border-[#F0EAD6] dark:border-slate-900"></div>
                        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#4A3728] dark:bg-amber-500 rounded-full border border-[#F0EAD6] dark:border-slate-900"></div>
                        <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#4A3728] dark:bg-amber-500 rounded-full border border-[#F0EAD6] dark:border-slate-900"></div>
                        <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#4A3728] dark:bg-amber-500 rounded-full border border-[#F0EAD6] dark:border-slate-900"></div>

                        <h3 className="font-messiri font-bold text-2xl text-[#4A3728] dark:text-amber-500 uppercase tracking-widest leading-tight">{category}</h3>
                        <div className="w-16 h-1 bg-[#D97706]/30 mx-auto mt-2 rounded-full"></div>
                      </div>
                    </div>

                    <div className="relative space-y-24"> {/* Space for path */}
                      {items.map((t, index) => {
                        const isCompleted = completedTopics.includes(t.name);
                        // Simple zig zag alignment
                        const isEven = (catIdx * 100 + index) % 2 === 0;

                        return (
                          <div key={t.name} className={`flex ${isEven ? 'justify-start md:pl-32' : 'justify-end md:pr-32'} relative`}>

                            {/* The Node Button */}
                            <button
                              onClick={() => handleLibraryTopicClick(t.name)}
                              className={`group relative flex flex-col items-center justify-center transition-all duration-300 transform hover:-translate-y-2 focus:outline-none`}
                            >
                              {/* Status Ring / Glow */}
                              <div className={`absolute inset-0 rounded-full blur-xl transition-all duration-500 ${isCompleted ? 'bg-green-500/20' : 'bg-[#D97706]/20 group-hover:bg-[#D97706]/40'}`}></div>

                              {/* Main Circle */}
                              <div className={`w-24 h-24 rounded-full border-4 shadow-xl flex items-center justify-center relative z-10 transition-all duration-300
                                            ${isCompleted
                                  ? 'bg-[#E6DEC8] dark:bg-slate-800 border-green-600 dark:border-green-500'
                                  : 'bg-[#F0EAD6] dark:bg-slate-900 border-[#D97706] dark:border-amber-600'
                                }
                                        `}>
                                {isCompleted ? (
                                  <div className="bg-green-600 dark:bg-green-500 text-white rounded-full p-1 shadow-sm">
                                    <CheckCircle size={40} strokeWidth={2.5} />
                                  </div>
                                ) : (
                                  <div className="text-[#4A3728] dark:text-amber-500 group-hover:scale-110 transition-transform duration-300">
                                    <BookOpen size={36} strokeWidth={2} />
                                  </div>
                                )}

                                {/* Circular Progress (Visual Only for now) */}
                                {!isCompleted && (
                                  <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="46" fill="none" stroke="#D97706" strokeWidth="2" strokeOpacity="0.2" />
                                    <circle cx="50" cy="50" r="46" fill="none" stroke="#D97706" strokeWidth="4" strokeDasharray="290" strokeDashoffset="200" strokeLinecap="round" className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                  </svg>
                                )}
                              </div>

                              {/* Label Tag - Floating below */}
                              <div className={`absolute top-full mt-4 bg-[#F0EAD6] dark:bg-slate-900 border border-[#D7Cea7] dark:border-slate-600 px-4 py-2 rounded-lg shadow-md text-center min-w-[180px] max-w-[220px] transform transition-all duration-300 group-hover:scale-105 group-hover:border-[#D97706] dark:group-hover:border-amber-500 z-20`}>
                                <div className="font-markazi font-bold text-lg text-[#2C1810] dark:text-slate-200 leading-tight">{t.name}</div>
                                <div className="text-xs text-[#8D6E63] dark:text-slate-500 font-messiri mt-0.5">{t.time}</div>
                              </div>
                            </button>

                            {/* Action Buttons (Video / Toggle Complete) - Appear on hover or side */}
                            <div className={`absolute top-1/2 -translate-y-1/2 ${isEven ? 'left-full ml-6' : 'right-full mr-6'} opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2 z-0`}>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleTopicCompletion(t.name);
                                }}
                                className="p-2 bg-[#F0EAD6] dark:bg-slate-800 rounded-full shadow-md border border-[#D7Cea7] hover:bg-white dark:hover:bg-slate-700 text-[#8D6E63]"
                                title="Toggle Completion"
                              >
                                {isCompleted ? <X size={16} /> : <CheckCircle size={16} />}
                              </button>
                            </div>

                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW: PRACTICE STUDIO (Generator) */}
        {currentView === 'practice' && (
          <div className="animate-in fade-in duration-500">
            {/* Configuration Section */}
            <section className="mb-12 relative z-30">
              <div className="bg-[#F0EAD6] dark:bg-slate-900 rounded-xl shadow-md shadow-[#5D4037]/5 dark:shadow-[0_0_15px_rgba(0,0,0,0.2)] border border-[#5D4037]/10 dark:border-amber-500/20 relative transition-all duration-500 hover:shadow-[0_0_15px_rgba(74,55,40,0.1)] dark:hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]">

                {/* Background Container for clipping decorative elements */}
                <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#4A3728] dark:bg-amber-500 opacity-[0.03] dark:opacity-[0.05] rounded-bl-full transform translate-x-1/3 -translate-y-1/3 transition-colors duration-500"></div>
                </div>

                <div className="p-8 relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="text-[#4A3728] dark:text-slate-900 p-3 bg-[#E6DEC8] dark:bg-amber-500 rounded-full transition-colors duration-500 group-hover:shadow-[0_0_15px_rgba(74,55,40,0.3)] dark:shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                      <GraduationCap size={24} className="drop-shadow-sm" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-messiri font-bold text-[#2C1810] dark:text-slate-100 transition-colors duration-500">Design Your Learning</h2>
                      <p className="text-[#5D4037] dark:text-slate-400 font-markazi text-lg transition-colors duration-500">Select your level and topic to begin.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Level Selection */}
                    <div className={getTopicInfo(topic)?.type === 'writing' ? "md:col-span-6" : "md:col-span-5"}>
                      <label className="block text-xs font-bold text-[#4A3728] dark:text-amber-500 mb-3 uppercase tracking-widest font-messiri transition-colors duration-500">
                        Difficulty
                      </label>
                      <div className="relative group">
                        <select
                          value={selectedLevel}
                          onChange={(e) => setSelectedLevel(e.target.value)}
                          className="w-full appearance-none bg-[#E6DEC8] dark:bg-slate-800 border border-[#D7Cea7] dark:border-slate-700 text-[#2C1810] dark:text-slate-200 text-lg font-markazi font-bold rounded-lg focus:border-[#4A3728] dark:focus:border-amber-500 focus:ring-1 focus:ring-[#4A3728] dark:focus:ring-amber-500 block py-3 px-4 pr-10 transition-all cursor-pointer outline-none hover:border-[#4A3728]/50 dark:hover:border-amber-500/50 hover:shadow-[0_0_15px_rgba(74,55,40,0.1)] dark:focus:shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                        >
                          {DIFFICULTY_LEVELS.map((level) => (
                            <option key={level} value={level}>{level}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#8D6E63] dark:text-slate-500 group-hover:text-[#4A3728] dark:group-hover:text-amber-500 transition-colors">
                          <ChevronDown size={20} />
                        </div>
                      </div>
                    </div>

                    {/* Question Count Selection - Hide for writing tasks */}
                    {getTopicInfo(topic)?.type !== 'writing' && (
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-[#4A3728] dark:text-amber-500 mb-3 uppercase tracking-widest font-messiri transition-colors duration-500">
                          Questions
                        </label>
                        <div className="relative group">
                          <select
                            value={numberOfQuestions}
                            onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
                            className="w-full appearance-none bg-[#E6DEC8] dark:bg-slate-800 border border-[#D7Cea7] dark:border-slate-700 text-[#2C1810] dark:text-slate-200 text-lg font-markazi font-bold rounded-lg focus:border-[#4A3728] dark:focus:border-amber-500 focus:ring-1 focus:ring-[#4A3728] dark:focus:ring-amber-500 block py-3 px-4 pr-8 transition-all cursor-pointer outline-none hover:border-[#4A3728]/50 dark:hover:border-amber-500/50 hover:shadow-[0_0_15px_rgba(74,55,40,0.1)] dark:focus:shadow-[0_0_15px_rgba(245,158,11,0.2)] text-center"
                          >
                            {[5, 10, 15, 20].map((num) => (
                              <option key={num} value={num}>{num}</option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#8D6E63] dark:text-slate-500 group-hover:text-[#4A3728] dark:group-hover:text-amber-500 transition-colors">
                            <ChevronDown size={16} />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Topic Selection */}
                    <div className={getTopicInfo(topic)?.type === 'writing' ? "md:col-span-6" : "md:col-span-5"} ref={dropdownRef}>
                      <label className="block text-xs font-bold text-[#4A3728] dark:text-amber-500 mb-3 uppercase tracking-widest font-messiri transition-colors duration-500">
                        Grammar Topic
                      </label>
                      <div className="relative">
                        <Search className="absolute left-4 top-3.5 text-[#8D6E63] dark:text-slate-500" size={20} />
                        <input
                          type="text"
                          value={topic}
                          onChange={(e) => {
                            setTopic(e.target.value);
                            // Reset quiz state when topic changes
                            if (quizSession) setQuizSession(null);
                            if (isWritingMode) setIsWritingMode(false);
                            if (!isTopicDropdownOpen) setIsTopicDropdownOpen(true);
                          }}
                          onFocus={() => setIsTopicDropdownOpen(true)}
                          placeholder="e.g., Past Tense..."
                          autoComplete="off"
                          className="w-full bg-[#E6DEC8] dark:bg-slate-800 border border-[#D7Cea7] dark:border-slate-700 text-[#2C1810] dark:text-amber-400 text-lg font-markazi font-bold rounded-lg focus:border-[#4A3728] dark:focus:border-amber-500 focus:ring-1 focus:ring-[#4A3728] dark:focus:ring-amber-500 block py-3 pl-12 pr-24 transition-all placeholder-[#8D6E63] dark:placeholder-slate-500 outline-none focus:shadow-[0_0_15px_rgba(74,55,40,0.1)] dark:focus:shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                        />

                        {/* Clear Button */}
                        {topic && (
                          <button
                            onClick={() => {
                              setTopic('');
                              // Reset quiz state when cleared
                              setQuizSession(null);
                              setIsWritingMode(false);
                              setIsTopicDropdownOpen(true);
                            }}
                            className="absolute right-12 top-2 bottom-2 w-8 flex items-center justify-center text-[#8D6E63] dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                            title="Clear topic"
                          >
                            <X size={18} />
                          </button>
                        )}

                        <button
                          onClick={() => setIsTopicDropdownOpen(!isTopicDropdownOpen)}
                          className="absolute right-2 top-2 bottom-2 w-8 flex items-center justify-center text-[#8D6E63] dark:text-slate-500 hover:text-[#4A3728] dark:hover:text-amber-500 transition-colors"
                        >
                          <ChevronDown size={20} className={`${isTopicDropdownOpen ? 'rotate-180' : ''} transition-transform`} />
                        </button>

                        {/* Categorized Dropdown Menu */}
                        {isTopicDropdownOpen && (
                          <div className="absolute top-full left-0 right-0 mt-2 bg-[#F0EAD6] dark:bg-slate-800 border border-[#D7Cea7] dark:border-slate-600 rounded-lg shadow-xl dark:shadow-[0_0_30px_rgba(0,0,0,0.5)] z-50 max-h-80 overflow-y-auto font-markazi animate-in fade-in zoom-in-95 duration-200">
                            <div className="py-2">
                              {Object.entries(getFilteredCategories()).length > 0 ? (
                                Object.entries(getFilteredCategories()).map(([category, items]) => (
                                  <div key={category} className="border-b border-[#D7Cea7] dark:border-slate-700 last:border-0">
                                    <div className="px-4 py-2 bg-[#E6DEC8] dark:bg-slate-900 text-xs font-bold text-[#4A3728] dark:text-amber-500 uppercase tracking-wider sticky top-0 font-messiri">
                                      {category}
                                    </div>
                                    <div className="p-1">
                                      {items.map((item) => (
                                        <button
                                          key={item.name}
                                          onClick={() => handleTopicSelect(item.name)}
                                          className={`w-full text-left px-4 py-2 rounded-md text-base transition-all flex items-center justify-between group
                                              ${topic === item.name
                                              ? 'bg-[#E6DEC8] dark:bg-slate-700 text-[#4A3728] dark:text-amber-500 font-bold dark:shadow-[0_0_10px_rgba(245,158,11,0.1)]'
                                              : 'text-[#2C1810] dark:text-slate-300 hover:bg-[#E6DEC8] dark:hover:bg-slate-700'}`}
                                        >
                                          {item.name}
                                          {topic === item.name && <RubElHizbIcon size={16} className="text-[#4A3728] dark:text-amber-500" />}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="p-6 text-center text-[#8D6E63] italic">
                                  No topics found matches "{topic}"
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 flex justify-end">
                    <Button
                      onClick={handleGenerate}
                      isLoading={isLoading}
                      disabled={!topic.trim()}
                      className="w-full sm:w-auto text-lg shadow-lg"
                    >
                      Start Practice
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Error Message */}
            {error && (
              <div className="bg-[#FEF2F2] dark:bg-red-900/20 border border-[#FECACA] dark:border-red-800 text-[#991B1B] dark:text-red-400 px-6 py-4 mb-8 flex items-center shadow-sm font-markazi rounded-lg dark:shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <span className="font-bold font-messiri mr-3 text-xl">!</span> {error}
              </div>
            )}

            {/* Quiz Area */}
            <div ref={resultsRef} className="min-h-[100px]">
              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in-95 duration-500">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-[#4A3728] dark:bg-amber-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
                    <div className="w-16 h-16 border-4 border-[#4A3728]/20 dark:border-amber-500/20 border-t-[#4A3728] dark:border-t-amber-500 rounded-full animate-spin relative z-10"></div>
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="w-2 h-2 bg-[#4A3728] dark:bg-amber-500 rounded-full"></div>
                    </div>
                  </div>
                  <h3 className="text-xl font-messiri text-[#2C1810] dark:text-gray-100 mb-2">
                    Preparing your practice...
                  </h3>
                  <p className="text-[#4A3728] dark:text-amber-500 font-markazi italic animate-pulse">
                    Consulting the archives of knowledge
                  </p>
                </div>
              )}

              {/* Writing Mode UI */}
              {isWritingMode && !isLoading && (
                <div className="animate-in slide-in-from-bottom-4 duration-700">
                  <div className="flex items-end justify-between mb-10 pb-4 border-b border-[#5D4037]/20 dark:border-amber-500/20 transition-colors duration-500">
                    <div>
                      <h2 className="text-3xl font-messiri text-[#2C1810] dark:text-slate-100 transition-colors duration-500">{topic}</h2>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="font-messiri font-bold text-[#4A3728] dark:text-slate-900 bg-[#E6DEC8] dark:bg-amber-500 px-3 py-1 rounded-full text-xs tracking-wider border border-[#5D4037]/20 dark:border-amber-500/20 transition-colors duration-500 dark:shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                          Writing Task
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsWritingMode(false);
                        setWritingContent('');
                        setWritingSubmitted(false);
                      }}
                      icon={<X size={16} />}
                      className="hidden sm:flex"
                    >
                      Close
                    </Button>
                  </div>

                  {/* Writing Guidelines */}
                  <div className="bg-[#E6DEC8] dark:bg-slate-800 rounded-lg p-6 mb-6 border border-[#5D4037]/10 dark:border-amber-500/20">
                    <h3 className="font-messiri font-bold text-lg text-[#4A3728] dark:text-amber-500 mb-3">
                      📝 Writing Guidelines
                    </h3>
                    <ul className="space-y-2 text-[#5D4037] dark:text-slate-300 font-markazi text-lg">
                      {topic.toLowerCase().includes('essay') && (
                        <>
                          <li>• Write a well-structured essay (150-200 words)</li>
                          <li>• Include an introduction, body paragraphs, and conclusion</li>
                          <li>• Use proper grammar and punctuation</li>
                        </>
                      )}
                      {topic.toLowerCase().includes('application') && (
                        <>
                          <li>• Follow proper application/letter format</li>
                          <li>• Include sender's address, date, recipient's address</li>
                          <li>• Write subject line clearly</li>
                          <li>• Be formal and polite</li>
                        </>
                      )}
                      {topic.toLowerCase().includes('précis') && (
                        <>
                          <li>• Summarize the given passage in 1/3rd of its length</li>
                          <li>• Use your own words</li>
                          <li>• Maintain the essence of the original</li>
                        </>
                      )}
                    </ul>
                  </div>

                  {/* Writing Area */}
                  <div className="bg-[#F0EAD6] dark:bg-slate-900 rounded-xl p-6 border-2 border-[#5D4037]/10 dark:border-amber-500/20 shadow-lg">
                    <label className="block text-xs font-bold text-[#4A3728] dark:text-amber-500 mb-3 uppercase tracking-widest font-messiri">
                      Your Writing
                    </label>

                    {/* Formatting Toolbar */}
                    <div className="flex items-center gap-1 mb-3 p-2 bg-[#E6DEC8] dark:bg-slate-800 rounded-lg border border-[#D7Cea7] dark:border-slate-700">
                      <button
                        type="button"
                        onClick={() => {
                          const textarea = document.getElementById('writingArea') as HTMLTextAreaElement;
                          if (!textarea) return;
                          const start = textarea.selectionStart;
                          const end = textarea.selectionEnd;
                          const text = writingContent;
                          const selectedText = text.substring(start, end);
                          const newText = text.substring(0, start) + `**${selectedText}**` + text.substring(end);
                          setWritingContent(newText);
                        }}
                        disabled={writingSubmitted}
                        className="p-2 rounded hover:bg-[#D7Cea7] dark:hover:bg-slate-700 text-[#4A3728] dark:text-amber-500 transition-colors disabled:opacity-50"
                        title="Bold (wrap with **)"
                      >
                        <Bold size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const textarea = document.getElementById('writingArea') as HTMLTextAreaElement;
                          if (!textarea) return;
                          const start = textarea.selectionStart;
                          const end = textarea.selectionEnd;
                          const text = writingContent;
                          const selectedText = text.substring(start, end);
                          const newText = text.substring(0, start) + `_${selectedText}_` + text.substring(end);
                          setWritingContent(newText);
                        }}
                        disabled={writingSubmitted}
                        className="p-2 rounded hover:bg-[#D7Cea7] dark:hover:bg-slate-700 text-[#4A3728] dark:text-amber-500 transition-colors disabled:opacity-50"
                        title="Italic (wrap with _)"
                      >
                        <Italic size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const textarea = document.getElementById('writingArea') as HTMLTextAreaElement;
                          if (!textarea) return;
                          const start = textarea.selectionStart;
                          const text = writingContent;
                          const newText = text.substring(0, start) + `\n• ` + text.substring(start);
                          setWritingContent(newText);
                        }}
                        disabled={writingSubmitted}
                        className="p-2 rounded hover:bg-[#D7Cea7] dark:hover:bg-slate-700 text-[#4A3728] dark:text-amber-500 transition-colors disabled:opacity-50"
                        title="Add bullet point"
                      >
                        <List size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const textarea = document.getElementById('writingArea') as HTMLTextAreaElement;
                          if (!textarea) return;
                          const start = textarea.selectionStart;
                          const end = textarea.selectionEnd;
                          const text = writingContent;
                          const selectedText = text.substring(start, end);
                          const newText = text.substring(0, start) + `__${selectedText}__` + text.substring(end);
                          setWritingContent(newText);
                        }}
                        disabled={writingSubmitted}
                        className="p-2 rounded hover:bg-[#D7Cea7] dark:hover:bg-slate-700 text-[#4A3728] dark:text-amber-500 transition-colors disabled:opacity-50"
                        title="Underline (wrap with __)"
                      >
                        <Underline size={18} />
                      </button>
                      <div className="w-px h-6 bg-[#D7Cea7] dark:bg-slate-600 mx-1"></div>
                      <button
                        type="button"
                        onClick={() => setWritingContent('')}
                        disabled={writingSubmitted || !writingContent}
                        className="p-2 rounded hover:bg-red-100 dark:hover:bg-red-900/30 text-[#8D6E63] dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors disabled:opacity-50"
                        title="Clear all"
                      >
                        <Eraser size={18} />
                      </button>
                    </div>

                    <textarea
                      id="writingArea"
                      value={writingContent}
                      onChange={(e) => setWritingContent(e.target.value)}
                      placeholder={`Start writing your ${topic.toLowerCase()} here...`}
                      rows={10}
                      disabled={writingSubmitted}
                      className="w-full bg-[#E6DEC8] dark:bg-slate-800 border border-[#D7Cea7] dark:border-slate-700 text-[#2C1810] dark:text-slate-200 text-lg font-markazi rounded-lg focus:border-[#4A3728] dark:focus:border-amber-500 focus:ring-1 focus:ring-[#4A3728] dark:focus:ring-amber-500 p-4 transition-all placeholder-[#8D6E63] dark:placeholder-slate-500 outline-none resize-none disabled:opacity-60"
                    />
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-[#8D6E63] dark:text-slate-500 font-markazi">
                        Word count: {writingContent.trim().split(/\s+/).filter(w => w).length}
                      </span>
                      {!writingSubmitted ? (
                        <Button
                          onClick={async () => {
                            if (writingContent.trim().split(/\s+/).filter(w => w).length >= 10) {
                              setIsScoring(true);
                              setWritingSubmitted(true);
                              try {
                                const score = await scoreWriting(writingContent, topic);
                                setWritingScore(score);
                              } catch (e) {
                                console.error('Scoring failed:', e);
                              } finally {
                                setIsScoring(false);
                                setShowScoreModal(true);
                              }
                            }
                          }}
                          disabled={writingContent.trim().split(/\s+/).filter(w => w).length < 10}
                          isLoading={isScoring}
                        >
                          Submit & Get Score
                        </Button>
                      ) : (
                        <div className="flex items-center gap-3">
                          {writingScore && (
                            <>
                              <Button
                                variant="outline"
                                onClick={() => setShowScoreModal(true)}
                                icon={<Trophy size={16} />}
                              >
                                View Score
                              </Button>
                              <Button
                                variant="secondary"
                                onClick={handleScreenshot}
                                className="px-6 flex items-center justify-center"
                                title="Save Result"
                              >
                                <Camera size={24} />
                              </Button>
                            </>
                          )}
                          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-messiri font-bold">
                            <CheckCircle size={20} />
                            Done
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Scoring Loading State */}
                  {isScoring && (
                    <div className="mt-6 flex flex-col items-center justify-center py-10 animate-in fade-in">
                      <div className="w-12 h-12 border-4 border-[#4A3728]/20 dark:border-amber-500/20 border-t-[#4A3728] dark:border-t-amber-500 rounded-full animate-spin mb-4"></div>
                      <p className="text-[#4A3728] dark:text-amber-500 font-messiri">Analyzing your writing...</p>
                    </div>
                  )}

                  {/* Score Display Modal */}
                  {writingScore && showScoreModal && !isScoring && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
                      {/* Backdrop */}
                      <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowScoreModal(false)}
                      ></div>

                      {/* Modal Card - QuestionCard Style */}
                      <div className="relative bg-[#F0EAD6] dark:bg-slate-900 rounded-lg shadow-lg border-4 border-double border-[#5D4037]/40 dark:border-amber-500/60 max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 paper-torn group">

                        {/* Decorative Arch Header */}
                        <div className="h-2 bg-[#4A3728] dark:bg-amber-500 w-full transition-colors duration-500"></div>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#4A3728] dark:bg-amber-500 rounded-b-full flex items-center justify-center opacity-10 dark:opacity-20"></div>

                        {/* Stacked Paper Effect */}
                        <div className="absolute inset-0 bg-[#E6DEC8] dark:bg-slate-800 rounded-lg -z-10 rotate-1 scale-[0.99]"></div>

                        {/* Corner Ornaments */}
                        <div className="absolute top-4 left-4 text-[#8D6E63]/40 dark:text-amber-500/40 pointer-events-none">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <path d="M0 0 L10 0 L0 10 Z" />
                            <path d="M4 4 L14 4 L4 14 Z" opacity="0.5" />
                          </svg>
                        </div>
                        <div className="absolute top-4 right-4 text-[#8D6E63]/40 dark:text-amber-500/40 pointer-events-none transform rotate-90">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <path d="M0 0 L10 0 L0 10 Z" />
                            <path d="M4 4 L14 4 L4 14 Z" opacity="0.5" />
                          </svg>
                        </div>



                        <div className="p-8 relative z-10 overflow-y-auto">
                          {/* Header with Trophy */}
                          <div className="flex justify-between items-center mb-6 border-b border-[#5D4037]/10 dark:border-amber-500/30 pb-4">
                            <h3 className="text-xl font-messiri text-[#4A3728] dark:text-amber-400 tracking-wide flex items-center gap-4">
                              {/* Score Badge */}
                              <div className="relative w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#4A3728] dark:border-amber-500 shadow-sm bg-[#E6DEC8] dark:bg-slate-950">
                                <Trophy size={24} className="text-[#4A3728] dark:text-amber-500" />
                              </div>
                              Writing Score
                            </h3>
                            <div className={`flex items-center px-4 py-1.5 rounded-full border text-sm font-bold shadow-sm ${writingScore.score >= 70
                              ? 'bg-[#F0FDF4] dark:bg-teal-900/50 text-[#15803D] dark:text-teal-300 border-[#15803D]/20 dark:border-teal-500/50'
                              : 'bg-[#FEF2F2] dark:bg-red-900/50 text-[#B91C1C] dark:text-red-300 border-[#B91C1C]/20 dark:border-red-500/50'
                              }`}>
                              <CheckCircle size={16} className="mr-2" /> Grade: {writingScore.grade}
                            </div>
                          </div>

                          {/* Big Score Display */}
                          <div className="text-center mb-8">
                            <div className="text-7xl font-bold font-messiri text-[#4A3728] dark:text-amber-500 mb-2">{writingScore.score}%</div>
                            <p className="text-lg text-[#5D4037] dark:text-slate-300 font-markazi">{writingScore.overallComment}</p>
                          </div>

                          {/* Detailed Feedback Grid */}
                          <div className="grid grid-cols-2 gap-3 mb-6">
                            {Object.entries(writingScore.feedback).map(([key, value]: [string, { score: number; comment: string }]) => (
                              <div key={key} className="bg-[#FDFBF7] dark:bg-slate-800 border border-[#D7Cea7] dark:border-slate-600 rounded-md p-3 transition-all hover:shadow-md">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-messiri font-bold text-sm text-[#4A3728] dark:text-amber-500 capitalize">{key}</span>
                                  <span className="text-base font-bold text-[#2C1810] dark:text-slate-100">{value.score}%</span>
                                </div>
                                <div className="w-full bg-[#D7Cea7] dark:bg-slate-700 rounded-full h-2 mb-1.5">
                                  <div
                                    className={`h-2 rounded-full transition-all duration-500 ${value.score >= 70 ? 'bg-[#15803D] dark:bg-teal-500' : 'bg-[#B91C1C] dark:bg-red-500'
                                      }`}
                                    style={{ width: `${value.score}%` }}
                                  ></div>
                                </div>
                                <p className="text-xs text-[#5D4037] dark:text-slate-400 font-markazi">{value.comment}</p>
                              </div>
                            ))}
                          </div>

                          {/* Suggestions - styled like explanation */}
                          <div className="p-4 bg-[#E6DEC8]/50 dark:bg-slate-800 rounded-r-md border-l-4 border-[#8D6E63] dark:border-amber-500 mb-6">
                            <h4 className="font-messiri font-bold text-sm text-[#5D4037] dark:text-amber-400 mb-2">💡 Suggestions for Improvement</h4>
                            <ul className="space-y-1">
                              {writingScore.suggestions.map((suggestion, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-[#4A3728] dark:text-slate-200 font-markazi">
                                  <span className="text-[#8D6E63] dark:text-amber-500">•</span>
                                  {suggestion}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3 justify-center pt-4 border-t border-dashed border-[#5D4037]/20 dark:border-amber-500/30">
                            <Button
                              variant="outline"
                              onClick={() => {
                                const topicInfo = getTopicInfo(topic);
                                if (topicInfo?.videoUrl) {
                                  window.open(topicInfo.videoUrl, '_blank');
                                }
                              }}
                              icon={<PlayCircle size={16} />}
                            >
                              Tutorial
                            </Button>
                            <Button
                              variant="secondary"
                              onClick={handleScreenshot}
                              className="px-6 flex items-center justify-center"
                              title="Save Result"
                            >
                              <Camera size={24} />
                            </Button>
                            <Button onClick={() => setShowScoreModal(false)}>
                              Close
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {quizSession && (
                <div className="animate-in slide-in-from-bottom-4 duration-700">
                  <div className="flex items-end justify-between mb-10 pb-4 border-b border-[#5D4037]/20 dark:border-amber-500/20 transition-colors duration-500">
                    <div>
                      <h2 className="text-3xl font-messiri text-[#2C1810] dark:text-slate-100 transition-colors duration-500">{quizSession.title}</h2>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="font-messiri font-bold text-[#4A3728] dark:text-slate-900 bg-[#E6DEC8] dark:bg-amber-500 px-3 py-1 rounded-full text-xs tracking-wider border border-[#5D4037]/20 dark:border-amber-500/20 transition-colors duration-500 dark:shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                          {quizSession.difficulty}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={handleGenerate}
                      icon={<RefreshCw size={16} />}
                      className="hidden sm:flex"
                    >
                      Restart
                    </Button>
                  </div>

                  {/* Questions List */}
                  <div className="space-y-8">
                    {quizSession.questions.map((q) => (
                      <QuestionCard
                        key={q.id}
                        question={q}
                        onAnswer={handleAnswer}
                        savedAnswer={userAnswers[q.id]}
                      />
                    ))}
                  </div>

                  {/* Inline Result Section */}
                  {isQuizComplete && (
                    <div
                      ref={inlineResultRef}
                      className="mt-16 mb-8 relative paper-torn bg-[#F0EAD6] dark:bg-slate-900 border-2 border-[#D97706]/30 dark:border-amber-500/60 p-8 md:p-12 text-center animate-in slide-in-from-bottom-8 duration-700 shadow-xl dark:shadow-[0_0_25px_rgba(245,158,11,0.15)]"
                    >
                      {/* Decorative Elements */}
                      <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-[#D97706]/10 to-transparent rounded-br-full pointer-events-none"></div>
                      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-[#D97706]/10 to-transparent rounded-tl-full pointer-events-none"></div>

                      <div className="relative z-10">
                        <h3 className="text-2xl font-messiri font-bold text-[#4A3728] dark:text-amber-500 mb-2 uppercase tracking-widest">Practice Complete</h3>
                        <h2 className="text-5xl font-bold font-markazi text-[#2C1810] dark:text-slate-100 mb-4">{calculateScore()}% Score</h2>
                        <p className="text-xl text-[#8D6E63] dark:text-amber-400 italic font-medium mb-8">"{getResultMessage(calculateScore())}"</p>

                        <div className="flex justify-center gap-8 mb-8 text-lg font-markazi">
                          <div className="flex items-center gap-2 text-[#15803D] dark:text-teal-400">
                            <CheckCircle size={20} />
                            <span>{getCorrectCount()} Correct</span>
                          </div>
                          <div className="flex items-center gap-2 text-[#B91C1C] dark:text-red-400">
                            <XCircle size={20} />
                            <span>{quizSession.questions.length - getCorrectCount()} Incorrect</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-8 flex flex-col sm:flex-row justify-center gap-6 pb-12 pt-10 border-t border-[#D7Cea7] dark:border-slate-800">
                    {isQuizComplete && (
                      <>
                        <Button
                          variant="secondary"
                          onClick={() => setShowResultModal(true)}
                          icon={<Trophy size={18} />}
                          className="w-full sm:w-auto"
                        >
                          View Certificate
                        </Button>
                        <Button
                          variant="primary"
                          onClick={handleGenerate}
                          icon={<RefreshCw size={18} />}
                          className="w-full sm:w-auto"
                        >
                          New Session
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* Full Screen Result Modal - Royal Decree Style */}
      {showResultModal && quizSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#4A3728]/90 dark:bg-slate-950/90 backdrop-blur-md transition-all duration-500"
            onClick={() => setShowResultModal(false)}
          ></div>

          <div className="relative bg-[#F0EAD6] dark:bg-slate-900 w-full max-w-lg shadow-2xl dark:shadow-[0_0_50px_rgba(245,158,11,0.4)] rounded-2xl overflow-hidden transform transition-all border-4 border-[#D97706] dark:border-amber-500 animate-in zoom-in-95 duration-300">

            {/* Decorative Corners */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-[8px] border-l-[8px] border-[#D97706] dark:border-amber-500 rounded-tl-xl opacity-20"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-[8px] border-r-[8px] border-[#D97706] dark:border-amber-500 rounded-tr-xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-[8px] border-l-[8px] border-[#D97706] dark:border-amber-500 rounded-bl-xl opacity-20"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-[8px] border-r-[8px] border-[#D97706] dark:border-amber-500 rounded-br-xl opacity-20"></div>

            {/* Close Button (Right) */}
            <button
              onClick={() => setShowResultModal(false)}
              className="absolute top-4 right-4 text-[#8D6E63] dark:text-slate-500 hover:text-[#4A3728] dark:hover:text-amber-500 transition-all z-20"
            >
              <X size={24} />
            </button>

            <div className="p-10 text-center relative font-messiri">
              <div className="mb-6 inline-flex items-center justify-center w-24 h-24 bg-[#E6DEC8] dark:bg-slate-800 rounded-full border-4 border-[#D97706] dark:border-amber-500 shadow-lg dark:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-colors duration-500">
                <Trophy size={48} className="text-[#D97706] dark:text-amber-500 dark:drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]" />
              </div>

              <h2 className="text-6xl font-bold text-[#4A3728] dark:text-amber-500 mb-2 tracking-tighter transition-colors duration-500 dark:drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                {calculateScore()}%
              </h2>

              <p className="text-xl text-[#8D6E63] dark:text-amber-400 font-markazi font-bold mb-8 italic transition-colors duration-500">
                "{getResultMessage(calculateScore())}"
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-px bg-[#D97706]/20 dark:bg-amber-600/30 rounded-lg overflow-hidden border border-[#D97706]/20 dark:border-amber-600/30 mb-8 transition-colors duration-500">
                <div className="p-4 bg-white dark:bg-slate-800 flex flex-col items-center transition-colors duration-500">
                  <p className="text-[10px] uppercase tracking-widest text-[#8D6E63] dark:text-slate-400 mb-1 font-bold">Streak</p>
                  <div className="flex items-center gap-1">
                    <Flame size={16} className={streak > 0 ? "fill-[#D97706] text-[#D97706] dark:text-amber-500 dark:drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" : "text-[#D7Cea7] dark:text-slate-600"} />
                    <p className="text-2xl font-bold text-[#2C1810] dark:text-slate-200">{streak}</p>
                  </div>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 flex flex-col items-center transition-colors duration-500">
                  <p className="text-[10px] uppercase tracking-widest text-[#8D6E63] dark:text-slate-400 mb-1 font-bold">Score</p>
                  <p className="text-2xl font-bold text-[#2C1810] dark:text-slate-200">
                    {getCorrectCount()} <span className="text-base text-[#D7Cea7] dark:text-slate-500 font-normal">/ {quizSession.questions.length}</span>
                  </p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 flex flex-col items-center transition-colors duration-500">
                  <p className="text-[10px] uppercase tracking-widest text-[#8D6E63] dark:text-slate-400 mb-1 font-bold">Total</p>
                  <p className="text-2xl font-bold text-[#2C1810] dark:text-slate-200">
                    {cumulativeStats.correct}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {/* Action Buttons Row */}
                <div className="flex gap-3">
                  <Button
                    variant="primary"
                    onClick={handleGenerate}
                    className="flex-1 justify-center py-4 text-lg"
                  >
                    Continue Journey
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleScreenshot}
                    className="px-6 flex items-center justify-center"
                    title="Save Certificate"
                  >
                    <Camera size={24} />
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  onClick={() => setShowResultModal(false)}
                  className="w-full justify-center text-[#4A3728] dark:text-amber-500"
                >
                  Review Answers
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal - Overlay Style */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop - No onClick for closing */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg shadow-2xl overflow-hidden border-2 border-[#5D4037] dark:border-amber-500 box-content animate-in zoom-in-95 duration-300 group">
            {/* Close Button - Overlay Top Right */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-red-600 text-white rounded-full transition-all duration-300 backdrop-blur-md border border-white/20 group-hover:scale-110"
              title="Close Video"
            >
              <X size={24} className="transition-transform duration-300 group-hover:rotate-90" />
            </button>

            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;