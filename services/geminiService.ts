import { GoogleGenAI } from '@google/genai';
import { QuizSession, QuestionType, Question } from '../types';

// @ts-ignore - Vite environment variable
const API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateGrammarPractice(topic: string, difficulty: string, numberOfQuestions: number = 5): Promise<QuizSession> {
    if (!API_KEY) {
        // Fallback mock data when no API key is available
        return generateMockQuiz(topic, difficulty, numberOfQuestions);
    }

    try {
        const prompt = `You are an English Grammar teacher. Generate a practice quiz on the topic "${topic}" for a student at "${difficulty}" level.
Request ID: ${Date.now()}

Create exactly ${numberOfQuestions} questions with a mix of:
- Multiple choice questions (4 options each)
- Fill in the blank questions

Return ONLY valid JSON in this exact format:
{
  "title": "Quiz title here",
  "difficulty": "${difficulty}",
  "questions": [
    {
      "id": 1,
      "type": "multiple_choice",
      "questionText": "Question text here",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "The correct option text",
      "explanation": "Brief explanation of why this is correct"
    },
    {
      "id": 2,
      "type": "fill_in_blank",
      "questionText": "Complete the sentence: The cat ___ on the mat.",
      "correctAnswer": "sat",
      "explanation": "Brief explanation"
    }
  ]
}`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
        });

        const text = response.text || '';

        // Extract JSON from the response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('No valid JSON found in response');
        }

        const data = JSON.parse(jsonMatch[0]);

        // Validate and transform the response
        const questions: Question[] = data.questions.map((q: any, index: number) => ({
            id: q.id || index + 1,
            type: q.type === 'fill_in_blank' ? QuestionType.FILL_IN_BLANK : QuestionType.MULTIPLE_CHOICE,
            questionText: q.questionText,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation || 'No explanation provided.',
        }));

        return {
            title: data.title || `${topic} Practice`,
            difficulty: data.difficulty || difficulty,
            questions,
        };
    } catch (error) {
        console.error('Gemini API error:', error);
        // Fallback to mock data on error
        return generateMockQuiz(topic, difficulty, numberOfQuestions);
    }
}

function generateMockQuiz(topic: string, difficulty: string, numberOfQuestions: number = 5): QuizSession {
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
                'He don\'t like apples.',
                'He doesn\'t likes apples.',
                'He doesn\'t like apples.',
                'He not like apples.',
            ],
            correctAnswer: 'He doesn\'t like apples.',
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

    // Shuffle base questions to provide variety
    const shuffledBase = [...baseQuestions].sort(() => 0.5 - Math.random());

    // Generate valid unique mock questions by cycling through shuffled questions
    const questions: Question[] = [];
    for (let i = 0; i < numberOfQuestions; i++) {
        const baseQ = shuffledBase[i % shuffledBase.length];
        questions.push({
            id: i + 1,
            type: baseQ.type,
            questionText: baseQ.questionText + (i >= 5 ? ` (Variation ${Math.floor(i / 5) + 1})` : ''),
            options: baseQ.options, // Reuse options
            correctAnswer: baseQ.correctAnswer,
            explanation: baseQ.explanation,
        });
    }

    return {
        title: `${topic} Practice`,
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
    if (!API_KEY || content.trim().split(/\s+/).length < 10) {
        return generateMockScore(content, topicType);
    }

    try {
        const prompt = `You are an English teacher grading a student's ${topicType}. Analyze the following writing and provide a detailed score.

WRITING TO SCORE:
"""
${content}
"""

Return ONLY valid JSON in this exact format:
{
    "score": 75,
    "grade": "B",
    "feedback": {
        "grammar": { "score": 80, "comment": "Brief comment on grammar" },
        "structure": { "score": 70, "comment": "Brief comment on structure" },
        "vocabulary": { "score": 75, "comment": "Brief comment on vocabulary" },
        "clarity": { "score": 75, "comment": "Brief comment on clarity" }
    },
    "overallComment": "Overall feedback in 1-2 sentences",
    "suggestions": ["Suggestion 1", "Suggestion 2", "Suggestion 3"]
}

Score from 0-100. Grade: A(90-100), B(80-89), C(70-79), D(60-69), F(<60).`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
        });

        const text = response.text || '';
        const jsonMatch = text.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
            throw new Error('No valid JSON found');
        }

        return JSON.parse(jsonMatch[0]) as WritingScore;
    } catch (error) {
        console.error('Scoring error:', error);
        return generateMockScore(content, topicType);
    }
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
