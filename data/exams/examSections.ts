import { CLASS_10_SECTIONS, CLASS_10_MODEL_PAPER_1 } from './sindhBoard/class10';
import { SINDH_BOARD_EXAMS, getExamDataByClass } from './index';

export type { ExamSection } from './sindhBoard/class9';

// Backward compatibility exports
export const EXAM_SECTIONS = CLASS_10_SECTIONS;
export const FULL_MODEL_PAPER_1 = CLASS_10_MODEL_PAPER_1;

export { SINDH_BOARD_EXAMS, getExamDataByClass };
