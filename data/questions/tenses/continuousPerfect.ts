/**
 * Continuous Perfect Tenses - 45 Questions
 * Present Perfect Continuous, Past Perfect Continuous, Future Perfect Continuous
 */
import { QuestionType } from '../../../types';
import type { OfflineQuestion } from '../../offlineQuestionBank';

// Present Perfect Continuous (15 questions)
export const PRESENT_PERFECT_CONTINUOUS: OfflineQuestion[] = [
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She ___ for two hours.', options: ['has been studying', 'is studying', 'was studying', 'had been studying'], correctAnswer: 'has been studying', explanation: 'Has/Have been + verb-ing.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'I ___ (wait) since morning.', correctAnswer: 'have been waiting', explanation: 'Present perfect continuous with since.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'They ___ here for five years.', options: ['have been living', 'are living', 'were living', 'had been living'], correctAnswer: 'have been living', explanation: 'For + duration.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'He ___ all day.', options: ['has been working', 'is working', 'was working', 'works'], correctAnswer: 'has been working', explanation: 'Continuous action until now.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She ___ (read) this book for a week.', correctAnswer: 'has been reading', explanation: 'For + period.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'We ___ for the bus since 8 AM.', options: ['have been waiting', 'are waiting', 'were waiting', 'wait'], correctAnswer: 'have been waiting', explanation: 'Since + point of time.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'It ___ since morning.', options: ['has been raining', 'is raining', 'was raining', 'rained'], correctAnswer: 'has been raining', explanation: 'Weather continues until now.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'I ___ (learn) English for three years.', correctAnswer: 'have been learning', explanation: 'Duration with for.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'How long ___ you been waiting?', options: ['have', 'has', 'are', 'were'], correctAnswer: 'have', explanation: 'Have for you.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'He ___ since childhood.', options: ['has been playing cricket', 'is playing cricket', 'was playing cricket', 'played cricket'], correctAnswer: 'has been playing cricket', explanation: 'Since childhood = long duration.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'They ___ (build) this masjid for six months.', correctAnswer: 'have been building', explanation: 'Ongoing construction.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Why ___ she been crying?', options: ['has', 'have', 'is', 'was'], correctAnswer: 'has', explanation: 'Has for she.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I ___ about this problem all day.', options: ['have been thinking', 'am thinking', 'was thinking', 'think'], correctAnswer: 'have been thinking', explanation: 'Continuous thought.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She ___ (cook) since 4 PM.', correctAnswer: 'has been cooking', explanation: 'Since + time.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'We ___ our exams for a month.', options: ['have been preparing for', 'are preparing for', 'were preparing for', 'prepare for'], correctAnswer: 'have been preparing for', explanation: 'Ongoing preparation.' },
];

// Past Perfect Continuous (15 questions)
export const PAST_PERFECT_CONTINUOUS: OfflineQuestion[] = [
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She ___ for two hours before I arrived.', options: ['had been studying', 'was studying', 'has been studying', 'is studying'], correctAnswer: 'had been studying', explanation: 'Had been + verb-ing.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'I ___ (wait) for an hour when he came.', correctAnswer: 'had been waiting', explanation: 'Action before another past action.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'They ___ for five years before they moved.', options: ['had been living', 'were living', 'have been living', 'are living'], correctAnswer: 'had been living', explanation: 'Continuous action before past event.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'He ___ all day before he got sick.', options: ['had been working', 'was working', 'has been working', 'is working'], correctAnswer: 'had been working', explanation: 'Cause-effect in past.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She ___ (read) for hours when I interrupted.', correctAnswer: 'had been reading', explanation: 'Interrupted past action.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'We ___ since morning when it stopped.', options: ['had been waiting', 'were waiting', 'have been waiting', 'are waiting'], correctAnswer: 'had been waiting', explanation: 'Continuous until stopped.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'It ___ for hours before the flood.', options: ['had been raining', 'was raining', 'has been raining', 'is raining'], correctAnswer: 'had been raining', explanation: 'Cause of flood.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'I ___ (learn) French before I went to Paris.', correctAnswer: 'had been learning', explanation: 'Preparation before trip.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'How long ___ you been waiting when the bus came?', options: ['had', 'have', 'were', 'are'], correctAnswer: 'had', explanation: 'Had for past perfect continuous.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'He ___ for years before he won.', options: ['had been practicing', 'was practicing', 'has been practicing', 'is practicing'], correctAnswer: 'had been practicing', explanation: 'Long effort before success.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'They ___ (work) on the project before it was cancelled.', correctAnswer: 'had been working', explanation: 'Cancelled project.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She was tired because she ___.', options: ['had been running', 'was running', 'has been running', 'is running'], correctAnswer: 'had been running', explanation: 'Cause of tiredness.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I ___ about the problem before I found the answer.', options: ['had been thinking', 'was thinking', 'have been thinking', 'am thinking'], correctAnswer: 'had been thinking', explanation: 'Thinking before solution.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She ___ (cook) for hours before guests arrived.', correctAnswer: 'had been cooking', explanation: 'Preparation for guests.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'We ___ for a month before we passed.', options: ['had been studying', 'were studying', 'have been studying', 'are studying'], correctAnswer: 'had been studying', explanation: 'Study before success.' },
];

// Future Perfect Continuous (15 questions)
export const FUTURE_PERFECT_CONTINUOUS: OfflineQuestion[] = [
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'By next month, I ___ here for a year.', options: ['will have been working', 'will be working', 'am working', 'worked'], correctAnswer: 'will have been working', explanation: 'Will have been + verb-ing.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'By 5 PM, she ___ (wait) for three hours.', correctAnswer: 'will have been waiting', explanation: 'Future duration.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'They ___ for ten years by December.', options: ['will have been living', 'will be living', 'are living', 'lived'], correctAnswer: 'will have been living', explanation: 'By + future time.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'By evening, he ___ all day.', options: ['will have been working', 'will be working', 'is working', 'works'], correctAnswer: 'will have been working', explanation: 'All day duration.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'By next week, I ___ (read) this book for a month.', correctAnswer: 'will have been reading', explanation: 'Month-long activity.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'By noon, we ___ for six hours.', options: ['will have been waiting', 'will be waiting', 'are waiting', 'wait'], correctAnswer: 'will have been waiting', explanation: 'Duration until noon.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'By tomorrow, it ___ for a week.', options: ['will have been raining', 'will be raining', 'is raining', 'rained'], correctAnswer: 'will have been raining', explanation: 'Week-long rain.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'By next year, I ___ (learn) English for five years.', correctAnswer: 'will have been learning', explanation: 'Five-year duration.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'How long ___ you have been waiting by then?', options: ['will', 'would', 'are', 'were'], correctAnswer: 'will', explanation: 'Will have been.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'By 2030, he ___ cricket for 20 years.', options: ['will have been playing', 'will be playing', 'is playing', 'plays'], correctAnswer: 'will have been playing', explanation: '20-year career.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'By the time you arrive, I ___ (cook) for two hours.', correctAnswer: 'will have been cooking', explanation: 'Cooking before arrival.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'By graduation, she ___ for four years.', options: ['will have been studying', 'will be studying', 'is studying', 'studies'], correctAnswer: 'will have been studying', explanation: 'Four-year degree.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'By the end of the day, I ___ about this.', options: ['will have been thinking', 'will be thinking', 'am thinking', 'think'], correctAnswer: 'will have been thinking', explanation: 'Day-long thought.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'By 10 PM, she ___ (work) for 12 hours.', correctAnswer: 'will have been working', explanation: '12-hour shift.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'By next Friday, we ___ this show for a month.', options: ['will have been watching', 'will be watching', 'are watching', 'watch'], correctAnswer: 'will have been watching', explanation: 'Month-long binge.' },
];
