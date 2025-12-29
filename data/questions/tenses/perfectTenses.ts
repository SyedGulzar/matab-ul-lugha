/**
 * Past Perfect & Future tenses - 30 Questions each
 */
import { QuestionType } from '../../../types';
import type { OfflineQuestion } from '../../offlineQuestionBank';

export const PAST_PERFECT: OfflineQuestion[] = [
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She ___ finished before I arrived.', options: ['have', 'has', 'had', 'having'], correctAnswer: 'had', explanation: 'Past perfect = had + PP.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'I ___ (eat) when he came.', correctAnswer: 'had eaten', explanation: 'Had + past participle.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'They ___ already left when we reached.', options: ['have', 'has', 'had', 'were'], correctAnswer: 'had', explanation: 'Earlier past action.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'He ___ never seen snow before.', options: ['have', 'has', 'had', 'was'], correctAnswer: 'had', explanation: 'Past perfect for experience before past event.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The train ___ (leave) before we arrived.', correctAnswer: 'had left', explanation: 'The train left first.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I realized I ___ forgotten my wallet.', options: ['have', 'has', 'had', 'was'], correctAnswer: 'had', explanation: 'Forgetting happened before realizing.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'By the time she called, I ___ completed my work.', options: ['have', 'has', 'had', 'was'], correctAnswer: 'had', explanation: 'Completing happened before calling.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'We ___ (study) Quran before going to madrasa.', correctAnswer: 'had studied', explanation: 'Studying happened first.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'After he ___ finished eating, he left.', options: ['have', 'has', 'had', 'was'], correctAnswer: 'had', explanation: 'Finishing before leaving.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She wished she ___ studied harder.', options: ['have', 'has', 'had', 'was'], correctAnswer: 'had', explanation: 'Regret about past.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'If I ___ (know), I would have helped.', correctAnswer: 'had known', explanation: 'Third conditional.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I ___ never been to Lahore before 2020.', options: ['have', 'has', 'had', 'was'], correctAnswer: 'had', explanation: 'Before a past time.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'By sunset, we ___ finished the work.', options: ['have', 'has', 'had', 'were'], correctAnswer: 'had', explanation: 'Before a past time.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'They ___ (not eat) when I called them.', correctAnswer: 'had not eaten', explanation: 'Negative: had not + PP.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ you finished before the bell rang?', options: ['Have', 'Has', 'Had', 'Did'], correctAnswer: 'Had', explanation: 'Had + subject + PP?' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I felt tired because I ___ worked all day.', options: ['have', 'has', 'had', 'was'], correctAnswer: 'had', explanation: 'Working caused tiredness.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She told me she ___ (see) that movie.', correctAnswer: 'had seen', explanation: 'Reported speech.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'When I reached, everyone ___ left.', options: ['have', 'has', 'had', 'were'], correctAnswer: 'had', explanation: 'Leaving before reaching.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'After Eid prayers, we ___ already eaten sehri.', options: ['have', 'has', 'had', 'were'], correctAnswer: 'had', explanation: 'Sehri before Eid prayers.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'I ___ (never travel) by plane before yesterday.', correctAnswer: 'had never traveled', explanation: 'First time before yesterday.' },
];

export const FUTURE_CONTINUOUS: OfflineQuestion[] = [
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'This time tomorrow, I ___ studying.', options: ['will', 'will be', 'am', 'was'], correctAnswer: 'will be', explanation: 'Future continuous = will be + verb-ing.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She ___ (wait) for you at 5 PM.', correctAnswer: 'will be waiting', explanation: 'Action in progress at future time.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'At 8 PM, they ___ having iftar.', options: ['will', 'will be', 'are', 'were'], correctAnswer: 'will be', explanation: 'Ongoing future action.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Next week, I ___ traveling to Karachi.', options: ['will', 'will be', 'am', 'was'], correctAnswer: 'will be', explanation: 'Future period.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'He ___ (work) on the project all day.', correctAnswer: 'will be working', explanation: 'Duration in future.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Don\'t call at 2 PM. I ___ sleeping.', options: ['will', 'will be', 'am', 'was'], correctAnswer: 'will be', explanation: 'Action at specific future time.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'This time next year, she ___ studying abroad.', options: ['will', 'will be', 'is', 'was'], correctAnswer: 'will be', explanation: 'Future ongoing action.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'At 9 AM, students ___ (take) exams.', correctAnswer: 'will be taking', explanation: 'Action at future time.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ you be working late tonight?', options: ['Will', 'Are', 'Do', 'Have'], correctAnswer: 'Will', explanation: 'Will + subject + be + verb-ing?' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Tomorrow at this hour, we ___ flying to Dubai.', options: ['will', 'will be', 'are', 'were'], correctAnswer: 'will be', explanation: 'Future ongoing action.' },
];

export const FUTURE_PERFECT: OfflineQuestion[] = [
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'By next year, I ___ graduated.', options: ['will', 'will have', 'will be', 'have'], correctAnswer: 'will have', explanation: 'Future perfect = will have + PP.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She ___ (finish) by 5 PM.', correctAnswer: 'will have finished', explanation: 'Completed before future time.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'By Eid, I ___ completed my Quran recitation.', options: ['will', 'will have', 'have', 'am'], correctAnswer: 'will have', explanation: 'Completed before Eid.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'They ___ left by the time you arrive.', options: ['will', 'will have', 'have', 'are'], correctAnswer: 'will have', explanation: 'Leaving before arriving.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'By 2030, Pakistan ___ (build) many new roads.', correctAnswer: 'will have built', explanation: 'Completed by 2030.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'He ___ learned English by next month.', options: ['will', 'will have', 'has', 'is'], correctAnswer: 'will have', explanation: 'Completed by next month.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'By midnight, she ___ worked for 12 hours.', options: ['will', 'will have', 'has', 'is'], correctAnswer: 'will have', explanation: 'Duration up to future time.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'I ___ (read) 50 books by December.', correctAnswer: 'will have read', explanation: 'Completed by December.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ you have finished by then?', options: ['Will', 'Do', 'Have', 'Are'], correctAnswer: 'Will', explanation: 'Will + subject + have + PP?' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'By the time he retires, he ___ served for 40 years.', options: ['will', 'will have', 'has', 'is'], correctAnswer: 'will have', explanation: 'Duration up to retirement.' },
];
