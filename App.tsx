import React, { useState, useRef, useEffect } from 'react';
import { DIFFICULTY_LEVELS, TOPIC_CATEGORIES, TopicItem, isAdmin } from './constants';
import { generateGrammarPractice, scoreWriting, WritingScore } from './services/geminiService';
import {
  ESSAY_TOPICS,
  APPLICATION_TEMPLATES,
  COMPREHENSION_PASSAGES,
  LETTER_TEMPLATES
} from './data/offlineQuestionBank';
import { getExamDataByClass } from './data/exams';
import type { EssayTopic } from './data/questions/writing/essays';
import type { ApplicationTemplate } from './data/questions/writing/applications';
import type { LetterTemplate } from './data/questions/writing/letters';
import type { ComprehensionPassage } from './data/questions/writing/comprehension';
import { QuizSession, UserAnswers } from './types';

// Subcomponents & Views
import { Login } from './components/Login';
import { LogoutButton } from './components/LogoutButton';
import { QuestionBankManager } from './components/QuestionBankManager';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { LampPullCord } from './components/layout/LampPullCord';
import { SplashScreen } from './components/layout/SplashScreen';
import { VideoModal } from './components/modals/VideoModal';
import { ResultModal } from './components/modals/ResultModal';
import { UserDirectoryModal } from './components/modals/UserDirectoryModal';
import { LogoutConfirmModal } from './components/modals/LogoutConfirmModal';
import { LearningAreaView } from './components/views/LearningAreaView';
import { PracticeStudioView } from './components/views/PracticeStudioView';

import html2canvas from 'html2canvas';

const App: React.FC = () => {
  // User Authentication State
  const [username, setUsername] = useState<string | null>(() => {
    return localStorage.getItem('grammarAppUsername');
  });

  // Splash Screen State
  const [showSplash, setShowSplash] = useState(false);
  const [splashFading, setSplashFading] = useState(false);

  const handleLogin = (user: string) => {
    localStorage.setItem('grammarAppUsername', user);
    setUsername(user);
    setCurrentView('learning');

    if (!isAdmin(user)) {
      setShowSplash(true);
      setTimeout(() => {
        setSplashFading(true);
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
    setCurrentView('learning');
  };

  // Theme & Animation State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('grammarAppTheme');
      return saved !== null ? saved === 'dark' : true;
    } catch {
      return true;
    }
  });
  const [ropeState, setRopeState] = useState<'idle' | 'pulling' | 'releasing'>('idle');

  // Navigation State - Defaults to Learning Area
  const [currentView, setCurrentView] = useState<'practice' | 'learning'>('learning');

  // Modals State
  const [showQuestionBankManager, setShowQuestionBankManager] = useState(false);
  const [showUserDirectory, setShowUserDirectory] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);

  // Configuration & Topic Selection State
  const [selectedLevel, setSelectedLevel] = useState<string>(DIFFICULTY_LEVELS[2]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [topicSearchQuery, setTopicSearchQuery] = useState<string>('');
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState<string[]>([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(5);

  // Topic Completion & Personalization State
  const [completedTopics, setCompletedTopics] = useState<string[]>(() => {
    const saved = localStorage.getItem('completedTopics');
    return saved ? JSON.parse(saved) : [];
  });
  const [myTopics, setMyTopics] = useState<string[]>(() => {
    const saved = localStorage.getItem('myTopics');
    return saved ? JSON.parse(saved) : [];
  });
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [tempSelectedTopics, setTempSelectedTopics] = useState<string[]>([]);

  // Quiz State
  const [isLoading, setIsLoading] = useState(false);
  const [quizSession, setQuizSession] = useState<QuizSession | null>(null);
  const [quizTopics, setQuizTopics] = useState<string[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [error, setError] = useState<string | null>(null);

  // Exam Mode State
  const [examMode, setExamMode] = useState(false);
  const [selectedExamSections, setSelectedExamSections] = useState<string[]>([]);
  const [selectedExamClass, setSelectedExamClass] = useState<string>('Class X');
  const [isFullExam, setIsFullExam] = useState(false);

  // Writing Mode State
  const [isWritingMode, setIsWritingMode] = useState(false);
  const [writingContent, setWritingContent] = useState('');
  const [writingSubmitted, setWritingSubmitted] = useState(false);
  const [writingScore, setWritingScore] = useState<WritingScore | null>(null);
  const [isScoring, setIsScoring] = useState(false);
  const [currentEssayTopic, setCurrentEssayTopic] = useState<EssayTopic | null>(null);
  const [currentApplication, setCurrentApplication] = useState<ApplicationTemplate | null>(null);
  const [currentLetter, setCurrentLetter] = useState<LetterTemplate | null>(null);
  const [showSampleApplication, setShowSampleApplication] = useState(false);
  const [showSampleLetter, setShowSampleLetter] = useState(false);

  // Comprehension Mode State
  const [currentComprehension, setCurrentComprehension] = useState<ComprehensionPassage | null>(null);
  const [comprehensionAnswers, setComprehensionAnswers] = useState<Record<number, string>>({});

  // Screenshot & Persistence State
  const [isCapturing, setIsCapturing] = useState(false);
  const [cumulativeStats, setCumulativeStats] = useState(() => {
    try {
      const saved = localStorage.getItem('grammarAppStats');
      return saved ? JSON.parse(saved) : { correct: 0, total: 0 };
    } catch {
      return { correct: 0, total: 0 };
    }
  });
  const [streak, setStreak] = useState(() => {
    try {
      return parseInt(localStorage.getItem('grammarAppStreak') || '0');
    } catch {
      return 0;
    }
  });

  const resultsRef = useRef<HTMLDivElement>(null);

  // Effects
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('grammarAppTheme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('grammarAppTheme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('grammarAppStats', JSON.stringify(cumulativeStats));
  }, [cumulativeStats]);

  useEffect(() => {
    localStorage.setItem('grammarAppStreak', streak.toString());
  }, [streak]);

  // Topic Completion Handler
  const toggleTopicCompletion = (topicName: string) => {
    setCompletedTopics((prev) => {
      const newSet = prev.includes(topicName)
        ? prev.filter((t) => t !== topicName)
        : [...prev, topicName];
      localStorage.setItem('completedTopics', JSON.stringify(newSet));
      return newSet;
    });
  };

  // Topic Personalization Handlers
  const toggleTopicSelection = (topicName: string) => {
    setTempSelectedTopics((prev) =>
      prev.includes(topicName) ? prev.filter((t) => t !== topicName) : [...prev, topicName]
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
  const cancelSelectionMode = () => setIsSelectionMode(false);
  const resetTopicSelection = () => {
    setMyTopics([]);
    localStorage.setItem('myTopics', JSON.stringify([]));
  };

  // Helper to get topic info
  const getTopicInfo = (topicName: string): TopicItem | undefined => {
    for (const items of Object.values(TOPIC_CATEGORIES)) {
      const found = items.find((item) => item.name === topicName);
      if (found) return found;
    }
    return undefined;
  };

  // Topic Filtering
  const getFilteredCategories = () => {
    const activeCategories = { ...TOPIC_CATEGORIES };
    if (topicSearchQuery.trim()) {
      Object.keys(activeCategories).forEach((category) => {
        activeCategories[category] = activeCategories[category].filter((item) =>
          item.name.toLowerCase().includes(topicSearchQuery.toLowerCase())
        );
        if (activeCategories[category].length === 0) delete activeCategories[category];
      });
      return activeCategories;
    }
    if (myTopics.length > 0 && !isSelectionMode && currentView !== 'learning') {
      Object.keys(activeCategories).forEach((category) => {
        activeCategories[category] = activeCategories[category].filter((item) =>
          myTopics.includes(item.name)
        );
        if (activeCategories[category].length === 0) delete activeCategories[category];
      });
    }
    return activeCategories;
  };

  const getLearningArenaCategories = () => {
    if (isSelectionMode || myTopics.length === 0) return TOPIC_CATEGORIES;
    const filtered: Record<string, TopicItem[]> = {};
    Object.entries(TOPIC_CATEGORIES).forEach(([category, items]) => {
      const matchingItems = items.filter((item) => myTopics.includes(item.name));
      if (matchingItems.length > 0) filtered[category] = matchingItems;
    });
    return filtered;
  };

  const toggleTopic = (topicName: string) => {
    setQuizSession(null);
    setIsWritingMode(false);
    setCurrentComprehension(null);
    setCurrentEssayTopic(null);
    setCurrentLetter(null);
    setCurrentApplication(null);
    setWritingContent('');
    setWritingSubmitted(false);
    setWritingScore(null);
    setError(null);

    const topicInfo = getTopicInfo(topicName);
    const isWriting =
      topicInfo?.type === 'writing' ||
      topicName.toLowerCase().includes('essay') ||
      topicName.toLowerCase().includes('letter') ||
      topicName.toLowerCase().includes('application') ||
      topicName.toLowerCase().includes('précis') ||
      topicName.toLowerCase().includes('precis') ||
      topicName.toLowerCase().includes('comprehension');

    if (isWriting) {
      // Isolate writing topic so it starts clean without mixing with previous grammar topics
      setSelectedTopics((prev) => (prev.includes(topicName) ? [] : [topicName]));
      setSelectedCategories([]);
    } else {
      setSelectedTopics((prev) => {
        const withoutWriting = prev.filter((t) => {
          const tInfo = getTopicInfo(t);
          return (
            tInfo?.type !== 'writing' &&
            !t.toLowerCase().includes('essay') &&
            !t.toLowerCase().includes('letter') &&
            !t.toLowerCase().includes('application') &&
            !t.toLowerCase().includes('précis') &&
            !t.toLowerCase().includes('precis') &&
            !t.toLowerCase().includes('comprehension')
          );
        });
        return withoutWriting.includes(topicName)
          ? withoutWriting.filter((t) => t !== topicName)
          : [...withoutWriting, topicName];
      });
    }
  };

  const toggleCategory = (categoryName: string) => {
    setQuizSession(null);
    setIsWritingMode(false);
    setCurrentComprehension(null);
    setCurrentEssayTopic(null);
    setCurrentLetter(null);
    setCurrentApplication(null);
    setWritingContent('');
    setWritingSubmitted(false);
    setWritingScore(null);
    setError(null);

    const categoryTopics = TOPIC_CATEGORIES[categoryName];
    if (!categoryTopics) return;
    const topicNames = categoryTopics.map((t) => t.name);
    const allSelected = topicNames.every((t) => selectedTopics.includes(t));
    if (allSelected) {
      setSelectedTopics((prev) => prev.filter((t) => !topicNames.includes(t)));
      setSelectedCategories((prev) => prev.filter((c) => c !== categoryName));
    } else {
      setSelectedTopics((prev) => [...new Set([...prev, ...topicNames])]);
      setSelectedCategories((prev) => [...prev, categoryName]);
    }
  };

  const toggleQuestionType = (type: string) => {
    setSelectedQuestionTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const isCategoryFullySelected = (categoryName: string): boolean => {
    const categoryTopics = TOPIC_CATEGORIES[categoryName];
    if (!categoryTopics) return false;
    return categoryTopics.every((t) => selectedTopics.includes(t.name));
  };

  const isCategoryPartiallySelected = (categoryName: string): boolean => {
    const categoryTopics = TOPIC_CATEGORIES[categoryName];
    if (!categoryTopics) return false;
    const selectedCount = categoryTopics.filter((t) => selectedTopics.includes(t.name)).length;
    return selectedCount > 0 && selectedCount < categoryTopics.length;
  };

  const handleLibraryTopicClick = (topicName: string) => {
    setSelectedTopics([topicName]);
    setSelectedCategories([]);
    setQuizSession(null);
    setIsWritingMode(false);
    setWritingContent('');
    setWritingSubmitted(false);
    setWritingScore(null);
    setShowResultModal(false);
    setUserAnswers({});
    setError(null);
    setExamMode(false);
    setCurrentView('practice');
  };

  // Theme Pull-Cord Toggle
  const toggleTheme = () => {
    if (ropeState !== 'idle') return;
    setRopeState('pulling');
    setIsDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem('theme', next ? 'dark' : 'light');
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
    setTimeout(() => {
      setRopeState('releasing');
      setTimeout(() => setRopeState('idle'), 1000);
    }, 300);
  };

  // Screenshot Capture
  const handleScreenshot = async () => {
    if (isCapturing) return;
    setIsCapturing(true);
    setTimeout(async () => {
      try {
        const canvas = await html2canvas(document.body, {
          useCORS: true,
          backgroundColor: isDarkMode ? '#020617' : '#E6DEC8',
          scale: window.innerWidth < 768 ? 1 : 1.5,
          ignoreElements: (element) => element.classList.contains('rope-element'),
        });
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
            setTimeout(() => {
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
            }, 100);
          }
          setIsCapturing(false);
        }, 'image/png');
      } catch (error) {
        console.error('Screenshot failed:', error);
        setIsCapturing(false);
      }
    }, 100);
  };

  // Generation Handler
  const handleGenerate = async () => {
    if (!examMode && selectedTopics.length === 0) return;
    if (examMode && selectedExamSections.length === 0) return;

    setQuizSession(null);
    setIsLoading(true);
    setError(null);
    setUserAnswers({});
    setShowResultModal(false);
    setWritingContent('');
    setWritingSubmitted(false);
    setWritingScore(null);
    setCurrentEssayTopic(null);
    setCurrentApplication(null);
    setCurrentLetter(null);
    setCurrentComprehension(null);
    setComprehensionAnswers({});

    // EXAM MODE
    if (examMode) {
      const classExamData = getExamDataByClass(selectedExamClass);
      const allSections = classExamData.sections;
      const sectionsToInclude = allSections.filter((s) => selectedExamSections.includes(s.id));
      const orderedIds = classExamData.modelPaper.map((s) => s.id);
      sectionsToInclude.sort((a, b) => orderedIds.indexOf(a.id) - orderedIds.indexOf(b.id));

      let examQuestions: any[] = [];
      sectionsToInclude.forEach((section) => {
        const questionsWithSection = section.questions.map((q) => ({
          ...q,
          section: section.title,
        }));
        examQuestions = [...examQuestions, ...questionsWithSection];
      });

      if (!isFullExam && examQuestions.length > numberOfQuestions) {
        examQuestions = examQuestions.sort(() => 0.5 - Math.random()).slice(0, numberOfQuestions);
        const orderedTitles = classExamData.modelPaper.map((s) => s.title);
        examQuestions.sort((a, b) => {
          const idxA = orderedTitles.indexOf(a.section);
          const idxB = orderedTitles.indexOf(b.section);
          return idxA - idxB;
        });
      }

      const session: QuizSession = {
        id: Date.now().toString(),
        title: isFullExam ? `${selectedExamClass} Model Paper (Sindh Board)` : `${selectedExamClass} Targeted Exam Practice`,
        difficulty: `${selectedExamClass} Standard`,
        questions: examQuestions,
        currentQuestionIndex: 0,
        answers: {},
        isFinished: false,
        startTime: Date.now(),
        score: 0,
        totalQuestions: examQuestions.length,
        timePerQuestion: 0,
      };

      setTimeout(() => {
        setQuizSession(session);
        setIsLoading(false);
        setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      }, 1200);
      return;
    }

    setShowSampleApplication(false);
    setShowSampleLetter(false);

    // Writing Mode
    const writingTopic = selectedTopics.find((t) => {
      const topicInfo = getTopicInfo(t);
      return (
        topicInfo?.type === 'writing' ||
        t.toLowerCase().includes('essay') ||
        t.toLowerCase().includes('letter') ||
        t.toLowerCase().includes('application') ||
        t.toLowerCase().includes('précis') ||
        t.toLowerCase().includes('precis')
      );
    });

    if (writingTopic) {
      setQuizSession(null);
      setCurrentComprehension(null);
      setCurrentEssayTopic(null);
      setCurrentLetter(null);
      setCurrentApplication(null);
      setWritingContent('');
      setWritingScore(null);
      setWritingSubmitted(false);
      setIsWritingMode(true);

      const target = writingTopic.toLowerCase();
      if (target.includes('essay')) {
        const randomIndex = Math.floor(Math.random() * ESSAY_TOPICS.length);
        setCurrentEssayTopic(ESSAY_TOPICS[randomIndex]);
      } else if (target.includes('letter')) {
        const randomIndex = Math.floor(Math.random() * LETTER_TEMPLATES.length);
        setCurrentLetter(LETTER_TEMPLATES[randomIndex]);
      } else if (target.includes('application')) {
        const randomIndex = Math.floor(Math.random() * APPLICATION_TEMPLATES.length);
        setCurrentApplication(APPLICATION_TEMPLATES[randomIndex]);
      } else if (target.includes('précis') || target.includes('precis')) {
        const randomIndex = Math.floor(Math.random() * COMPREHENSION_PASSAGES.length);
        const p = COMPREHENSION_PASSAGES[randomIndex];
        setCurrentEssayTopic({
          id: `precis-${randomIndex + 1}`,
          title: `Précis Writing: ${p.title}`,
          category: 'general',
          difficulty: 'medium',
          outline: ['Read carefully', 'Extract central idea', 'Condense into one-third length', 'Assign suitable title'],
          keyPoints: [p.passage],
          wordLimit: 120,
        });
      } else {
        const randomIndex = Math.floor(Math.random() * ESSAY_TOPICS.length);
        setCurrentEssayTopic(ESSAY_TOPICS[randomIndex]);
      }
      setIsLoading(false);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      return;
    }

    // Comprehension Mode
    const compTopic = selectedTopics.find((t) => t.toLowerCase().includes('comprehension'));
    if (compTopic) {
      setQuizSession(null);
      setIsWritingMode(false);
      setCurrentEssayTopic(null);
      setCurrentLetter(null);
      setCurrentApplication(null);
      const randomIndex = Math.floor(Math.random() * COMPREHENSION_PASSAGES.length);
      setCurrentComprehension(COMPREHENSION_PASSAGES[randomIndex]);
      setIsLoading(false);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      return;
    }

    setIsWritingMode(false);

    // Grammar Quiz Generation
    try {
      const grammarTopics = selectedTopics.filter((t) => {
        const info = getTopicInfo(t);
        return info?.type !== 'writing' && !t.toLowerCase().includes('comprehension');
      });

      if (grammarTopics.length === 0) {
        setError('Please select at least one grammar topic for the quiz.');
        setIsLoading(false);
        return;
      }

      const allowedTypes: any[] = [];
      if (selectedQuestionTypes.includes('Quiz')) allowedTypes.push('multiple_choice');
      if (selectedQuestionTypes.includes('Fill In The Blanks')) allowedTypes.push('fill_in_blank');
      if (selectedQuestionTypes.includes('Sentences')) allowedTypes.push('sentence');
      if (selectedQuestionTypes.includes('True False')) allowedTypes.push('true_false');

      const data = await generateGrammarPractice(
        grammarTopics,
        selectedLevel,
        numberOfQuestions,
        allowedTypes.length > 0 ? allowedTypes : undefined
      );
      setQuizSession(data);
      setQuizTopics(grammarTopics);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (err: any) {
      setError(err.message || 'The system could not generate the lesson.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = async () => {
    setUserAnswers({});
    setShowResultModal(false);
    setWritingContent('');
    setWritingSubmitted(false);
    setWritingScore(null);
    setComprehensionAnswers({});
    handleGenerate();
  };

  const handleAnswer = (questionId: number, answer: string, isCorrect: boolean) => {
    if (userAnswers[questionId]) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: { answer, isCorrect } }));
    setCumulativeStats((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const calculateScore = () => {
    if (!quizSession || quizSession.questions.length === 0) return 0;
    const correctCount = Object.values(userAnswers).filter((a) => a.isCorrect).length;
    return Math.round((correctCount / quizSession.questions.length) * 100);
  };

  const getCorrectCount = () => {
    if (!quizSession) return 0;
    return Object.values(userAnswers).filter((a) => a.isCorrect).length;
  };

  // Writing Submission
  const handleSubmitWriting = async () => {
    if (!writingContent.trim()) return;
    setIsScoring(true);
    try {
      const taskTitle =
        currentEssayTopic?.title ||
        currentApplication?.title ||
        currentLetter?.title ||
        selectedTopics[0];
      const result = await scoreWriting(taskTitle, writingContent);
      setWritingScore(result);
      setWritingSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to evaluate writing.');
    } finally {
      setIsScoring(false);
    }
  };

  if (!username) {
    return <Login onLogin={handleLogin} />;
  }

  if (showSplash) {
    return <SplashScreen username={username} splashFading={splashFading} />;
  }

  return (
    <div className="min-h-screen bg-transparent transition-colors duration-500 font-sans relative text-[#2C1810] dark:text-slate-100">
      {/* Swinging Lamp Dark/Light Pull Cord */}
      <LampPullCord
        isDarkMode={isDarkMode}
        ropeState={ropeState}
        onToggleTheme={toggleTheme}
      />

      {/* Header */}
      <Header
        username={username}
        streak={streak}
        isCapturing={isCapturing}
        onScreenshot={handleScreenshot}
        onLogoutClick={() => setShowLogoutConfirm(true)}
      />

      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        onSelectView={(view) => setCurrentView(view)}
        showQuestionBankManager={showQuestionBankManager}
        onToggleQuestionBankManager={() => setShowQuestionBankManager(!showQuestionBankManager)}
        showUserDirectory={showUserDirectory}
        onToggleUserDirectory={() => setShowUserDirectory(!showUserDirectory)}
        username={username}
        onLogoutClick={() => setShowLogoutConfirm(true)}
      />

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 sm:pb-12">
        {/* VIEW: LEARNING AREA */}
        {currentView === 'learning' && (
          <LearningAreaView
            categories={getLearningArenaCategories()}
            completedTopics={completedTopics}
            onToggleTopicCompletion={toggleTopicCompletion}
            onTopicClick={handleLibraryTopicClick}
            onSelectVideo={(vId) => setSelectedVideo(vId)}
            myTopics={myTopics}
            isSelectionMode={isSelectionMode}
            tempSelectedTopics={tempSelectedTopics}
            onEnterSelectionMode={enterSelectionMode}
            onSaveSelectedTopics={saveSelectedTopics}
            onCancelSelectionMode={cancelSelectionMode}
            onResetTopicSelection={resetTopicSelection}
            onToggleTopicSelection={toggleTopicSelection}
          />
        )}

        {/* VIEW: PRACTICE STUDIO */}
        {currentView === 'practice' && (
          <PracticeStudioView
            username={username}
            examMode={examMode}
            onSetExamMode={setExamMode}
            selectedLevel={selectedLevel}
            onSetSelectedLevel={setSelectedLevel}
            numberOfQuestions={numberOfQuestions}
            onSetNumberOfQuestions={setNumberOfQuestions}
            selectedQuestionTypes={selectedQuestionTypes}
            onToggleQuestionType={toggleQuestionType}
            selectedTopics={selectedTopics}
            selectedCategories={selectedCategories}
            topicSearchQuery={topicSearchQuery}
            onSetTopicSearchQuery={setTopicSearchQuery}
            filteredCategories={getFilteredCategories()}
            onToggleTopic={toggleTopic}
            onToggleCategory={toggleCategory}
            onSelectAllVisibleTopics={() => {
              const allFilteredTopics: string[] = [];
              Object.values(getFilteredCategories()).forEach((items) => {
                items.forEach((item) => allFilteredTopics.push(item.name));
              });
              const visibleAreAllSelected =
                allFilteredTopics.length > 0 &&
                allFilteredTopics.every((t) => selectedTopics.includes(t));
              if (visibleAreAllSelected) {
                setSelectedTopics((prev) => prev.filter((t) => !allFilteredTopics.includes(t)));
                setSelectedCategories([]);
              } else {
                setSelectedTopics((prev) => [...new Set([...prev, ...allFilteredTopics])]);
                const cats = Object.keys(getFilteredCategories());
                setSelectedCategories((prev) => [...new Set([...prev, ...cats])]);
              }
            }}
            isCategoryFullySelected={isCategoryFullySelected}
            isCategoryPartiallySelected={isCategoryPartiallySelected}
            selectedExamClass={selectedExamClass}
            onSetSelectedExamClass={setSelectedExamClass}
            isFullExam={isFullExam}
            onSetIsFullExam={setIsFullExam}
            selectedExamSections={selectedExamSections}
            onSetSelectedExamSections={setSelectedExamSections}
            isLoading={isLoading}
            error={error}
            onGenerate={handleGenerate}
            onRestart={handleRestart}
            resultsRef={resultsRef}
            quizSession={quizSession}
            userAnswers={userAnswers}
            onAnswer={handleAnswer}
            onOpenResultModal={() => setShowResultModal(true)}
            isWritingMode={isWritingMode}
            writingContent={writingContent}
            onSetWritingContent={setWritingContent}
            writingSubmitted={writingSubmitted}
            writingScore={writingScore}
            isScoring={isScoring}
            onSubmitWriting={handleSubmitWriting}
            currentEssayTopic={currentEssayTopic}
            currentApplication={currentApplication}
            currentLetter={currentLetter}
            showSampleApplication={showSampleApplication}
            onSetShowSampleApplication={setShowSampleApplication}
            showSampleLetter={showSampleLetter}
            onSetShowSampleLetter={setShowSampleLetter}
            currentComprehension={currentComprehension}
            comprehensionAnswers={comprehensionAnswers}
            onSetComprehensionAnswer={(qIdx, ans) =>
              setComprehensionAnswers((prev) => ({ ...prev, [qIdx]: ans }))
            }
          />
        )}
      </main>

      {/* Floating Desktop Logout Button */}
      <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
        <LogoutButton onLogout={() => setShowLogoutConfirm(true)} />
      </div>

      {/* Modals */}
      <VideoModal videoId={selectedVideo} onClose={() => setSelectedVideo(null)} />
      <ResultModal
        isOpen={showResultModal}
        quizSession={quizSession}
        streak={streak}
        cumulativeStats={cumulativeStats}
        score={calculateScore()}
        correctCount={getCorrectCount()}
        onClose={() => setShowResultModal(false)}
        onContinue={handleGenerate}
        onScreenshot={handleScreenshot}
      />
      <UserDirectoryModal
        isOpen={showUserDirectory}
        onClose={() => setShowUserDirectory(false)}
      />
      <LogoutConfirmModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={() => {
          handleLogout();
          setShowLogoutConfirm(false);
        }}
      />
      {showQuestionBankManager && (
        <QuestionBankManager onClose={() => setShowQuestionBankManager(false)} />
      )}
    </div>
  );
};

export default App;