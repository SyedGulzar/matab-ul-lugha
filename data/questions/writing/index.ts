/**
 * Writing Module Index - Essays, Applications, Letters, Comprehension
 */
export { ESSAY_TOPICS, getEssaysByCategory, getEssaysByDifficulty } from './essays';
export type { EssayTopic } from './essays';

export { APPLICATION_TEMPLATES, getApplicationsByType } from './applications';
export type { ApplicationTemplate } from './applications';

export { LETTER_TEMPLATES, getLettersByType } from './letters';
export type { LetterTemplate } from './letters';

export { COMPREHENSION_PASSAGES, COMPREHENSION_QUESTIONS, getAllComprehensionQuestions } from './comprehension';
export type { ComprehensionPassage } from './comprehension';
