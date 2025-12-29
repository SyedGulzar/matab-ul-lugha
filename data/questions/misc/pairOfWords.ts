/**
 * Pair of Words - 20 Questions
 */
import { QuestionType } from '../../../types';
import type { OfflineQuestion } from '../../offlineQuestionBank';

export const PAIR_OF_WORDS: OfflineQuestion[] = [
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Accept vs Except: She will ___ the gift.', options: ['accept', 'except', 'both', 'neither'], correctAnswer: 'accept', explanation: 'Accept = receive; Except = exclude.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Affect vs Effect: The medicine will ___ your health. (affect/effect)', correctAnswer: 'affect', explanation: 'Affect (verb) = influence.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Advice vs Advise: She gave me good ___.', options: ['advice', 'advise', 'both', 'neither'], correctAnswer: 'advice', explanation: 'Advice (noun); Advise (verb).' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Principal vs Principle: The ___ of the school is strict.', options: ['principal', 'principle', 'both', 'neither'], correctAnswer: 'principal', explanation: 'Principal = head; Principle = rule.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Stationary vs Stationery: I need some ___ for school.', correctAnswer: 'stationery', explanation: 'Stationery = paper/pens; Stationary = still.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Their vs There: ___ house is beautiful.', options: ['Their', 'There', 'They\'re', 'Thier'], correctAnswer: 'Their', explanation: 'Their = belonging to them.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Your vs You\'re: ___ going to school.', options: ['You\'re', 'Your', 'Youre', 'You'], correctAnswer: 'You\'re', explanation: 'You\'re = You are.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Its vs It\'s: ___ raining outside. (Its/It\'s)', correctAnswer: 'It\'s', explanation: 'It\'s = It is.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Lose vs Loose: Don\'t ___ hope.', options: ['lose', 'loose', 'loss', 'lost'], correctAnswer: 'lose', explanation: 'Lose = fail to keep; Loose = not tight.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Quite vs Quiet: The library is ___.', options: ['quiet', 'quite', 'quit', 'queit'], correctAnswer: 'quiet', explanation: 'Quiet = silent; Quite = very.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Weather vs Whether: I don\'t know ___ to go or not.', correctAnswer: 'whether', explanation: 'Whether = if; Weather = climate.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Write vs Right: You are ___ about this.', options: ['right', 'write', 'rite', 'wright'], correctAnswer: 'right', explanation: 'Right = correct; Write = form letters.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Piece vs Peace: I want ___ in the world.', options: ['peace', 'piece', 'peas', 'peece'], correctAnswer: 'peace', explanation: 'Peace = calm; Piece = part.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Dessert vs Desert: The Sahara is a ___. (desert/dessert)', correctAnswer: 'desert', explanation: 'Desert = dry land; Dessert = sweet food.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Brake vs Break: Press the ___ to stop.', options: ['brake', 'break', 'both', 'neither'], correctAnswer: 'brake', explanation: 'Brake = stop mechanism; Break = damage.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Bare vs Bear: I can\'t ___ the pain.', options: ['bear', 'bare', 'both', 'neither'], correctAnswer: 'bear', explanation: 'Bear = tolerate; Bare = naked.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Complement vs Compliment: He gave her a nice ___.', correctAnswer: 'compliment', explanation: 'Compliment = praise; Complement = complete.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Emigrate vs Immigrate: He ___ to Canada.', options: ['emigrated', 'immigrated', 'both possible', 'neither'], correctAnswer: 'emigrated', explanation: 'Emigrate = leave; Immigrate = enter.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Farther vs Further: I need ___ information.', options: ['further', 'farther', 'both', 'neither'], correctAnswer: 'further', explanation: 'Further = additional; Farther = distance.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Whose vs Who\'s: ___ book is this?', correctAnswer: 'Whose', explanation: 'Whose = possession; Who\'s = Who is.' },
];
