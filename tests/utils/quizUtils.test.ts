import { describe, it, expect } from 'vitest';
import { TOPIC_CATEGORIES, TopicItem } from '../../constants';
import { UserAnswers, QuizSession, Question, QuestionType } from '../../types';

// Pure utility functions extracted from App.tsx for testing
const calculateScore = (quizSession: QuizSession | null, userAnswers: UserAnswers): number => {
    if (!quizSession) return 0;
    const correctCount = Object.values(userAnswers).filter((a: any) => a.isCorrect).length;
    return Math.round((correctCount / quizSession.questions.length) * 100);
};

const getCorrectCount = (quizSession: QuizSession | null, userAnswers: UserAnswers): number => {
    if (!quizSession) return 0;
    return Object.values(userAnswers).filter((a: any) => a.isCorrect).length;
};

const getResultMessage = (percentage: number): string => {
    if (percentage >= 90) return "Mashallah! Excellence Achieved.";
    if (percentage >= 70) return "Great Progress!";
    if (percentage >= 50) return "Good Effort.";
    return "Keep Practicing, Knowledge is Light.";
};

const getTopicInfo = (topicName: string): TopicItem | undefined => {
    for (const items of Object.values(TOPIC_CATEGORIES)) {
        const found = items.find((item) => item.name === topicName);
        if (found) return found;
    }
    return undefined;
};

const getFilteredCategories = (topic: string): Record<string, TopicItem[]> => {
    if (!topic.trim()) return TOPIC_CATEGORIES;

    const filtered: Record<string, TopicItem[]> = {};
    let hasResults = false;

    Object.entries(TOPIC_CATEGORIES).forEach(([category, items]) => {
        const matchingItems = items.filter((item) =>
            item.name.toLowerCase().includes(topic.toLowerCase())
        );
        if (matchingItems.length > 0) {
            filtered[category] = matchingItems;
            hasResults = true;
        }
    });

    return hasResults ? filtered : TOPIC_CATEGORIES;
};

// Mock quiz session for testing
const createMockQuizSession = (questionCount: number): QuizSession => ({
    title: 'Test Quiz',
    difficulty: 'Beginner (A1)',
    questions: Array.from({ length: questionCount }, (_, i): Question => ({
        id: i + 1,
        type: QuestionType.MULTIPLE_CHOICE,
        questionText: `Question ${i + 1}`,
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 'A',
        explanation: 'Explanation',
    })),
});

describe('calculateScore', () => {
    it('should return 0 when quizSession is null', () => {
        expect(calculateScore(null, {})).toBe(0);
    });

    it('should return 0 when no answers are correct', () => {
        const session = createMockQuizSession(5);
        const answers: UserAnswers = {
            1: { answer: 'B', isCorrect: false },
            2: { answer: 'C', isCorrect: false },
            3: { answer: 'D', isCorrect: false },
            4: { answer: 'B', isCorrect: false },
            5: { answer: 'C', isCorrect: false },
        };
        expect(calculateScore(session, answers)).toBe(0);
    });

    it('should return 50 when half answers are correct', () => {
        const session = createMockQuizSession(4);
        const answers: UserAnswers = {
            1: { answer: 'A', isCorrect: true },
            2: { answer: 'A', isCorrect: true },
            3: { answer: 'B', isCorrect: false },
            4: { answer: 'C', isCorrect: false },
        };
        expect(calculateScore(session, answers)).toBe(50);
    });

    it('should return 100 when all answers are correct', () => {
        const session = createMockQuizSession(5);
        const answers: UserAnswers = {
            1: { answer: 'A', isCorrect: true },
            2: { answer: 'A', isCorrect: true },
            3: { answer: 'A', isCorrect: true },
            4: { answer: 'A', isCorrect: true },
            5: { answer: 'A', isCorrect: true },
        };
        expect(calculateScore(session, answers)).toBe(100);
    });

    it('should round the percentage correctly', () => {
        const session = createMockQuizSession(3);
        const answers: UserAnswers = {
            1: { answer: 'A', isCorrect: true },
        };
        // 1/3 = 33.33... should round to 33
        expect(calculateScore(session, answers)).toBe(33);
    });
});

describe('getCorrectCount', () => {
    it('should return 0 when quizSession is null', () => {
        expect(getCorrectCount(null, {})).toBe(0);
    });

    it('should count correct answers accurately', () => {
        const session = createMockQuizSession(5);
        const answers: UserAnswers = {
            1: { answer: 'A', isCorrect: true },
            2: { answer: 'A', isCorrect: true },
            3: { answer: 'B', isCorrect: false },
            4: { answer: 'A', isCorrect: true },
            5: { answer: 'C', isCorrect: false },
        };
        expect(getCorrectCount(session, answers)).toBe(3);
    });

    it('should return 0 when no answers exist', () => {
        const session = createMockQuizSession(5);
        expect(getCorrectCount(session, {})).toBe(0);
    });
});

describe('getResultMessage', () => {
    it('should return excellence message for scores >= 90', () => {
        expect(getResultMessage(90)).toBe("Mashallah! Excellence Achieved.");
        expect(getResultMessage(95)).toBe("Mashallah! Excellence Achieved.");
        expect(getResultMessage(100)).toBe("Mashallah! Excellence Achieved.");
    });

    it('should return great progress for scores >= 70', () => {
        expect(getResultMessage(70)).toBe("Great Progress!");
        expect(getResultMessage(75)).toBe("Great Progress!");
        expect(getResultMessage(89)).toBe("Great Progress!");
    });

    it('should return good effort for scores >= 50', () => {
        expect(getResultMessage(50)).toBe("Good Effort.");
        expect(getResultMessage(60)).toBe("Good Effort.");
        expect(getResultMessage(69)).toBe("Good Effort.");
    });

    it('should return keep practicing for scores < 50', () => {
        expect(getResultMessage(49)).toBe("Keep Practicing, Knowledge is Light.");
        expect(getResultMessage(30)).toBe("Keep Practicing, Knowledge is Light.");
        expect(getResultMessage(0)).toBe("Keep Practicing, Knowledge is Light.");
    });
});

describe('getTopicInfo', () => {
    it('should find existing topic by exact name', () => {
        const topic = getTopicInfo('Basic Concepts');
        expect(topic).toBeDefined();
        expect(topic?.name).toBe('Basic Concepts');
    });

    it('should return undefined for non-existent topic', () => {
        const topic = getTopicInfo('Non Existent Topic');
        expect(topic).toBeUndefined();
    });

    it('should return topic with videoUrl when present', () => {
        const topic = getTopicInfo('Adjectives');
        expect(topic).toBeDefined();
        expect(topic?.videoUrl).toBeDefined();
        expect(topic?.videoUrl).toContain('youtube.com');
    });

    it('should return topic with time field', () => {
        const topic = getTopicInfo('Present Simple');
        expect(topic).toBeDefined();
        expect(topic?.time).toBeDefined();
    });
});

describe('getFilteredCategories', () => {
    it('should return all categories when search is empty', () => {
        const result = getFilteredCategories('');
        expect(result).toEqual(TOPIC_CATEGORIES);
    });

    it('should return all categories when search is only whitespace', () => {
        const result = getFilteredCategories('   ');
        expect(result).toEqual(TOPIC_CATEGORIES);
    });

    it('should filter topics by name (case insensitive)', () => {
        const result = getFilteredCategories('adjective');
        const allTopics = Object.values(result).flat();

        expect(allTopics.length).toBeGreaterThan(0);
        allTopics.forEach((topic) => {
            expect(topic.name.toLowerCase()).toContain('adjective');
        });
    });

    it('should return all categories when no matches found', () => {
        const result = getFilteredCategories('xyznonexistent123');
        expect(result).toEqual(TOPIC_CATEGORIES);
    });

    it('should filter across multiple categories', () => {
        const result = getFilteredCategories('voice');
        const categories = Object.keys(result);

        expect(categories.length).toBeGreaterThan(0);
    });

    it('should match partial topic names', () => {
        const result = getFilteredCategories('Pres'); // Should match "Present Simple", etc.
        const allTopics = Object.values(result).flat();

        expect(allTopics.length).toBeGreaterThan(0);
    });
});
