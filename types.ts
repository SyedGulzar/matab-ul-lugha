export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  FILL_IN_BLANK = 'fill_in_blank',
  SENTENCE = 'sentence',
}

export interface Question {
  id: number;
  type: QuestionType;
  questionText: string;
  options?: string[]; // Only for Multiple Choice
  scrambledWords?: string[]; // For Sentence Builder
  correctAnswer: string;
  explanation: string;
  section?: string; // For Exam Mode grouping
}

export interface QuizSession {
  id?: string;
  title: string;
  difficulty: string;
  questions: Question[];
  currentQuestionIndex: number;
  answers: UserAnswers;
  isFinished: boolean;
  startTime: number;
  score: number;
  totalQuestions: number;
  timePerQuestion: number;
}

export interface UserAnswers {
  [key: number]: {
    answer: string;
    isCorrect: boolean;
  };
}

export type DifficultyLevel =
  | 'Beginner (A1)'
  | 'Elementary (A2)'
  | 'Intermediate (B1)'
  | 'Upper Intermediate (B2)'
  | 'Advanced (C1)'
  | 'Proficiency (C2)'
  | 'Class 1-5'
  | 'Class 6-8'
  | 'Class 9'
  | 'Class 10'
  | 'Class 11'
  | 'Class 12';

export interface WritingScore {
  score: number; // 0-100
  grade: string; // A+, A, B, C, D, F
  grammarScore: number; // 0-25
  structureScore: number; // 0-25
  contentScore: number; // 0-25
  toneScore: number; // 0-25
  feedback: string;
  suggestions: string[];
}