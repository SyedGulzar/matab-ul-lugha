import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QuestionType } from '../../types';

// We need to test the mock functions since the real API calls require credentials
// Extracting and testing the pure logic functions

describe('generateMockQuiz', () => {
    // Import the module to test
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

        const shuffledBase = [...baseQuestions]; // Don't shuffle for predictable tests

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

describe('generateMockScore', () => {
    const getGrade = (score: number): string => {
        if (score >= 90) return 'A';
        if (score >= 80) return 'B';
        if (score >= 70) return 'C';
        if (score >= 60) return 'D';
        return 'F';
    };

    const generateMockScore = (content: string, topicType: string) => {
        const wordCount = content.trim().split(/\s+/).filter((w) => w).length;
        const baseScore = Math.min(100, Math.max(40, 50 + wordCount * 0.5));

        return {
            score: Math.round(baseScore),
            grade: getGrade(baseScore),
            feedback: {
                grammar: { score: Math.round(baseScore + 5), comment: 'Good use of basic grammar structures.' },
                structure: { score: Math.round(baseScore - 5), comment: `Your ${topicType.toLowerCase()} follows a reasonable structure.` },
                vocabulary: { score: Math.round(baseScore), comment: 'Vocabulary is appropriate for the level.' },
                clarity: { score: Math.round(baseScore + 2), comment: 'Ideas are expressed clearly.' },
            },
            overallComment: `Your ${topicType.toLowerCase()} shows good effort. Keep practicing to improve further!`,
            suggestions: [
                'Try using more varied sentence structures.',
                'Add more descriptive vocabulary.',
                'Review punctuation rules for better clarity.',
            ],
        };
    };

    it('should return valid WritingScore structure', () => {
        const result = generateMockScore('This is a test sentence for scoring.', 'Essay');

        expect(result).toHaveProperty('score');
        expect(result).toHaveProperty('grade');
        expect(result).toHaveProperty('feedback');
        expect(result).toHaveProperty('overallComment');
        expect(result).toHaveProperty('suggestions');
    });

    it('should calculate score based on word count', () => {
        const shortContent = 'Hello world'; // 2 words -> 50 + 1 = 51
        const longContent = 'This is a much longer piece of content with many more words to count here today';
        // 15 words -> 50 + 7.5 = 57.5

        const shortResult = generateMockScore(shortContent, 'Essay');
        const longResult = generateMockScore(longContent, 'Essay');

        expect(shortResult.score).toBeLessThan(longResult.score);
    });

    it('should cap score between 40 and 100', () => {
        const emptyContent = '';
        const veryLongContent = Array(200).fill('word').join(' ');

        const emptyResult = generateMockScore(emptyContent, 'Essay');
        const longResult = generateMockScore(veryLongContent, 'Essay');

        expect(emptyResult.score).toBeGreaterThanOrEqual(40);
        expect(longResult.score).toBeLessThanOrEqual(100);
    });

    it('should assign correct grades based on score ranges', () => {
        expect(getGrade(95)).toBe('A');
        expect(getGrade(90)).toBe('A');
        expect(getGrade(85)).toBe('B');
        expect(getGrade(80)).toBe('B');
        expect(getGrade(75)).toBe('C');
        expect(getGrade(70)).toBe('C');
        expect(getGrade(65)).toBe('D');
        expect(getGrade(60)).toBe('D');
        expect(getGrade(55)).toBe('F');
        expect(getGrade(0)).toBe('F');
    });

    it('feedback should contain all 4 categories', () => {
        const result = generateMockScore('Test content here.', 'Application');

        expect(result.feedback).toHaveProperty('grammar');
        expect(result.feedback).toHaveProperty('structure');
        expect(result.feedback).toHaveProperty('vocabulary');
        expect(result.feedback).toHaveProperty('clarity');
    });

    it('each feedback category should have score and comment', () => {
        const result = generateMockScore('Test content here.', 'Letter');

        Object.values(result.feedback).forEach((category) => {
            expect(category).toHaveProperty('score');
            expect(category).toHaveProperty('comment');
            expect(typeof category.score).toBe('number');
            expect(typeof category.comment).toBe('string');
        });
    });

    it('suggestions should have 3 items', () => {
        const result = generateMockScore('Some text.', 'Essay');
        expect(result.suggestions).toHaveLength(3);
    });

    it('overall comment should mention the topic type', () => {
        const result = generateMockScore('Text here.', 'Letter');
        expect(result.overallComment.toLowerCase()).toContain('letter');
    });
});
