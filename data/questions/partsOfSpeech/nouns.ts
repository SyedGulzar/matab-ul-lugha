/**
 * Nouns - 50 Questions
 */
import { QuestionType } from '../../../types';
import type { OfflineQuestion } from '../../offlineQuestionBank';

export const NOUNS: OfflineQuestion[] = [
    // Types of Nouns
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"Karachi" is a ___ noun.', options: ['Common', 'Proper', 'Abstract', 'Collective'], correctAnswer: 'Proper', explanation: 'Names of places are proper nouns.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"Happiness" is a ___ noun.', options: ['Common', 'Proper', 'Abstract', 'Material'], correctAnswer: 'Abstract', explanation: 'Feelings/ideas are abstract nouns.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: '"Gold" is a ___ noun.', correctAnswer: 'material', explanation: 'Substances are material nouns.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"Army" is a ___ noun.', options: ['Common', 'Proper', 'Abstract', 'Collective'], correctAnswer: 'Collective', explanation: 'Groups are collective nouns.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"Boy" is a ___ noun.', options: ['Common', 'Proper', 'Abstract', 'Collective'], correctAnswer: 'Common', explanation: 'General names are common nouns.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"Allama Iqbal" is a ___ noun.', options: ['Common', 'Proper', 'Abstract', 'Collective'], correctAnswer: 'Proper', explanation: 'Names of people are proper nouns.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: '"Honesty" is a ___ noun.', correctAnswer: 'abstract', explanation: 'Qualities are abstract nouns.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"Team" is a ___ noun.', options: ['Common', 'Proper', 'Abstract', 'Collective'], correctAnswer: 'Collective', explanation: 'Groups are collective nouns.' },
    // Countable vs Uncountable
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Which is uncountable?', options: ['Book', 'Water', 'Apple', 'Chair'], correctAnswer: 'Water', explanation: 'Liquids are usually uncountable.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Which is countable?', options: ['Rice', 'Sugar', 'Pen', 'Milk'], correctAnswer: 'Pen', explanation: 'We can count pens.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'I need ___ water. (a/some)', correctAnswer: 'some', explanation: 'Uncountable nouns use "some".' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'How ___ rice do you want?', options: ['many', 'much', 'few', 'several'], correctAnswer: 'much', explanation: 'Rice is uncountable.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'How ___ books do you have?', options: ['many', 'much', 'little', 'less'], correctAnswer: 'many', explanation: 'Books are countable.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'There is ___ milk in the glass. (a little/a few)', correctAnswer: 'a little', explanation: 'Milk is uncountable.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I have ___ homework today.', options: ['many', 'much', 'a', 'few'], correctAnswer: 'much', explanation: 'Homework is uncountable.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She has ___ friends.', options: ['many', 'much', 'a lot', 'little'], correctAnswer: 'many', explanation: 'Friends are countable.' },
    // Plural Forms
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The plural of "child" is ___.', correctAnswer: 'children', explanation: 'Irregular plural.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The plural of "man" is ___.', options: ['mans', 'men', 'manes', 'mens'], correctAnswer: 'men', explanation: 'Irregular plural.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The plural of "tooth" is ___.', correctAnswer: 'teeth', explanation: 'Irregular plural.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The plural of "mouse" is ___.', options: ['mouses', 'mice', 'mouse', 'mices'], correctAnswer: 'mice', explanation: 'Irregular plural.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The plural of "foot" is ___.', correctAnswer: 'feet', explanation: 'Irregular plural.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The plural of "sheep" is ___.', options: ['sheeps', 'sheep', 'sheepes', 'sheepen'], correctAnswer: 'sheep', explanation: 'Same singular and plural.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The plural of "fish" is usually ___.', correctAnswer: 'fish', explanation: 'Same singular and plural.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The plural of "knife" is ___.', options: ['knifes', 'knives', 'knifees', 'knief'], correctAnswer: 'knives', explanation: 'F → ves.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The plural of "leaf" is ___.', correctAnswer: 'leaves', explanation: 'F → ves.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The plural of "baby" is ___.', options: ['babys', 'babies', 'babyies', 'babyes'], correctAnswer: 'babies', explanation: 'Y → ies.' },
    // Collective Nouns
    { type: QuestionType.FILL_IN_BLANK, questionText: 'A ___ of bees flew away.', correctAnswer: 'swarm', explanation: 'Swarm of bees.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'A ___ of lions is called?', options: ['herd', 'flock', 'pride', 'pack'], correctAnswer: 'pride', explanation: 'Pride of lions.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'A ___ of cows is grazing.', correctAnswer: 'herd', explanation: 'Herd of cows.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'A ___ of birds flew overhead.', options: ['herd', 'flock', 'pride', 'pack'], correctAnswer: 'flock', explanation: 'Flock of birds.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'A ___ of wolves hunted together.', correctAnswer: 'pack', explanation: 'Pack of wolves.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'A ___ of ships sailed away.', options: ['fleet', 'flock', 'herd', 'pack'], correctAnswer: 'fleet', explanation: 'Fleet of ships.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'A ___ of grapes was on the table.', correctAnswer: 'bunch', explanation: 'Bunch of grapes.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'A ___ of actors performed the play.', options: ['group', 'crowd', 'team', 'troupe'], correctAnswer: 'troupe', explanation: 'Troupe of actors.' },
    // Pakistani Context
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"Pakistan" is a ___ noun.', options: ['Common', 'Proper', 'Abstract', 'Collective'], correctAnswer: 'Proper', explanation: 'Country names are proper nouns.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: '"Biryani" is a ___ noun.', correctAnswer: 'common', explanation: 'Food items are common nouns.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"The Pakistan cricket team" has the collective noun ___.', options: ['group', 'team', 'band', 'crowd'], correctAnswer: 'team', explanation: 'Team for sports.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"Lahore Fort" is a ___ noun.', options: ['Common', 'Proper', 'Abstract', 'Collective'], correctAnswer: 'Proper', explanation: 'Specific place names are proper.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: '"Faith" (Iman) is a ___ noun.', correctAnswer: 'abstract', explanation: 'Beliefs are abstract nouns.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"Indus River" is a ___ noun.', options: ['Common', 'Proper', 'Abstract', 'Collective'], correctAnswer: 'Proper', explanation: 'River names are proper nouns.' },
    // Possessive Nouns
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The boy\'s book = The book of the ___.', correctAnswer: 'boy', explanation: 'Possessive form.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The ___ toys were scattered.', options: ['childrens\'', 'children\'s', 'childrens', 'children'], correctAnswer: 'children\'s', explanation: 'Irregular plural + \'s.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'My ___ car is new. (father)', correctAnswer: 'father\'s', explanation: 'Possessive: father\'s.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The ___ wings are beautiful.', options: ['butterflys\'', 'butterfly\'s', 'butterflies\'', 'butterflyes\''], correctAnswer: 'butterfly\'s', explanation: 'Singular + \'s.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The ___ meeting was long. (teachers)', correctAnswer: 'teachers\'', explanation: 'Plural ending in s + \'.' },
    // Mixed Practice
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Which word is a noun?', options: ['quickly', 'beautiful', 'school', 'run'], correctAnswer: 'school', explanation: 'School is a place (noun).' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Which is NOT a noun?', options: ['Pakistan', 'happiness', 'quickly', 'chair'], correctAnswer: 'quickly', explanation: 'Quickly is an adverb.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Identify the noun: "The teacher gave homework." - ___.', correctAnswer: 'teacher, homework', explanation: 'Teacher and homework are nouns.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The jury ___ unanimous.', options: ['was', 'were', 'are', 'have'], correctAnswer: 'was', explanation: 'Collective noun as unit = singular.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The committee ___ decided.', options: ['has', 'have', 'are', 'were'], correctAnswer: 'has', explanation: 'Collective noun as unit = singular.' },
];
