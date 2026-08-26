import { QuestionType, Question } from '../../../types';
import { ExamSection } from './class9';

export const CLASS_10_SECTIONS: Record<string, ExamSection> = {
  PREPOSITIONS: {
    id: 'c10_prep',
    title: 'Use Preposition',
    instruction: 'Fill in the blanks with suitable prepositions.',
    questions: [
      {
        id: 10101,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'Distribute these candies ___ the children of your school.',
        correctAnswer: 'among',
        explanation: 'Use "among" for distributing between more than two people.'
      },
      {
        id: 10102,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'Nurses are responsible ___ the care of the patients.',
        correctAnswer: 'for',
        explanation: 'The adjective "responsible" takes preposition "for".'
      },
      {
        id: 10103,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'He jumped ___ the swimming pool with enthusiasm.',
        correctAnswer: 'into',
        explanation: 'Movement from outside to inside uses "into".'
      },
      {
        id: 10104,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'I am proud ___ my country and culture.',
        correctAnswer: 'of',
        explanation: 'The adjective "proud" takes preposition "of".'
      }
    ]
  },

  ARTICLES: {
    id: 'c10_art',
    title: 'Use Article',
    instruction: 'Fill in the blanks with suitable articles (a, an, the, or zero article).',
    questions: [
      {
        id: 10201,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'My uncle is ___ H.M. of a well reputed school.',
        correctAnswer: 'an',
        explanation: 'H.M starts with a vowel sound (Ay-ch), so we use "an".'
      },
      {
        id: 10202,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'I like ___ book which is in your hand.',
        correctAnswer: 'the',
        explanation: 'Referring to a specific book (definite article).'
      },
      {
        id: 10203,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'He wants to become ___ engineer.',
        correctAnswer: 'an',
        explanation: '"Engineer" begins with a vowel sound (/ɛ/), so use "an".'
      },
      {
        id: 10204,
        type: QuestionType.FILL_IN_BLANK,
        questionText: '___ Holy Quran is the last divine book.',
        correctAnswer: 'The',
        explanation: 'Names of holy scriptures take the definite article "The".'
      }
    ]
  },

  VOICE: {
    id: 'c10_voice',
    title: 'Change the Voice',
    instruction: 'Change the voice of the following sentences (Active ↔ Passive).',
    questions: [
      {
        id: 10301,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'The policeman was chasing the thief.',
        correctAnswer: 'The thief was being chased by the policeman.',
        explanation: 'Past Continuous Passive: Object + was/were + being + V3 + by + Subject.'
      },
      {
        id: 10302,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'Let the bird not be caught.',
        correctAnswer: 'Do not catch the bird.',
        explanation: 'Imperative Passive "Let...not be" converts to Active "Do not...".'
      },
      {
        id: 10303,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'He did not plant saplings in the garden.',
        correctAnswer: 'Saplings were not planted by him in the garden.',
        explanation: 'Past Simple Passive: Object + were + not + V3 + by + Subject.'
      },
      {
        id: 10304,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'We should obey our parents.',
        correctAnswer: 'Our parents should be obeyed by us.',
        explanation: 'Modal Passive: Modal (should) + be + V3.'
      }
    ]
  },

  NARRATION: {
    id: 'c10_narration',
    title: 'Change the Narration',
    instruction: 'Change the narration (Direct ↔ Indirect).',
    questions: [
      {
        id: 10401,
        type: QuestionType.FILL_IN_BLANK,
        questionText: '"Go away and never come back again." said his Boss.',
        correctAnswer: 'His Boss ordered him to go away and never come back again.',
        explanation: 'Imperative reporting: said -> ordered + to + verb.'
      },
      {
        id: 10402,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'Mother said to her son, "Where are you coming from now?"',
        correctAnswer: 'Mother asked her son where he was coming from then.',
        explanation: 'WH-Question: said to -> asked, are coming -> was coming, now -> then.'
      },
      {
        id: 10403,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'She said, "What a beautiful flower this is!"',
        correctAnswer: 'She exclaimed with wonder that that was a very beautiful flower.',
        explanation: 'Exclamatory: said -> exclaimed with wonder, this is -> that was.'
      },
      {
        id: 10404,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'The teacher said to the students, "The earth revolves around the sun."',
        correctAnswer: 'The teacher told the students that the earth revolves around the sun.',
        explanation: 'Universal facts maintain Present Simple tense in indirect speech.'
      }
    ]
  },

  SENTENCES: {
    id: 'c10_sentences',
    title: 'Formation of Sentences',
    instruction: 'Change the following sentences as suggested in the brackets.',
    questions: [
      {
        id: 10501,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'Did he clear his exam in the first go? (Change into Assertive)',
        correctAnswer: 'He cleared his exam in the first go.',
        explanation: 'Interrogative to Assertive: Subject + V2 (cleared).'
      },
      {
        id: 10502,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'She gets 1st position in her class. (Change into Interrogative)',
        correctAnswer: 'Does she get 1st position in her class?',
        explanation: 'Present Simple Interrogative with singular subject: Does + Subject + V1.'
      },
      {
        id: 10503,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'Pakistan won the match. (Change into Negative)',
        correctAnswer: 'Pakistan did not win the match.',
        explanation: 'Past Simple Negative: Subject + did not + V1 (win).'
      },
      {
        id: 10504,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'He ate burger with great delight. (Change into Future Perfect)',
        correctAnswer: 'He will have eaten burger with great delight.',
        explanation: 'Future Perfect: Subject + will have + V3 (eaten).'
      }
    ]
  },

  VOCABULARY: {
    id: 'c10_vocab',
    title: 'Vocabulary (Prefix/Suffix/Homophone)',
    instruction: 'Give the answer as directed in each question.',
    questions: [
      {
        id: 10601,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'Give Prefix to make opposite of: Honest',
        correctAnswer: 'Dishonest',
        explanation: 'Prefix: Dis- + honest = Dishonest.'
      },
      {
        id: 10602,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'Give Suffix to: Comfort',
        correctAnswer: 'Comfortable',
        explanation: 'Suffix: Comfort + -able = Comfortable.'
      },
      {
        id: 10603,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'Give Homophone of: Accept',
        correctAnswer: 'Except',
        explanation: 'Accept (to receive) sounds similar to Except (excluding).'
      },
      {
        id: 10604,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'Give Suffix to: Beauty',
        correctAnswer: 'Beautiful',
        explanation: 'Beauty + -ful = Beautiful.'
      }
    ]
  },

  ADJECTIVES: {
    id: 'c10_adj',
    title: 'Indicate the Kind of Adjective',
    instruction: 'Identify the kind of the underlined adjective.',
    questions: [
      {
        id: 10701,
        type: QuestionType.MULTIPLE_CHOICE,
        questionText: 'She ate __two__ plates of biryani.',
        options: ['Adjective of Number', 'Adjective of Quality', 'Distributive Adjective', 'Demonstrative Adjective'],
        correctAnswer: 'Adjective of Number',
        explanation: '"Two" represents a definite numeral adjective (Adjective of Number).'
      },
      {
        id: 10702,
        type: QuestionType.MULTIPLE_CHOICE,
        questionText: '__Each__ student must try his best.',
        options: ['Distributive Adjective', 'Demonstrative Adjective', 'Adjective of Quality', 'Proper Adjective'],
        correctAnswer: 'Distributive Adjective',
        explanation: '"Each", "Every", "Neither", "Either" are Distributive Adjectives.'
      },
      {
        id: 10703,
        type: QuestionType.MULTIPLE_CHOICE,
        questionText: '__That__ house was very fascinating.',
        options: ['Demonstrative Adjective', 'Distributive Adjective', 'Adjective of Quantity', 'Interrogative Adjective'],
        correctAnswer: 'Demonstrative Adjective',
        explanation: '"This", "That", "These", "Those" point out specific nouns (Demonstrative).'
      },
      {
        id: 10704,
        type: QuestionType.MULTIPLE_CHOICE,
        questionText: 'The patient has eaten __some__ rice only.',
        options: ['Adjective of Quantity', 'Adjective of Number', 'Adjective of Quality', 'Possessive Adjective'],
        correctAnswer: 'Adjective of Quantity',
        explanation: '"Some" with uncountable noun "rice" indicates quantity (Adjective of Quantity).'
      }
    ]
  }
};

export const CLASS_10_MODEL_PAPER_1 = [
  CLASS_10_SECTIONS.PREPOSITIONS,
  CLASS_10_SECTIONS.ARTICLES,
  CLASS_10_SECTIONS.VOICE,
  CLASS_10_SECTIONS.NARRATION,
  CLASS_10_SECTIONS.SENTENCES,
  CLASS_10_SECTIONS.VOCABULARY,
  CLASS_10_SECTIONS.ADJECTIVES
];
