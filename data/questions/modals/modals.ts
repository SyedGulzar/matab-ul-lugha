/**
 * Modal Verbs - 60 Questions
 */
import { QuestionType } from '../../../types';
import type { OfflineQuestion } from '../../offlineQuestionBank';

export const MODAL_VERBS: OfflineQuestion[] = [
    // Can / Could
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I ___ swim when I was five.', options: ['can', 'could', 'may', 'might'], correctAnswer: 'could', explanation: 'Could for past ability.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She ___ speak three languages.', correctAnswer: 'can', explanation: 'Can for present ability.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ you help me, please?', options: ['Can', 'Could', 'Both work', 'Neither'], correctAnswer: 'Both work', explanation: 'Both for requests.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'He ___ run faster when he was young.', options: ['can', 'could', 'may', 'might'], correctAnswer: 'could', explanation: 'Past ability.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'You ___ not park here.', correctAnswer: 'can', explanation: 'Can\'t for prohibition.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ I borrow your pen?', options: ['Can', 'Could', 'Both are correct', 'Neither'], correctAnswer: 'Both are correct', explanation: 'Both for asking permission.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She ___ be at home now.', options: ['can', 'could', 'may', 'All work'], correctAnswer: 'All work', explanation: 'All show possibility.' },
    // May / Might
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ I come in?', options: ['May', 'Can', 'Both correct', 'Neither'], correctAnswer: 'Both correct', explanation: 'May is more formal.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'It ___ rain tomorrow.', correctAnswer: 'may/might', explanation: 'Possibility.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She ___ be at the office now.', options: ['may', 'might', 'Both correct', 'Neither'], correctAnswer: 'Both correct', explanation: 'Both show possibility.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The teacher said we ___ leave early.', options: ['may', 'might', 'can', 'All work'], correctAnswer: 'may', explanation: 'Permission given.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'He ___ have missed the bus.', correctAnswer: 'may/might', explanation: 'Past possibility.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I ___ go if I have time.', options: ['may', 'might', 'Both correct', 'Neither'], correctAnswer: 'Both correct', explanation: 'Future possibility.' },
    // Must / Have to
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'You ___ finish your homework.', options: ['must', 'have to', 'Both work', 'Neither'], correctAnswer: 'Both work', explanation: 'Both show obligation.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Students ___ wear uniform.', correctAnswer: 'must', explanation: 'Strong obligation.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'You ___ not smoke here.', options: ['must', 'have to', 'should', 'can'], correctAnswer: 'must', explanation: 'Strong prohibition.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She ___ be tired after working all day.', options: ['must', 'can', 'may', 'should'], correctAnswer: 'must', explanation: 'Logical conclusion.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'I ___ go to the doctor yesterday.', correctAnswer: 'had to', explanation: 'Past obligation.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'This ___ be a mistake.', options: ['must', 'can', 'may', 'should'], correctAnswer: 'must', explanation: 'Strong deduction.' },
    // Should / Ought to
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'You ___ see a doctor.', options: ['should', 'must', 'can', 'will'], correctAnswer: 'should', explanation: 'Advice.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'You ___ respect your elders.', correctAnswer: 'should', explanation: 'Duty/advice.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She ___ have arrived by now.', options: ['should', 'must', 'can', 'will'], correctAnswer: 'should', explanation: 'Expectation.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'You ___ to apologize.', options: ['should', 'ought', 'must', 'can'], correctAnswer: 'ought', explanation: 'Ought to = should.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'He ___ have told me earlier!', correctAnswer: 'should', explanation: 'Past regret.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'You ___ not talk during the exam.', options: ['should', 'must', 'ought', 'can'], correctAnswer: 'should', explanation: 'Recommendation.' },
    // Will / Would
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She ___ help you tomorrow.', options: ['will', 'would', 'can', 'may'], correctAnswer: 'will', explanation: 'Future.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: '___ you like some tea?', correctAnswer: 'Would', explanation: 'Polite offer.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'When I was young, I ___ play all day.', options: ['will', 'would', 'can', 'may'], correctAnswer: 'would', explanation: 'Past habit.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ you please close the door?', options: ['Will', 'Would', 'Both correct', 'Neither'], correctAnswer: 'Both correct', explanation: 'Would is more polite.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'I ___ rather stay home.', correctAnswer: 'would', explanation: 'Preference.' },
    // Shall
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ I open the window?', options: ['Shall', 'Will', 'Both work', 'Neither'], correctAnswer: 'Shall', explanation: 'Shall for offers.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: '___ we go to the park?', correctAnswer: 'Shall', explanation: 'Suggestion.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'What ___ I do?', options: ['shall', 'will', 'can', 'may'], correctAnswer: 'shall', explanation: 'Asking for advice.' },
    // Need
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'You ___ not worry.', options: ['need', 'must', 'should', 'All work'], correctAnswer: 'need', explanation: 'Need not = unnecessary.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She ___ to study harder.', correctAnswer: 'needs', explanation: 'Need as main verb.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'He need not ___ today.', options: ['come', 'comes', 'coming', 'to come'], correctAnswer: 'come', explanation: 'Modal + base verb.' },
    // Pakistani Context
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Muslims ___ pray five times a day.', options: ['must', 'should', 'may', 'can'], correctAnswer: 'must', explanation: 'Religious obligation.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'We ___ always speak the truth.', correctAnswer: 'should', explanation: 'Moral duty.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'You ___ drink Zamzam water if you visit Makkah.', options: ['can', 'shall', 'would', 'might'], correctAnswer: 'can', explanation: 'Ability/opportunity.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'We ___ respect our parents.', options: ['must', 'should', 'Both correct', 'Neither'], correctAnswer: 'Both correct', explanation: 'Strong obligation.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'InshaAllah, it ___ rain soon.', correctAnswer: 'may/might/will', explanation: 'Hope for future.' },
    // Perfect Modals
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She ___ have left already.', options: ['must', 'may', 'might', 'All work'], correctAnswer: 'All work', explanation: 'All show past possibility.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'He ___ have studied harder.', correctAnswer: 'should', explanation: 'Past regret.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'They ___ have arrived by now.', options: ['should', 'must', 'Both work', 'Neither'], correctAnswer: 'Both work', explanation: 'Expectation/deduction.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'You ___ not have said that.', options: ['should', 'must', 'could', 'ought'], correctAnswer: 'should', explanation: 'Regret = should not have.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'He ___ have been sleeping.', correctAnswer: 'must', explanation: 'Logical conclusion about past.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She ___ have known about it.', options: ['could', 'couldn\'t', 'Both possible', 'Neither'], correctAnswer: 'Both possible', explanation: 'Past possibility.' },
    // Mixed Practice
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'You ___ be quiet in the library.', options: ['must', 'should', 'Both work', 'Neither'], correctAnswer: 'Both work', explanation: 'Rule/advice.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'I ___ like to help you.', correctAnswer: 'would', explanation: 'Polite offer.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She ___ dance when she was young.', options: ['can', 'could', 'may', 'might'], correctAnswer: 'could', explanation: 'Past ability.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'It ___ be true.', options: ['can', 'can\'t', 'Both possible', 'Neither'], correctAnswer: 'Both possible', explanation: 'Both show possibility.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'You ___ wash your hands before eating.', correctAnswer: 'should', explanation: 'Advice.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'He ___ be the new teacher.', options: ['must', 'can', 'may', 'All work'], correctAnswer: 'All work', explanation: 'Deduction/possibility.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ you pass me the salt?', options: ['Can', 'Could', 'Will', 'All work'], correctAnswer: 'All work', explanation: 'Request.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'I ___ rather not go.', correctAnswer: 'would', explanation: 'Preference.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'You ___ to be more careful.', options: ['should', 'ought', 'must', 'Both 1 and 2'], correctAnswer: 'ought', explanation: 'Ought to + verb.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'We ___ finish this by tomorrow.', options: ['must', 'have to', 'Both work', 'Neither'], correctAnswer: 'Both work', explanation: 'Obligation.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She ___ play the piano beautifully.', correctAnswer: 'can', explanation: 'Present ability.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The lights are on. Someone ___ be home.', options: ['must', 'can', 'may', 'should'], correctAnswer: 'must', explanation: 'Logical deduction.' },
];
