/**
 * Proverbs - 20 Questions
 */
import { QuestionType } from '../../../types';
import type { OfflineQuestion } from '../../offlineQuestionBank';

export const PROVERBS: OfflineQuestion[] = [
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Complete: "A stitch in time ___ nine."', options: ['saves', 'sews', 'makes', 'creates'], correctAnswer: 'saves', explanation: 'Acting quickly prevents bigger problems.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Complete: "Actions speak louder than ___."', correctAnswer: 'words', explanation: 'What you do matters more than what you say.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Complete: "All that ___ is not gold."', options: ['glitters', 'shines', 'glows', 'sparkles'], correctAnswer: 'glitters', explanation: 'Appearances can be deceiving.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Complete: "An apple a day keeps the ___ away."', options: ['doctor', 'teacher', 'sickness', 'trouble'], correctAnswer: 'doctor', explanation: 'Healthy eating prevents illness.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Complete: "Honesty is the best ___."', correctAnswer: 'policy', explanation: 'Being truthful is always best.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Complete: "Practice makes ___."', options: ['perfect', 'better', 'good', 'great'], correctAnswer: 'perfect', explanation: 'Regular practice leads to mastery.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Complete: "Where there is a ___, there is a way."', options: ['will', 'path', 'road', 'wish'], correctAnswer: 'will', explanation: 'Determination finds solutions.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Complete: "Better late than ___."', correctAnswer: 'never', explanation: 'It\'s better to do something late than not at all.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Complete: "A friend in need is a friend ___."', options: ['indeed', 'in deed', 'in need', 'always'], correctAnswer: 'indeed', explanation: 'True friends help in difficult times.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Complete: "Birds of a feather flock ___."', options: ['together', 'away', 'around', 'near'], correctAnswer: 'together', explanation: 'Similar people associate with each other.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Complete: "Look before you ___."', correctAnswer: 'leap', explanation: 'Think before acting.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Complete: "Rome was not ___ in a day."', options: ['built', 'made', 'created', 'designed'], correctAnswer: 'built', explanation: 'Great things take time.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Complete: "The early bird catches the ___."', options: ['worm', 'food', 'prey', 'insect'], correctAnswer: 'worm', explanation: 'Those who start early have advantage.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Complete: "Time and tide wait for ___."', correctAnswer: 'none/no man', explanation: 'Time doesn\'t wait for anyone.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Complete: "Don\'t put all your eggs in one ___."', options: ['basket', 'box', 'bag', 'container'], correctAnswer: 'basket', explanation: 'Don\'t risk everything in one place.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Complete: "When in Rome, do as the ___ do."', options: ['Romans', 'people', 'locals', 'citizens'], correctAnswer: 'Romans', explanation: 'Follow local customs.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Complete: "The pen is mightier than the ___."', correctAnswer: 'sword', explanation: 'Words are more powerful than force.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Complete: "Too many ___ spoil the broth."', options: ['cooks', 'chefs', 'hands', 'people'], correctAnswer: 'cooks', explanation: 'Too many people in charge cause problems.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Complete: "Every ___ has a silver lining."', options: ['cloud', 'storm', 'problem', 'trouble'], correctAnswer: 'cloud', explanation: 'Every bad situation has something good.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Complete: "Knowledge is ___."', correctAnswer: 'power', explanation: 'Being informed gives you advantage.' },
];
