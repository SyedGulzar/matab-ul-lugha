/**
 * Adverbs - 30 Questions
 */
import { QuestionType } from '../../../types';
import type { OfflineQuestion } from '../../offlineQuestionBank';

export const ADVERBS: OfflineQuestion[] = [
    // Manner
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She sings ___.', options: ['beautiful', 'beautifully', 'beauty', 'beautify'], correctAnswer: 'beautifully', explanation: 'Adverbs of manner end in -ly.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'He ran ___. (quick)', correctAnswer: 'quickly', explanation: 'Quick → quickly.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'They worked ___.', options: ['hard', 'hardly', 'harder', 'hardest'], correctAnswer: 'hard', explanation: 'Hard is both adjective and adverb.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She speaks English ___.', options: ['fluent', 'fluently', 'fluence', 'fluid'], correctAnswer: 'fluently', explanation: 'Fluent → fluently.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'He drives ___. (careful)', correctAnswer: 'carefully', explanation: 'Careful → carefully.' },
    // Time
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I will do it ___.', options: ['tomorrow', 'beautifully', 'slowly', 'here'], correctAnswer: 'tomorrow', explanation: 'Tomorrow = adverb of time.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She arrived ___. (yesterday/today/now)', correctAnswer: 'yesterday', explanation: 'Adverb of time.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'We met ___.', options: ['recently', 'quickly', 'slowly', 'loudly'], correctAnswer: 'recently', explanation: 'Recently = time adverb.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'He ___ comes late.', options: ['always', 'quickly', 'slowly', 'loudly'], correctAnswer: 'always', explanation: 'Always = frequency adverb.' },
    // Place
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Come ___.', options: ['here', 'quickly', 'slowly', 'loudly'], correctAnswer: 'here', explanation: 'Here = adverb of place.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She looked ___. (everywhere/always)', correctAnswer: 'everywhere', explanation: 'Everywhere = place adverb.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The children played ___.', options: ['outside', 'quickly', 'happily', 'always'], correctAnswer: 'outside', explanation: 'Outside = place adverb.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Go ___ and turn left.', options: ['straight', 'slowly', 'quickly', 'loudly'], correctAnswer: 'straight', explanation: 'Straight = direction adverb.' },
    // Frequency
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I ___ eat breakfast at 7 AM.', options: ['usually', 'quickly', 'slowly', 'here'], correctAnswer: 'usually', explanation: 'Usually = frequency.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'He ___ forgets his keys. (never/quickly)', correctAnswer: 'never', explanation: 'Never = frequency adverb.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She is ___ late.', options: ['seldom', 'quickly', 'slowly', 'here'], correctAnswer: 'seldom', explanation: 'Seldom = rarely.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'We ___ go to the cinema.', options: ['often', 'quickly', 'slowly', 'here'], correctAnswer: 'often', explanation: 'Often = frequency.' },
    // Degree
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She is ___ beautiful.', options: ['very', 'quick', 'slow', 'here'], correctAnswer: 'very', explanation: 'Very = degree adverb.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The food is ___ hot. (too/quick)', correctAnswer: 'too', explanation: 'Too = degree adverb.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I ___ finished my work.', options: ['almost', 'beautiful', 'slow', 'here'], correctAnswer: 'almost', explanation: 'Almost = degree.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'He is ___ tired.', options: ['quite', 'quick', 'slow', 'here'], correctAnswer: 'quite', explanation: 'Quite = degree adverb.' },
    // Comparative & Superlative
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She runs ___ than me.', options: ['faster', 'fast', 'fastest', 'fastly'], correctAnswer: 'faster', explanation: 'Comparative: -er.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'He speaks English ___ (well) than Ahmed.', correctAnswer: 'better', explanation: 'Well → better → best.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She sings ___ of all.', options: ['best', 'better', 'good', 'well'], correctAnswer: 'best', explanation: 'Superlative form.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'He arrived ___ than expected.', options: ['earlier', 'early', 'earliest', 'earlyly'], correctAnswer: 'earlier', explanation: 'Comparative form.' },
    // Pakistani Context
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'We ___ pray five times a day.', options: ['regularly', 'beautiful', 'slow', 'here'], correctAnswer: 'regularly', explanation: 'Regularly = frequency.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The shopkeeper spoke ___. (polite)', correctAnswer: 'politely', explanation: 'Polite → politely.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Ammi cooks biryani ___.', options: ['perfectly', 'perfect', 'perfection', 'perfecting'], correctAnswer: 'perfectly', explanation: 'Perfect → perfectly.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The rickshaw moved ___.', options: ['slowly', 'slow', 'slower', 'slowest'], correctAnswer: 'slowly', explanation: 'Slow → slowly.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'He recites Quran ___. (beautiful)', correctAnswer: 'beautifully', explanation: 'Beautiful → beautifully.' },
];
