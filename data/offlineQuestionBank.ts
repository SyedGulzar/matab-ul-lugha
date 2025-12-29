/**
 * Comprehensive Offline Question Bank
 * Re-exports modular question bank and provides utility functions
 * Total: 1000+ questions for Pakistani students
 */

import { QuestionType } from '../types';

// Re-export from modular question bank
import {
    PRESENT_SIMPLE,
    PRESENT_CONTINUOUS,
    PRESENT_PERFECT,
    PAST_SIMPLE,
    PAST_CONTINUOUS,
    FUTURE_SIMPLE,
    PAST_PERFECT,
    FUTURE_CONTINUOUS,
    FUTURE_PERFECT,
    PRESENT_PERFECT_CONTINUOUS,
    PAST_PERFECT_CONTINUOUS,
    FUTURE_PERFECT_CONTINUOUS,
} from './questions/tenses';

import {
    NOUNS,
    ADJECTIVES,
    PREPOSITIONS,
    CONJUNCTIONS,
    PRONOUNS,
    ADVERBS,
} from './questions/partsOfSpeech';

import { ACTIVE_PASSIVE_VOICE } from './questions/voice';
import { NARRATION } from './questions/narration';
import { ARTICLES } from './questions/articles';
import { CONDITIONALS } from './questions/conditionals';
import { MODAL_VERBS, CAUSATIVE_VERBS } from './questions/modals';
import { PUNCTUATION, PROVERBS, PAIR_OF_WORDS } from './questions/misc';
import { COMPREHENSION_QUESTIONS, COMPREHENSION_PASSAGES, ESSAY_TOPICS, APPLICATION_TEMPLATES } from './questions/writing';

export interface OfflineQuestion {
    type: QuestionType;
    questionText: string;
    options?: string[];
    correctAnswer: string;
    explanation: string;
}

// Topic to Question Array Mapping
export const TOPIC_QUESTION_MAP: Record<string, OfflineQuestion[]> = {
    // Tenses
    'present simple': PRESENT_SIMPLE,
    'present continuous': PRESENT_CONTINUOUS,
    'present perfect': PRESENT_PERFECT,
    'present perfect continuous': PRESENT_PERFECT_CONTINUOUS,
    'past simple': PAST_SIMPLE,
    'past continuous': PAST_CONTINUOUS,
    'past perfect': PAST_PERFECT,
    'past perfect continuous': PAST_PERFECT_CONTINUOUS,
    'future simple': FUTURE_SIMPLE,
    'future continuous': FUTURE_CONTINUOUS,
    'future perfect': FUTURE_PERFECT,
    'future perfect continuous': FUTURE_PERFECT_CONTINUOUS,

    // Tenses (alternative names)
    'intro to tenses': PRESENT_SIMPLE,
    'simple present': PRESENT_SIMPLE,
    'simple past': PAST_SIMPLE,
    'simple future': FUTURE_SIMPLE,

    // Parts of Speech
    'nouns': NOUNS,
    'noun & its types': NOUNS,
    'basic concepts': NOUNS,
    'common, proper & material nouns': NOUNS,

    'pronouns': PRONOUNS,
    'pronouns: interrogative, relative, indefinite': PRONOUNS,

    'adjectives': ADJECTIVES,

    'adverbs': ADVERBS,

    'prepositions': PREPOSITIONS,

    'conjunctions': CONJUNCTIONS,
    'conjunctions & types': CONJUNCTIONS,

    // Voice
    'active / passive voice': ACTIVE_PASSIVE_VOICE,
    'voice': ACTIVE_PASSIVE_VOICE,
    'intro to voice': ACTIVE_PASSIVE_VOICE,
    'imperative sentences': ACTIVE_PASSIVE_VOICE,
    'wh-interrogative voice': ACTIVE_PASSIVE_VOICE,
    'voice with modal verbs': ACTIVE_PASSIVE_VOICE,
    'voice with double objects': ACTIVE_PASSIVE_VOICE,
    'voice practice class': ACTIVE_PASSIVE_VOICE,

    // Narration
    'narration': NARRATION,
    'assertive narration': NARRATION,
    'interrogative narration': NARRATION,
    'imperative narration': NARRATION,
    'exclamatory & optative narration': NARRATION,

    // Articles
    'articles': ARTICLES,
    'indefinite articles (a & an)': ARTICLES,
    'definite article (the) & omission': ARTICLES,

    // Conditionals
    'conditionals': CONDITIONALS,
    'conditional sentences': CONDITIONALS,
    'conditional sentences (part 1)': CONDITIONALS,
    'conditional sentences (part 2)': CONDITIONALS,

    // Modal Verbs & Causative
    'modal verbs': MODAL_VERBS,
    'verbs & types': MODAL_VERBS,
    'causative verbs (let, make, have, get)': CAUSATIVE_VERBS,

    // Misc / Advanced Grammar
    'punctuation rules': PUNCTUATION,
    'proverbs': PROVERBS,
    'pair of words': PAIR_OF_WORDS,

    // Writing & Mechanics
    'comprehension techniques': COMPREHENSION_QUESTIONS,
};

/**
 * Get questions for a topic with fuzzy matching
 */
export function getQuestionsForTopic(topicName: string): OfflineQuestion[] | null {
    const normalized = topicName.toLowerCase().trim();

    // Direct match
    if (TOPIC_QUESTION_MAP[normalized]) {
        return TOPIC_QUESTION_MAP[normalized];
    }

    // Partial match
    for (const key of Object.keys(TOPIC_QUESTION_MAP)) {
        if (normalized.includes(key) || key.includes(normalized)) {
            return TOPIC_QUESTION_MAP[key];
        }
    }

    // Keyword-based fallback
    if (normalized.includes('present') && normalized.includes('simple')) return PRESENT_SIMPLE;
    if (normalized.includes('present') && normalized.includes('continuous') && normalized.includes('perfect')) return PRESENT_PERFECT_CONTINUOUS;
    if (normalized.includes('present') && normalized.includes('continuous')) return PRESENT_CONTINUOUS;
    if (normalized.includes('present') && normalized.includes('perfect')) return PRESENT_PERFECT;
    if (normalized.includes('past') && normalized.includes('simple')) return PAST_SIMPLE;
    if (normalized.includes('past') && normalized.includes('continuous') && normalized.includes('perfect')) return PAST_PERFECT_CONTINUOUS;
    if (normalized.includes('past') && normalized.includes('continuous')) return PAST_CONTINUOUS;
    if (normalized.includes('past') && normalized.includes('perfect')) return PAST_PERFECT;
    if (normalized.includes('future') && normalized.includes('simple')) return FUTURE_SIMPLE;
    if (normalized.includes('future') && normalized.includes('continuous') && normalized.includes('perfect')) return FUTURE_PERFECT_CONTINUOUS;
    if (normalized.includes('future') && normalized.includes('continuous')) return FUTURE_CONTINUOUS;
    if (normalized.includes('future') && normalized.includes('perfect')) return FUTURE_PERFECT;
    if (normalized.includes('tense')) return PRESENT_SIMPLE;
    if (normalized.includes('voice') || normalized.includes('passive') || normalized.includes('active')) return ACTIVE_PASSIVE_VOICE;
    if (normalized.includes('narration') || normalized.includes('speech')) return NARRATION;
    if (normalized.includes('article')) return ARTICLES;
    if (normalized.includes('conditional')) return CONDITIONALS;
    if (normalized.includes('modal')) return MODAL_VERBS;
    if (normalized.includes('causative')) return CAUSATIVE_VERBS;
    if (normalized.includes('noun')) return NOUNS;
    if (normalized.includes('pronoun')) return PRONOUNS;
    if (normalized.includes('adjective')) return ADJECTIVES;
    if (normalized.includes('adverb')) return ADVERBS;
    if (normalized.includes('preposition')) return PREPOSITIONS;
    if (normalized.includes('conjunction')) return CONJUNCTIONS;
    if (normalized.includes('punctuation')) return PUNCTUATION;
    if (normalized.includes('proverb')) return PROVERBS;
    if (normalized.includes('pair')) return PAIR_OF_WORDS;

    return null;
}

/**
 * Get all questions across all topics
 */
export function getAllQuestions(): OfflineQuestion[] {
    return [
        ...PRESENT_SIMPLE,
        ...PRESENT_CONTINUOUS,
        ...PRESENT_PERFECT,
        ...PRESENT_PERFECT_CONTINUOUS,
        ...PAST_SIMPLE,
        ...PAST_CONTINUOUS,
        ...PAST_PERFECT,
        ...PAST_PERFECT_CONTINUOUS,
        ...FUTURE_SIMPLE,
        ...FUTURE_CONTINUOUS,
        ...FUTURE_PERFECT,
        ...FUTURE_PERFECT_CONTINUOUS,
        ...NOUNS,
        ...PRONOUNS,
        ...ADJECTIVES,
        ...ADVERBS,
        ...PREPOSITIONS,
        ...CONJUNCTIONS,
        ...ACTIVE_PASSIVE_VOICE,
        ...NARRATION,
        ...ARTICLES,
        ...CONDITIONALS,
        ...MODAL_VERBS,
        ...CAUSATIVE_VERBS,
        ...PUNCTUATION,
        ...PROVERBS,
        ...PAIR_OF_WORDS,
        ...COMPREHENSION_QUESTIONS,
    ];
}

/**
 * Get total question count
 */
export function getTotalQuestionCount(): number {
    return getAllQuestions().length;
}

// Export all question arrays for direct access
export {
    PRESENT_SIMPLE,
    PRESENT_CONTINUOUS,
    PRESENT_PERFECT,
    PRESENT_PERFECT_CONTINUOUS,
    PAST_SIMPLE,
    PAST_CONTINUOUS,
    PAST_PERFECT,
    PAST_PERFECT_CONTINUOUS,
    FUTURE_SIMPLE,
    FUTURE_CONTINUOUS,
    FUTURE_PERFECT,
    FUTURE_PERFECT_CONTINUOUS,
    NOUNS,
    PRONOUNS,
    ADJECTIVES,
    ADVERBS,
    PREPOSITIONS,
    CONJUNCTIONS,
    ACTIVE_PASSIVE_VOICE,
    NARRATION,
    ARTICLES,
    CONDITIONALS,
    MODAL_VERBS,
    CAUSATIVE_VERBS,
    PUNCTUATION,
    PROVERBS,
    PAIR_OF_WORDS,
    COMPREHENSION_QUESTIONS,
    COMPREHENSION_PASSAGES,
    ESSAY_TOPICS,
    APPLICATION_TEMPLATES,
};
