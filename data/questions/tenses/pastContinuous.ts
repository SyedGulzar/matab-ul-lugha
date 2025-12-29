/**
 * Past Continuous Tense - 35 Questions
 */
import { QuestionType } from '../../../types';
import type { OfflineQuestion } from '../../offlineQuestionBank';

export const PAST_CONTINUOUS: OfflineQuestion[] = [
    // Basic Structure
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I ___ when you called.', options: ['sleep', 'was sleeping', 'slept', 'am sleeping'], correctAnswer: 'was sleeping', explanation: 'Action interrupted.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'They ___ (watch) TV at 8 PM yesterday.', correctAnswer: 'were watching', explanation: 'They + were + verb-ing.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She ___ while I was cooking.', options: ['studies', 'was studying', 'studied', 'is studying'], correctAnswer: 'was studying', explanation: 'Two simultaneous actions.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The children ___ in the park.', options: ['was playing', 'were playing', 'played', 'plays'], correctAnswer: 'were playing', explanation: 'Children + were.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'He ___ (read) when the lights went out.', correctAnswer: 'was reading', explanation: 'Background action.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'What ___ you doing at 6 PM?', options: ['was', 'were', 'did', 'are'], correctAnswer: 'were', explanation: 'You + were.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'It ___ raining when I left.', options: ['is', 'was', 'were', 'has been'], correctAnswer: 'was', explanation: 'It + was + verb-ing.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'We ___ (wait) for the bus when it started snowing.', correctAnswer: 'were waiting', explanation: 'Background action.' },
    // Pakistani Context
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Ali ___ namaz when the phone rang.', options: ['offers', 'was offering', 'offered', 'is offering'], correctAnswer: 'was offering', explanation: 'Interrupted action.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Ammi ___ (cook) biryani when I came home.', correctAnswer: 'was cooking', explanation: 'Ammi + was + cooking.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The students ___ Quran when the teacher arrived.', options: ['recite', 'were reciting', 'recited', 'recites'], correctAnswer: 'were reciting', explanation: 'Students + were + reciting.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The rickshaw driver ___ for customers.', options: ['wait', 'was waiting', 'waits', 'waited'], correctAnswer: 'was waiting', explanation: 'Driver + was + waiting.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'We ___ (shop) in Saddar when we met Zara.', correctAnswer: 'were shopping', explanation: 'We + were + shopping.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The children ___ cricket in the gali all evening.', options: ['play', 'were playing', 'played', 'plays'], correctAnswer: 'were playing', explanation: 'All evening = continuous.' },
    // While / When
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ she was sleeping, someone knocked.', options: ['When', 'While', 'During', 'As'], correctAnswer: 'While', explanation: 'While + continuous.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'While I ___ (study), the power went out.', correctAnswer: 'was studying', explanation: 'While + past continuous.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'When the accident happened, I ___ home.', options: ['drive', 'was driving', 'drove', 'am driving'], correctAnswer: 'was driving', explanation: 'Background action.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'While we ___ dinner, the doorbell rang.', options: ['have', 'were having', 'had', 'are having'], correctAnswer: 'were having', explanation: 'While + continuous.' },
    // Negative Form
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She ___ not sleeping when I called.', options: ['is', 'was', 'were', 'did'], correctAnswer: 'was', explanation: 'Was not + verb-ing.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'They ___ (not listen) to the teacher.', correctAnswer: 'were not listening', explanation: 'Were not + verb-ing.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I ___ not working at that time.', options: ['am', 'was', 'were', 'did'], correctAnswer: 'was', explanation: 'Was not + verb-ing.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'We ___ not watching TV then.', options: ['was', 'were', 'are', 'did'], correctAnswer: 'were', explanation: 'Were not + verb-ing.' },
    // Questions
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ you studying at 10 PM?', options: ['Was', 'Were', 'Did', 'Are'], correctAnswer: 'Were', explanation: 'Were you + verb-ing?' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'What ___ she doing when you arrived?', correctAnswer: 'was', explanation: 'What was she doing?' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Where ___ they going at midnight?', options: ['was', 'were', 'did', 'are'], correctAnswer: 'were', explanation: 'Where were they going?' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Why ___ he crying?', options: ['is', 'was', 'were', 'did'], correctAnswer: 'was', explanation: 'Why was he crying?' },
    // Two Actions
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'While I ___ cooking, he was reading.', options: ['am', 'was', 'were', 'is'], correctAnswer: 'was', explanation: 'Two simultaneous actions.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She ___ (talk) while I ___ (eat).', correctAnswer: 'was talking, was eating', explanation: 'Both continuous.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The kids ___ playing while their parents ___.', options: ['was/was', 'were/were', 'was/were', 'were/was'], correctAnswer: 'were/were', explanation: 'Both plural subjects.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I ___ TV while she ___ homework.', options: ['was watching/was doing', 'were watching/were doing', 'watched/did', 'watch/do'], correctAnswer: 'was watching/was doing', explanation: 'Both I/she + was.' },
    // Mixed Practice
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The sun ___ when we woke up.', options: ['shine', 'was shining', 'shines', 'shone'], correctAnswer: 'was shining', explanation: 'Background description.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Everyone ___ (dance) at the mehndi.', correctAnswer: 'was dancing', explanation: 'Everyone + was.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The traffic ___ very slowly.', options: ['move', 'was moving', 'moves', 'moved'], correctAnswer: 'was moving', explanation: 'Traffic + was + moving.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She ___ loudly during the movie.', options: ['laugh', 'was laughing', 'laughs', 'laughed'], correctAnswer: 'was laughing', explanation: 'During = continuous.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'We ___ (have) iftar when the call came.', correctAnswer: 'were having', explanation: 'We + were + having.' },
];
