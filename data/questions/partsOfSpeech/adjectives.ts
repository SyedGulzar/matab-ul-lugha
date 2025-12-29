/**
 * Adjectives - 40 Questions
 */
import { QuestionType } from '../../../types';
import type { OfflineQuestion } from '../../offlineQuestionBank';

export const ADJECTIVES: OfflineQuestion[] = [
    // Identifying Adjectives
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The ___ cat sat on the mat.', options: ['lazy', 'lazily', 'laziness', 'laze'], correctAnswer: 'lazy', explanation: 'Adjectives modify nouns.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She is a ___ singer.', options: ['beautiful', 'beautifully', 'beauty', 'beautify'], correctAnswer: 'beautiful', explanation: 'Adjectives come before nouns.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The ___ book was on the table.', correctAnswer: 'any adjective (e.g., big, small, red)', explanation: 'Adjectives describe nouns.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The food tastes ___.', options: ['delicious', 'deliciously', 'deliciousness', 'delish'], correctAnswer: 'delicious', explanation: 'After taste, use adjectives.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'He felt ___ after the exam.', options: ['happy', 'happily', 'happiness', 'happier'], correctAnswer: 'happy', explanation: 'After felt, use adjectives.' },
    // Comparative & Superlative
    { type: QuestionType.FILL_IN_BLANK, questionText: 'This is the ___ (tall) building in Karachi.', correctAnswer: 'tallest', explanation: 'Superlative for 3+.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'My car is ___ than yours.', options: ['fast', 'faster', 'fastest', 'fastly'], correctAnswer: 'faster', explanation: 'Comparative: -er.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'This book is more ___ than that one.', options: ['interesting', 'interestingly', 'interest', 'interested'], correctAnswer: 'interesting', explanation: 'More + multi-syllable adjective.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She is the ___ (intelligent) student in class.', correctAnswer: 'most intelligent', explanation: 'Most + multi-syllable.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Ali is ___ than Ahmed.', options: ['tall', 'taller', 'tallest', 'more tall'], correctAnswer: 'taller', explanation: 'Comparative: -er.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Mount Everest is the ___ (high) mountain.', correctAnswer: 'highest', explanation: 'Superlative: -est.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'This is the ___ movie I have ever seen.', options: ['good', 'better', 'best', 'most good'], correctAnswer: 'best', explanation: 'Good → better → best.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She is ___ than her sister.', options: ['beautiful', 'more beautiful', 'most beautiful', 'beautifuler'], correctAnswer: 'more beautiful', explanation: 'Multi-syllable: more + adjective.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'This is the ___ (bad) day of my life.', correctAnswer: 'worst', explanation: 'Bad → worse → worst.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Iron is ___ than wood.', options: ['hard', 'harder', 'hardest', 'more hard'], correctAnswer: 'harder', explanation: 'Comparative: -er.' },
    // Irregular Comparatives
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Good → better → ___.', correctAnswer: 'best', explanation: 'Irregular superlative.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Bad → worse → ___.', correctAnswer: 'worst', explanation: 'Irregular superlative.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Little → less → ___.', correctAnswer: 'least', explanation: 'Irregular superlative.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Much → more → ___.', correctAnswer: 'most', explanation: 'Irregular superlative.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Far → farther → ___.', correctAnswer: 'farthest', explanation: 'Irregular superlative.' },
    // Types of Adjectives
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"This" in "This book" is a ___ adjective.', options: ['Demonstrative', 'Possessive', 'Interrogative', 'Numeral'], correctAnswer: 'Demonstrative', explanation: 'This/that/these/those.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"My" in "My pen" is a ___ adjective.', options: ['Demonstrative', 'Possessive', 'Interrogative', 'Numeral'], correctAnswer: 'Possessive', explanation: 'My/your/his/her/our/their.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Five, ten, first are ___ adjectives.', correctAnswer: 'numeral', explanation: 'Numeral adjectives show number.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"Which" in "Which book?" is a ___ adjective.', options: ['Demonstrative', 'Possessive', 'Interrogative', 'Numeral'], correctAnswer: 'Interrogative', explanation: 'Which/what/whose in questions.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"Each" in "Each student" is a ___ adjective.', options: ['Distributive', 'Possessive', 'Interrogative', 'Numeral'], correctAnswer: 'Distributive', explanation: 'Each/every/either/neither.' },
    // Order of Adjectives
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Choose the correct order:', options: ['a big red ball', 'a red big ball', 'red a big ball', 'big a red ball'], correctAnswer: 'a big red ball', explanation: 'Size before color.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Choose the correct order:', options: ['a beautiful old Pakistani rug', 'an old beautiful Pakistani rug', 'a Pakistani old beautiful rug', 'an old Pakistani beautiful rug'], correctAnswer: 'a beautiful old Pakistani rug', explanation: 'Opinion → age → origin.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'A ___ wooden table. (round/brown)', correctAnswer: 'round brown', explanation: 'Shape before color.' },
    // Pakistani Context
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The biryani was very ___.', options: ['tasty', 'tastily', 'taste', 'tasting'], correctAnswer: 'tasty', explanation: 'Adjective after was.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Karachi is a ___ city.', correctAnswer: 'any adjective (e.g., big, busy)', explanation: 'Adjectives describe nouns.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Pakistan has ___ mountains.', options: ['beautiful', 'beautifully', 'beauty', 'beautified'], correctAnswer: 'beautiful', explanation: 'Adjective before noun.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The ___ tea was refreshing.', options: ['hot', 'hotly', 'heat', 'heated'], correctAnswer: 'hot', explanation: 'Adjective describes tea.' },
    // More Practice
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She seems ___.', options: ['tired', 'tiredly', 'tiring', 'tire'], correctAnswer: 'tired', explanation: 'After seems, use adjective.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The flowers are ___ (beauty).', correctAnswer: 'beautiful', explanation: 'Adjective form.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The movie was very ___.', options: ['exciting', 'excitingly', 'excitement', 'excited'], correctAnswer: 'exciting', explanation: 'Adjective after was.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I feel ___ today.', options: ['happy', 'happily', 'happiness', 'happing'], correctAnswer: 'happy', explanation: 'After feel, use adjective.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She wore a ___ (beauty) dress.', correctAnswer: 'beautiful', explanation: 'Adjective form of beauty.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The soup smells ___.', options: ['good', 'well', 'goodly', 'nice'], correctAnswer: 'good', explanation: 'After smells, use adjective.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'He looks ___ in that suit.', options: ['smart', 'smartly', 'smartness', 'smarter'], correctAnswer: 'smart', explanation: 'After looks, use adjective.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The answer is ___ (correct).', correctAnswer: 'correct', explanation: 'Adjective after is.' },
];
