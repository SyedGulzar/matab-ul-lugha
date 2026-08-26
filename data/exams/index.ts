import { ExamSection } from './sindhBoard/class9';
import { CLASS_9_SECTIONS, CLASS_9_MODEL_PAPER_1 } from './sindhBoard/class9';
import { CLASS_10_SECTIONS, CLASS_10_MODEL_PAPER_1 } from './sindhBoard/class10';
import { CLASS_11_SECTIONS, CLASS_11_MODEL_PAPER_1 } from './sindhBoard/class11';
import { CLASS_12_SECTIONS, CLASS_12_MODEL_PAPER_1 } from './sindhBoard/class12';

export type { ExamSection };
export {
  CLASS_9_SECTIONS,
  CLASS_9_MODEL_PAPER_1,
  CLASS_10_SECTIONS,
  CLASS_10_MODEL_PAPER_1,
  CLASS_11_SECTIONS,
  CLASS_11_MODEL_PAPER_1,
  CLASS_12_SECTIONS,
  CLASS_12_MODEL_PAPER_1,
};

export interface ClassExamData {
  className: string;
  boardTitle: string;
  subtitle: string;
  sections: ExamSection[];
  modelPaper: ExamSection[];
}

export const SINDH_BOARD_EXAMS: Record<string, ClassExamData> = {
  'Class IX': {
    className: 'Class IX',
    boardTitle: 'Model Paper 1 (Class IX)',
    subtitle: 'Section B (Grammar & Composition) — BSEK Karachi Board Pattern',
    sections: Object.values(CLASS_9_SECTIONS),
    modelPaper: CLASS_9_MODEL_PAPER_1,
  },
  'Class X': {
    className: 'Class X',
    boardTitle: 'Model Paper 1 (Class X)',
    subtitle: 'Section B (Grammar & Composition) — BSEK Karachi Board Pattern',
    sections: Object.values(CLASS_10_SECTIONS),
    modelPaper: CLASS_10_MODEL_PAPER_1,
  },
  'Class XI': {
    className: 'Class XI',
    boardTitle: 'Model Paper 1 (Class XI / HSSC-I)',
    subtitle: 'Section B (Applied Grammar & Language Skills) — BIEK Karachi Pattern',
    sections: Object.values(CLASS_11_SECTIONS),
    modelPaper: CLASS_11_MODEL_PAPER_1,
  },
  'Class XII': {
    className: 'Class XII',
    boardTitle: 'Model Paper 1 (Class XII / HSSC-II)',
    subtitle: 'Section B (Advanced Syntax, Idioms & Mechanics) — BIEK Karachi Pattern',
    sections: Object.values(CLASS_12_SECTIONS),
    modelPaper: CLASS_12_MODEL_PAPER_1,
  },
};

export const getExamDataByClass = (className: string): ClassExamData => {
  return SINDH_BOARD_EXAMS[className] || SINDH_BOARD_EXAMS['Class X'];
};
