import { describe, it, expect } from 'vitest';
import { QuestionType } from '../../types';
import { scoreWriting } from '../../services/geminiService';

describe('generateMockQuiz logic', () => {
    const generateMockQuiz = (topic: string, difficulty: string, numberOfQuestions: number = 5) => {
        const baseQuestions = [
            {
                type: QuestionType.MULTIPLE_CHOICE,
                questionText: `Which sentence correctly uses ${topic.toLowerCase()}?`,
                options: [
                    'She go to school every day.',
                    'She goes to school every day.',
                    'She going to school every day.',
                    'She gone to school every day.',
                ],
                correctAnswer: 'She goes to school every day.',
                explanation: 'The correct form uses the third person singular verb "goes" with "she".',
            },
            {
                type: QuestionType.FILL_IN_BLANK,
                questionText: 'Complete: They ___ (play) football yesterday.',
                correctAnswer: 'played',
                explanation: 'The past tense of "play" is "played".',
            },
            {
                type: QuestionType.MULTIPLE_CHOICE,
                questionText: 'Select the correct option:',
                options: [
                    "He don't like apples.",
                    "He doesn't likes apples.",
                    "He doesn't like apples.",
                    'He not like apples.',
                ],
                correctAnswer: "He doesn't like apples.",
                explanation: '"Doesn\'t" is used with third person singular, followed by the base form of the verb.',
            },
            {
                type: QuestionType.FILL_IN_BLANK,
                questionText: 'Fill in: The children ___ (be) happy.',
                correctAnswer: 'are',
                explanation: '"Children" is plural, so we use "are".',
            },
            {
                type: QuestionType.MULTIPLE_CHOICE,
                questionText: 'Which is grammatically correct?',
                options: [
                    'I have been to Paris last year.',
                    'I went to Paris last year.',
                    'I have went to Paris last year.',
                    'I go to Paris last year.',
                ],
                correctAnswer: 'I went to Paris last year.',
                explanation: 'With a specific past time (last year), we use simple past tense.',
            },
        ];

        const shuffledBase = [...baseQuestions];

        const questions = [];
        for (let i = 0; i < numberOfQuestions; i++) {
            const baseQ = shuffledBase[i % shuffledBase.length];
            questions.push({
                id: i + 1,
                type: baseQ.type,
                questionText: baseQ.questionText + (i >= 5 ? ` (Variation ${Math.floor(i / 5) + 1})` : ''),
                options: baseQ.options,
                correctAnswer: baseQ.correctAnswer,
                explanation: baseQ.explanation,
            });
        }

        return {
            title: `${topic} Practice`,
            difficulty: difficulty,
            questions,
        };
    };

    it('should return a valid QuizSession object', () => {
        const quiz = generateMockQuiz('Present Tense', 'Beginner (A1)');
        expect(quiz).toHaveProperty('title');
        expect(quiz).toHaveProperty('difficulty');
        expect(quiz).toHaveProperty('questions');
        expect(quiz.title).toBe('Present Tense Practice');
        expect(quiz.difficulty).toBe('Beginner (A1)');
    });

    it('should generate exactly the requested number of questions (default 5)', () => {
        const quiz = generateMockQuiz('Nouns', 'Intermediate (B1)');
        expect(quiz.questions).toHaveLength(5);
    });

    it('should generate custom number of questions', () => {
        const quiz = generateMockQuiz('Verbs', 'Advanced (C1)', 10);
        expect(quiz.questions).toHaveLength(10);
    });

    it('each question should have required fields', () => {
        const quiz = generateMockQuiz('Adjectives', 'Elementary (A2)');
        quiz.questions.forEach((q) => {
            expect(q).toHaveProperty('id');
            expect(q).toHaveProperty('type');
            expect(q).toHaveProperty('questionText');
            expect(q).toHaveProperty('correctAnswer');
            expect(q).toHaveProperty('explanation');
        });
    });

    it('question types should be valid QuestionType enum values', () => {
        const quiz = generateMockQuiz('Grammar', 'Beginner (A1)');
        quiz.questions.forEach((q) => {
            expect([QuestionType.MULTIPLE_CHOICE, QuestionType.FILL_IN_BLANK]).toContain(q.type);
        });
    });

    it('multiple choice questions should have exactly 4 options', () => {
        const quiz = generateMockQuiz('Pronouns', 'Beginner (A1)');
        quiz.questions.forEach((q) => {
            if (q.type === QuestionType.MULTIPLE_CHOICE && q.options) {
                expect(q.options).toHaveLength(4);
            }
        });
    });

    it('questions should have unique sequential IDs', () => {
        const quiz = generateMockQuiz('Tenses', 'Intermediate (B1)', 7);
        const ids = quiz.questions.map((q) => q.id);
        expect(ids).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });
});

describe('scoreWriting - Heuristic Linguistic Assessment', () => {
    it('should return score of 0 and Grade F for gibberish keyboard mashing', async () => {
        const gibberish = 'Your a cricket match asdasda a asd asda a asdasd as a asd as a a a asda a as ad a';
        const result = await scoreWriting(gibberish, 'A Cricket Match');

        expect(result.score).toBe(0);
        expect(result.grade).toBe('F');
        expect(result.grammarScore).toBe(0);
        expect(result.structureScore).toBe(0);
        expect(result.contentScore).toBe(0);
        expect(result.toneScore).toBe(0);
        expect(result.feedback).toContain('Incoherent / Invalid Input');
    });

    it('should return 0 for empty submission', async () => {
        const result = await scoreWriting('', 'Essay');
        expect(result.score).toBe(0);
        expect(result.grade).toBe('F');
    });

    it('should penalize very short inputs under 15 words', async () => {
        const short = 'I love playing cricket with friends.';
        const result = await scoreWriting(short, 'A Cricket Match');

        expect(result.score).toBeLessThanOrEqual(25);
        expect(result.grade).toBe('F');
        expect(result.feedback).toContain('Insufficient');
    });

    it('should return score of 0 and Grade F for repeated copy-pasted paragraphs', async () => {
        const repeatedText = `Incoherent / Invalid Input: Your submission contains random keyboard mashing, repeated characters, or non-English text. No academic credit can be awarded for gibberish.

Please write meaningful, coherent English sentences relevant to the assigned prompt.

Incoherent / Invalid Input: Your submission contains random keyboard mashing, repeated characters, or non-English text. No academic credit can be awarded for gibberish.

Please write meaningful, coherent English sentences relevant to the assigned prompt.

Incoherent / Invalid Input: Your submission contains random keyboard mashing, repeated characters, or non-English text. No academic credit can be awarded for gibberish.

Please write meaningful, coherent English sentences relevant to the assigned prompt.`;

        const result = await scoreWriting(repeatedText, 'A Cricket Match');

        expect(result.score).toBe(0);
        expect(result.grade).toBe('F');
        expect(result.grammarScore).toBe(0);
        expect(result.structureScore).toBe(0);
        expect(result.contentScore).toBe(0);
        expect(result.toneScore).toBe(0);
        expect(result.feedback).toContain('Excessive Repetition');
    });

    it('should fail and penalize off-topic compositions with Grade F', async () => {
        const offTopicText = `Cooking is a wonderful culinary art that requires fresh ingredients, spices, and patience. Making a delicious biryani requires rice, chicken, yogurt, and aromatic spices cooked on low flame. The flavor is rich and authentic.`;
        const result = await scoreWriting(offTopicText, 'A Cricket Match');

        expect(result.score).toBeLessThanOrEqual(15);
        expect(result.grade).toBe('F');
        expect(result.contentScore).toBe(0);
        expect(result.feedback).toContain('Off-Topic');
    });

    it('should award high scores and Grade A for rich, relevant English composition', async () => {
        const highQuality = `Cricket is the most popular game in Pakistan. People of all ages love to play and watch cricket matches. Last Sunday, I had the wonderful opportunity to watch an exciting cricket match between our school team and the City Model School.

The toss was won by our team captain who decided to bat first. Our opening batsmen started aggressively and scored quick boundaries in the initial powerplay overs. Although two quick wickets fell in the middle overs, our middle-order batsman played a splendid innings and scored a brilliant fifty. By the end of twenty overs, our school team posted a competitive total of 165 runs.

In response, the opposing team started steadily. Their opening pair built a strong partnership of sixty runs. However, our spin bowlers turned the match around by taking three crucial wickets in quick succession. The fielding was sharp and every player showed great dedication. In the final over, they needed twelve runs to win, but our fast bowler delivered exceptional yorkers and restricted them, securing victory by seven runs.

It was a thrilling match filled with excitement and sportsmanship. Both teams played with great zeal, and our victory was celebrated with joy throughout the school.`;

        const result = await scoreWriting(highQuality, 'A Cricket Match');

        expect(result.score).toBeGreaterThanOrEqual(80);
        expect(['A', 'A+']).toContain(result.grade);
        expect(result.grammarScore).toBeGreaterThanOrEqual(20);
        expect(result.structureScore).toBeGreaterThanOrEqual(20);
        expect(result.contentScore).toBeGreaterThanOrEqual(20);
        expect(result.toneScore).toBeGreaterThanOrEqual(20);
        expect(result.suggestions.length).toBeGreaterThan(0);
    });
});
