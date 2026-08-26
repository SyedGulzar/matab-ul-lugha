import { QuestionType, Question } from '../../../types';
import { ExamSection } from './class9';

export const CLASS_11_SECTIONS: Record<string, ExamSection> = {
  PREPOSITIONS_ADVANCED: {
    id: 'c11_prep',
    title: 'Prepositional Phrases & Idioms',
    instruction: 'Fill in the blanks with appropriate prepositions or prepositional phrases.',
    questions: [
      {
        id: 11101,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'He has no appetite ___ wealth or fame.',
        correctAnswer: 'for',
        explanation: 'The noun "appetite" is followed by the preposition "for".'
      },
      {
        id: 11102,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'She is blind ___ the faults of her son.',
        correctAnswer: 'to',
        explanation: 'Idiomatic usage: "blind to" means unwilling to acknowledge.'
      },
      {
        id: 11103,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'The minister succumbed ___ the pressure of public opinion.',
        correctAnswer: 'to',
        explanation: 'The verb "succumb" is followed by "to".'
      },
      {
        id: 11104,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'You must abstain ___ smoking in hospital premises.',
        correctAnswer: 'from',
        explanation: '"Abstain", "refrain", and "prevent" take the preposition "from".'
      },
      {
        id: 11105,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'His arguments are contrary ___ the facts of the case.',
        correctAnswer: 'to',
        explanation: '"Contrary" is followed by "to".'
      }
    ]
  },

  ERROR_CORRECTION: {
    id: 'c11_errors',
    title: 'Correction of Sentences',
    instruction: 'Correct the grammatical errors in the following sentences.',
    questions: [
      {
        id: 11201,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'Incorrect: He is senior than me in service. (Correct the sentence)',
        correctAnswer: 'He is senior to me in service.',
        explanation: 'Latin comparatives (senior, junior, prior, superior, inferior) take "to", not "than".'
      },
      {
        id: 11202,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'Incorrect: One of the boy was absent today. (Correct the sentence)',
        correctAnswer: 'One of the boys was absent today.',
        explanation: '"One of" must be followed by a plural noun ("boys") and singular verb.'
      },
      {
        id: 11203,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'Incorrect: Neither he nor his friends was present. (Correct the sentence)',
        correctAnswer: 'Neither he nor his friends were present.',
        explanation: 'With "neither...nor", the verb agrees with the nearer subject ("friends" -> were).'
      },
      {
        id: 11204,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'Incorrect: The sceneries of Murree are breathtaking. (Correct the sentence)',
        correctAnswer: 'The scenery of Murree is breathtaking.',
        explanation: '"Scenery" is an uncountable noun and has no plural form.'
      },
      {
        id: 11205,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'Incorrect: He died from cholera yesterday. (Correct the sentence)',
        correctAnswer: 'He died of cholera yesterday.',
        explanation: 'One "dies of" a disease, not "from".'
      }
    ]
  },

  NARRATION_DIALOGUE: {
    id: 'c11_narration',
    title: 'Change the Narration (Complex)',
    instruction: 'Convert the following direct speech into indirect speech.',
    questions: [
      {
        id: 11301,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'The doctor said to the patient, "Do not take oily food, and take your medicines regularly."',
        correctAnswer: 'The doctor advised the patient not to take oily food and to take his medicines regularly.',
        explanation: 'Imperative advice: said to -> advised, do not take -> not to take.'
      },
      {
        id: 11302,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'He said to his friend, "Let us go for a walk in the garden."',
        correctAnswer: 'He proposed to his friend that they should go for a walk in the garden.',
        explanation: '"Let us" indicates a proposal/suggestion: proposed that they should.'
      },
      {
        id: 11303,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'She said, "Alas! I have lost my precious gold necklace."',
        correctAnswer: 'She exclaimed with sorrow that she had lost her precious gold necklace.',
        explanation: 'Exclamatory "Alas!": exclaimed with sorrow/grief + that + had lost.'
      },
      {
        id: 11304,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'The teacher said, "Will you participate in the debate competition tomorrow?"',
        correctAnswer: 'The teacher asked if I would participate in the debate competition the next day.',
        explanation: 'Interrogative: will -> would, tomorrow -> the next day, if/whether connector.'
      }
    ]
  },

  PUNCTUATION: {
    id: 'c11_punct',
    title: 'Punctuation & Capitalization',
    instruction: 'Select the correctly punctuated version of the given sentence.',
    questions: [
      {
        id: 11401,
        type: QuestionType.MULTIPLE_CHOICE,
        questionText: 'Identify the correctly punctuated sentence:',
        options: [
          'The traveler asked, "Can you tell me the way to the nearest railway station?"',
          'The traveler asked "Can you tell me the way to the nearest railway station"?',
          'The traveler asked, can you tell me the way to the nearest railway station?',
          'The traveler asked, "can you tell me the way to the nearest railway station"?'
        ],
        correctAnswer: 'The traveler asked, "Can you tell me the way to the nearest railway station?"',
        explanation: 'Direct quotation requires comma before quotation mark, capitalized first word, and question mark inside quotes.'
      },
      {
        id: 11402,
        type: QuestionType.MULTIPLE_CHOICE,
        questionText: 'Identify the correctly punctuated sentence:',
        options: [
          'Although he worked hard, he could not succeed in the examination.',
          'Although he worked hard; he could not succeed in the examination.',
          'Although he worked hard he could not succeed in the examination.',
          'Although, he worked hard, he could not succeed in the examination.'
        ],
        correctAnswer: 'Although he worked hard, he could not succeed in the examination.',
        explanation: 'Dependent adverb clause at the beginning of a sentence is followed by a comma.'
      },
      {
        id: 11403,
        type: QuestionType.MULTIPLE_CHOICE,
        questionText: 'Identify the correctly punctuated sentence:',
        options: [
          'Quaid-e-Azam Muhammad Ali Jinnah, the founder of Pakistan, was a visionary statesman.',
          'Quaid-e-Azam Muhammad Ali Jinnah the founder of Pakistan, was a visionary statesman.',
          'Quaid-e-Azam Muhammad Ali Jinnah, the founder of Pakistan was a visionary statesman.',
          'Quaid-e-Azam Muhammad Ali Jinnah: the founder of Pakistan, was a visionary statesman.'
        ],
        correctAnswer: 'Quaid-e-Azam Muhammad Ali Jinnah, the founder of Pakistan, was a visionary statesman.',
        explanation: 'Appositive phrases ("the founder of Pakistan") must be set off with commas on both sides.'
      }
    ]
  },

  PAIR_OF_WORDS: {
    id: 'c11_words',
    title: 'Pair of Words (Distinction in Meaning)',
    instruction: 'Choose the correct word that fits the context of the sentence.',
    questions: [
      {
        id: 11501,
        type: QuestionType.MULTIPLE_CHOICE,
        questionText: 'The climate of Quetta will ___ your health positively.',
        options: ['affect', 'effect', 'effected', 'affecting'],
        correctAnswer: 'affect',
        explanation: '"Affect" is a verb meaning to influence; "Effect" is usually a noun.'
      },
      {
        id: 11502,
        type: QuestionType.MULTIPLE_CHOICE,
        questionText: 'He was released from jail on ___ yesterday.',
        options: ['bail', 'bale', 'ball', 'bell'],
        correctAnswer: 'bail',
        explanation: '"Bail" means temporary release of an accused; "Bale" is a bundle of goods (e.g. cotton bale).'
      },
      {
        id: 11503,
        type: QuestionType.MULTIPLE_CHOICE,
        questionText: 'The judge gave a ___ verdict based on evidence.',
        options: ['judicious', 'judicial', 'judiciary', 'judgmental'],
        correctAnswer: 'judicious',
        explanation: '"Judicious" means showing good judgment or sense; "Judicial" means relating to a court of law.'
      }
    ]
  }
};

export const CLASS_11_MODEL_PAPER_1 = [
  CLASS_11_SECTIONS.PREPOSITIONS_ADVANCED,
  CLASS_11_SECTIONS.ERROR_CORRECTION,
  CLASS_11_SECTIONS.NARRATION_DIALOGUE,
  CLASS_11_SECTIONS.PUNCTUATION,
  CLASS_11_SECTIONS.PAIR_OF_WORDS
];
