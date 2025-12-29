/**
 * Pronouns - 30 Questions
 */
import { QuestionType } from '../../../types';
import type { OfflineQuestion } from '../../offlineQuestionBank';

export const PRONOUNS: OfflineQuestion[] = [
    // Personal Pronouns
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ is my friend.', options: ['He', 'Him', 'His', 'Himself'], correctAnswer: 'He', explanation: 'Subject pronoun = He.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'I saw ___ at the market. (she)', correctAnswer: 'her', explanation: 'Object pronoun = her.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Give the book to ___.', options: ['I', 'me', 'my', 'mine'], correctAnswer: 'me', explanation: 'Object pronoun = me.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ are going to the masjid.', options: ['We', 'Us', 'Our', 'Ours'], correctAnswer: 'We', explanation: 'Subject pronoun = We.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'This is ___ book. (I)', correctAnswer: 'my', explanation: 'Possessive adjective = my.' },
    // Possessive Pronouns
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'This pen is ___.', options: ['my', 'mine', 'me', 'I'], correctAnswer: 'mine', explanation: 'Possessive pronoun = mine.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The book is ___. (they)', correctAnswer: 'theirs', explanation: 'Possessive pronoun = theirs.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Is this book ___?', options: ['your', 'yours', 'you', 'yourself'], correctAnswer: 'yours', explanation: 'Possessive pronoun = yours.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The house is ___.', options: ['our', 'ours', 'we', 'us'], correctAnswer: 'ours', explanation: 'Possessive pronoun = ours.' },
    // Reflexive Pronouns
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I did it ___.', options: ['myself', 'yourself', 'himself', 'itself'], correctAnswer: 'myself', explanation: 'Reflexive for I = myself.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She hurt ___. (she)', correctAnswer: 'herself', explanation: 'Reflexive for she = herself.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'They enjoyed ___ at the party.', options: ['theirself', 'themselves', 'them', 'their'], correctAnswer: 'themselves', explanation: 'Reflexive for they = themselves.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The cat cleaned ___.', options: ['itself', 'himself', 'herself', 'themselves'], correctAnswer: 'itself', explanation: 'Reflexive for it = itself.' },
    // Interrogative Pronouns
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ is your name?', options: ['What', 'Who', 'Whom', 'Which'], correctAnswer: 'What', explanation: 'What for things/info.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: '___ is coming to the party?', correctAnswer: 'Who', explanation: 'Who for people (subject).' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ did you give the book?', options: ['Who', 'Whom', 'What', 'Which'], correctAnswer: 'Whom', explanation: 'Whom for people (object).' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ pen is this?', options: ['Whose', 'Who', 'Whom', 'Which'], correctAnswer: 'Whose', explanation: 'Whose for possession.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: '___ of these books do you want?', correctAnswer: 'Which', explanation: 'Which for choice.' },
    // Relative Pronouns
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The boy ___ won is Ali.', options: ['who', 'whom', 'which', 'whose'], correctAnswer: 'who', explanation: 'Who for people (subject).' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The book ___ I read was good.', correctAnswer: 'which/that', explanation: 'Which/that for things.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The girl ___ bag was stolen cried.', options: ['who', 'whom', 'whose', 'which'], correctAnswer: 'whose', explanation: 'Whose for possession.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The man ___ I met was kind.', options: ['who', 'whom', 'which', 'whose'], correctAnswer: 'whom', explanation: 'Whom for people (object).' },
    // Indefinite Pronouns
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ is knocking at the door.', options: ['Someone', 'Anyone', 'Everyone', 'All are possible'], correctAnswer: 'Someone', explanation: 'Someone for unknown person.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Is there ___ in the room?', correctAnswer: 'anyone/anybody', explanation: 'Anyone in questions.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ is ready for the exam.', options: ['Everyone', 'Someone', 'Anyone', 'No one'], correctAnswer: 'Everyone', explanation: 'Everyone = all people.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I have ___ to tell you.', options: ['something', 'anything', 'nothing', 'All are possible'], correctAnswer: 'something', explanation: 'Something in statements.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'There is ___ in the fridge.', correctAnswer: 'nothing', explanation: 'Nothing = no thing.' },
    // Pakistani Context
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Ahmed and ___ went to masjid.', options: ['I', 'me', 'my', 'mine'], correctAnswer: 'I', explanation: 'Subject pronoun with Ahmed.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Fatima made biryani ___. (she)', correctAnswer: 'herself', explanation: 'Reflexive pronoun.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ of you has done the homework?', options: ['Who', 'Which', 'What', 'Whom'], correctAnswer: 'Which', explanation: 'Which for specific group.' },
];
