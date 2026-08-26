import React from 'react';
import { Trophy, Flame, Camera, X } from 'lucide-react';
import { QuizSession } from '../../types';
import { Button } from '../Button';

interface ResultModalProps {
  isOpen: boolean;
  quizSession: QuizSession | null;
  streak: number;
  cumulativeStats: { correct: number; total: number };
  score: number;
  correctCount: number;
  onClose: () => void;
  onContinue: () => void;
  onScreenshot: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  quizSession,
  streak,
  cumulativeStats,
  score,
  correctCount,
  onClose,
  onContinue,
  onScreenshot,
}) => {
  if (!isOpen || !quizSession) return null;

  const getResultMessage = (scoreVal: number) => {
    if (scoreVal === 100) return "Exceptional mastery! You have conquered this domain.";
    if (scoreVal >= 80) return "Splendid work! Your command of grammar grows stronger.";
    if (scoreVal >= 60) return "Good progress. With persistent study, excellence awaits.";
    return "Every mistake is a step toward eloquence. Keep practicing!";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#4A3728]/90 dark:bg-slate-950/90 backdrop-blur-md transition-all duration-500"
        onClick={onClose}
      ></div>

      <div className="relative bg-[#F0EAD6] dark:bg-slate-900 w-full max-w-lg shadow-2xl dark:shadow-[0_0_50px_rgba(245,158,11,0.4)] rounded-2xl overflow-hidden transform transition-all border-4 border-[#D97706] dark:border-amber-500 animate-in zoom-in-95 duration-300">
        {/* Decorative Corners */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-[8px] border-l-[8px] border-[#D97706] dark:border-amber-500 rounded-tl-xl opacity-20"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-[8px] border-r-[8px] border-[#D97706] dark:border-amber-500 rounded-tr-xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-[8px] border-l-[8px] border-[#D97706] dark:border-amber-500 rounded-bl-xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-[8px] border-r-[8px] border-[#D97706] dark:border-amber-500 rounded-br-xl opacity-20"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8D6E63] dark:text-slate-500 hover:text-[#4A3728] dark:hover:text-amber-500 transition-all z-20"
        >
          <X size={24} />
        </button>

        <div className="p-10 text-center relative font-messiri">
          <div className="mb-6 inline-flex items-center justify-center w-24 h-24 bg-[#E6DEC8] dark:bg-slate-800 rounded-full border-4 border-[#D97706] dark:border-amber-500 shadow-lg dark:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-colors duration-500">
            <Trophy
              size={48}
              className="text-[#D97706] dark:text-amber-500 dark:drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]"
            />
          </div>

          <h2 className="text-6xl font-bold text-[#4A3728] dark:text-amber-500 mb-2 tracking-tighter transition-colors duration-500 dark:drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
            {score}%
          </h2>

          <p className="text-xl text-[#8D6E63] dark:text-amber-400 font-markazi font-bold mb-8 italic transition-colors duration-500">
            "{getResultMessage(score)}"
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-px bg-[#D97706]/20 dark:bg-amber-600/30 rounded-lg overflow-hidden border border-[#D97706]/20 dark:border-amber-600/30 mb-8 transition-colors duration-500">
            <div className="p-4 bg-white dark:bg-slate-800 flex flex-col items-center transition-colors duration-500">
              <p className="text-[10px] uppercase tracking-widest text-[#8D6E63] dark:text-slate-400 mb-1 font-bold">Streak</p>
              <div className="flex items-center gap-1">
                <Flame
                  size={16}
                  className={
                    streak > 0
                      ? "fill-[#D97706] text-[#D97706] dark:text-amber-500 dark:drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                      : "text-[#D7Cea7] dark:text-slate-600"
                  }
                />
                <p className="text-2xl font-bold text-[#2C1810] dark:text-slate-200">{streak}</p>
              </div>
            </div>
            <div className="p-4 bg-white dark:bg-slate-800 flex flex-col items-center transition-colors duration-500">
              <p className="text-[10px] uppercase tracking-widest text-[#8D6E63] dark:text-slate-400 mb-1 font-bold">Score</p>
              <p className="text-2xl font-bold text-[#2C1810] dark:text-slate-200">
                {correctCount}{' '}
                <span className="text-base text-[#D7Cea7] dark:text-slate-500 font-normal">
                  / {quizSession.questions.length}
                </span>
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
                onClick={onContinue}
                className="flex-1 justify-center py-4 text-lg"
              >
                Continue Journey
              </Button>
              <Button
                variant="secondary"
                onClick={onScreenshot}
                className="px-6 flex items-center justify-center"
                title="Save Certificate"
              >
                <Camera size={24} />
              </Button>
            </div>

            <Button
              variant="ghost"
              onClick={onClose}
              className="w-full justify-center text-[#4A3728] dark:text-amber-500"
            >
              Review Answers
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
