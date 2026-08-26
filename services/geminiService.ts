import { QuizSession, QuestionType, Question } from '../types';
import { getQuestionsForTopic, getQuestionsForMultipleTopics, OfflineQuestion } from '../data/offlineQuestionBank';

export async function generateGrammarPractice(topics: string[], difficulty: string, numberOfQuestions: number = 5, allowedTypes: QuestionType[] = []): Promise<QuizSession> {
    // Always use the offline question bank
    return generateMockQuiz(topics, difficulty, numberOfQuestions, allowedTypes);
}

function generateMockQuiz(topics: string[], difficulty: string, numberOfQuestions: number = 5, allowedTypes: QuestionType[] = []): QuizSession {
    let baseQuestions: OfflineQuestion[] = [];

    // Check if multiple topics or single topic
    if (topics.length === 1) {
        // Single topic - use existing logic
        const topicQuestions = getQuestionsForTopic(topics[0]);
        if (topicQuestions && topicQuestions.length > 0) {
            baseQuestions = topicQuestions;
        }
    } else if (topics.length > 1) {
        // Multiple topics - merge and shuffle
        baseQuestions = getQuestionsForMultipleTopics(topics);
    }

    // Fallback to generic questions if no topic questions found
    if (baseQuestions.length === 0) {
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
            {
                type: QuestionType.SENTENCE,
                questionText: 'Correct the sentence: "She don\'t knows him."',
                correctAnswer: 'She doesn\'t know him.',
                explanation: 'Third person singular takes "doesn\'t" and base verb "know".',
            }
        ];
    }


    // Filter by allowed types if specified
    if (allowedTypes && allowedTypes.length > 0) {
        baseQuestions = baseQuestions.filter(q => allowedTypes.includes(q.type));
    }

    // If filtering removed all questions (e.g. topic doesn't have that type), fall back to showing all
    // Or we could return an error, but fallback is safer for now. 
    // Ideally we should inform user but for now we'll just guard against empty.
    if (baseQuestions.length === 0) {
        // Fallback: If strict filtering yields nothing, we might want to relax or show a specific message.
        // For now, let's just not filter if result is empty so user gets *something* (or keep it empty and handle in UI).
        // Let's keep it empty and the loop below key off it.
        // Actually, if we have 0 questions, we can't generate a quiz. 
        // Let's populate with a generic "No questions found for this type" placeholder if really needed?
        // Better: let's re-fetch from fallback generic list if topic yielded nothing for that type.
        const genericFallbacks = [
            // We can just rely on the loop not running and returning empty, but the UI expects questions.
        ];
        // If we really have nothing, let's relax the filter? 
        // User explicitly asked for types. If none exist, we should probably output 0 questions or handle gracefully.
    }

    // If filtered list is empty (e.g. user selected ONLY Sentences but topic has none),
    // we can try to "Smart Convert" existing questions to Sentence Builders.
    if (allowedTypes && allowedTypes.length === 1 && allowedTypes[0] === QuestionType.SENTENCE && baseQuestions.length === 0) {
        // Fetch ALL questions for this topic again (ignoring type filter) to find candidates
        let candidates: OfflineQuestion[] = [];
        if (topics.length === 1) {
            candidates = getQuestionsForTopic(topics[0]) || [];
        } else {
            candidates = getQuestionsForMultipleTopics(topics);
        }

        // Smart Convert eligible candidates
        const converted = candidates
            .filter(q => q.questionText.includes('___')) // Only those with blanks
            .map(q => {
                // 1. Create the full sentence
                // Replace ___ (or multiple underscores) with the correct answer
                const cleanAnswer = q.correctAnswer;
                const fullSentence = q.questionText.replace(/_+/g, cleanAnswer).replace(/\s*\(.*?\)/g, ''); // Remove hints like (verb)

                // 2. Create Scrambled Words
                // Start with the words from the full sentence
                const words = fullSentence.split(' ').map(w => w.replace(/[.,?!]/g, '')); // Simple tokenization

                // Add distractors from the wrong options if available
                if (q.options) {
                    q.options.forEach(opt => {
                        if (opt !== q.correctAnswer) {
                            words.push(opt);
                        }
                    });
                }

                return {
                    ...q,
                    type: QuestionType.SENTENCE,
                    questionText: `Form the sentence: "${fullSentence}"`,
                    scrambledWords: words,
                    // We keep the original correct Answer/Exp but the UI will use scrambledWords logic
                    correctAnswer: fullSentence,
                } as OfflineQuestion;
            });

        if (converted.length > 0) {
            baseQuestions = converted;
        }
    }

    // Safety check
    if (baseQuestions.length === 0) {
        // Fallback or Error
        // If strict filtering yields nothing, return empty (UI handles) or throw.
        // For now, let's allow empty return to show "No questions found" in UI instead of crashing
        return {
            title: topics.length === 1 ? `${topics[0]} Practice` : 'Mixed Practice',
            difficulty,
            questions: []
        };
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
            scrambledWords: baseQ.scrambledWords,
            correctAnswer: baseQ.correctAnswer,
            explanation: baseQ.explanation,
        } as Question);
    }

    // Generate title based on number of topics
    const title = topics.length === 1
        ? `${topics[0]} Practice (Offline Mock)`
        : `Mixed Topics Practice (${topics.length} topics)`;

    return {
        title,
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
