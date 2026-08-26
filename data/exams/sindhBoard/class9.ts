import { QuestionType, Question } from '../../../types';

export interface ExamSection {
  id: string;
  title: string;
  instruction: string;
  questions: Question[];
}

export const CLASS_9_SECTIONS: Record<string, ExamSection> = {
  VERB_FORMS: {
    id: 'c9_verbs',
    title: 'Correct Form of Verbs (Tenses)',
    instruction: 'Fill in the blanks with the correct form of the verb given in brackets.',
    questions: [
      {
        id: 9101,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'The sun ___ in the east. (rise)',
        correctAnswer: 'rises',
        explanation: 'Universal truth / Present Simple with singular subject: rises.'
      },
      {
        id: 9102,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'She ___ her homework before the teacher arrived. (finish)',
        correctAnswer: 'had finished',
        explanation: 'Past action completed before another past action uses Past Perfect: had finished.'
      },
      {
        id: 9103,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'They ___ football since 3 o\'clock. (play)',
        correctAnswer: 'have been playing',
        explanation: 'Action continuing from past with "since" uses Present Perfect Continuous: have been playing.'
      },
      {
        id: 9104,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'If you work hard, you ___ the examination. (pass)',
        correctAnswer: 'will pass',
        explanation: 'First Conditional: If + Present Simple, will + base verb.'
      },
      {
        id: 9105,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'The train had left before we ___ the station. (reach)',
        correctAnswer: 'reached',
        explanation: 'The second action in the past takes Past Simple: reached.'
      }
    ]
  },

  PREPOSITIONS: {
    id: 'c9_prep',
    title: 'Use of Prepositions',
    instruction: 'Fill in the blanks with suitable prepositions.',
    questions: [
      {
        id: 9201,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'He is fond ___ listening to classical music.',
        correctAnswer: 'of',
        explanation: 'The adjective "fond" is followed by preposition "of".'
      },
      {
        id: 9202,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'The cat jumped ___ the wall.',
        correctAnswer: 'over',
        explanation: 'Movement across from one side to another uses "over".'
      },
      {
        id: 9203,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'She was born ___ 14th August.',
        correctAnswer: 'on',
        explanation: 'Specific dates use preposition "on".'
      },
      {
        id: 9204,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'He divided the property ___ his two sons.',
        correctAnswer: 'between',
        explanation: 'Use "between" for two people/entities.'
      },
      {
        id: 9205,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'We should abide ___ the rules of the school.',
        correctAnswer: 'by',
        explanation: 'Fixed preposition: "abide by" means to conform to.'
      }
    ]
  },

  ARTICLES: {
    id: 'c9_art',
    title: 'Use of Articles',
    instruction: 'Fill in the blanks with appropriate articles (a, an, the, or no article).',
    questions: [
      {
        id: 9301,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'He is ___ honest and hardworking officer.',
        correctAnswer: 'an',
        explanation: '"Honest" begins with a silent \'h\' (vowel sound /ɒ/), so use "an".'
      },
      {
        id: 9302,
        type: QuestionType.FILL_IN_BLANK,
        questionText: '___ Indus is the longest river in Pakistan.',
        correctAnswer: 'The',
        explanation: 'Names of rivers take the definite article "The".'
      },
      {
        id: 9303,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'She bought ___ European car yesterday.',
        correctAnswer: 'a',
        explanation: '"European" starts with a consonant sound /juː/, so use "a".'
      },
      {
        id: 9304,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'Quaid-e-Azam was ___ great leader of Muslims.',
        correctAnswer: 'a',
        explanation: 'Singular countable noun with general reference uses "a".'
      }
    ]
  },

  VOICE: {
    id: 'c9_voice',
    title: 'Active & Passive Voice',
    instruction: 'Change the voice of the following sentences.',
    questions: [
      {
        id: 9401,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'The gardener waters the plants every morning.',
        correctAnswer: 'The plants are watered by the gardener every morning.',
        explanation: 'Present Simple Passive: Object + is/are + V3 + by + Subject.'
      },
      {
        id: 9402,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'The students were writing an essay.',
        correctAnswer: 'An essay was being written by the students.',
        explanation: 'Past Continuous Passive: Object + was/were + being + V3 + by + Subject.'
      },
      {
        id: 9403,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'Open the door.',
        correctAnswer: 'Let the door be opened.',
        explanation: 'Imperative Passive: Let + object + be + V3.'
      },
      {
        id: 9404,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'Who broke this mirror?',
        correctAnswer: 'By whom was this mirror broken?',
        explanation: 'Interrogative Voice: "Who" changes to "By whom" + auxiliary + Object + V3.'
      }
    ]
  },

  SENTENCE_TRANSFORMATION: {
    id: 'c9_sentences',
    title: 'Formation of Sentences',
    instruction: 'Transform the following sentences as indicated in the brackets.',
    questions: [
      {
        id: 9501,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'He always speaks the truth. (Change into Negative)',
        correctAnswer: 'He never tells a lie.',
        explanation: 'Affirmative to Negative without changing meaning: "always speaks the truth" -> "never tells a lie".'
      },
      {
        id: 9502,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'They play cricket in the evening. (Change into Interrogative)',
        correctAnswer: 'Do they play cricket in the evening?',
        explanation: 'Present Simple Interrogative with plural subject uses "Do".'
      },
      {
        id: 9503,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'She sang a sweet song. (Change into Past Perfect)',
        correctAnswer: 'She had sung a sweet song.',
        explanation: 'Past Perfect form: Subject + had + V3 (sung).'
      },
      {
        id: 9504,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'As soon as the bell rang, the students entered the class. (Use No sooner...than)',
        correctAnswer: 'No sooner did the bell ring than the students entered the class.',
        explanation: 'Structure: No sooner did + Subject + V1 + than + Clause.'
      }
    ]
  }
};

export const CLASS_9_MODEL_PAPER_1 = [
  CLASS_9_SECTIONS.VERB_FORMS,
  CLASS_9_SECTIONS.PREPOSITIONS,
  CLASS_9_SECTIONS.ARTICLES,
  CLASS_9_SECTIONS.VOICE,
  CLASS_9_SECTIONS.SENTENCE_TRANSFORMATION
];
