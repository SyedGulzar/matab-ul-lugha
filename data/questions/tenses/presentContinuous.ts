/**
 * Present Continuous Tense - 35 Questions
 */
import { QuestionType } from '../../../types';
import type { OfflineQuestion } from '../../offlineQuestionBank';

export const PRESENT_CONTINUOUS: OfflineQuestion[] = [
    // Basic Structure
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She ___ a book right now.', options: ['reads', 'is reading', 'read', 'reading'], correctAnswer: 'is reading', explanation: 'Present continuous = is + verb-ing.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'They ___ (watch) TV at the moment.', correctAnswer: 'are watching', explanation: 'They + are + watching.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I ___ to music currently.', options: ['listen', 'am listening', 'listens', 'listened'], correctAnswer: 'am listening', explanation: 'I + am + verb-ing.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Look! The baby ___.', options: ['cries', 'is crying', 'cry', 'cried'], correctAnswer: 'is crying', explanation: '"Look!" signals now.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'He ___ (work) on a project this week.', correctAnswer: 'is working', explanation: 'Temporary actions.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'We ___ for the bus.', options: ['wait', 'are waiting', 'waits', 'waited'], correctAnswer: 'are waiting', explanation: 'We + are + waiting.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ she sleeping?', options: ['Does', 'Is', 'Do', 'Has'], correctAnswer: 'Is', explanation: 'Questions: Is + subject + verb-ing?' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The children ___ (play) in the garden.', correctAnswer: 'are playing', explanation: 'Children + are + playing.' },
    // Pakistani Context
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Ali ___ namaz in the masjid.', options: ['offers', 'is offering', 'offer', 'offered'], correctAnswer: 'is offering', explanation: 'Action happening now.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Ammi ___ (make) biryani for Eid dinner.', correctAnswer: 'is making', explanation: 'Ammi + is + making.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The students ___ Quran recitation.', options: ['practice', 'are practicing', 'practices', 'practiced'], correctAnswer: 'are practicing', explanation: 'Students + are + practicing.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Baba ___ the newspaper right now.', options: ['reads', 'is reading', 'read', 'reading'], correctAnswer: 'is reading', explanation: 'Right now = present continuous.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The rickshaw ___ (wait) outside.', correctAnswer: 'is waiting', explanation: 'Singular + is + waiting.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'We ___ for the Azan.', options: ['wait', 'are waiting', 'waits', 'waited'], correctAnswer: 'are waiting', explanation: 'We + are + waiting.' },
    // Negative Form
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She ___ not sleeping.', options: ['is', 'are', 'do', 'does'], correctAnswer: 'is', explanation: 'She + is not + verb-ing.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'They ___ (not play) cricket today.', correctAnswer: 'are not playing', explanation: 'Negative: are not + verb-ing.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I ___ not working today.', options: ['am', 'is', 'are', 'do'], correctAnswer: 'am', explanation: 'I + am not.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'He ___ not listening to me.', options: ['is', 'are', 'do', 'does'], correctAnswer: 'is', explanation: 'He + is not.' },
    // Questions
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'What ___ you doing?', options: ['do', 'are', 'is', 'does'], correctAnswer: 'are', explanation: 'What are you doing?' },
    { type: QuestionType.FILL_IN_BLANK, questionText: '___ he studying for exams?', correctAnswer: 'Is', explanation: 'Is + he + verb-ing?' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Where ___ they going?', options: ['do', 'are', 'is', 'does'], correctAnswer: 'are', explanation: 'Where are they going?' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Why ___ she crying?', options: ['do', 'is', 'are', 'does'], correctAnswer: 'is', explanation: 'Why is she crying?' },
    // Time Markers
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'He ___ TV at the moment.', options: ['watches', 'is watching', 'watch', 'watched'], correctAnswer: 'is watching', explanation: '"At the moment" = continuous.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Currently, I ___ (learn) Python.', correctAnswer: 'am learning', explanation: '"Currently" = continuous.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Listen! Someone ___.', options: ['knocks', 'is knocking', 'knock', 'knocked'], correctAnswer: 'is knocking', explanation: '"Listen!" = happening now.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'This week, we ___ history.', options: ['study', 'are studying', 'studies', 'studied'], correctAnswer: 'are studying', explanation: '"This week" = temporary.' },
    // Verb Forms
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She is ___ (run) in the park.', correctAnswer: 'running', explanation: 'Run → running (double n).' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'He is ___ (swim) in the pool.', correctAnswer: 'swimming', explanation: 'Swim → swimming (double m).' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'They are ___ (write) a letter.', correctAnswer: 'writing', explanation: 'Write → writing (drop e).' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'I am ___ (make) tea.', correctAnswer: 'making', explanation: 'Make → making (drop e).' },
    // Mixed Practice
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The phone ___. Answer it!', options: ['rings', 'is ringing', 'ring', 'rang'], correctAnswer: 'is ringing', explanation: 'Happening right now.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'My parents ___ dinner.', options: ['have', 'are having', 'has', 'had'], correctAnswer: 'are having', explanation: 'Parents + are + having.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The teacher ___ (explain) the lesson.', correctAnswer: 'is explaining', explanation: 'Teacher + is + explaining.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'It ___ outside. Take an umbrella!', options: ['rains', 'is raining', 'rain', 'rained'], correctAnswer: 'is raining', explanation: 'Current weather.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The boys ___ in the street.', options: ['play', 'are playing', 'plays', 'played'], correctAnswer: 'are playing', explanation: 'Boys + are + playing.' },
];
