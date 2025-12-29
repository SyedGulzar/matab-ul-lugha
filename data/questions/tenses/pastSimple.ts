/**
 * Past Simple Tense - 35 Questions
 */
import { QuestionType } from '../../../types';
import type { OfflineQuestion } from '../../offlineQuestionBank';

export const PAST_SIMPLE: OfflineQuestion[] = [
    // Basic Structure
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I ___ to Paris last year.', options: ['go', 'went', 'have gone', 'am going'], correctAnswer: 'went', explanation: 'Past time = past simple.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She ___ (watch) a movie yesterday.', correctAnswer: 'watched', explanation: 'Regular: add -ed.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'They ___ not come to the party.', options: ['do', 'did', 'does', 'have'], correctAnswer: 'did', explanation: 'Negative: did not.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'He ___ the book in one day.', options: ['read', 'reads', 'reading', 'is reading'], correctAnswer: 'read', explanation: 'Read (past) = "red".' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'We ___ (play) football last Sunday.', correctAnswer: 'played', explanation: 'Last Sunday = past.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ you see the accident?', options: ['Do', 'Did', 'Have', 'Are'], correctAnswer: 'Did', explanation: 'Past questions use Did.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She ___ her keys at home.', options: ['forget', 'forgot', 'has forgotten', 'forgets'], correctAnswer: 'forgot', explanation: 'Forget → forgot.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The meeting ___ (start) at 9 AM.', correctAnswer: 'started', explanation: 'Completed event.' },
    // Pakistani Context
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'We ___ the Pakistan Day parade last year.', options: ['watch', 'watched', 'watching', 'watches'], correctAnswer: 'watched', explanation: 'Last year = past simple.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Allama Iqbal ___ (write) famous poetry.', correctAnswer: 'wrote', explanation: 'Historical event.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She ___ to Lahore by train yesterday.', options: ['travel', 'traveled', 'travels', 'traveling'], correctAnswer: 'traveled', explanation: 'Yesterday = past.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The team ___ the cricket match.', options: ['win', 'won', 'wins', 'winning'], correctAnswer: 'won', explanation: 'Win → won.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'My grandmother ___ (make) delicious halwa.', correctAnswer: 'made', explanation: 'Make → made.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Imran ___ not go to the masjid.', options: ['do', 'did', 'does', 'was'], correctAnswer: 'did', explanation: 'Negative: did not.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'They ___ their Eid clothes yesterday.', options: ['buy', 'bought', 'buys', 'buying'], correctAnswer: 'bought', explanation: 'Buy → bought.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The children ___ (play) cricket in the gali.', correctAnswer: 'played', explanation: 'Completed action.' },
    // Irregular Verbs
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She ___ breakfast at 7 AM.', options: ['eat', 'ate', 'eats', 'eating'], correctAnswer: 'ate', explanation: 'Eat → ate.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'He ___ (write) a letter to his friend.', correctAnswer: 'wrote', explanation: 'Write → wrote.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I ___ a beautiful dream.', options: ['have', 'had', 'has', 'having'], correctAnswer: 'had', explanation: 'Have → had.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'They ___ the bus this morning.', options: ['catch', 'caught', 'catches', 'catching'], correctAnswer: 'caught', explanation: 'Catch → caught.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She ___ (give) me a gift.', correctAnswer: 'gave', explanation: 'Give → gave.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The dog ___ loudly.', options: ['bark', 'barked', 'barks', 'barking'], correctAnswer: 'barked', explanation: 'Regular: + ed.' },
    // Negative Form
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She ___ not like the food.', options: ['do', 'did', 'does', 'was'], correctAnswer: 'did', explanation: 'Did not + base verb.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'We ___ (not go) to school yesterday.', correctAnswer: 'did not go', explanation: 'Negative: did not go.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'He ___ not study for the exam.', options: ['do', 'did', 'does', 'was'], correctAnswer: 'did', explanation: 'Did not + base verb.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'They ___ not finish on time.', options: ['do', 'did', 'does', 'were'], correctAnswer: 'did', explanation: 'Did not + base verb.' },
    // Questions
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ she call you yesterday?', options: ['Do', 'Did', 'Does', 'Has'], correctAnswer: 'Did', explanation: 'Did + she + base verb?' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Where ___ you go last weekend?', correctAnswer: 'did', explanation: 'Did in past questions.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'What ___ he say?', options: ['do', 'did', 'does', 'has'], correctAnswer: 'did', explanation: 'What did he say?' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'When ___ they arrive?', options: ['do', 'did', 'does', 'have'], correctAnswer: 'did', explanation: 'When did they arrive?' },
    // Mixed Practice
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The phone ___ while I was cooking.', options: ['ring', 'rang', 'rings', 'ringing'], correctAnswer: 'rang', explanation: 'Ring → rang.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'I ___ (meet) her at the bazaar.', correctAnswer: 'met', explanation: 'Meet → met.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She ___ her bag in the taxi.', options: ['leave', 'left', 'leaves', 'leaving'], correctAnswer: 'left', explanation: 'Leave → left.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'We ___ to Islamabad last month.', options: ['fly', 'flew', 'flies', 'flying'], correctAnswer: 'flew', explanation: 'Fly → flew.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The teacher ___ (give) us homework.', correctAnswer: 'gave', explanation: 'Give → gave.' },
];
