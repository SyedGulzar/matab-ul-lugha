/**
 * Causative Verbs (Let, Make, Have, Get) - 20 Questions
 */
import { QuestionType } from '../../../types';
import type { OfflineQuestion } from '../../offlineQuestionBank';

export const CAUSATIVE_VERBS: OfflineQuestion[] = [
    // Let
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Let me ___ this.', options: ['do', 'to do', 'doing', 'done'], correctAnswer: 'do', explanation: 'Let + object + base verb.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'My father let me ___ (go) out.', correctAnswer: 'go', explanation: 'Let + base form.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She won\'t let him ___ alone.', options: ['travel', 'to travel', 'traveling', 'travels'], correctAnswer: 'travel', explanation: 'Let takes base form.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Let the children ___.', options: ['play', 'to play', 'playing', 'played'], correctAnswer: 'play', explanation: 'Let + base verb.' },
    // Make
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The teacher made us ___ the homework.', options: ['do', 'to do', 'doing', 'done'], correctAnswer: 'do', explanation: 'Make (active) + base verb.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'My mother makes me ___ (eat) vegetables.', correctAnswer: 'eat', explanation: 'Make + base form.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The joke made everyone ___.', options: ['laugh', 'to laugh', 'laughing', 'laughed'], correctAnswer: 'laugh', explanation: 'Make + base verb.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I was made ___ again.', options: ['to wait', 'wait', 'waiting', 'waited'], correctAnswer: 'to wait', explanation: 'Make (passive) + to + verb.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'He was made to ___ (apologize).', correctAnswer: 'apologize', explanation: 'Passive: was made to + base.' },
    // Have
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I had my car ___.', options: ['repaired', 'repair', 'to repair', 'repairing'], correctAnswer: 'repaired', explanation: 'Have + object + past participle (done by someone else).' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She had her hair ___ (cut).', correctAnswer: 'cut', explanation: 'Have + object + PP.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I\'ll have the mechanic ___ my car.', options: ['check', 'to check', 'checking', 'checked'], correctAnswer: 'check', explanation: 'Have + person + base verb.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'We had our house ___.', options: ['painted', 'paint', 'to paint', 'painting'], correctAnswer: 'painted', explanation: 'Have + thing + PP.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'I had him ___ (send) the email.', correctAnswer: 'send', explanation: 'Have + person + base verb.' },
    // Get
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I got my car ___.', options: ['repaired', 'repair', 'to repair', 'repairing'], correctAnswer: 'repaired', explanation: 'Get + object + PP (done by someone).' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She got her brother ___ (help) her.', correctAnswer: 'to help', explanation: 'Get + person + to + verb.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'He got his friend ___ him.', options: ['to help', 'help', 'helping', 'helped'], correctAnswer: 'to help', explanation: 'Get + person + to + verb.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I need to get this work ___.', options: ['done', 'do', 'to do', 'doing'], correctAnswer: 'done', explanation: 'Get + thing + PP.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She got the children ___ (sit) quietly.', correctAnswer: 'to sit', explanation: 'Get + person + to + verb.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'He got his passport ___ quickly.', options: ['renewed', 'renew', 'to renew', 'renewing'], correctAnswer: 'renewed', explanation: 'Get + thing + PP.' },
];
