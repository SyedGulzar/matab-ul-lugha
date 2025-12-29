/**
 * Future Simple Tense - 35 Questions
 */
import { QuestionType } from '../../../types';
import type { OfflineQuestion } from '../../offlineQuestionBank';

export const FUTURE_SIMPLE: OfflineQuestion[] = [
    // Basic Structure
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She ___ you tomorrow.', options: ['call', 'calls', 'will call', 'called'], correctAnswer: 'will call', explanation: 'Future = will + base verb.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'I ___ (help) you with your homework.', correctAnswer: 'will help', explanation: 'Promises use will.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'They ___ not come to the party.', options: ['do', 'will', 'are', 'have'], correctAnswer: 'will', explanation: 'Negative: will not.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ you be at the meeting?', options: ['Do', 'Will', 'Are', 'Have'], correctAnswer: 'Will', explanation: 'Questions use Will.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'He ___ (arrive) at 5 PM.', correctAnswer: 'will arrive', explanation: 'Future predictions.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I think it ___ rain tomorrow.', options: ['is', 'will', 'does', 'has'], correctAnswer: 'will', explanation: 'Predictions with "think".' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'We ___ visit you next week.', options: ['are', 'will', 'have', 'do'], correctAnswer: 'will', explanation: 'Future plans.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She ___ (not forget) your birthday.', correctAnswer: 'will not forget', explanation: 'Negative = will not.' },
    // Pakistani Context
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'We ___ celebrate Eid next month.', options: ['will', 'shall', 'would', 'are'], correctAnswer: 'will', explanation: 'Future = will + base verb.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The flight to Islamabad ___ (depart) at 8 PM.', correctAnswer: 'will depart', explanation: 'Future schedule.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Amina ___ become a doctor InshaAllah.', options: ['will', 'is', 'was', 'has'], correctAnswer: 'will', explanation: 'Future intention.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I ___ visit my grandparents in Hyderabad.', options: ['will', 'am', 'was', 'have'], correctAnswer: 'will', explanation: 'Future plan.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Pakistan ___ (win) the match, InshaAllah.', correctAnswer: 'will win', explanation: 'Future prediction.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ you attend the mehndi ceremony?', options: ['Will', 'Do', 'Did', 'Are'], correctAnswer: 'Will', explanation: 'Future questions.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The new metro line ___ open next year.', options: ['will', 'is', 'was', 'has'], correctAnswer: 'will', explanation: 'Future event.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'They ___ (not forget) to bring samosas.', correctAnswer: 'will not forget', explanation: 'Negative future.' },
    // Shall vs Will
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ I open the window?', options: ['Will', 'Shall', 'Do', 'Am'], correctAnswer: 'Shall', explanation: 'Shall for offers (I/we).' },
    { type: QuestionType.FILL_IN_BLANK, questionText: '___ we go to the park?', correctAnswer: 'Shall', explanation: 'Shall for suggestions.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I ___ help you carry that.', options: ['shall', 'will', 'Both are correct', 'Neither'], correctAnswer: 'Both are correct', explanation: 'Both work for offers.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ I turn on the fan?', options: ['Will', 'Shall', 'Do', 'Did'], correctAnswer: 'Shall', explanation: 'Shall for offers.' },
    // Negative Form
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I ___ not be late.', options: ['do', 'will', 'am', 'have'], correctAnswer: 'will', explanation: 'Will not = won\'t.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She ___ (not come) to the party.', correctAnswer: 'will not come', explanation: 'Will not + base verb.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'They ___ not finish on time.', options: ['do', 'will', 'are', 'have'], correctAnswer: 'will', explanation: 'Will not finish.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'He ___ not accept this offer.', options: ['do', 'will', 'is', 'does'], correctAnswer: 'will', explanation: 'Will not accept.' },
    // Questions
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ she come to the wedding?', options: ['Do', 'Will', 'Does', 'Is'], correctAnswer: 'Will', explanation: 'Will + subject + verb?' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'When ___ they arrive?', correctAnswer: 'will', explanation: 'When will they...?' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Where ___ you go for vacation?', options: ['do', 'will', 'are', 'did'], correctAnswer: 'will', explanation: 'Where will you go?' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'What ___ happen next?', options: ['do', 'will', 'is', 'does'], correctAnswer: 'will', explanation: 'What will happen?' },
    // Mixed Practice
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The sun ___ rise at 6 AM tomorrow.', options: ['rise', 'will rise', 'rises', 'rising'], correctAnswer: 'will rise', explanation: 'Future event.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'I ___ (call) you after iftar.', correctAnswer: 'will call', explanation: 'Will + call.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She ___ be happy to see you.', options: ['is', 'will', 'was', 'has'], correctAnswer: 'will', explanation: 'Future prediction.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'We ___ remember this day forever.', options: ['are', 'will', 'have', 'do'], correctAnswer: 'will', explanation: 'Will + remember.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The exam ___ (start) at 9 AM.', correctAnswer: 'will start', explanation: 'Will + start.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'InshaAllah, he ___ recover soon.', options: ['is', 'will', 'was', 'has'], correctAnswer: 'will', explanation: 'Future hope.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I promise I ___ be there on time.', options: ['am', 'will', 'was', 'have'], correctAnswer: 'will', explanation: 'Promises use will.' },
];
