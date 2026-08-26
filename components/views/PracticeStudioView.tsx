import React, { useRef, useEffect } from 'react';
import {
  GraduationCap,
  BookOpen,
  Search,
  CheckCircle,
  ChevronDown,
  PenTool,
  Bold,
  Italic,
  List,
  Underline,
  Eraser,
  RefreshCw,
  RotateCcw,
  Play,
  Sparkles,
  Trophy,
  Loader
} from 'lucide-react';
import { DIFFICULTY_LEVELS, TopicItem } from '../../constants';
import { QuizSession, UserAnswers } from '../../types';
import { QuestionCard } from '../QuestionCard';
import { Button } from '../Button';
import { WritingScore } from '../../services/geminiService';
import { getExamDataByClass } from '../../data/exams';
import type { EssayTopic } from '../../data/questions/writing/essays';
import type { ApplicationTemplate } from '../../data/questions/writing/applications';
import type { LetterTemplate } from '../../data/questions/writing/letters';
import type { ComprehensionPassage } from '../../data/questions/writing/comprehension';

const EXAM_CLASSES = ['Class IX', 'Class X', 'Class XI', 'Class XII'];

interface PracticeStudioViewProps {
  username: string;
  // Mode & Config
  examMode: boolean;
  onSetExamMode: (val: boolean) => void;
  selectedLevel: string;
  onSetSelectedLevel: (level: string) => void;
  numberOfQuestions: number;
  onSetNumberOfQuestions: (num: number) => void;
  selectedQuestionTypes: string[];
  onToggleQuestionType: (type: string) => void;
  // Topics
  selectedTopics: string[];
  selectedCategories: string[];
  topicSearchQuery: string;
  onSetTopicSearchQuery: (query: string) => void;
  filteredCategories: Record<string, TopicItem[]>;
  onToggleTopic: (topicName: string) => void;
  onToggleCategory: (categoryName: string) => void;
  onSelectAllVisibleTopics: () => void;
  isCategoryFullySelected: (categoryName: string) => boolean;
  isCategoryPartiallySelected: (categoryName: string) => boolean;
  // Exam Mode
  selectedExamClass: string;
  onSetSelectedExamClass: (cls: string) => void;
  isFullExam: boolean;
  onSetIsFullExam: (val: boolean) => void;
  selectedExamSections: string[];
  onSetSelectedExamSections: React.Dispatch<React.SetStateAction<string[]>>;
  // Generation & Status
  isLoading: boolean;
  error: string | null;
  onGenerate: () => void;
  onRestart: () => void;
  resultsRef: React.RefObject<HTMLDivElement | null>;
  // Quiz Session State
  quizSession: QuizSession | null;
  userAnswers: UserAnswers;
  onAnswer: (questionId: number, answer: string, isCorrect: boolean) => void;
  onOpenResultModal: () => void;
  // Writing Mode State
  isWritingMode: boolean;
  writingContent: string;
  onSetWritingContent: (content: string) => void;
  writingSubmitted: boolean;
  writingScore: WritingScore | null;
  isScoring: boolean;
  onSubmitWriting: () => void;
  currentEssayTopic: EssayTopic | null;
  currentApplication: ApplicationTemplate | null;
  currentLetter: LetterTemplate | null;
  showSampleApplication: boolean;
  onSetShowSampleApplication: (val: boolean) => void;
  showSampleLetter: boolean;
  onSetShowSampleLetter: (val: boolean) => void;
  // Comprehension Mode State
  currentComprehension: ComprehensionPassage | null;
  comprehensionAnswers: Record<number, string>;
  onSetComprehensionAnswer: (qIndex: number, answer: string) => void;
}

export const PracticeStudioView: React.FC<PracticeStudioViewProps> = ({
  username,
  examMode,
  onSetExamMode,
  selectedLevel,
  onSetSelectedLevel,
  numberOfQuestions,
  onSetNumberOfQuestions,
  selectedQuestionTypes,
  onToggleQuestionType,
  selectedTopics,
  selectedCategories,
  topicSearchQuery,
  onSetTopicSearchQuery,
  filteredCategories,
  onToggleTopic,
  onToggleCategory,
  onSelectAllVisibleTopics,
  isCategoryFullySelected,
  isCategoryPartiallySelected,
  selectedExamClass,
  onSetSelectedExamClass,
  isFullExam,
  onSetIsFullExam,
  selectedExamSections,
  onSetSelectedExamSections,
  isLoading,
  error,
  onGenerate,
  onRestart,
  resultsRef,
  quizSession,
  userAnswers,
  onAnswer,
  onOpenResultModal,
  isWritingMode,
  writingContent,
  onSetWritingContent,
  writingSubmitted,
  writingScore,
  isScoring,
  onSubmitWriting,
  currentEssayTopic,
  currentApplication,
  currentLetter,
  showSampleApplication,
  onSetShowSampleApplication,
  showSampleLetter,
  onSetShowSampleLetter,
  currentComprehension,
  comprehensionAnswers,
  onSetComprehensionAnswer,
}) => {
  const currentExamData = getExamDataByClass(selectedExamClass);

  // Formatting helpers for writing textarea
  const formatText = (style: 'bold' | 'italic' | 'underline' | 'list' | 'clear') => {
    const textarea = document.getElementById('writing-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = writingContent.substring(start, end);
    let replacement = selected;

    switch (style) {
      case 'bold':
        replacement = `**${selected}**`;
        break;
      case 'italic':
        replacement = `*${selected}*`;
        break;
      case 'underline':
        replacement = `__${selected}__`;
        break;
      case 'list':
        replacement = `\n- ${selected}`;
        break;
      case 'clear':
        replacement = selected.replace(/[*_#\-]/g, '');
        break;
    }

    const newContent = writingContent.substring(0, start) + replacement + writingContent.substring(end);
    onSetWritingContent(newContent);
  };

  const getCorrectCount = () => {
    if (!quizSession) return 0;
    return Object.values(userAnswers).filter((a) => a.isCorrect).length;
  };

  const calculateScore = () => {
    if (!quizSession || quizSession.questions.length === 0) return 0;
    return Math.round((getCorrectCount() / quizSession.questions.length) * 100);
  };

  // Auto-scroll to test area whenever generation starts or content loads
  useEffect(() => {
    if (isLoading || quizSession || isWritingMode || currentComprehension) {
      const timer = setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isLoading, quizSession, isWritingMode, currentComprehension]);

  // Progressive auto-scroll to the next question when answered
  const handleCardAnswer = (questionId: number, answer: string, isCorrect: boolean, currentIndex: number) => {
    onAnswer(questionId, answer, isCorrect);
    setTimeout(() => {
      const nextCard = document.getElementById(`question-card-${currentIndex + 1}`);
      if (nextCard) {
        nextCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        const completionBanner = document.getElementById('quiz-completion-banner');
        if (completionBanner) {
          completionBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }, 350);
  };

  return (
    <div className="animate-in fade-in duration-500">
      {/* Configuration Section */}
      <section className="mb-12 relative z-30">
        <div className="bg-[#F0EAD6] dark:bg-slate-900 rounded-xl shadow-md shadow-[#5D4037]/5 dark:shadow-[0_0_15px_rgba(0,0,0,0.2)] border border-[#5D4037]/10 dark:border-amber-500/20 relative transition-all duration-500 hover:shadow-[0_0_15px_rgba(74,55,40,0.1)] dark:hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]">
          {/* Background Container for clipping decorative elements */}
          <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#4A3728] dark:bg-amber-500 opacity-[0.03] dark:opacity-[0.05] rounded-bl-full transform translate-x-1/3 -translate-y-1/3 transition-colors duration-500"></div>
          </div>

          <div className="p-5 sm:p-8 relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="text-[#4A3728] dark:text-slate-900 p-3 bg-[#E6DEC8] dark:bg-amber-500 rounded-full transition-colors duration-500 group-hover:shadow-[0_0_15px_rgba(74,55,40,0.3)] dark:shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                <GraduationCap size={24} className="drop-shadow-sm" />
              </div>
              <div>
                <h2 className="text-2xl font-messiri font-bold text-[#2C1810] dark:text-slate-100 transition-colors duration-500">
                  Design Your Learning
                </h2>
                <p className="text-[#5D4037] dark:text-slate-400 font-markazi text-lg transition-colors duration-500">
                  Select your level and topic to begin.
                </p>
              </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-8">
              {/* SIDEBAR: Controls & Info */}
              <div className="w-full xl:w-72 flex-shrink-0 space-y-6">
                {/* Mode Toggle */}
                <div>
                  <label className="block text-xs font-bold text-[#4A3728] dark:text-amber-500 mb-2 uppercase tracking-widest font-messiri">
                    Practice Mode
                  </label>
                  <div className="bg-[#E6DEC8] dark:bg-slate-800 p-1 rounded-lg border border-[#D7Cea7] dark:border-slate-700 flex shadow-inner">
                    <button
                      onClick={() => {
                        onSetExamMode(false);
                        onSetSelectedExamSections([]);
                        onSetIsFullExam(false);
                      }}
                      className={`flex-1 py-3 px-3 rounded-md text-sm font-bold font-messiri transition-all duration-300 ${
                        !examMode
                          ? 'bg-[#4A3728] dark:bg-amber-500 text-[#F0EAD6] dark:text-slate-900 shadow-sm'
                          : 'text-[#8D6E63] dark:text-slate-400 hover:text-[#4A3728] dark:hover:text-amber-500'
                      }`}
                    >
                      Topic Focus
                    </button>
                    <button
                      onClick={() => {
                        onSetExamMode(true);
                        onSetSelectedExamSections([]);
                      }}
                      className={`flex-1 py-3 px-3 rounded-md text-sm font-bold font-messiri transition-all duration-300 ${
                        examMode
                          ? 'bg-[#4A3728] dark:bg-amber-500 text-[#F0EAD6] dark:text-slate-900 shadow-sm'
                          : 'text-[#8D6E63] dark:text-slate-400 hover:text-[#4A3728] dark:hover:text-amber-500'
                      }`}
                    >
                      Exam Prep
                    </button>
                  </div>
                </div>

                {/* Difficulty (Practice Mode Only) */}
                {!examMode && (
                  <div className="animate-in fade-in slide-in-from-top-2">
                    <label className="block text-xs font-bold text-[#4A3728] dark:text-amber-500 mb-2 uppercase tracking-widest font-messiri">
                      Difficulty Level
                    </label>
                    <div className="relative">
                      <select
                        value={selectedLevel}
                        onChange={(e) => onSetSelectedLevel(e.target.value)}
                        className="w-full appearance-none bg-[#E6DEC8] dark:bg-slate-800 border-2 border-[#D7Cea7] dark:border-slate-700 text-[#4A3728] dark:text-amber-500 px-4 py-3 rounded-lg font-markazi text-lg focus:outline-none focus:border-[#4A3728] dark:focus:border-amber-500 transition-colors cursor-pointer"
                      >
                        {DIFFICULTY_LEVELS.map((level) => (
                          <option key={level} value={level}>
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8D6E63] dark:text-slate-500 pointer-events-none"
                        size={20}
                      />
                    </div>
                  </div>
                )}

                {/* Question Count */}
                {(!examMode || (examMode && !isFullExam)) && (
                  <div className="animate-in fade-in slide-in-from-top-2">
                    <label className="block text-xs font-bold text-[#4A3728] dark:text-amber-500 mb-2 uppercase tracking-widest font-messiri">
                      Questions
                    </label>
                    <div className="relative">
                      <select
                        value={numberOfQuestions}
                        onChange={(e) => onSetNumberOfQuestions(Number(e.target.value))}
                        className="w-full appearance-none bg-[#E6DEC8] dark:bg-slate-800 border-2 border-[#D7Cea7] dark:border-slate-700 text-[#4A3728] dark:text-amber-500 px-4 py-3 rounded-lg font-markazi text-lg focus:outline-none focus:border-[#4A3728] dark:focus:border-amber-500 transition-colors cursor-pointer text-center"
                      >
                        {[5, 10, 15, 20].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8D6E63] dark:text-slate-500 pointer-events-none"
                        size={20}
                      />
                    </div>
                  </div>
                )}

                {/* Info Card */}
                <div className="bg-[#F0EAD6] dark:bg-slate-900/50 p-5 rounded-xl border border-[#D7Cea7] dark:border-slate-800 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    {examMode ? <GraduationCap size={48} /> : <BookOpen size={48} />}
                  </div>
                  <h4 className="font-messiri font-bold text-lg text-[#4A3728] dark:text-amber-500 mb-2 flex items-center gap-2 relative z-10">
                    {examMode ? 'Sindh Board Exam Hub' : 'Skill Builder'}
                  </h4>
                  <p className="text-sm text-[#5D4037] dark:text-slate-400 font-markazi leading-relaxed relative z-10">
                    {examMode
                      ? `Simulate official BSEK/BIEK Sindh Board exams for ${selectedExamClass}. Practice targeted grammar sections or attempt the complete model paper.`
                      : 'Gamified practice to master grammar concepts. Select multiple topics, challenge yourself, and track your progress!'}
                  </p>
                </div>
              </div>

              {/* MAIN CONTENT AREA */}
              <div className="flex-1 min-w-0">
                {examMode ? (
                  /* SINDH BOARD EXAM MODE INTERFACE */
                  <div className="bg-[#fffdf5] dark:bg-slate-800/30 rounded-xl border-2 border-dashed border-[#D7Cea7] dark:border-slate-700 p-6 min-h-[400px] animate-in fade-in zoom-in-95">
                    <div className="flex flex-wrap items-center justify-between mb-8 gap-4 border-b border-[#D7Cea7] dark:border-slate-700 pb-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-messiri font-bold text-2xl text-[#4A3728] dark:text-amber-500">
                            {currentExamData.boardTitle}
                          </h3>
                          <div className="px-2.5 py-0.5 bg-[#4A3728] dark:bg-amber-600 text-[#F0EAD6] dark:text-white text-[11px] font-bold uppercase tracking-wider rounded">
                            Sindh Board
                          </div>
                        </div>
                        <p className="text-[#8D6E63] dark:text-slate-400 font-markazi text-lg mt-1">
                          {currentExamData.subtitle}
                        </p>
                      </div>

                      {/* Class Selection Dropdown */}
                      <div className="relative z-20">
                        <select
                          value={selectedExamClass}
                          onChange={(e) => {
                            onSetSelectedExamClass(e.target.value);
                            onSetSelectedExamSections([]);
                            onSetIsFullExam(false);
                          }}
                          className="appearance-none bg-[#E6DEC8] dark:bg-slate-800 border-2 border-[#D7Cea7] dark:border-slate-600 text-[#4A3728] dark:text-amber-500 pl-4 pr-10 py-2 rounded-lg font-messiri font-bold focus:outline-none focus:border-[#4A3728] dark:focus:border-amber-500 transition-colors cursor-pointer shadow-sm"
                        >
                          {EXAM_CLASSES.map((cls) => (
                            <option key={cls} value={cls}>
                              {cls}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8D6E63] dark:text-slate-500 pointer-events-none"
                          size={16}
                        />
                      </div>
                    </div>

                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                      {/* Full Exam Toggle Card */}
                      <div
                        onClick={() => {
                          const newState = !isFullExam;
                          onSetIsFullExam(newState);
                          if (newState) {
                            const allSectionIds = currentExamData.sections.map((s) => s.id);
                            onSetSelectedExamSections(allSectionIds);
                          } else {
                            onSetSelectedExamSections([]);
                          }
                        }}
                        className={`mb-8 p-5 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-4 group ${
                          isFullExam
                            ? 'bg-[#E6DEC8] dark:bg-slate-900 border-[#4A3728] dark:border-amber-500 shadow-md'
                            : 'bg-white dark:bg-slate-900/50 border-[#D7Cea7] dark:border-slate-700 hover:border-[#8D6E63] dark:hover:border-slate-500'
                        }`}
                      >
                        <div
                          className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                            isFullExam
                              ? 'bg-[#4A3728] dark:bg-amber-500 border-[#4A3728] dark:border-amber-500'
                              : 'border-[#8D6E63] dark:border-slate-500 group-hover:border-[#4A3728] dark:group-hover:border-amber-500'
                          }`}
                        >
                          {isFullExam && <CheckCircle size={14} className="text-white" />}
                        </div>
                        <div>
                          <h4
                            className={`font-bold font-messiri text-xl mb-1 ${
                              isFullExam ? 'text-[#4A3728] dark:text-amber-500' : 'text-[#5D4037] dark:text-slate-300'
                            }`}
                          >
                            Attempt Full Model Paper Format
                          </h4>
                          <p className="text-[#8D6E63] dark:text-slate-400 font-markazi text-lg leading-snug">
                            Includes all {currentExamData.sections.length} Sindh Board examination sections in the authentic paper order.
                          </p>
                        </div>
                      </div>

                      {/* Specific Sections */}
                      <div
                        className={`transition-all duration-300 ${
                          isFullExam ? 'opacity-50 pointer-events-none grayscale' : 'opacity-100'
                        }`}
                      >
                        <h4 className="font-messiri font-bold text-sm text-[#8D6E63] dark:text-slate-500 mb-4 uppercase tracking-wider flex items-center gap-2">
                          <span>Or Practice Specific Sections</span>
                          <div className="h-px bg-[#D7Cea7] dark:bg-slate-700 flex-1"></div>
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {currentExamData.sections.map((section) => (
                            <button
                              key={section.id}
                              onClick={() => {
                                if (selectedExamSections.includes(section.id)) {
                                  onSetSelectedExamSections((prev) => prev.filter((id) => id !== section.id));
                                } else {
                                  onSetSelectedExamSections((prev) => [...prev, section.id]);
                                }
                              }}
                              className={`text-left px-5 py-3 rounded-lg border-2 transition-all flex items-center justify-between group ${
                                selectedExamSections.includes(section.id)
                                  ? 'bg-[#E6DEC8] dark:bg-slate-800 border-[#4A3728] dark:border-amber-500 shadow-sm'
                                  : 'bg-white dark:bg-slate-900 border-[#D7Cea7] dark:border-slate-700 text-[#5D4037] dark:text-slate-400 hover:border-[#8D6E63] dark:hover:border-slate-500'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                                    selectedExamSections.includes(section.id)
                                      ? 'bg-[#4A3728] dark:bg-amber-500 border-[#4A3728] dark:border-amber-500'
                                      : 'border-[#D7Cea7] dark:border-slate-600 group-hover:border-[#4A3728] dark:group-hover:border-amber-500'
                                  }`}
                                >
                                  {selectedExamSections.includes(section.id) && (
                                    <CheckCircle size={12} className="text-white" />
                                  )}
                                </div>
                                <span
                                  className={`font-markazi text-xl ${
                                    selectedExamSections.includes(section.id)
                                      ? 'text-[#4A3728] dark:text-amber-500 font-bold'
                                      : ''
                                  }`}
                                >
                                  {section.title}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* TOPIC PRACTICE INTERFACE */
                  <div className="animate-in fade-in zoom-in-95">
                    {/* Search & Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-6">
                      <div className="relative flex-1">
                        <Search
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8D6E63] dark:text-slate-500"
                          size={20}
                        />
                        <input
                          type="text"
                          placeholder="Search topics (e.g., 'Tense', 'Noun')..."
                          value={topicSearchQuery}
                          onChange={(e) => onSetTopicSearchQuery(e.target.value)}
                          className="w-full bg-[#E6DEC8] dark:bg-slate-800 border-2 border-[#D7Cea7] dark:border-slate-700 text-[#4A3728] dark:text-slate-200 pl-12 pr-4 py-3 rounded-lg font-markazi text-xl placeholder-[#8D6E63]/70 dark:placeholder-slate-500 focus:outline-none focus:border-[#4A3728] dark:focus:border-amber-500 transition-colors"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={onSelectAllVisibleTopics}
                          variant="outline"
                          className="whitespace-nowrap flex-1 sm:flex-initial"
                        >
                          {Object.values(filteredCategories).some((items) =>
                            items.some((i) => selectedTopics.includes(i.name))
                          )
                            ? 'Deselect'
                            : 'Select All'}
                        </Button>
                        {selectedTopics.length > 0 && (
                          <Button
                            onClick={onGenerate}
                            isLoading={isLoading}
                            variant="primary"
                            className="whitespace-nowrap font-bold shadow-md animate-in zoom-in-95 flex-1 sm:flex-initial flex items-center gap-1.5 font-messiri"
                          >
                            <Play size={14} className="fill-current" />
                            <span>Start ({selectedTopics.length})</span>
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Topic Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[300px]">
                      {Object.entries(filteredCategories).length > 0 ? (
                        Object.entries(filteredCategories).map(([category, items]) => (
                          <div
                            key={category}
                            className="bg-[#fffdf5] dark:bg-slate-800/30 rounded-xl border border-[#D7Cea7] dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                          >
                            <button
                              onClick={() => onToggleCategory(category)}
                              className={`w-full px-4 py-3 text-left font-messiri font-bold border-b border-[#D7Cea7] dark:border-slate-700 flex items-center gap-2 transition-colors ${
                                selectedCategories.includes(category)
                                  ? 'bg-[#4A3728] dark:bg-amber-600 text-[#F0EAD6] dark:text-white'
                                  : 'bg-[#F0EAD6]/50 dark:bg-slate-800 text-[#4A3728] dark:text-amber-500 hover:bg-[#E6DEC8] dark:hover:bg-slate-700'
                              }`}
                            >
                              <span
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                                  isCategoryFullySelected(category)
                                    ? 'bg-[#F0EAD6] dark:bg-white border-[#F0EAD6] dark:border-white'
                                    : isCategoryPartiallySelected(category)
                                    ? 'bg-[#8D6E63] dark:bg-amber-700 border-[#8D6E63] dark:border-amber-700'
                                    : 'border-[#8D6E63] dark:border-slate-500'
                                }`}
                              >
                                {(isCategoryFullySelected(category) || isCategoryPartiallySelected(category)) && (
                                  <CheckCircle
                                    size={12}
                                    className={isCategoryFullySelected(category) ? 'text-[#4A3728]' : 'text-white'}
                                  />
                                )}
                              </span>
                              {category} ({items.length})
                            </button>
                            <div className="p-1 max-h-[250px] overflow-y-auto scrollbar-thin">
                              {items.map((item) => (
                                <button
                                  key={item.name}
                                  onClick={() => onToggleTopic(item.name)}
                                  className={`w-full text-left px-4 py-2 rounded-md text-base transition-all flex items-center gap-3 group ${
                                    selectedTopics.includes(item.name)
                                      ? 'bg-[#E6DEC8] dark:bg-slate-700 text-[#4A3728] dark:text-amber-500 font-bold dark:shadow-[0_0_10px_rgba(245,158,11,0.1)]'
                                      : 'text-[#2C1810] dark:text-slate-300 hover:bg-[#E6DEC8] dark:hover:bg-slate-700'
                                  }`}
                                >
                                  <span
                                    className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                                      selectedTopics.includes(item.name)
                                        ? 'bg-[#4A3728] dark:bg-amber-500 border-[#4A3728] dark:border-amber-500'
                                        : 'border-[#8D6E63] dark:border-slate-500 group-hover:border-[#4A3728] dark:group-hover:border-amber-500'
                                    }`}
                                  >
                                    {selectedTopics.includes(item.name) && (
                                      <CheckCircle size={12} className="text-white" />
                                    )}
                                  </span>
                                  <span className="truncate">{item.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-full p-8 text-center text-[#8D6E63] dark:text-slate-500 italic font-markazi text-xl border-2 border-dashed border-[#D7Cea7] dark:border-slate-700 rounded-xl bg-[#E6DEC8]/30">
                          No topics found matching "{topicSearchQuery}".
                        </div>
                      )}
                    </div>

                    {/* Question Type Selection */}
                    <div className="mt-8 pt-6 border-t border-[#5D4037]/10 dark:border-amber-500/20">
                      <label className="block text-xs font-bold text-[#4A3728] dark:text-amber-500 mb-4 uppercase tracking-widest font-messiri">
                        Question Types
                      </label>
                      <div className="flex flex-wrap gap-4">
                        {['Quiz', 'Fill In The Blanks', 'Sentences'].map((type) => (
                          <button
                            key={type}
                            onClick={() => onToggleQuestionType(type)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all font-markazi text-lg ${
                              selectedQuestionTypes.includes(type)
                                ? 'bg-[#4A3728] dark:bg-amber-600 border-[#4A3728] dark:border-amber-600 text-[#F0EAD6] dark:text-white shadow-md'
                                : 'bg-[#E6DEC8] dark:bg-slate-800 border-[#D7Cea7] dark:border-slate-700 text-[#5D4037] dark:text-slate-400 hover:border-[#4A3728] dark:hover:border-amber-500 hover:bg-[#D7Cea7] dark:hover:bg-slate-700'
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                selectedQuestionTypes.includes(type)
                                  ? 'border-[#F0EAD6] dark:border-white bg-[#F0EAD6] dark:bg-white'
                                  : 'border-[#8D6E63] dark:border-slate-500'
                              }`}
                            >
                              {selectedQuestionTypes.includes(type) && (
                                <CheckCircle size={14} className="text-[#4A3728] dark:text-amber-600" />
                              )}
                            </div>
                            <span className="font-bold">{type}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Improved Floating Sticky Action Bar (Start & Restart for Quiz, Writing, and Exam) */}
      {(quizSession ||
        isWritingMode ||
        currentComprehension ||
        (examMode ? selectedExamSections.length > 0 : selectedTopics.length > 0)) &&
        !isLoading && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-6 duration-300 pointer-events-auto">
            <div className="flex items-center gap-3 sm:gap-6 bg-[#2C1810] dark:bg-slate-950 border-2 border-[#D97706] dark:border-amber-500 backdrop-blur-xl px-6 py-3 rounded-full shadow-[0_12px_40px_rgba(217,119,6,0.4)] dark:shadow-[0_12px_40px_rgba(245,158,11,0.35)] text-[#F0EAD6] dark:text-amber-400">
              {quizSession ? (
                /* IN-TEST RESTART STATE */
                <>
                  <div className="flex items-center gap-2.5">
                    <GraduationCap size={20} className="text-amber-500" />
                    <span className="font-messiri font-bold text-sm sm:text-base tracking-wide whitespace-nowrap text-white dark:text-slate-100">
                      Progress:{' '}
                      <span className="text-amber-400 font-bold">
                        {Object.keys(userAnswers).length} / {quizSession.questions.length}
                      </span>{' '}
                      Answered
                    </span>
                  </div>
                  <div className="w-px h-6 bg-[#D7Cea7]/30 dark:bg-amber-500/40"></div>
                  <button
                    onClick={onRestart}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-amber-500 via-[#D97706] to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white dark:text-slate-950 font-messiri font-bold text-sm sm:text-base rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 group whitespace-nowrap"
                    title="Restart this practice test"
                  >
                    <RotateCcw size={16} className="transition-transform group-hover:-rotate-180 duration-500" />
                    <span>Restart Test</span>
                  </button>
                </>
              ) : isWritingMode ? (
                /* WRITING MODE ACTIVE STATE */
                <>
                  <div className="flex items-center gap-2.5">
                    <PenTool size={20} className="text-amber-500" />
                    <span className="font-messiri font-bold text-sm sm:text-base tracking-wide whitespace-nowrap text-white dark:text-slate-100">
                      Writing Studio:{' '}
                      <span className="text-amber-400 font-bold">
                        {writingContent.trim().split(/\s+/).filter(Boolean).length} Words
                      </span>
                    </span>
                  </div>
                  <div className="w-px h-6 bg-[#D7Cea7]/30 dark:bg-amber-500/40"></div>
                  <button
                    onClick={onRestart}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-amber-500 via-[#D97706] to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white dark:text-slate-950 font-messiri font-bold text-sm sm:text-base rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 group whitespace-nowrap"
                    title="Change topic or restart this writing task"
                  >
                    <RotateCcw size={16} className="transition-transform group-hover:-rotate-180 duration-500" />
                    <span>New Topic</span>
                  </button>
                </>
              ) : currentComprehension ? (
                /* COMPREHENSION ACTIVE STATE */
                <>
                  <div className="flex items-center gap-2.5">
                    <BookOpen size={20} className="text-amber-500" />
                    <span className="font-messiri font-bold text-sm sm:text-base tracking-wide whitespace-nowrap text-white dark:text-slate-100">
                      Comprehension:{' '}
                      <span className="text-amber-400 font-bold">
                        {Object.keys(comprehensionAnswers).filter((k) => comprehensionAnswers[Number(k)]?.trim()).length} /{' '}
                        {currentComprehension.questions.length} Answered
                      </span>
                    </span>
                  </div>
                  <div className="w-px h-6 bg-[#D7Cea7]/30 dark:bg-amber-500/40"></div>
                  <button
                    onClick={onRestart}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-amber-500 via-[#D97706] to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white dark:text-slate-950 font-messiri font-bold text-sm sm:text-base rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 group whitespace-nowrap"
                    title="Load a new passage"
                  >
                    <RotateCcw size={16} className="transition-transform group-hover:-rotate-180 duration-500" />
                    <span>New Passage</span>
                  </button>
                </>
              ) : (
                /* CONFIGURATION START STATE */
                <>
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                    </span>
                    <span className="font-messiri font-bold text-sm sm:text-base tracking-wide whitespace-nowrap text-white dark:text-slate-100">
                      {examMode
                        ? isFullExam
                          ? `${selectedExamClass} Full Model Paper`
                          : `${selectedExamSections.length} Sections Selected`
                        : `${selectedTopics.length} ${selectedTopics.length === 1 ? 'Topic' : 'Topics'} Selected`}
                    </span>
                  </div>
                  <div className="w-px h-6 bg-[#D7Cea7]/30 dark:bg-amber-500/40"></div>
                  <button
                    onClick={onGenerate}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-amber-500 via-[#D97706] to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white dark:text-slate-950 font-messiri font-bold text-sm sm:text-base rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 whitespace-nowrap"
                  >
                    <Play size={16} className="fill-current" />
                    <span>{examMode ? 'Start Exam' : 'Start Practice'}</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}

      {/* Error Message */}
      {error && (
        <div className="bg-[#FEF2F2] dark:bg-red-900/20 border border-[#FECACA] dark:border-red-800 text-[#991B1B] dark:text-red-400 px-6 py-4 mb-8 flex items-center shadow-sm font-markazi rounded-lg dark:shadow-[0_0_15px_rgba(239,68,68,0.2)]">
          <span className="font-bold font-messiri mr-3 text-xl">!</span> {error}
        </div>
      )}

      {/* Results / Quiz Area */}
      <div ref={resultsRef} id="test-results-area" className="min-h-[100px] scroll-mt-28">
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
                <h2 className="text-3xl font-messiri text-[#2C1810] dark:text-slate-100 transition-colors duration-500">
                  {selectedTopics[0]}
                </h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className="font-messiri font-bold text-[#4A3728] dark:text-slate-900 bg-[#E6DEC8] dark:bg-amber-500 px-3 py-1 rounded-full text-xs tracking-wider border border-[#5D4037]/20 dark:border-amber-500/20 transition-colors duration-500 dark:shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                    Writing Task
                  </span>
                </div>
              </div>
            </div>

            {/* Prompt Card */}
            {(currentEssayTopic || currentApplication || currentLetter) && (
              <div className="mb-8 p-6 bg-[#F0EAD6] dark:bg-slate-900 rounded-xl border border-[#5D4037]/20 dark:border-amber-500/30 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#5D4037]/10 dark:border-slate-800 pb-3">
                  <h3 className="font-messiri font-bold text-2xl text-[#2C1810] dark:text-slate-100">
                    {currentEssayTopic?.title || currentApplication?.title || currentLetter?.title}
                  </h3>
                  {currentEssayTopic?.wordLimit && (
                    <span className="font-markazi text-lg text-[#4A3728] dark:text-amber-400 bg-[#E6DEC8] dark:bg-slate-800 px-3 py-1 rounded-full border border-[#D7Cea7] dark:border-slate-700">
                      Target Length: ~{currentEssayTopic.wordLimit} Words
                    </span>
                  )}
                </div>

                {/* Essay / Précis Guidance */}
                {currentEssayTopic && (
                  <div className="space-y-3">
                    {currentEssayTopic.outline && currentEssayTopic.outline.length > 0 && (
                      <div>
                        <span className="font-messiri font-bold text-sm text-[#4A3728] dark:text-amber-400 block mb-1.5">
                          Suggested Outline / Key Themes:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {currentEssayTopic.outline.map((item: string, idx: number) => (
                            <span
                              key={idx}
                              className="bg-white/80 dark:bg-slate-800 text-sm font-markazi text-[#2C1810] dark:text-slate-200 px-3 py-1 rounded border border-[#D7Cea7] dark:border-slate-700"
                            >
                              {idx + 1}. {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {currentEssayTopic.keyPoints && currentEssayTopic.keyPoints.length > 0 && (
                      <div className="p-4 bg-white/70 dark:bg-slate-800/70 rounded-lg border border-[#D7Cea7] dark:border-slate-700">
                        <span className="font-messiri font-bold text-sm text-[#4A3728] dark:text-amber-400 block mb-1">
                          Source Passage / Context:
                        </span>
                        <p className="font-markazi text-xl text-[#5D4037] dark:text-slate-300 leading-relaxed whitespace-pre-line">
                          {currentEssayTopic.keyPoints.join('\n')}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Application / Letter Scenario */}
                {(currentApplication || currentLetter) && (
                  <div className="space-y-3">
                    <div className="p-4 bg-white/70 dark:bg-slate-800/70 rounded-lg border border-[#D7Cea7] dark:border-slate-700">
                      <span className="font-messiri font-bold text-sm text-[#4A3728] dark:text-amber-400 block mb-1">
                        Task Scenario:
                      </span>
                      <p className="font-markazi text-xl text-[#5D4037] dark:text-slate-200 leading-relaxed">
                        {currentApplication?.scenario || currentLetter?.scenario}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4 text-base font-markazi pt-1 text-[#5D4037] dark:text-slate-400">
                      {(currentApplication?.recipient || currentLetter?.recipient) && (
                        <span>
                          <strong className="font-messiri text-[#2C1810] dark:text-slate-200">Recipient:</strong>{' '}
                          {currentApplication?.recipient || currentLetter?.recipient}
                        </span>
                      )}
                      {(currentApplication?.format || currentLetter?.format) && (
                        <span>
                          <strong className="font-messiri text-[#2C1810] dark:text-slate-200">Standard Sequence:</strong>{' '}
                          {(currentApplication?.format || currentLetter?.format)?.join(' → ')}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Editor */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-2 bg-[#E6DEC8] dark:bg-slate-800 rounded-lg border border-[#D7Cea7] dark:border-slate-700">
                <button
                  onClick={() => formatText('bold')}
                  className="p-1.5 hover:bg-[#5D4037]/10 dark:hover:bg-slate-700 rounded text-[#4A3728] dark:text-amber-500"
                  title="Bold"
                >
                  <Bold size={16} />
                </button>
                <button
                  onClick={() => formatText('italic')}
                  className="p-1.5 hover:bg-[#5D4037]/10 dark:hover:bg-slate-700 rounded text-[#4A3728] dark:text-amber-500"
                  title="Italic"
                >
                  <Italic size={16} />
                </button>
                <button
                  onClick={() => formatText('underline')}
                  className="p-1.5 hover:bg-[#5D4037]/10 dark:hover:bg-slate-700 rounded text-[#4A3728] dark:text-amber-500"
                  title="Underline"
                >
                  <Underline size={16} />
                </button>
                <button
                  onClick={() => formatText('list')}
                  className="p-1.5 hover:bg-[#5D4037]/10 dark:hover:bg-slate-700 rounded text-[#4A3728] dark:text-amber-500"
                  title="List item"
                >
                  <List size={16} />
                </button>
                <button
                  onClick={() => formatText('clear')}
                  className="p-1.5 hover:bg-[#5D4037]/10 dark:hover:bg-slate-700 rounded text-[#4A3728] dark:text-amber-500"
                  title="Clear formatting"
                >
                  <Eraser size={16} />
                </button>
              </div>

              <textarea
                id="writing-textarea"
                value={writingContent}
                onChange={(e) => onSetWritingContent(e.target.value)}
                placeholder="Compose your response here..."
                rows={12}
                className="w-full p-4 bg-[#fffdf5] dark:bg-slate-800 border-2 border-[#D7Cea7] dark:border-slate-700 text-[#2C1810] dark:text-slate-100 rounded-xl font-markazi text-xl focus:outline-none focus:border-[#4A3728] dark:focus:border-amber-500 leading-relaxed shadow-inner"
              ></textarea>

              <div className="flex items-center justify-between">
                <span className="text-sm font-markazi text-[#8D6E63] dark:text-slate-400">
                  Word Count:{' '}
                  <span className="font-bold text-[#4A3728] dark:text-amber-500">
                    {writingContent.trim() ? writingContent.trim().split(/\s+/).length : 0}
                  </span>
                </span>
                <Button
                  onClick={onSubmitWriting}
                  isLoading={isScoring}
                  disabled={!writingContent.trim() || isScoring}
                  variant="primary"
                >
                  {isScoring ? 'Evaluating with AI...' : 'Submit for Evaluation'}
                </Button>
              </div>
            </div>

            {/* AI Writing Evaluation Output */}
            {writingScore && (
              <div className="mt-8 p-6 bg-[#E6DEC8] dark:bg-slate-800 rounded-xl border-2 border-[#4A3728] dark:border-amber-500 shadow-xl animate-in zoom-in-95 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#5D4037]/20 dark:border-amber-500/20 pb-4">
                  <h3 className="text-2xl font-messiri font-bold text-[#4A3728] dark:text-amber-500 flex items-center gap-2">
                    <Trophy size={24} /> AI Assessment Scorecard
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="font-messiri font-bold text-sm text-[#4A3728] dark:text-slate-300">
                      Grade: <span className="text-xl font-bold text-[#4A3728] dark:text-amber-400">{writingScore.grade}</span>
                    </span>
                    <span className="font-messiri font-bold text-sm text-[#4A3728] dark:text-slate-300 bg-white/80 dark:bg-slate-900 px-3 py-1 rounded-full border border-[#D7Cea7] dark:border-slate-700">
                      Score: <span className="text-lg font-bold text-amber-600 dark:text-amber-400">{writingScore.score}/100</span>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-lg text-center border border-[#D7Cea7]/50 dark:border-slate-700">
                    <p className="text-xs uppercase text-[#8D6E63] font-bold">Grammar</p>
                    <p className="text-2xl font-bold text-[#4A3728] dark:text-amber-400">
                      {writingScore.grammarScore}/25
                    </p>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-lg text-center border border-[#D7Cea7]/50 dark:border-slate-700">
                    <p className="text-xs uppercase text-[#8D6E63] font-bold">Structure</p>
                    <p className="text-2xl font-bold text-[#4A3728] dark:text-amber-400">
                      {writingScore.structureScore}/25
                    </p>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-lg text-center border border-[#D7Cea7]/50 dark:border-slate-700">
                    <p className="text-xs uppercase text-[#8D6E63] font-bold">Content</p>
                    <p className="text-2xl font-bold text-[#4A3728] dark:text-amber-400">
                      {writingScore.contentScore}/25
                    </p>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-lg text-center border border-[#D7Cea7]/50 dark:border-slate-700">
                    <p className="text-xs uppercase text-[#8D6E63] font-bold">Tone</p>
                    <p className="text-2xl font-bold text-[#4A3728] dark:text-amber-400">
                      {writingScore.toneScore}/25
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white/80 dark:bg-slate-900/80 rounded-lg border border-[#D7Cea7] dark:border-slate-700 space-y-2">
                  <h4 className="font-messiri font-bold text-lg text-[#2C1810] dark:text-slate-200">
                    Detailed Feedback:
                  </h4>
                  <p className="font-markazi text-xl text-[#5D4037] dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {writingScore.feedback}
                  </p>
                </div>

                {writingScore.suggestions && writingScore.suggestions.length > 0 && (
                  <div className="p-4 bg-white/80 dark:bg-slate-900/80 rounded-lg border border-[#D7Cea7] dark:border-slate-700 space-y-2">
                    <h4 className="font-messiri font-bold text-lg text-[#2C1810] dark:text-slate-200">
                      Actionable Recommendations:
                    </h4>
                    <ul className="space-y-1.5 text-[#5D4037] dark:text-slate-300 font-markazi text-xl">
                      {writingScore.suggestions.map((s, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-amber-500 font-bold">✓</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Comprehension Passage UI */}
        {currentComprehension && !isLoading && !isWritingMode && (
          <div className="animate-in slide-in-from-bottom-4 duration-700 mb-12">
            <div className="mb-8 p-6 bg-[#F0EAD6] dark:bg-slate-900 rounded-xl border-2 border-[#5D4037]/20 dark:border-amber-500/30">
              <h3 className="font-messiri font-bold text-2xl text-[#2C1810] dark:text-slate-100 mb-4">
                {currentComprehension.title}
              </h3>
              <div className="font-markazi text-xl text-[#5D4037] dark:text-slate-300 leading-relaxed space-y-4 whitespace-pre-line bg-white/60 dark:bg-slate-800/60 p-6 rounded-lg border border-[#D7Cea7] dark:border-slate-700">
                {currentComprehension.passage}
              </div>
            </div>

            <div className="space-y-6">
              {currentComprehension.questions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-[#D7Cea7] dark:border-slate-700 shadow-sm"
                >
                  <p className="font-messiri font-bold text-lg text-[#2C1810] dark:text-slate-100 mb-3">
                    {idx + 1}. {q.question}
                  </p>
                  <input
                    type="text"
                    value={comprehensionAnswers[idx] || ''}
                    onChange={(e) => onSetComprehensionAnswer(idx, e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full p-3 bg-[#fffdf5] dark:bg-slate-900 border border-[#D7Cea7] dark:border-slate-700 rounded-lg font-markazi text-lg focus:outline-none focus:border-[#4A3728] dark:focus:border-amber-500 text-[#2C1810] dark:text-slate-100"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Grammar Quiz Session UI */}
        {quizSession && !isLoading && !isWritingMode && !currentComprehension && (
          <div className="animate-in slide-in-from-bottom-4 duration-700 space-y-8">
            <div className="flex items-end justify-between mb-8 pb-4 border-b border-[#5D4037]/20 dark:border-amber-500/20 transition-colors duration-500">
              <div>
                <h2 className="text-3xl font-messiri text-[#2C1810] dark:text-slate-100 transition-colors duration-500">
                  {quizSession.title}
                </h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className="font-messiri font-bold text-[#4A3728] dark:text-slate-900 bg-[#E6DEC8] dark:bg-amber-500 px-3 py-1 rounded-full text-xs tracking-wider border border-[#5D4037]/20 dark:border-amber-500/20 transition-colors duration-500 dark:shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                    {quizSession.difficulty}
                  </span>
                </div>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {quizSession.questions.map((question, index) => (
                <div key={question.id} id={`question-card-${index}`} className="scroll-mt-28">
                  <QuestionCard
                    question={question}
                    userAnswer={userAnswers[question.id]}
                    onAnswer={(answer, isCorrect) => handleCardAnswer(question.id, answer, isCorrect, index)}
                    index={index}
                  />
                </div>
              ))}
            </div>

            {/* Quiz Completion Banner / Modal Trigger */}
            {Object.keys(userAnswers).length === quizSession.questions.length && (
              <div id="quiz-completion-banner" className="scroll-mt-28 p-8 bg-[#E6DEC8] dark:bg-slate-800 rounded-xl border-2 border-[#4A3728] dark:border-amber-500 shadow-xl text-center space-y-4 animate-in zoom-in-95">
                <h3 className="text-3xl font-messiri font-bold text-[#2C1810] dark:text-slate-100">
                  Quiz Completed!
                </h3>
                <p className="font-markazi text-2xl text-[#5D4037] dark:text-slate-300">
                  You scored <span className="font-bold text-[#4A3728] dark:text-amber-500">{calculateScore()}%</span> ({getCorrectCount()}/{quizSession.questions.length} correct)
                </p>
                <Button onClick={onOpenResultModal} variant="primary" className="px-8 py-3 text-lg">
                  View Full Report Card
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
