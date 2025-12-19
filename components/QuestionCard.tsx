import React, { useState } from 'react';
import { Question, QuestionType } from '../types';
import { CheckCircle, XCircle, AlertCircle, HelpCircle, PenTool } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  onAnswer: (questionId: number, answer: string, isCorrect: boolean) => void;
  savedAnswer?: { answer: string; isCorrect: boolean };
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  onAnswer, 
  savedAnswer 
}) => {
  const [inputText, setInputText] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);

  const isAnswered = !!savedAnswer;

  const handleMCSelection = (option: string) => {
    if (isAnswered) return;
    const isCorrect = option === question.correctAnswer;
    onAnswer(question.id, option, isCorrect);
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAnswered || !inputText.trim()) return;
    
    const isCorrect = inputText.trim().toLowerCase() === question.correctAnswer.toLowerCase();
    onAnswer(question.id, inputText.trim(), isCorrect);
  };

  return (
    // Updated Card Styles: Map Legend Aesthetic
    // Dark Mode: slate-900 bg, amber-500 borders (stronger opacity)
    <div className="bg-[#F0EAD6] dark:bg-slate-900 relative rounded-lg shadow-lg border-4 border-double border-[#5D4037]/40 dark:border-amber-500/60 mb-10 overflow-hidden transition-all duration-500 hover:shadow-[0_0_25px_rgba(74,55,40,0.2)] dark:hover:shadow-[0_0_35px_rgba(245,158,11,0.25)] group paper-torn">
      
      {/* Decorative Arch Header - Ink Style */}
      <div className="h-2 bg-[#4A3728] dark:bg-amber-500 w-full transition-colors duration-500 group-hover:shadow-[0_0_15px_rgba(74,55,40,0.4)] dark:group-hover:shadow-[0_0_15px_rgba(245,158,11,0.6)]"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#4A3728] dark:bg-amber-500 rounded-b-full flex items-center justify-center opacity-10 dark:opacity-20 transition-all duration-500 group-hover:opacity-20 dark:group-hover:opacity-30"></div>

      {/* Stacked Paper Effect */}
      <div className="absolute inset-0 bg-[#E6DEC8] dark:bg-slate-800 rounded-lg -z-10 rotate-1 scale-[0.99] transition-colors duration-500"></div>

      {/* Corner Ornaments (Map Markings) */}
      <div className="absolute top-4 left-4 text-[#8D6E63]/40 dark:text-amber-500/40 pointer-events-none transition-colors duration-500 group-hover:text-[#5D4037]/60 dark:group-hover:text-amber-500/60">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
           <path d="M0 0 L10 0 L0 10 Z" />
           <path d="M4 4 L14 4 L4 14 Z" opacity="0.5"/>
        </svg>
      </div>
      <div className="absolute top-4 right-4 text-[#8D6E63]/40 dark:text-amber-500/40 pointer-events-none transform rotate-90 transition-colors duration-500 group-hover:text-[#5D4037]/60 dark:group-hover:text-amber-500/60">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
           <path d="M0 0 L10 0 L0 10 Z" />
           <path d="M4 4 L14 4 L4 14 Z" opacity="0.5"/>
        </svg>
      </div>

      <div className="p-8 relative z-10">
        <div className="flex justify-between items-center mb-6 border-b border-[#5D4037]/10 dark:border-amber-500/30 pb-4">
          <h3 className="text-xl font-messiri text-[#4A3728] dark:text-amber-400 tracking-wide flex items-center gap-4 transition-colors duration-500">
            {/* Clean Circular Number Badge (Ink) */}
            <div className="relative w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#4A3728] dark:border-amber-500 shadow-sm bg-[#E6DEC8] dark:bg-slate-950 transition-shadow duration-300 group-hover:shadow-[0_0_10px_rgba(74,55,40,0.3)] dark:group-hover:shadow-[0_0_10px_rgba(245,158,11,0.5)]">
              <span className="text-lg font-bold font-markazi text-[#4A3728] dark:text-amber-500">{question.id}</span>
            </div>
            Question
          </h3>
          {isAnswered && (
            <div className={`flex items-center px-4 py-1.5 rounded-full border text-sm font-bold shadow-sm ${
              savedAnswer.isCorrect 
                ? 'bg-[#F0FDF4] dark:bg-teal-900/50 text-[#15803D] dark:text-teal-300 border-[#15803D]/20 dark:border-teal-500/50' 
                : 'bg-[#FEF2F2] dark:bg-red-900/50 text-[#B91C1C] dark:text-red-300 border-[#B91C1C]/20 dark:border-red-500/50'
            }`}>
              {savedAnswer.isCorrect ? (
                <><CheckCircle size={16} className="mr-2" /> Correct</>
              ) : (
                <><XCircle size={16} className="mr-2" /> Incorrect</>
              )}
            </div>
          )}
        </div>

        {/* Question Text: Brighter white (slate-100) for better contrast */}
        <p className="text-[#2C1810] dark:text-slate-100 text-2xl mb-8 leading-relaxed font-markazi font-medium transition-colors duration-500" dir="auto">
          {question.questionText}
        </p>

        {/* Input Area */}
        {question.type === QuestionType.MULTIPLE_CHOICE ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.options?.map((option, idx) => {
              let btnClass = "border p-4 rounded-md text-left transition-all duration-300 font-markazi text-lg relative ";
              
              if (isAnswered) {
                if (option === question.correctAnswer) {
                  btnClass += "bg-[#F0FDF4] dark:bg-teal-900/60 border-[#15803D] dark:border-teal-500 text-[#15803D] dark:text-teal-300 shadow-sm";
                } else if (option === savedAnswer.answer && !savedAnswer.isCorrect) {
                  btnClass += "bg-[#FEF2F2] dark:bg-red-900/60 border-[#B91C1C] dark:border-red-500 text-[#B91C1C] dark:text-red-300 shadow-sm";
                } else {
                  btnClass += "bg-gray-50/50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 text-gray-400 dark:text-slate-500";
                }
              } else {
                // Hover States: Sepia for Light, Gold for Dark
                btnClass += "bg-[#FDFBF7] dark:bg-slate-800 border-[#D7Cea7] dark:border-slate-600 text-[#4A3728] dark:text-slate-200 cursor-pointer hover:border-[#5D4037] dark:hover:border-amber-400 hover:bg-[#E6DEC8] dark:hover:bg-slate-700 hover:shadow-[0_0_15px_rgba(74,55,40,0.2)] dark:hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleMCSelection(option)}
                  disabled={isAnswered}
                  className={btnClass}
                >
                  <span className={`inline-block font-bold mr-3 font-messiri text-lg ${isAnswered ? 'text-current' : 'text-[#8D6E63] dark:text-amber-500'}`}>
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
        ) : (
          <form onSubmit={handleTextSubmit} className="max-w-xl">
            <div className="flex gap-4 items-end">
              <div className="flex-1 relative group/input">
                <PenTool size={16} className="absolute left-0 bottom-4 text-[#5D4037] dark:text-amber-500 opacity-50 transition-opacity group-focus-within/input:opacity-100" />
                <input
                  type="text"
                  value={isAnswered ? savedAnswer.answer : inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={isAnswered}
                  placeholder="Type your answer here..."
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  className={`w-full pl-8 pr-3 py-3 bg-transparent border-b-2 outline-none transition-all duration-300 font-markazi text-xl
                    ${isAnswered 
                      ? (savedAnswer.isCorrect ? 'border-[#15803D] dark:border-teal-500 text-[#15803D] dark:text-teal-400' : 'border-[#B91C1C] dark:border-red-500 text-[#B91C1C] dark:text-red-400') 
                      : 'border-[#D7Cea7] dark:border-slate-600 text-[#2C1810] dark:text-amber-400 focus:border-[#5D4037] dark:focus:border-amber-500 placeholder-gray-400 dark:placeholder-slate-500 focus:shadow-[0_4px_10px_-4px_rgba(74,55,40,0.3)] dark:focus:shadow-[0_4px_10px_-4px_rgba(245,158,11,0.3)]'}`}
                />
              </div>
              {!isAnswered && (
                <button 
                  type="submit" 
                  disabled={!inputText.trim()}
                  className="bg-[#4A3728] dark:bg-amber-500 text-[#E6DEC8] dark:text-slate-900 px-8 py-2.5 rounded-md font-messiri font-bold hover:bg-[#3E2723] dark:hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-[0_0_15px_rgba(74,55,40,0.4)] dark:hover:shadow-[0_0_15px_rgba(245,158,11,0.6)]"
                >
                  Check
                </button>
              )}
            </div>
            {isAnswered && !savedAnswer.isCorrect && (
              <p className="mt-4 text-base text-[#B91C1C] dark:text-red-300 font-markazi flex items-center bg-[#FEF2F2] dark:bg-red-900/30 p-3 rounded-md border border-[#B91C1C]/10 inline-block">
                 <XCircle size={16} className="mr-2" /> Correct Answer: <span className="ml-2 font-bold font-messiri text-lg text-[#111827] dark:text-gray-100">{question.correctAnswer}</span>
              </p>
            )}
          </form>
        )}

        {/* Explanation Toggle */}
        {isAnswered && (
          <div className="mt-8 pt-6 border-t border-dashed border-[#5D4037]/20 dark:border-amber-500/30">
            <button 
              onClick={() => setShowExplanation(!showExplanation)}
              className="flex items-center text-sm text-[#8D6E63] dark:text-amber-400 hover:text-[#5D4037] dark:hover:text-amber-300 font-bold font-messiri focus:outline-none transition-all group uppercase tracking-wider shadow-none hover:drop-shadow-[0_0_8px_rgba(141,110,99,0.5)] dark:hover:drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]"
            >
              <HelpCircle size={18} className="mr-2 transition-transform group-hover:rotate-12" />
              {showExplanation ? 'Hide Explanation' : 'Read Explanation'}
            </button>
            
            {showExplanation && (
              <div className="mt-4 p-6 bg-[#E6DEC8]/50 dark:bg-slate-800 rounded-r-md border-l-4 border-[#8D6E63] dark:border-amber-500 text-[#4A3728] dark:text-slate-200 text-lg font-markazi leading-relaxed flex items-start animate-in fade-in slide-in-from-top-2 duration-300 shadow-sm dark:shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                <AlertCircle size={24} className="mr-4 flex-shrink-0 mt-1 text-[#8D6E63] dark:text-amber-500" />
                <div>
                  <h4 className="font-messiri font-bold text-[#5D4037] dark:text-amber-400 mb-1 text-sm">Explanation</h4>
                  {question.explanation}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};