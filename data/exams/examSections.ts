import { QuestionType, Question } from '../../types';
import { PREPOSITIONS as RAW_PREPOSITIONS } from '../questions/partsOfSpeech/prepConj';

export interface ExamSection {
    id: string;
    title: string;
    instruction: string;
    questions: Question[];
}

export const EXAM_SECTIONS = {
    PREPOSITIONS: {
        id: 'prep',
        title: 'Use Preposition',
        instruction: 'Fill in the blanks with suitable prepositions.',
        questions: [
            {
                id: 101,
                type: QuestionType.FILL_IN_BLANK,
                questionText: 'Distribute these candies ___ the children of your school.',
                correctAnswer: 'among',
                explanation: 'Use "among" for more than two people.'
            },
            {
                id: 102,
                type: QuestionType.FILL_IN_BLANK,
                questionText: 'Nurses are responsible ___ care of the patients.',
                correctAnswer: 'for',
                explanation: 'Responsible "for" something.'
            },
            ...RAW_PREPOSITIONS.map((q, i) => ({
                id: 1000 + i, // Start IDs from 1000 to avoid conflict with manually added questions
                type: q.type,
                questionText: q.questionText,
                options: q.options,
                correctAnswer: q.correctAnswer,
                explanation: q.explanation
            } as Question))
        ]
    } as ExamSection,

    ARTICLES: {
        id: 'art',
        title: 'Use Article',
        instruction: 'Fill in the blanks with suitable articles (a, an, the).',
        questions: [
            {
                id: 201,
                type: QuestionType.FILL_IN_BLANK,
                questionText: 'My uncle is ___ H.M. of a well reputed school.',
                correctAnswer: 'an',
                explanation: 'H.M starts with a vowel sound (Ay-ch), so we use "an".'
            },
            {
                id: 202,
                type: QuestionType.FILL_IN_BLANK,
                questionText: 'I like ___ book which is in your hand.',
                correctAnswer: 'the',
                explanation: 'Referring to a specific book (definite article).'
            }
        ]
    } as ExamSection,

    VOICE: {
        id: 'voice',
        title: 'Change the Voice',
        instruction: 'Change the voice of the following sentences (Active ↔ Passive).',
        questions: [
            {
                id: 301,
                type: QuestionType.FILL_IN_BLANK,
                questionText: 'The police man was chasing the thief.',
                correctAnswer: 'The thief was being chased by the police man.',
                explanation: 'Past Continuous Passive: Object + was/were + being + V3 + by + Subject.'
            },
            {
                id: 302,
                type: QuestionType.FILL_IN_BLANK,
                questionText: 'Let the bird not be caught.',
                correctAnswer: 'Do not catch the bird.',
                explanation: 'Imperative Passive "Let...not be" -> Active "Do not...".'
            },
            {
                id: 303,
                type: QuestionType.FILL_IN_BLANK,
                questionText: 'He did not plant saplings in the garden.',
                correctAnswer: 'Saplings were not planted by him in the garden.',
                explanation: 'Past Simple Passive: Object + was/were + not + V3 + by + Subject.'
            }
        ]
    } as ExamSection,

    NARRATION: {
        id: 'narration',
        title: 'Change the Narration',
        instruction: 'Change the narration (Direct ↔ Indirect).',
        questions: [
            {
                id: 401,
                type: QuestionType.FILL_IN_BLANK,
                questionText: '"Go away and never come back again." said his Boss.',
                correctAnswer: 'His Boss ordered him to go away and never come back again.',
                explanation: 'Imperative sentence (Order).'
            },
            {
                id: 402,
                type: QuestionType.FILL_IN_BLANK,
                questionText: 'Mother said to his son, "Where are you coming from now?"',
                correctAnswer: 'Mother asked his son where he was coming from then.',
                explanation: 'Interrogative: said to -> asked, now -> then.'
            },
            {
                id: 403,
                type: QuestionType.FILL_IN_BLANK,
                questionText: 'She said, "What a beautiful flower this is!"',
                correctAnswer: 'She exclaimed with wonder that that was a very beautiful flower.',
                explanation: 'Exclamatory sentence.'
            },
            {
                id: 404,
                type: QuestionType.FILL_IN_BLANK,
                questionText: 'You told me that he had done his homework.',
                correctAnswer: 'You said to me, "He has done his homework."',
                explanation: 'Indirect to Direct: told -> said to, had done -> has done.'
            }
        ]
    } as ExamSection,

    SENTENCES: {
        id: 'sentences',
        title: 'Formation of Sentences',
        instruction: 'Change the following sentences as suggested in the bracket.',
        questions: [
            {
                id: 501,
                type: QuestionType.FILL_IN_BLANK,
                questionText: 'Did he clear his exam in the first go? (Change into Assertive)',
                correctAnswer: 'He cleared his exam in the first go.',
                explanation: 'Interrogative -> Assertive (V2 form).'
            },
            {
                id: 502,
                type: QuestionType.FILL_IN_BLANK,
                questionText: 'She gets 1st position in her class. (Change into Interrogative)',
                correctAnswer: 'Does she get 1st position in her class?',
                explanation: 'Present Simple Interrogative: Does + subject + base verb.'
            },
            {
                id: 503,
                type: QuestionType.FILL_IN_BLANK,
                questionText: 'Pakistan won the match. (Change into Negative)',
                correctAnswer: 'Pakistan did not win the match.',
                explanation: 'Past Simple Negative: did not + base verb.'
            },
            {
                id: 504,
                type: QuestionType.FILL_IN_BLANK,
                questionText: 'He ate burger with great delight. (Change into Future Perfect)',
                correctAnswer: 'He will have eaten burger with great delight.',
                explanation: 'Future Perfect: will have + V3.'
            },
            {
                id: 505,
                type: QuestionType.FILL_IN_BLANK,
                questionText: 'I have drunk a glass of juice. (Change into Present Indefinite)',
                correctAnswer: 'I drink a glass of juice.',
                explanation: 'Present Indefinite (Simple): Subject + V1.'
            },
            {
                id: 506,
                type: QuestionType.FILL_IN_BLANK,
                questionText: 'Had they taken meal before sunset? (Change into Past Continuous)',
                correctAnswer: 'Were they taking meal before sunset?',
                explanation: 'Past Continuous Interrogative: Was/Were + ing.'
            }
        ]
    } as ExamSection,

    // Extra Vocabulary Section form Image
    VOCABULARY: {
        id: 'vocab',
        title: 'Vocabulary (Prefix/Suffix/Homophone)',
        instruction: 'Give the answer as directed.',
        questions: [
            {
                id: 507,
                type: QuestionType.FILL_IN_BLANK,
                questionText: 'Give Prefix to: Honest',
                correctAnswer: 'Dishonest',
                explanation: 'Dis-honest.'
            },
            {
                id: 508,
                type: QuestionType.FILL_IN_BLANK,
                questionText: 'Give Suffix to: Comfort',
                correctAnswer: 'Comfortable',
                explanation: 'Comfort-able.'
            },
            {
                id: 509,
                type: QuestionType.FILL_IN_BLANK,
                questionText: 'Give Homophone of: Accept',
                correctAnswer: 'Except',
                explanation: 'Accept vs Except.'
            }
        ]
    } as ExamSection,

    ADJECTIVES: {
        id: 'adj',
        title: 'Indicate the kind of ADJECTIVE',
        instruction: 'Identify the kind of the underlined adjective.',
        questions: [
            {
                id: 601,
                type: QuestionType.MULTIPLE_CHOICE,
                questionText: 'She ate __two__ plates of biryani.',
                options: ['Adjective of Number', 'Adjective of Quality', 'Distributive Adjective'],
                correctAnswer: 'Adjective of Number',
                explanation: 'Two matches specific number.'
            },
            {
                id: 602,
                type: QuestionType.MULTIPLE_CHOICE,
                questionText: '__Each__ student most try his best.',
                options: ['Distributive Adjective', 'Demonstrative Adjective', 'Adjective of Quality'],
                correctAnswer: 'Distributive Adjective',
                explanation: 'Each/Every are distributive.'
            },
            {
                id: 603,
                type: QuestionType.MULTIPLE_CHOICE,
                questionText: '__That__ house was very fascinated.',
                options: ['Demonstrative Adjective', 'Distributive Adjective', 'Adjective of Quantity'],
                correctAnswer: 'Demonstrative Adjective',
                explanation: 'This/That point out things.'
            },
            {
                id: 604,
                type: QuestionType.MULTIPLE_CHOICE,
                questionText: 'The patient has eaten __some__ rice only.',
                options: ['Adjective of Quantity', 'Adjective of Number', 'Adjective of Quality'],
                correctAnswer: 'Adjective of Quantity',
                explanation: 'Some indicates an indefinite quantity.'
            },
            {
                id: 605,
                type: QuestionType.MULTIPLE_CHOICE,
                questionText: 'My grandmother is very __intelligent__.',
                options: ['Adjective of Quality', 'Adjective of Quantity', 'Adjective of Number'],
                correctAnswer: 'Adjective of Quality',
                explanation: 'Intelligent describes a quality/trait.'
            }
        ]
    } as ExamSection
};

export const FULL_MODEL_PAPER_1 = [
    EXAM_SECTIONS.PREPOSITIONS,
    EXAM_SECTIONS.ARTICLES,
    EXAM_SECTIONS.VOICE,
    EXAM_SECTIONS.NARRATION,
    EXAM_SECTIONS.SENTENCES,
    EXAM_SECTIONS.VOCABULARY,
    EXAM_SECTIONS.ADJECTIVES
];
