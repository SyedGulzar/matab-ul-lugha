import React, { useState, useRef, useEffect } from 'react';
import { DIFFICULTY_LEVELS, TOPIC_CATEGORIES, TopicItem, getUserInfo, isAdmin, USERS } from './constants';
import { generateGrammarPractice, scoreWriting, WritingScore } from './services/geminiService';
import { ESSAY_TOPICS, APPLICATION_TEMPLATES, COMPREHENSION_PASSAGES } from './data/offlineQuestionBank';
import type { EssayTopic } from './data/questions/writing/essays';
import type { ApplicationTemplate } from './data/questions/writing/applications';
import type { ComprehensionPassage } from './data/questions/writing/comprehension';
import { QuizSession, UserAnswers } from './types';
import { QuestionCard } from './components/QuestionCard';
import { Button } from './components/Button';
import { Login } from './components/Login';
import { LogoutButton } from './components/LogoutButton';
import { QuestionBankManager } from './components/QuestionBankManager';
import { BookOpen, GraduationCap, RefreshCw, Trophy, ChevronDown, X, Flame, Search, Moon, Sun, Camera, CheckCircle, XCircle, Library, PenTool, PlayCircle, Bold, Italic, List, Underline, Eraser, Circle, Settings, Save, RotateCcw, CheckSquare, Square, Database, Users, Shield, DoorOpen, Loader } from 'lucide-react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

const App: React.FC = () => {
  // User State
  const [username, setUsername] = useState<string | null>(() => {
    return localStorage.getItem('grammarAppUsername');
  });

  // Splash Screen State
  const [showSplash, setShowSplash] = useState(false);
  const [splashFading, setSplashFading] = useState(false);

  const handleLogin = (user: string) => {
    localStorage.setItem('grammarAppUsername', user);
    setUsername(user);

    // Show splash screen for regular users (not admins)
    if (!isAdmin(user)) {
      setShowSplash(true);
      // Start fade out after 2 seconds
      setTimeout(() => {
        setSplashFading(true);
        // Remove splash after fade completes
        setTimeout(() => {
          setShowSplash(false);
          setSplashFading(false);
        }, 500);
      }, 2000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('grammarAppUsername');
    setUsername(null);
  };

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

  // Question Bank Manager State
  const [showQuestionBankManager, setShowQuestionBankManager] = useState(false);

  // User Directory State (Admin Only)
  const [showUserDirectory, setShowUserDirectory] = useState(false);

  // Logout Confirmation State
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

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

  // Screenshot State
  const [isCapturing, setIsCapturing] = useState(false);

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
    if (isCapturing) return;
    setIsCapturing(true);

    // Allow UI to update to show loading state
    setTimeout(async () => {
      try {
        const canvas = await html2canvas(document.body, {
          useCORS: true,
          backgroundColor: isDarkMode ? '#020617' : '#E6DEC8',
          scale: window.innerWidth < 768 ? 1 : 1.5,
          ignoreElements: (element) => {
            return element.classList.contains('rope-element');
          }
        });

        // Format: Username_YYYY-MM-DD.png
        const now = new Date();
        const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        const filename = `${username || 'Screenshot'}_${dateStr}.png`;

        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();

            // Cleanup after download starts
            setTimeout(() => {
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
            }, 100);
          }
          setIsCapturing(false);
        }, 'image/png');
      } catch (error) {
        console.error("Screenshot failed:", error);
        setIsCapturing(false);
      }
    }, 100);
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

  // Topic Selection (Personalization) State
  const [myTopics, setMyTopics] = useState<string[]>(() => {
    const saved = localStorage.getItem('myTopics');
    return saved ? JSON.parse(saved) : [];
  });
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [tempSelectedTopics, setTempSelectedTopics] = useState<string[]>([]);

  const toggleTopicSelection = (topicName: string) => {
    setTempSelectedTopics(prev =>
      prev.includes(topicName)
        ? prev.filter(t => t !== topicName)
        : [...prev, topicName]
    );
  };

  const enterSelectionMode = () => {
    setTempSelectedTopics(myTopics);
    setIsSelectionMode(true);
  };

  const saveSelectedTopics = () => {
    setMyTopics(tempSelectedTopics);
    localStorage.setItem('myTopics', JSON.stringify(tempSelectedTopics));
    setIsSelectionMode(false);
  };

  const cancelSelectionMode = () => {
    setIsSelectionMode(false);
  };

  const resetTopicSelection = () => {
    setMyTopics([]);
    localStorage.setItem('myTopics', JSON.stringify([]));
  };
  const [writingContent, setWritingContent] = useState('');
  const [writingSubmitted, setWritingSubmitted] = useState(false);
  const [writingScore, setWritingScore] = useState<WritingScore | null>(null);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [isScoring, setIsScoring] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(5);

  // Random writing topic/passage state
  const [currentEssayTopic, setCurrentEssayTopic] = useState<EssayTopic | null>(null);
  const [currentApplication, setCurrentApplication] = useState<ApplicationTemplate | null>(null);
  const [currentComprehension, setCurrentComprehension] = useState<ComprehensionPassage | null>(null);
  const [comprehensionAnswers, setComprehensionAnswers] = useState<Record<number, string>>({});
  const [showSampleApplication, setShowSampleApplication] = useState(false);

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

    // Reset all writing-related state
    setCurrentEssayTopic(null);
    setCurrentApplication(null);
    setCurrentComprehension(null);
    setComprehensionAnswers({});
    setShowSampleApplication(false);

    if (topicInfo?.type === 'writing') {
      setIsWritingMode(true);

      // Select random topic based on writing type
      if (topic.toLowerCase().includes('essay')) {
        const randomIndex = Math.floor(Math.random() * ESSAY_TOPICS.length);
        setCurrentEssayTopic(ESSAY_TOPICS[randomIndex]);
      } else if (topic.toLowerCase().includes('application')) {
        const randomIndex = Math.floor(Math.random() * APPLICATION_TEMPLATES.length);
        setCurrentApplication(APPLICATION_TEMPLATES[randomIndex]);
      }

      setIsLoading(false);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    // Check if this is comprehension topic
    if (topic.toLowerCase().includes('comprehension')) {
      const randomIndex = Math.floor(Math.random() * COMPREHENSION_PASSAGES.length);
      setCurrentComprehension(COMPREHENSION_PASSAGES[randomIndex]);
      setIsWritingMode(false);
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
    const activeCategories = { ...TOPIC_CATEGORIES };

    // 1. Filter by Search Query
    if (topic.trim()) {
      Object.keys(activeCategories).forEach(category => {
        activeCategories[category] = activeCategories[category].filter(item =>
          item.name.toLowerCase().includes(topic.toLowerCase())
        );
        if (activeCategories[category].length === 0) {
          delete activeCategories[category];
        }
      });
      return activeCategories;
    }

    // 2. Filter by "My Topics" (if enabled and not in selection mode)
    // We want to show EVERYTHING in selection mode so the user can choose
    // But in normal mode, we only show what they selected
    if (myTopics.length > 0 && !isSelectionMode && currentView !== 'learning') {
      // Logic for Practice Studio dropdown - strict filtering
      Object.keys(activeCategories).forEach(category => {
        activeCategories[category] = activeCategories[category].filter(item =>
          myTopics.includes(item.name)
        );
        if (activeCategories[category].length === 0) {
          delete activeCategories[category];
        }
      });
    }

    return activeCategories;
  };

  // Helper to get visible categories for Learning Arena specifically
  // This needs slightly different logic to handle the "Selection Mode" visual state
  const getLearningArenaCategories = () => {
    if (isSelectionMode) {
      return TOPIC_CATEGORIES; // Show everything so user can toggle
    }

    if (myTopics.length === 0) {
      return TOPIC_CATEGORIES; // Show everything if no preference set
    }

    const filtered: Record<string, TopicItem[]> = {};
    Object.entries(TOPIC_CATEGORIES).forEach(([category, items]) => {
      const matchingItems = items.filter(item => myTopics.includes(item.name));
      if (matchingItems.length > 0) {
        filtered[category] = matchingItems;
      }
    });
    return filtered;
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

  // Helper for topic selection style
  const componentSelectionStyle = (isSelected: boolean) => {
    if (isSelected) {
      return 'bg-[#4A3728]/10 dark:bg-amber-500/20 border-2 border-[#4A3728] dark:border-amber-500 text-[#4A3728] dark:text-amber-500 font-bold shadow-md transform scale-[1.02]';
    }
    return 'bg-[#F0EAD6] dark:bg-slate-800 border-2 border-dashed border-[#8D6E63]/30 dark:border-slate-600 text-[#8D6E63] dark:text-gray-400 hover:border-[#4A3728]/50 dark:hover:border-amber-500/50 hover:bg-[#4A3728]/5 dark:hover:bg-amber-500/5';
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

  if (!username) {
    return <Login onLogin={handleLogin} />;
  }

  // Splash Screen for regular users
  if (showSplash) {
    return (
      <div className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-gradient-to-br from-[#E6DEC8] via-[#F0EAD6] to-[#D7Cea7] dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-opacity duration-500 ${splashFading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50 0L100 50L50 100L0 50Z' fill='none' stroke='%234A3728' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Arabic Salam Greeting - Main Focus */}
        <div className="text-center animate-fade-in-up">
          <h1 className="text-6xl sm:text-8xl font-messiri font-bold text-[#2C1810] dark:text-amber-500 mb-2 drop-shadow-lg" style={{ fontFamily: "'Amiri', 'Noto Naskh Arabic', serif" }}>
            السَّلَامُ عَلَيْكُمْ
          </h1>
          <p className="text-xl sm:text-2xl font-markazi text-[#5D4037] dark:text-slate-400 tracking-wide">
            Peace Be Upon You
          </p>
        </div>

        {/* Decorative Divider */}
        <div className="mt-10 mb-6 flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent to-[#4A3728] dark:to-amber-500"></div>
          <div className="w-3 h-3 rotate-45 bg-[#4A3728] dark:bg-amber-500"></div>
          <div className="w-16 h-[2px] bg-gradient-to-l from-transparent to-[#4A3728] dark:to-amber-500"></div>
        </div>

        {/* Welcome with Name - Elegant Card */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="relative px-12 py-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl border-2 border-[#5D4037]/20 dark:border-amber-500/30 shadow-xl">
            {/* Corner Decorations */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#4A3728] dark:border-amber-500 rounded-tl-lg"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#4A3728] dark:border-amber-500 rounded-tr-lg"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#4A3728] dark:border-amber-500 rounded-bl-lg"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#4A3728] dark:border-amber-500 rounded-br-lg"></div>

            <p className="text-sm font-markazi text-[#8D6E63] dark:text-slate-400 uppercase tracking-[0.3em] mb-2">Welcome</p>
            <h2 className="text-3xl sm:text-4xl font-messiri font-bold text-[#2C1810] dark:text-slate-100">
              {username}
            </h2>
            <p className="text-sm font-markazi text-[#5D4037] dark:text-amber-500 mt-2 italic">to The School of Language</p>
          </div>
        </div>

        {/* Logo Badge */}
        <div className="mt-10 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="flex items-center gap-3 px-5 py-2 bg-[#4A3728] dark:bg-amber-500 rounded-full shadow-lg">
            <BookOpen size={20} className="text-[#E6DEC8] dark:text-slate-900" />
            <span className="text-sm font-messiri font-bold text-[#E6DEC8] dark:text-slate-900 tracking-wide">Maktab-ul-Lugha</span>
          </div>
        </div>

        {/* Loading Indicator */}
        <div className="mt-8 flex gap-2 animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <div className="w-2 h-2 bg-[#4A3728] dark:bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-[#4A3728] dark:bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-[#4A3728] dark:bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>

        {/* Custom Animations */}
        <style>{`
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes spin-slow {
            from { transform: rotate(45deg); }
            to { transform: rotate(405deg); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.6s ease-out forwards;
            opacity: 0;
          }
          .animate-bounce-slow {
            animation: bounce-slow 2s ease-in-out infinite;
          }
          .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 sm:pb-20 selection:bg-[#8D6E63] dark:selection:bg-amber-900 selection:text-[#F0EAD6] dark:selection:text-amber-400">

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

        {/* Question Bank Manager Button - Admin Only */}
        {username && isAdmin(username) && (
          <SidebarButton
            icon={Database}
            label="Question Bank"
            isActive={showQuestionBankManager}
            onClick={() => setShowQuestionBankManager(true)}
          />
        )}

        {/* User Directory Button - Admin Only */}
        {username && isAdmin(username) && (
          <SidebarButton
            icon={Users}
            label="All Users"
            isActive={showUserDirectory}
            onClick={() => setShowUserDirectory(true)}
          />
        )}

      </div>
      {/* ---------------------------------- */}


      {/* --- LAMP PULL ROPE TOGGLE --- */}
      {/* Outer container handles vertical translation (The Pull) */}
      <div
        onClick={toggleTheme}
        className={`fixed top-0 right-4 sm:right-8 lg:right-12 z-[39] cursor-pointer group select-none transition-transform ${getRopeOuterClass()}`}
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
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#4A3728] dark:bg-amber-500 text-[#E6DEC8] dark:text-slate-900 rounded-lg shadow-lg relative overflow-hidden group transition-all duration-300 hover:scale-110 shadow-[0_0_15px_rgba(74,55,40,0.5)] dark:shadow-[0_0_20px_rgba(245,158,11,0.5)]">
              <div className="absolute inset-0 bg-[#2C1810] dark:bg-amber-600 transform rotate-45 scale-50 opacity-20 group-hover:rotate-90 transition-transform duration-700"></div>
              <BookOpen size={20} className="sm:hidden relative z-10" />
              <BookOpen size={24} className="hidden sm:block relative z-10" />
            </div>

            {/* Interactive Title Container - Characters move independently */}
            <div
              className="p-2"
              onMouseEnter={handleTitleMouseEnter}
              onMouseMove={handleTitleMouseMove}
              onMouseLeave={handleTitleMouseLeave}
            >
              <div>
                <h1 className="text-xl sm:text-3xl font-messiri leading-none flex gap-0.5 sm:gap-1.5 items-baseline">
                  <span className="flex">
                    {"Maktab".split('').map((char, i) =>
                      renderInteractiveChar(char, i, "text-[#2C1810] dark:text-slate-100 transition-colors duration-500")
                    )}
                  </span>
                  <span className="hidden sm:flex mx-0.5">
                    {"-ul-".split('').map((char, i) =>
                      renderInteractiveChar(char, i + 6, "text-[#5D4037] dark:text-slate-400 text-2xl transition-colors duration-500")
                    )}
                  </span>
                  <span className="sm:hidden text-[#5D4037] dark:text-slate-400 text-lg">-</span>
                  <span className="flex">
                    {"Lugha".split('').map((char, i) =>
                      renderInteractiveChar(char, i + 10, "text-[#4A3728] dark:text-amber-500 transition-colors duration-500")
                    )}
                  </span>
                </h1>
                <p className="hidden sm:block text-xs text-[#8D6E63] dark:text-slate-400 font-markazi font-bold mt-1 tracking-widest uppercase transition-colors duration-500">
                  The School of Language
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mr-10 sm:mr-16">
            {/* Added Margin Right to account for the Rope */}

            {/* Mobile Streak Display */}
            {username && (
              <div className="sm:hidden flex items-center gap-2">
                <div className="flex items-center gap-1 px-2 py-1 bg-[#F0EAD6]/80 dark:bg-slate-800/80 rounded-full border border-[#D7Cea7] dark:border-slate-600 shadow-sm backdrop-blur-sm">
                  <Flame size={14} className={`${streak > 0 ? "fill-[#D97706] text-[#D97706] animate-pulse" : "text-[#D7Cea7] dark:text-slate-500"}`} />
                  <span className={`text-sm font-bold font-messiri ${streak > 0 ? "text-[#D97706] dark:text-amber-500" : "text-[#8D6E63] dark:text-slate-500"}`}>{streak}</span>
                </div>

                {/* Mobile Screenshot Button */}
                <button
                  onClick={handleScreenshot}
                  disabled={isCapturing}
                  className={`w-8 h-8 flex items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm active:scale-95 transition-transform ${isCapturing ? 'opacity-50' : ''}`}
                  title="Take Screenshot"
                >
                  {isCapturing ? <Loader size={14} className="animate-spin" /> : <Camera size={14} />}
                </button>
              </div>
            )}

            {/* User Display Name */}
            {username && (
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[10px] uppercase tracking-widest text-[#8D6E63] dark:text-slate-500 font-bold">Welcome</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-messiri font-bold text-[#4A3728] dark:text-amber-500">
                    {getUserInfo(username)?.displayName || username}
                  </span>
                  {isAdmin(username) && (
                    <span className="text-[9px] px-1.5 py-0.5 bg-[#4A3728] dark:bg-amber-500 text-[#F0EAD6] dark:text-slate-900 rounded font-bold uppercase tracking-wider">Admin</span>
                  )}
                </div>
              </div>
            )}

            {/* Stats Display */}
            <div className="hidden sm:flex flex-row items-center gap-4 font-messiri border-l border-[#D7Cea7] dark:border-slate-700 pl-6 ml-2">
              {/* Streak */}
              <div className="flex flex-col items-center group cursor-default">
                <span className="text-[10px] uppercase tracking-widest text-[#8D6E63] dark:text-slate-500 mb-1 font-bold">Streak</span>
                <div className="flex items-center gap-2 px-3 py-1 bg-[#F0EAD6] dark:bg-slate-800 rounded-full border border-[#D7Cea7] dark:border-slate-600 group-hover:border-[#D97706]/30 dark:group-hover:border-amber-500/30 transition-all dark:shadow-[0_0_10px_rgba(0,0,0,0.3)] group-hover:shadow-[0_0_10px_rgba(217,119,6,0.1)]">
                  <Flame size={16} className={`${streak > 0 ? "fill-[#D97706] text-[#D97706] animate-pulse drop-shadow-[0_0_8px_rgba(217,119,6,0.8)]" : "text-[#D7Cea7] dark:text-slate-500"}`} />
                  <span className={`text-lg font-bold ${streak > 0 ? "text-[#D97706] dark:text-amber-500" : "text-[#8D6E63] dark:text-slate-500"}`}>{streak}</span>
                </div>
              </div>

              {/* Screenshot Button */}
              <div className="flex flex-col items-center group cursor-pointer">
                <span className="text-[10px] uppercase tracking-widest text-[#8D6E63] dark:text-slate-500 mb-1 font-bold">Screenshot</span>
                <button
                  onClick={handleScreenshot}
                  disabled={isCapturing}
                  className={`w-9 h-9 flex items-center justify-center rounded-full bg-emerald-500 dark:bg-emerald-600 border border-emerald-600 dark:border-emerald-500 text-white hover:bg-emerald-600 dark:hover:bg-emerald-500 transition-all duration-300 group-hover:scale-110 shadow-sm group-hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] ${isCapturing ? 'opacity-50 cursor-not-allowed scale-90' : ''}`}
                  title="Take Screenshot"
                >
                  {isCapturing ? <Loader size={18} className="animate-spin" /> : <Camera size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* VIEW: LEARNING AREA (Topics Grid) */}
        {currentView === 'learning' && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center mb-12 relative">
              <h2 className="text-4xl font-messiri text-[#2C1810] dark:text-amber-500 mb-4 transition-colors">The Archives of Knowledge</h2>
              <p className="text-xl font-markazi text-[#5D4037] dark:text-slate-300 italic">
                {isSelectionMode
                  ? "Select the topics you want to see in your curriculum."
                  : "Select a topic to begin your journey to eloquence."}
              </p>

              {/* Topic Selection Controls */}
              <div className="flex justify-center gap-4 mt-6">
                {!isSelectionMode ? (
                  <div className="flex gap-2">
                    <button
                      onClick={enterSelectionMode}
                      className="flex items-center gap-2 px-4 py-2 bg-[#F0EAD6] dark:bg-slate-800 border border-[#5D4037] dark:border-amber-500 rounded-lg text-[#4A3728] dark:text-amber-500 hover:bg-[#E6DEC8] dark:hover:bg-slate-700 transition-colors shadow-sm"
                    >
                      <Settings size={18} />
                      <span className="font-messiri font-bold">Customize Topics</span>
                    </button>

                    {myTopics.length > 0 && (
                      <button
                        onClick={resetTopicSelection}
                        className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors shadow-sm"
                      >
                        <RotateCcw size={18} />
                        <span className="font-messiri font-bold">Show All</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex gap-2 animate-in zoom-in duration-300">
                    <button
                      onClick={saveSelectedTopics}
                      className="flex items-center gap-2 px-6 py-2 bg-[#4A3728] dark:bg-amber-600 border border-[#2C1810] dark:border-amber-400 rounded-lg text-[#F0EAD6] dark:text-white hover:bg-[#2C1810] dark:hover:bg-amber-700 transition-colors shadow-lg scale-105"
                    >
                      <Save size={18} />
                      <span className="font-messiri font-bold">Save Selection ({tempSelectedTopics.length})</span>
                    </button>
                    <button
                      onClick={cancelSelectionMode}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
                    >
                      <X size={18} />
                      <span className="font-messiri font-bold">Cancel</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${isSelectionMode ? 'border-4 border-dashed border-[#4A3728]/20 dark:border-amber-500/30 p-4 rounded-2xl' : ''}`}>
              {Object.entries(getLearningArenaCategories()).map(([category, items]) => (
                <div key={category} className={`bg-[#F0EAD6] dark:bg-slate-900 rounded-xl overflow-hidden border-2 border-[#5D4037]/10 dark:border-amber-500/20 shadow-lg dark:shadow-[0_0_15px_rgba(0,0,0,0.2)] paper-torn group transition-all duration-300 ${!isSelectionMode ? 'hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]' : ''}`}>
                  <div className="bg-[#E6DEC8] dark:bg-slate-800/80 p-4 border-b border-[#5D4037]/10 dark:border-amber-500/10 flex items-center justify-between">
                    <h3 className="font-messiri font-bold text-xl text-[#4A3728] dark:text-amber-500 uppercase tracking-widest">{category}</h3>
                    <RubElHizbIcon size={20} className="text-[#5D4037]/40 dark:text-amber-500/40" />
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      {items.map(t => {
                        const isSelectedInMode = tempSelectedTopics.includes(t.name);
                        return (
                          <li key={t.name}>
                            <button
                              onClick={() => {
                                if (isSelectionMode) {
                                  toggleTopicSelection(t.name);
                                } else {
                                  handleLibraryTopicClick(t.name);
                                }
                              }}
                              className={`w-full text-left font-markazi text-lg flex items-center gap-2 group/item transition-all p-2 rounded-lg
                              ${isSelectionMode
                                  ? componentSelectionStyle(isSelectedInMode)
                                  : 'text-[#5D4037] dark:text-slate-300 hover:text-[#4A3728] dark:hover:text-amber-400 hover:bg-[#5D4037]/5 dark:hover:bg-white/5'
                                }`}
                            >
                              {isSelectionMode ? (
                                <div className={`transition-transform duration-300 ${isSelectedInMode ? 'scale-110' : 'scale-100 opacity-50'}`}>
                                  {isSelectedInMode
                                    ? <CheckSquare size={24} className="text-[#4A3728] dark:text-amber-500 fill-[#F0EAD6] dark:fill-slate-900" />
                                    : <Square size={24} className="text-[#8D6E63] dark:text-slate-500" />
                                  }
                                </div>
                              ) : (
                                <span className="w-1.5 h-1.5 rounded-full bg-[#5D4037]/40 dark:bg-amber-500/40 group-hover/item:bg-[#4A3728] dark:group-hover/item:bg-amber-500 transition-colors"></span>
                              )}

                              <span className="flex-1 font-bold">{t.name}</span>

                              {!isSelectionMode && (
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-messiri font-bold text-[#8D6E63] dark:text-gray-500 border border-[#5D4037]/10 dark:border-amber-500/10 px-2 py-0.5 rounded-md bg-[#5D4037]/5 dark:bg-amber-500/5 group-hover/item:border-[#4A3728]/30 dark:group-hover/item:border-amber-500/30 transition-colors">
                                    {t.time}
                                  </span>

                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleTopicCompletion(t.name);
                                    }}
                                    title={completedTopics.includes(t.name) ? "Mark as incomplete" : "Mark as complete"}
                                    className="mr-3 p-1 rounded-full transition-colors hover:bg-[#5D4037]/5 dark:hover:bg-white/5 text-[#8D6E63]/40 dark:text-slate-600"
                                  >
                                    {completedTopics.includes(t.name) ? (
                                      <CheckCircle size={20} className="text-green-600 dark:text-green-500" />
                                    ) : (
                                      <Circle size={20} strokeWidth={1.5} className="hover:stroke-[#4A3728] dark:hover:stroke-amber-500 transition-colors" />
                                    )}
                                  </button>

                                  <div
                                    role="button"
                                    title={`Watch video about ${t.name}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Extract Video ID if valid YouTube URL
                                      const videoID = t.videoUrl ? (t.videoUrl.match(/v=([^&]+)/)?.[1] || null) : null;

                                      if (videoID) {
                                        setSelectedVideo(videoID);
                                      } else {
                                        // Fallback for search query or invalid URL
                                        const url = t.videoUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent('Sir Nasim Zulfiqar ' + t.name)}`;
                                        window.open(url, '_blank');
                                      }
                                    }}
                                    className="p-1 rounded-full text-[#8D6E63] dark:text-gray-400 hover:text-[#D97706] dark:hover:text-amber-500 hover:bg-[#5D4037]/10 dark:hover:bg-amber-500/10 transition-all transform hover:scale-110"
                                  >
                                    <PlayCircle size={18} />
                                  </div>
                                </div>
                              )}
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              ))}
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

                  {/* Essay Topic Display */}
                  {currentEssayTopic && (
                    <div className="bg-[#E6DEC8] dark:bg-slate-800 rounded-lg p-6 mb-6 border border-[#5D4037]/10 dark:border-amber-500/20">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span className="text-xs font-bold text-[#8D6E63] dark:text-slate-400 uppercase tracking-wider font-messiri">Your Essay Topic</span>
                          <h3 className="font-messiri font-bold text-2xl text-[#4A3728] dark:text-amber-500 mt-1">
                            {currentEssayTopic.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${currentEssayTopic.difficulty === 'easy' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                            currentEssayTopic.difficulty === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                              'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                            }`}>
                            {currentEssayTopic.difficulty}
                          </span>
                          <span className="px-3 py-1 bg-[#F0EAD6] dark:bg-slate-700 rounded-full text-xs font-bold text-[#5D4037] dark:text-slate-300">
                            {currentEssayTopic.wordLimit} words
                          </span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-[#F0EAD6] dark:bg-slate-900 rounded-lg p-4 border border-[#D7Cea7] dark:border-slate-700">
                          <h4 className="font-messiri font-bold text-sm text-[#4A3728] dark:text-amber-500 mb-2 flex items-center gap-2">
                            📋 Suggested Outline
                          </h4>
                          <ol className="space-y-1 text-[#5D4037] dark:text-slate-300 font-markazi text-base">
                            {currentEssayTopic.outline.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-[#8D6E63] dark:text-amber-500/70 font-bold">{i + 1}.</span>
                                {item}
                              </li>
                            ))}
                          </ol>
                        </div>

                        <div className="bg-[#F0EAD6] dark:bg-slate-900 rounded-lg p-4 border border-[#D7Cea7] dark:border-slate-700">
                          <h4 className="font-messiri font-bold text-sm text-[#4A3728] dark:text-amber-500 mb-2 flex items-center gap-2">
                            💡 Key Points to Include
                          </h4>
                          <ul className="space-y-1 text-[#5D4037] dark:text-slate-300 font-markazi text-base">
                            {currentEssayTopic.keyPoints.map((point, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-[#8D6E63] dark:text-amber-500/70">•</span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          const randomIndex = Math.floor(Math.random() * ESSAY_TOPICS.length);
                          setCurrentEssayTopic(ESSAY_TOPICS[randomIndex]);
                          setWritingContent('');
                        }}
                        className="mt-4 flex items-center gap-2 px-4 py-2 text-sm font-messiri text-[#5D4037] dark:text-slate-400 hover:text-[#4A3728] dark:hover:text-amber-500 transition-colors"
                      >
                        <RefreshCw size={14} /> Get Different Topic
                      </button>
                    </div>
                  )}

                  {/* Application Scenario Display */}
                  {currentApplication && (
                    <div className="bg-[#E6DEC8] dark:bg-slate-800 rounded-lg p-6 mb-6 border border-[#5D4037]/10 dark:border-amber-500/20">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span className="text-xs font-bold text-[#8D6E63] dark:text-slate-400 uppercase tracking-wider font-messiri">Your Application Task</span>
                          <h3 className="font-messiri font-bold text-2xl text-[#4A3728] dark:text-amber-500 mt-1">
                            {currentApplication.title}
                          </h3>
                        </div>
                        <span className="px-3 py-1 bg-[#F0EAD6] dark:bg-slate-700 rounded-full text-xs font-bold text-[#5D4037] dark:text-slate-300 capitalize">
                          {currentApplication.type}
                        </span>
                      </div>

                      {/* Scenario */}
                      <div className="bg-[#F0EAD6] dark:bg-slate-900 rounded-lg p-4 border-l-4 border-[#4A3728] dark:border-amber-500 mb-4">
                        <h4 className="font-messiri font-bold text-sm text-[#4A3728] dark:text-amber-500 mb-2">📌 Scenario</h4>
                        <p className="text-[#2C1810] dark:text-slate-200 font-markazi text-lg">{currentApplication.scenario}</p>
                        <p className="text-[#8D6E63] dark:text-slate-400 font-markazi text-sm mt-2">
                          <strong>To:</strong> {currentApplication.recipient}
                        </p>
                      </div>

                      {/* Format Guidelines */}
                      <div className="bg-[#F0EAD6] dark:bg-slate-900 rounded-lg p-4 border border-[#D7Cea7] dark:border-slate-700 mb-4">
                        <h4 className="font-messiri font-bold text-sm text-[#4A3728] dark:text-amber-500 mb-2">📋 Format Structure</h4>
                        <div className="flex flex-wrap gap-2">
                          {currentApplication.format.map((item, i) => (
                            <span key={i} className="px-3 py-1 bg-[#E6DEC8] dark:bg-slate-800 rounded-full text-xs font-messiri text-[#5D4037] dark:text-slate-300 border border-[#D7Cea7] dark:border-slate-600">
                              {i + 1}. {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Sample Toggle */}
                      <button
                        onClick={() => setShowSampleApplication(!showSampleApplication)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#4A3728] dark:bg-amber-600 text-[#F0EAD6] dark:text-white rounded-lg font-messiri text-sm hover:bg-[#2C1810] dark:hover:bg-amber-700 transition-colors mb-3"
                      >
                        {showSampleApplication ? <XCircle size={16} /> : <CheckCircle size={16} />}
                        {showSampleApplication ? 'Hide Sample' : 'View Sample (for reference)'}
                      </button>

                      {showSampleApplication && (
                        <div className="bg-white dark:bg-slate-950 rounded-lg p-4 border border-[#D7Cea7] dark:border-slate-700 font-markazi text-[#2C1810] dark:text-slate-200 whitespace-pre-line text-base">
                          {currentApplication.sampleContent}
                        </div>
                      )}

                      <button
                        onClick={() => {
                          const randomIndex = Math.floor(Math.random() * APPLICATION_TEMPLATES.length);
                          setCurrentApplication(APPLICATION_TEMPLATES[randomIndex]);
                          setWritingContent('');
                          setShowSampleApplication(false);
                        }}
                        className="mt-4 flex items-center gap-2 px-4 py-2 text-sm font-messiri text-[#5D4037] dark:text-slate-400 hover:text-[#4A3728] dark:hover:text-amber-500 transition-colors"
                      >
                        <RefreshCw size={14} /> Get Different Scenario
                      </button>
                    </div>
                  )}

                  {/* Generic Writing Guidelines (for Précis or other) */}
                  {!currentEssayTopic && !currentApplication && (
                    <div className="bg-[#E6DEC8] dark:bg-slate-800 rounded-lg p-6 mb-6 border border-[#5D4037]/10 dark:border-amber-500/20">
                      <h3 className="font-messiri font-bold text-lg text-[#4A3728] dark:text-amber-500 mb-3">
                        📝 Writing Guidelines
                      </h3>
                      <ul className="space-y-2 text-[#5D4037] dark:text-slate-300 font-markazi text-lg">
                        {topic.toLowerCase().includes('précis') && (
                          <>
                            <li>• Summarize the given passage in 1/3rd of its length</li>
                            <li>• Use your own words</li>
                            <li>• Maintain the essence of the original</li>
                          </>
                        )}
                      </ul>
                    </div>
                  )}

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

              {/* Comprehension Mode UI */}
              {currentComprehension && !isLoading && (
                <div className="animate-in slide-in-from-bottom-4 duration-700">
                  <div className="flex items-end justify-between mb-10 pb-4 border-b border-[#5D4037]/20 dark:border-amber-500/20 transition-colors duration-500">
                    <div>
                      <h2 className="text-3xl font-messiri text-[#2C1810] dark:text-slate-100 transition-colors duration-500">Comprehension Practice</h2>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="font-messiri font-bold text-[#4A3728] dark:text-slate-900 bg-[#E6DEC8] dark:bg-amber-500 px-3 py-1 rounded-full text-xs tracking-wider border border-[#5D4037]/20 dark:border-amber-500/20 transition-colors duration-500 dark:shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                          Reading & Questions
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setCurrentComprehension(null);
                        setComprehensionAnswers({});
                      }}
                      icon={<X size={16} />}
                      className="hidden sm:flex"
                    >
                      Close
                    </Button>
                  </div>

                  {/* Passage Display */}
                  <div className="bg-[#E6DEC8] dark:bg-slate-800 rounded-lg p-6 mb-8 border border-[#5D4037]/10 dark:border-amber-500/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-messiri font-bold text-xl text-[#4A3728] dark:text-amber-500">
                        📖 {currentComprehension.title}
                      </h3>
                      <button
                        onClick={() => {
                          const randomIndex = Math.floor(Math.random() * COMPREHENSION_PASSAGES.length);
                          setCurrentComprehension(COMPREHENSION_PASSAGES[randomIndex]);
                          setComprehensionAnswers({});
                        }}
                        className="flex items-center gap-2 px-3 py-1 text-sm font-messiri text-[#5D4037] dark:text-slate-400 hover:text-[#4A3728] dark:hover:text-amber-500 transition-colors"
                      >
                        <RefreshCw size={14} /> New Passage
                      </button>
                    </div>

                    <div className="bg-[#F0EAD6] dark:bg-slate-900 rounded-lg p-6 border border-[#D7Cea7] dark:border-slate-700">
                      <p className="text-[#2C1810] dark:text-slate-200 font-markazi text-lg leading-relaxed whitespace-pre-line">
                        {currentComprehension.passage}
                      </p>
                    </div>
                  </div>

                  {/* Questions */}
                  <div className="space-y-6">
                    <h3 className="font-messiri font-bold text-lg text-[#4A3728] dark:text-amber-500 border-b border-[#5D4037]/20 dark:border-amber-500/20 pb-2">
                      ❓ Answer the following questions:
                    </h3>

                    {currentComprehension.questions.map((q, index) => {
                      const answered = comprehensionAnswers[index] !== undefined;
                      const isCorrect = answered && comprehensionAnswers[index].toLowerCase().trim() === q.correctAnswer.toLowerCase().trim();

                      return (
                        <div
                          key={index}
                          className={`bg-[#F0EAD6] dark:bg-slate-900 rounded-xl p-6 border-2 transition-all duration-300 ${answered
                            ? isCorrect
                              ? 'border-green-500/50 bg-green-50/50 dark:bg-green-900/20'
                              : 'border-red-500/50 bg-red-50/50 dark:bg-red-900/20'
                            : 'border-[#5D4037]/10 dark:border-amber-500/20'
                            }`}
                        >
                          <div className="flex items-start gap-3 mb-4">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#4A3728] dark:bg-amber-500 text-[#F0EAD6] dark:text-slate-900 font-bold font-messiri text-sm">
                              {index + 1}
                            </span>
                            <p className="text-[#2C1810] dark:text-slate-100 font-markazi text-lg flex-1">
                              {q.questionText}
                            </p>
                          </div>

                          {q.type === 'multiple_choice' && q.options && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-11">
                              {q.options.map((option, optIndex) => (
                                <button
                                  key={optIndex}
                                  onClick={() => {
                                    if (!answered) {
                                      setComprehensionAnswers(prev => ({ ...prev, [index]: option }));
                                    }
                                  }}
                                  disabled={answered}
                                  className={`text-left px-4 py-3 rounded-lg border-2 transition-all font-markazi ${answered && option === q.correctAnswer
                                    ? 'bg-green-100 dark:bg-green-900/40 border-green-500 text-green-800 dark:text-green-300'
                                    : answered && comprehensionAnswers[index] === option && option !== q.correctAnswer
                                      ? 'bg-red-100 dark:bg-red-900/40 border-red-500 text-red-800 dark:text-red-300'
                                      : 'bg-[#E6DEC8] dark:bg-slate-800 border-[#D7Cea7] dark:border-slate-700 text-[#2C1810] dark:text-slate-200 hover:border-[#4A3728] dark:hover:border-amber-500'
                                    } ${answered ? 'cursor-default' : 'cursor-pointer'}`}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          )}

                          {q.type === 'fill_in_blank' && (
                            <div className="ml-11">
                              <div className="flex items-center gap-3">
                                <input
                                  type="text"
                                  placeholder="Type your answer..."
                                  disabled={answered}
                                  value={comprehensionAnswers[index] || ''}
                                  onChange={(e) => setComprehensionAnswers(prev => ({ ...prev, [index]: e.target.value }))}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' && comprehensionAnswers[index]?.trim()) {
                                      // Mark as submitted (the answer check happens automatically)
                                    }
                                  }}
                                  className={`flex-1 px-4 py-3 rounded-lg border-2 font-markazi text-lg transition-all outline-none ${answered
                                    ? isCorrect
                                      ? 'bg-green-100 dark:bg-green-900/40 border-green-500 text-green-800 dark:text-green-300'
                                      : 'bg-red-100 dark:bg-red-900/40 border-red-500 text-red-800 dark:text-red-300'
                                    : 'bg-[#E6DEC8] dark:bg-slate-800 border-[#D7Cea7] dark:border-slate-700 text-[#2C1810] dark:text-slate-200 focus:border-[#4A3728] dark:focus:border-amber-500'
                                    }`}
                                />
                                {!answered && comprehensionAnswers[index]?.trim() && (
                                  <Button
                                    onClick={() => {
                                      // The answer is already stored, we just need to "submit" it
                                      // Force a re-render by setting the same value
                                      const answer = comprehensionAnswers[index];
                                      setComprehensionAnswers(prev => ({ ...prev, [index]: answer }));
                                    }}
                                    className="px-4"
                                  >
                                    Check
                                  </Button>
                                )}
                              </div>
                              {answered && !isCorrect && (
                                <p className="mt-2 text-sm text-[#5D4037] dark:text-slate-400 font-markazi">
                                  Correct answer: <span className="font-bold text-green-600 dark:text-green-400">{q.correctAnswer}</span>
                                </p>
                              )}
                            </div>
                          )}

                          {/* Explanation */}
                          {answered && (
                            <div className="mt-4 ml-11 p-3 bg-[#E6DEC8]/50 dark:bg-slate-800 rounded-lg border-l-4 border-[#8D6E63] dark:border-amber-500">
                              <p className="text-sm text-[#5D4037] dark:text-slate-300 font-markazi">
                                <span className="font-bold">💡 Explanation:</span> {q.explanation}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Comprehension Score Summary */}
                  {Object.keys(comprehensionAnswers).length === currentComprehension.questions.length && (
                    <div className="mt-10 bg-[#F0EAD6] dark:bg-slate-900 rounded-xl p-8 border-2 border-[#D97706]/30 dark:border-amber-500/60 text-center animate-in slide-in-from-bottom-4 duration-500">
                      <h3 className="text-2xl font-messiri font-bold text-[#4A3728] dark:text-amber-500 mb-4">
                        🎉 Comprehension Complete!
                      </h3>
                      <div className="text-5xl font-bold font-markazi text-[#2C1810] dark:text-slate-100 mb-4">
                        {Math.round((currentComprehension.questions.filter((q, i) =>
                          comprehensionAnswers[i]?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim()
                        ).length / currentComprehension.questions.length) * 100)}%
                      </div>
                      <p className="text-[#5D4037] dark:text-slate-400 font-markazi mb-6">
                        You got {currentComprehension.questions.filter((q, i) =>
                          comprehensionAnswers[i]?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim()
                        ).length} out of {currentComprehension.questions.length} correct
                      </p>
                      <Button
                        onClick={() => {
                          const randomIndex = Math.floor(Math.random() * COMPREHENSION_PASSAGES.length);
                          setCurrentComprehension(COMPREHENSION_PASSAGES[randomIndex]);
                          setComprehensionAnswers({});
                        }}
                        icon={<RefreshCw size={16} />}
                      >
                        Try Another Passage
                      </Button>
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
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&mute=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
      <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
        <LogoutButton onLogout={() => setShowLogoutConfirm(true)} />
      </div>

      {/* --- MOBILE BOTTOM NAVIGATION --- */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
        <div className="bg-[#E6DEC8]/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-[#5D4037]/10 dark:border-amber-500/20 px-4 py-2 safe-area-inset-bottom">
          <div className="flex items-center justify-around max-w-md mx-auto">
            {/* Learning Area */}
            <button
              onClick={() => setCurrentView('learning')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${currentView === 'learning'
                ? 'bg-[#4A3728] dark:bg-amber-500 text-[#E6DEC8] dark:text-slate-900 shadow-lg'
                : 'text-[#8D6E63] dark:text-slate-400 hover:bg-[#4A3728]/10 dark:hover:bg-amber-500/10'
                }`}
            >
              <Library size={22} />
              <span className="text-[10px] font-messiri font-bold uppercase tracking-wide">Learn</span>
            </button>

            {/* Practice Studio */}
            <button
              onClick={() => setCurrentView('practice')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${currentView === 'practice'
                ? 'bg-[#4A3728] dark:bg-amber-500 text-[#E6DEC8] dark:text-slate-900 shadow-lg'
                : 'text-[#8D6E63] dark:text-slate-400 hover:bg-[#4A3728]/10 dark:hover:bg-amber-500/10'
                }`}
            >
              <PenTool size={22} />
              <span className="text-[10px] font-messiri font-bold uppercase tracking-wide">Practice</span>
            </button>

            {/* Logout */}
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-[#8D6E63] dark:text-slate-400 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300"
            >
              <DoorOpen size={22} />
              <span className="text-[10px] font-messiri font-bold uppercase tracking-wide">Logout</span>
            </button>
          </div>
        </div>
      </div>
      {/* -------------------------------- */}

      {/* Question Bank Manager Modal */}
      {showQuestionBankManager && (
        <QuestionBankManager onClose={() => setShowQuestionBankManager(false)} />
      )}

      {/* User Directory Modal - Admin Only */}
      {showUserDirectory && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-[#F0EAD6] dark:bg-slate-900 rounded-2xl shadow-2xl border-2 border-[#5D4037]/20 dark:border-amber-500/30 w-full max-w-2xl max-h-[80vh] overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="bg-[#E6DEC8] dark:bg-slate-800 p-6 border-b border-[#5D4037]/10 dark:border-amber-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#4A3728] dark:bg-amber-500 rounded-lg flex items-center justify-center">
                  <Users size={20} className="text-[#F0EAD6] dark:text-slate-900" />
                </div>
                <div>
                  <h2 className="text-2xl font-messiri font-bold text-[#2C1810] dark:text-amber-500">User Directory</h2>
                  <p className="text-sm font-markazi text-[#8D6E63] dark:text-slate-400">All registered users in the system</p>
                </div>
              </div>
              <button
                onClick={() => setShowUserDirectory(false)}
                className="p-2 hover:bg-[#5D4037]/10 dark:hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={24} className="text-[#5D4037] dark:text-slate-400" />
              </button>
            </div>

            {/* User List */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-3">
                {USERS.map((user, index) => (
                  <div
                    key={user.username}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${user.role === 'admin'
                      ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-500/50'
                      : 'bg-white dark:bg-slate-800 border-[#D7Cea7] dark:border-slate-700'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${user.role === 'admin'
                          ? 'bg-[#4A3728] dark:bg-amber-500 text-[#F0EAD6] dark:text-slate-900'
                          : 'bg-[#E6DEC8] dark:bg-slate-700 text-[#4A3728] dark:text-amber-500'
                          }`}>
                          {user.displayName.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-messiri font-bold text-lg text-[#2C1810] dark:text-slate-100">
                            {user.displayName}
                          </h3>
                          <p className="font-markazi text-sm text-[#8D6E63] dark:text-slate-400">
                            @{user.username}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {user.role === 'admin' ? (
                          <span className="flex items-center gap-1 px-3 py-1 bg-[#4A3728] dark:bg-amber-500 text-[#F0EAD6] dark:text-slate-900 rounded-full text-xs font-bold uppercase tracking-wider">
                            <Shield size={12} />
                            Admin
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-[#E6DEC8] dark:bg-slate-700 text-[#5D4037] dark:text-slate-300 rounded-full text-xs font-bold uppercase tracking-wider">
                            User
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-6 pt-4 border-t border-[#D7Cea7] dark:border-slate-700 flex justify-between items-center">
                <span className="font-markazi text-[#8D6E63] dark:text-slate-400">
                  Total: {USERS.length} users
                </span>
                <span className="font-markazi text-[#8D6E63] dark:text-slate-400">
                  {USERS.filter(u => u.role === 'admin').length} Admin • {USERS.filter(u => u.role === 'user').length} Users
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-[#F0EAD6] dark:bg-slate-900 rounded-2xl shadow-2xl border-2 border-[#5D4037]/20 dark:border-amber-500/30 w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-300 pb-2">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-[#4A3728] dark:bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group">
                <DoorOpen size={32} className="text-[#F0EAD6] dark:text-slate-900 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-messiri font-bold text-[#2C1810] dark:text-slate-100 mb-2">Leaving so soon?</h3>
              <p className="font-markazi text-lg text-[#8D6E63] dark:text-slate-400 mb-6">
                Are you sure you want to logout from your session?
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="px-6 py-2 rounded-lg border border-[#8D6E63]/30 dark:border-slate-600 text-[#5D4037] dark:text-slate-300 font-bold hover:bg-[#5D4037]/5 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setShowLogoutConfirm(false);
                  }}
                  className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold shadow-md transition-colors flex items-center gap-2"
                >
                  <DoorOpen size={18} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;