import React from 'react';
import { QuizSession, UserAnswers } from '../types';
import { QuestionCard } from './QuestionCard';

interface ExamPaperProps {
    session: QuizSession;
    userAnswers: UserAnswers;
    onAnswer: (questionId: number, answer: string) => void;
}

export const ExamPaper: React.FC<ExamPaperProps> = ({ session, userAnswers, onAnswer }) => {
    // Group questions by section
    const groupedQuestions: Record<string, any[]> = {};

    session.questions.forEach(q => {
        const section = q.section || 'General Questions';
        if (!groupedQuestions[section]) {
            groupedQuestions[section] = [];
        }
        groupedQuestions[section].push(q);
    });

    // Ensure sections are rendered in the order they appear in the questions (which are sorted by handleGenerate)
    // We can just iterate the unique sections found in order
    const orderedSections = Array.from(new Set(session.questions.map(q => q.section || 'General Questions')));

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            {orderedSections.map((sectionTitle) => {
                const questions = groupedQuestions[sectionTitle];
                return (
                    <div key={sectionTitle} className="bg-[#FDFBF7] dark:bg-slate-800/30 rounded-xl p-4 sm:p-6 md:p-8 border-2 border-[#D7Cea7] dark:border-slate-700 shadow-sm relative overflow-hidden">
                        {/* Section Header */}
                        <div className="relative z-10 mb-8 border-b-2 border-[#D7Cea7] dark:border-slate-600 pb-4 flex items-center gap-4">
                            <div className="w-2 h-8 bg-[#4A3728] dark:bg-amber-500 rounded-full"></div>
                            <h3 className="text-2xl md:text-3xl font-bold font-messiri text-[#2C1810] dark:text-slate-100">
                                {sectionTitle}
                            </h3>
                        </div>

                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#4A3728] dark:bg-amber-500 opacity-[0.03] rotate-45 transform translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"></div>

                        <div className="space-y-10">
                            {questions.map((q) => (
                                <QuestionCard
                                    key={q.id}
                                    question={q}
                                    onAnswer={onAnswer}
                                    savedAnswer={userAnswers[q.id]}
                                />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
