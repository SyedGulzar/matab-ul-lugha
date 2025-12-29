/**
 * Punctuation Rules - 30 Questions
 */
import { QuestionType } from '../../../types';
import type { OfflineQuestion } from '../../offlineQuestionBank';

export const PUNCTUATION: OfflineQuestion[] = [
    // Full Stop
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Which sentence is correctly punctuated?', options: ['He went home.', 'He went home', 'He went home;', 'He went home,'], correctAnswer: 'He went home.', explanation: 'Full stop ends a statement.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Use a ___ at the end of a statement.', correctAnswer: 'full stop/period', explanation: 'Statements end with full stop.' },
    // Question Mark
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Which sentence is correctly punctuated?', options: ['What is your name?', 'What is your name.', 'What is your name,', 'What is your name;'], correctAnswer: 'What is your name?', explanation: 'Questions end with ?' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Use a ___ at the end of a question.', correctAnswer: 'question mark', explanation: 'Questions end with ?' },
    // Exclamation Mark
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Which sentence is correctly punctuated?', options: ['What a beautiful day!', 'What a beautiful day.', 'What a beautiful day?', 'What a beautiful day,'], correctAnswer: 'What a beautiful day!', explanation: 'Exclamations end with !' },
    { type: QuestionType.FILL_IN_BLANK, questionText: '"Help___" cried the man.', correctAnswer: '!', explanation: 'Strong emotion = !' },
    // Comma
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Which sentence uses comma correctly?', options: ['I bought apples, oranges, and bananas.', 'I bought apples oranges and bananas.', 'I bought, apples oranges and bananas.', 'I bought apples oranges, and bananas'], correctAnswer: 'I bought apples, oranges, and bananas.', explanation: 'Commas separate items in a list.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Ali___ who is my friend___ came today.', correctAnswer: ', ,', explanation: 'Commas around non-essential clause.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Which is correct?', options: ['Yes, I will come.', 'Yes I will come.', 'Yes; I will come.', 'Yes: I will come.'], correctAnswer: 'Yes, I will come.', explanation: 'Comma after yes/no.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Which is correct?', options: ['However, he came.', 'However he came.', 'However; he came.', 'However: he came.'], correctAnswer: 'However, he came.', explanation: 'Comma after transition words.' },
    // Apostrophe
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Which shows possession correctly?', options: ["The boy's book", 'The boys book', "The boy book's", 'The boys\'book'], correctAnswer: "The boy's book", explanation: "Apostrophe + s for singular." },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The children___ toys are here.', correctAnswer: "'s", explanation: "Children's = irregular plural." },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Which contraction is correct?', options: ["don't", 'do\'nt', 'dont\'', 'dont'], correctAnswer: "don't", explanation: "Apostrophe replaces 'o' in not." },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: "It's means ___.", options: ['it is', 'belonging to it', 'its was', 'none'], correctAnswer: 'it is', explanation: "It's = it is (contraction)." },
    // Quotation Marks
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Which is correct?', options: ['He said, "Hello."', 'He said Hello.', 'He said: Hello.', 'He said; "Hello."'], correctAnswer: 'He said, "Hello."', explanation: 'Quotation marks for speech.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She said, ___I am happy.___', correctAnswer: '" "', explanation: 'Quotation marks around speech.' },
    // Colon & Semicolon
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Which use of colon is correct?', options: ['I need three things: pen, paper, and eraser.', 'I need: three things pen paper and eraser.', 'I need three things; pen, paper, and eraser.', 'I need, three things: pen paper and eraser.'], correctAnswer: 'I need three things: pen, paper, and eraser.', explanation: 'Colon introduces a list.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Which use of semicolon is correct?', options: ['I came; she left.', 'I came, she left.', 'I came: she left.', 'I came. she left.'], correctAnswer: 'I came; she left.', explanation: 'Semicolon joins related clauses.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'He was tired___ he worked hard.', correctAnswer: ';', explanation: 'Semicolon for related sentences.' },
    // Capital Letters
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Which is capitalized correctly?', options: ['I live in Karachi.', 'i live in karachi.', 'I live in karachi.', 'i live in Karachi.'], correctAnswer: 'I live in Karachi.', explanation: 'I and proper nouns capitalized.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: '___ first word of a sentence is capitalized.', correctAnswer: 'The', explanation: 'First word capitalized.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Which is correct?', options: ['Monday, January, Eid', 'monday, january, eid', 'Monday, january, Eid', 'monday, January, eid'], correctAnswer: 'Monday, January, Eid', explanation: 'Days, months, holidays capitalized.' },
    // Hyphen
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Which is hyphenated correctly?', options: ['well-known', 'wellknown', 'well known', 'well_known'], correctAnswer: 'well-known', explanation: 'Compound adjective before noun.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'My sister is twenty___one years old.', correctAnswer: '-', explanation: 'Hyphen in compound numbers.' },
    // Mixed
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"Pakistan___ said the teacher, ___is a beautiful country."', options: ['," "', ': "', '; "', '! "'], correctAnswer: '," "', explanation: 'Comma after speech, then quote.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Which is correct?', options: ["The students' books", "The student's books (many students)", 'The students books', "The students book's"], correctAnswer: "The students' books", explanation: 'Apostrophe after s for plurals.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'SubhanAllah___ What a beautiful view___', correctAnswer: '! !', explanation: 'Exclamations.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Which is correct?', options: ['Dear Ali,', 'Dear Ali.', 'Dear Ali;', 'Dear Ali:'], correctAnswer: 'Dear Ali,', explanation: 'Comma after salutation in letters.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Which is correct?', options: ['Dr. Ahmed', 'Dr Ahmed', 'dr. Ahmed', 'dr Ahmed'], correctAnswer: 'Dr. Ahmed', explanation: 'Period after abbreviation.' },
];
