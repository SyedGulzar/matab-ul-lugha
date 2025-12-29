import { QuizSession, QuestionType, Question } from '../types';
import { getQuestionsForTopic, OfflineQuestion } from '../data/offlineQuestionBank';

export async function generateGrammarPractice(topic: string, difficulty: string, numberOfQuestions: number = 5): Promise<QuizSession> {
    // Always use the offline question bank
    return generateMockQuiz(topic, difficulty, numberOfQuestions);
}

function generateMockQuiz(topic: string, difficulty: string, numberOfQuestions: number = 5): QuizSession {
    // Try to get topic-specific questions from the centralized question bank
    const topicQuestions = getQuestionsForTopic(topic);

    let baseQuestions: OfflineQuestion[] = [];

    if (topicQuestions && topicQuestions.length > 0) {
        baseQuestions = topicQuestions;
    } else {
        // Generic fallback questions for topics not yet in the bank
        baseQuestions = [
            {
                type: QuestionType.MULTIPLE_CHOICE,
                questionText: 'Choose the grammatically correct sentence:',
                options: [
                    'She go to school every day.',
                    'She goes to school every day.',
                    'She going to school every day.',
                    'She gone to school every day.',
                ],
                correctAnswer: 'She goes to school every day.',
                explanation: 'Third person singular (she) requires -s or -es in present simple.',
            },
            {
                type: QuestionType.FILL_IN_BLANK,
                questionText: 'Complete: They ___ (play) football yesterday.',
                correctAnswer: 'played',
                explanation: 'Past simple uses the -ed form for regular verbs.',
            },
            {
                type: QuestionType.MULTIPLE_CHOICE,
                questionText: 'Select the correct option:',
                options: [
                    'He don\'t like apples.',
                    'He doesn\'t likes apples.',
                    'He doesn\'t like apples.',
                    'He not like apples.',
                ],
                correctAnswer: 'He doesn\'t like apples.',
                explanation: '"Doesn\'t" is used with third person singular, followed by base verb.',
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
                explanation: 'Specific past time (last year) requires simple past tense.',
            },
        ];
    }

    // Shuffle base questions
    const shuffledBase = [...baseQuestions].sort(() => 0.5 - Math.random());

    // Generate the requested number of questions
    const questions: Question[] = [];
    for (let i = 0; i < numberOfQuestions; i++) {
        const baseQ = shuffledBase[i % shuffledBase.length];
        questions.push({
            id: i + 1,
            type: baseQ.type || QuestionType.MULTIPLE_CHOICE,
            questionText: baseQ.questionText + (i >= shuffledBase.length ? ` (${Math.floor(i / shuffledBase.length) + 1})` : ''),
            options: baseQ.options,
            correctAnswer: baseQ.correctAnswer,
            explanation: baseQ.explanation,
        } as Question);
    }

    return {
        title: `${topic} Practice (Offline Mock)`,
        difficulty: difficulty,
        questions,
    };
}


export interface WritingScore {
    score: number; // 0-100
    grade: string; // A, B, C, D, F
    feedback: {
        grammar: { score: number; comment: string };
        structure: { score: number; comment: string };
        vocabulary: { score: number; comment: string };
        clarity: { score: number; comment: string };
    };
    overallComment: string;
    suggestions: string[];
}

export async function scoreWriting(content: string, topicType: string): Promise<WritingScore> {
    // Always use offline scoring
    return generateMockScore(content, topicType);
}

function generateMockScore(content: string, topicType: string): WritingScore {
    const wordCount = content.trim().split(/\s+/).filter(w => w).length;
    const baseScore = Math.min(100, Math.max(40, 50 + wordCount * 0.5));

    const getGrade = (score: number) => {
        if (score >= 90) return 'A';
        if (score >= 80) return 'B';
        if (score >= 70) return 'C';
        if (score >= 60) return 'D';
        return 'F';
    };

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
            'Review punctuation rules for better clarity.'
        ],
    };
}
