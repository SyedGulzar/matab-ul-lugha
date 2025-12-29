/**
 * Present Simple Tense - 35 Questions
 * For Pakistani students with culturally relevant examples
 */
import { QuestionType } from '../../../types';
import type { OfflineQuestion } from '../../offlineQuestionBank';

export const PRESENT_SIMPLE: OfflineQuestion[] = [
    // Basic Structure
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She ___ to school every day.', options: ['go', 'goes', 'going', 'gone'], correctAnswer: 'goes', explanation: 'Third person singular takes -s/-es.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'They ___ football on weekends.', options: ['plays', 'play', 'playing', 'played'], correctAnswer: 'play', explanation: 'Plural subjects use base form.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The sun ___ (rise) in the east.', correctAnswer: 'rises', explanation: 'Universal truths use present simple.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'He ___ not like coffee.', options: ['do', 'does', 'is', 'has'], correctAnswer: 'does', explanation: 'Negative with he/she/it uses "does not".' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ you speak English?', options: ['Do', 'Does', 'Are', 'Is'], correctAnswer: 'Do', explanation: 'Questions with "you" use "Do".' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'My mother ___ (cook) dinner every evening.', correctAnswer: 'cooks', explanation: 'Mother is third person singular.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The train ___ at 9 AM daily.', options: ['leave', 'leaves', 'leaving', 'left'], correctAnswer: 'leaves', explanation: 'Scheduled events use present simple.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Water ___ at 100 degrees Celsius.', options: ['boil', 'boils', 'boiling', 'boiled'], correctAnswer: 'boils', explanation: 'Scientific facts use present simple.' },
    // Pakistani Context
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Ahmed ___ to Karachi Grammar School every day.', options: ['go', 'goes', 'going', 'gone'], correctAnswer: 'goes', explanation: 'Ahmed is third person singular.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Clifton Beach ___ (attract) many visitors.', correctAnswer: 'attracts', explanation: 'Singular subject = attracts.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Fatima ___ biryani very well.', options: ['cook', 'cooks', 'cooking', 'cooked'], correctAnswer: 'cooks', explanation: 'Fatima is third person singular.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The shopkeeper ___ fresh fruits.', options: ['sell', 'sells', 'selling', 'sold'], correctAnswer: 'sells', explanation: 'Singular subject takes -s.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'My father ___ (work) in a bank in Saddar.', correctAnswer: 'works', explanation: 'Father is third person singular.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Students ___ Urdu and English at school.', options: ['learns', 'learn', 'learning', 'learned'], correctAnswer: 'learn', explanation: 'Plural subject = base form.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ Ali pray five times a day?', options: ['Do', 'Does', 'Is', 'Are'], correctAnswer: 'Does', explanation: 'Ali is third person singular.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The rickshaw ___ (cost) less than a taxi.', correctAnswer: 'costs', explanation: 'Singular subject = costs.' },
    // Third Person Singular Rules
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She ___ her homework after school.', options: ['do', 'does', 'doing', 'done'], correctAnswer: 'does', explanation: 'She + does.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The cat ___ milk.', options: ['drink', 'drinks', 'drinking', 'drank'], correctAnswer: 'drinks', explanation: 'Cat is singular.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'My brother ___ (watch) TV every night.', correctAnswer: 'watches', explanation: 'Watch + es for third person.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She ___ to the gym daily.', options: ['go', 'goes', 'going', 'went'], correctAnswer: 'goes', explanation: 'Go + es for third person.' },
    // Negative Sentences
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'We ___ not eat meat.', options: ['do', 'does', 'are', 'is'], correctAnswer: 'do', explanation: 'We + do not.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'He ___ (not like) spicy food.', correctAnswer: 'does not like', explanation: 'He + does not + base verb.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'They ___ not work on Fridays.', options: ['do', 'does', 'are', 'have'], correctAnswer: 'do', explanation: 'They + do not.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She ___ not speak French.', options: ['do', 'does', 'is', 'has'], correctAnswer: 'does', explanation: 'She + does not.' },
    // Questions
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ your father work in Lahore?', options: ['Do', 'Does', 'Is', 'Are'], correctAnswer: 'Does', explanation: 'Father is third person singular.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Where ___ you live?', correctAnswer: 'do', explanation: 'You + do.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'What time ___ the shop open?', options: ['do', 'does', 'is', 'are'], correctAnswer: 'does', explanation: 'Shop is singular.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'How often ___ she visit her grandparents?', options: ['do', 'does', 'is', 'has'], correctAnswer: 'does', explanation: 'She + does.' },
    // Adverbs of Frequency
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'He ___ arrives late.', options: ['always', 'never', 'often', 'All are correct'], correctAnswer: 'All are correct', explanation: 'All frequency adverbs work here.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She ___ (usually/eat) breakfast at 7 AM.', correctAnswer: 'usually eats', explanation: 'Adverb before main verb.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'We ___ go to the masjid on Fridays.', options: ['always', 'never', 'sometimes', 'All are possible'], correctAnswer: 'All are possible', explanation: 'Frequency adverbs are flexible.' },
    // Mixed Practice
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The Earth ___ around the Sun.', options: ['revolve', 'revolves', 'revolving', 'revolved'], correctAnswer: 'revolves', explanation: 'Scientific fact + singular.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Doctors ___ (help) sick people.', correctAnswer: 'help', explanation: 'Doctors is plural.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'My sister ___ in Islamabad.', options: ['live', 'lives', 'living', 'lived'], correctAnswer: 'lives', explanation: 'Sister is third person singular.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The children ___ to school by bus.', options: ['goes', 'go', 'going', 'went'], correctAnswer: 'go', explanation: 'Children is plural.' },
];
