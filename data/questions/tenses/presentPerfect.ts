/**
 * Present Perfect Tense - 35 Questions
 */
import { QuestionType } from '../../../types';
import type { OfflineQuestion } from '../../offlineQuestionBank';

export const PRESENT_PERFECT: OfflineQuestion[] = [
    // Basic Structure
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I ___ this movie before.', options: ['see', 'saw', 'have seen', 'am seeing'], correctAnswer: 'have seen', explanation: 'Present perfect for experience.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She ___ (finish) her homework.', correctAnswer: 'has finished', explanation: 'She + has + past participle.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'They ___ to Paris three times.', options: ['go', 'went', 'have been', 'are going'], correctAnswer: 'have been', explanation: 'Experiences use present perfect.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'He ___ lived here since 2010.', options: ['have', 'has', 'is', 'was'], correctAnswer: 'has', explanation: 'He takes "has".' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'We ___ (not eat) lunch yet.', correctAnswer: 'have not eaten', explanation: 'Negative: have not + PP.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ you ever visited London?', options: ['Did', 'Have', 'Do', 'Are'], correctAnswer: 'Have', explanation: '"Have you ever..."' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She has ___ the dishes.', options: ['wash', 'washed', 'washing', 'washes'], correctAnswer: 'washed', explanation: 'Has + past participle.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'I ___ (know) him for ten years.', correctAnswer: 'have known', explanation: 'Duration with "for".' },
    // Pakistani Context
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I ___ visited Minar-e-Pakistan.', options: ['have', 'has', 'am', 'was'], correctAnswer: 'have', explanation: 'I + have + PP.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She ___ (learn) the Quran by heart.', correctAnswer: 'has learned', explanation: 'She + has + learned.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'We ___ always loved cricket.', options: ['have', 'has', 'are', 'were'], correctAnswer: 'have', explanation: 'We + have.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'He ___ performed Umrah twice.', options: ['have', 'has', 'is', 'was'], correctAnswer: 'has', explanation: 'He + has + PP.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'They ___ (live) in Lahore since childhood.', correctAnswer: 'have lived', explanation: 'They + have + lived.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Pakistan ___ won the Cricket World Cup.', options: ['have', 'has', 'is', 'was'], correctAnswer: 'has', explanation: 'Pakistan (singular) + has.' },
    // Just / Already / Yet
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I have ___ finished my work.', options: ['just', 'yet', 'never', 'ever'], correctAnswer: 'just', explanation: 'Just = recently.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Have you finished your homework ___?', correctAnswer: 'yet', explanation: 'Yet in questions.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She has ___ left the office.', options: ['already', 'yet', 'never', 'ever'], correctAnswer: 'already', explanation: 'Already = before expected.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I haven\'t seen that movie ___.', options: ['already', 'yet', 'just', 'ever'], correctAnswer: 'yet', explanation: 'Yet in negatives.' },
    // Ever / Never
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Have you ___ been to Dubai?', options: ['ever', 'never', 'already', 'just'], correctAnswer: 'ever', explanation: 'Ever in questions.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'I have ___ eaten sushi.', correctAnswer: 'never', explanation: 'Never = not ever.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She has ___ failed an exam.', options: ['ever', 'never', 'already', 'just'], correctAnswer: 'never', explanation: 'Never in statements.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'This is the best biryani I have ___ tasted.', options: ['ever', 'never', 'already', 'yet'], correctAnswer: 'ever', explanation: 'Ever with superlatives.' },
    // For / Since
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I have lived here ___ 2015.', options: ['for', 'since', 'from', 'in'], correctAnswer: 'since', explanation: 'Since + specific time.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She has worked there ___ five years.', correctAnswer: 'for', explanation: 'For + duration.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'We have known each other ___ childhood.', options: ['for', 'since', 'from', 'in'], correctAnswer: 'since', explanation: 'Since + point in time.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'They have been married ___ 20 years.', options: ['for', 'since', 'from', 'in'], correctAnswer: 'for', explanation: 'For + period.' },
    // Questions
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ she completed her assignment?', options: ['Have', 'Has', 'Did', 'Does'], correctAnswer: 'Has', explanation: 'Has + she + PP?' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'How long ___ you lived here?', correctAnswer: 'have', explanation: 'How long have you...?' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Where ___ he gone?', options: ['have', 'has', 'did', 'does'], correctAnswer: 'has', explanation: 'Where has he gone?' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Why ___ they left so early?', options: ['have', 'has', 'did', 'do'], correctAnswer: 'have', explanation: 'Why have they...?' },
    // Mixed Practice
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The bus ___ already left.', options: ['have', 'has', 'is', 'was'], correctAnswer: 'has', explanation: 'Bus (singular) + has.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'I ___ (not see) Zara today.', correctAnswer: 'have not seen', explanation: 'I + have not + seen.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Someone ___ eaten my lunch!', options: ['have', 'has', 'is', 'was'], correctAnswer: 'has', explanation: 'Someone (singular) + has.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'We ___ decided to go to Murree.', options: ['have', 'has', 'are', 'were'], correctAnswer: 'have', explanation: 'We + have + decided.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'He ___ (break) his leg.', correctAnswer: 'has broken', explanation: 'He + has + broken.' },
];
