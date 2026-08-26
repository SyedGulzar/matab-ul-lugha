import { QuestionType, Question } from '../../../types';
import { ExamSection } from './class9';

export const CLASS_12_SECTIONS: Record<string, ExamSection> = {
  ADVANCED_SYNTAX: {
    id: 'c12_syntax',
    title: 'Advanced Sentence Correction (Syntax)',
    instruction: 'Identify and correct the syntactic errors in the following sentences.',
    questions: [
      {
        id: 12101,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'Incorrect: Walking in the garden, a snake bit him. (Correct the dangling modifier)',
        correctAnswer: 'While he was walking in the garden, a snake bit him.',
        explanation: 'Dangling modifier: The participle "walking" modifies the subject "snake". Corrected by supplying the proper subject "he".'
      },
      {
        id: 12102,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'Incorrect: He not only lost his ticket but also his luggage. (Correct for parallelism)',
        correctAnswer: 'He lost not only his ticket but also his luggage.',
        explanation: 'Parallel structure: "not only" and "but also" must precede equivalent parts of speech (nouns: his ticket / his luggage).'
      },
      {
        id: 12103,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'Incorrect: If I was rich, I would help the poor. (Correct the subjunctive mood)',
        correctAnswer: 'If I were rich, I would help the poor.',
        explanation: 'Unreal/hypothetical conditional requires the subjunctive "were" for all persons.'
      },
      {
        id: 12104,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'Incorrect: The quality of these mangoes are not satisfactory. (Correct subject-verb agreement)',
        correctAnswer: 'The quality of these mangoes is not satisfactory.',
        explanation: 'The subject is the singular noun "quality", not the plural object of preposition "mangoes".'
      },
      {
        id: 12105,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'Incorrect: He is one of those people who is always complaining. (Correct the relative clause verb)',
        correctAnswer: 'He is one of those people who are always complaining.',
        explanation: 'The relative pronoun "who" refers to plural antecedent "people", requiring the plural verb "are".'
      }
    ]
  },

  IDIOMS_PHRASAL_VERBS: {
    id: 'c12_idioms',
    title: 'Idiomatic Expressions & Phrasal Verbs',
    instruction: 'Choose the correct meaning or completion of the given idiomatic expression.',
    questions: [
      {
        id: 12201,
        type: QuestionType.MULTIPLE_CHOICE,
        questionText: 'The phrase "To burn the midnight oil" means:',
        options: [
          'To work or study late into the night',
          'To waste electricity unnecessarily',
          'To cause an accidental fire',
          'To suffer heavy financial loss'
        ],
        correctAnswer: 'To work or study late into the night',
        explanation: '"Burn the midnight oil" originates from using oil lamps to read/work late at night.'
      },
      {
        id: 12202,
        type: QuestionType.MULTIPLE_CHOICE,
        questionText: 'The idiom "A feather in one\'s cap" signifies:',
        options: [
          'An achievement or honor to be proud of',
          'A lightweight accessory for formal attire',
          'An unexpected financial burden',
          'A humorous incident'
        ],
        correctAnswer: 'An achievement or honor to be proud of',
        explanation: '"Feather in cap" symbolizes a distinguished achievement or merit.'
      },
      {
        id: 12203,
        type: QuestionType.MULTIPLE_CHOICE,
        questionText: 'Due to continuous heavy rains, the final match was ___ until next Sunday.',
        options: ['called off', 'put off', 'taken off', 'given off'],
        correctAnswer: 'put off',
        explanation: '"Put off" means postponed; "Called off" means cancelled permanently.'
      },
      {
        id: 12204,
        type: QuestionType.MULTIPLE_CHOICE,
        questionText: 'The term "A wild goose chase" refers to:',
        options: [
          'A foolish and hopeless search or pursuit',
          'A hunting expedition in wetlands',
          'A sudden burst of anger',
          'A well-planned business venture'
        ],
        correctAnswer: 'A foolish and hopeless search or pursuit',
        explanation: '"Wild goose chase" means a search that is impossible or futile.'
      }
    ]
  },

  CAUSATIVE_ADVANCED_VOICE: {
    id: 'c12_causative',
    title: 'Causative Verbs & Advanced Voice',
    instruction: 'Complete the sentence using the correct causative verb structure.',
    questions: [
      {
        id: 12301,
        type: QuestionType.MULTIPLE_CHOICE,
        questionText: 'The strict teacher made the students ___ the entire chapter again.',
        options: ['write', 'to write', 'writing', 'wrote'],
        correctAnswer: 'write',
        explanation: 'Causative "Make" takes a bare infinitive (base form without "to"): made + object + base verb.'
      },
      {
        id: 12302,
        type: QuestionType.MULTIPLE_CHOICE,
        questionText: 'I will have my mechanic ___ the brakes of my car tomorrow.',
        options: ['inspect', 'to inspect', 'inspected', 'inspecting'],
        correctAnswer: 'inspect',
        explanation: 'Active causative "Have": have + person + base verb.'
      },
      {
        id: 12303,
        type: QuestionType.MULTIPLE_CHOICE,
        questionText: 'She got her father ___ her a new laptop for university.',
        options: ['to buy', 'buy', 'bought', 'buying'],
        correctAnswer: 'to buy',
        explanation: 'Causative "Get" with a person takes a full infinitive with "to": get + person + to + verb.'
      },
      {
        id: 12304,
        type: QuestionType.FILL_IN_BLANK,
        questionText: 'They say that honesty is the best policy. (Change into Passive Voice)',
        correctAnswer: 'It is said that honesty is the best policy.',
        explanation: 'Impersonal Passive: "They say that..." -> "It is said that...".'
      }
    ]
  },

  CONDITIONALS_SYNTAX: {
    id: 'c12_conditionals',
    title: 'Conditionals & Inversion',
    instruction: 'Fill in the blanks with the grammatically correct clause.',
    questions: [
      {
        id: 12401,
        type: QuestionType.MULTIPLE_CHOICE,
        questionText: 'Had they warned us in advance, we ___ alternate arrangements.',
        options: [
          'would have made',
          'will have made',
          'would make',
          'had made'
        ],
        correctAnswer: 'would have made',
        explanation: 'Third Conditional Inversion: Had + Subject + V3, Subject + would have + V3.'
      },
      {
        id: 12402,
        type: QuestionType.MULTIPLE_CHOICE,
        questionText: 'Scarcely had the doctor entered the clinic ___ the emergency patient arrived.',
        options: ['when', 'than', 'then', 'before'],
        correctAnswer: 'when',
        explanation: '"Scarcely / Hardly" is followed by the correlative conjunction "when".'
      },
      {
        id: 12403,
        type: QuestionType.MULTIPLE_CHOICE,
        questionText: 'No sooner did the announcement finish ___ the audience stood up to applaud.',
        options: ['than', 'when', 'then', 'after'],
        correctAnswer: 'than',
        explanation: '"No sooner" is followed by "than".'
      }
    ]
  }
};

export const CLASS_12_MODEL_PAPER_1 = [
  CLASS_12_SECTIONS.ADVANCED_SYNTAX,
  CLASS_12_SECTIONS.IDIOMS_PHRASAL_VERBS,
  CLASS_12_SECTIONS.CAUSATIVE_ADVANCED_VOICE,
  CLASS_12_SECTIONS.CONDITIONALS_SYNTAX
];
