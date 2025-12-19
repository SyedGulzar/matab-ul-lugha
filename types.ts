export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  FILL_IN_BLANK = 'fill_in_blank',
}

export interface Question {
  id: number;
  type: QuestionType;
  questionText: string;
  options?: string[]; // Only for Multiple Choice
  correctAnswer: string;
  explanation: string;
}

export interface QuizSession {
  title: string;
  difficulty: string;
  questions: Question[];
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