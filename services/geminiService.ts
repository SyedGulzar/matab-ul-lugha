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


// Set of 300+ most frequent English function & content words for fast vocabulary validation
const COMMON_ENGLISH_WORDS = new Set([
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with',
  'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her',
  'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up',
  'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time',
  'no', 'just', 'him', 'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could',
  'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think',
  'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even',
  'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us', 'is', 'are', 'was',
  'were', 'been', 'has', 'had', 'am', 'cricket', 'match', 'school', 'game', 'play', 'player',
  'team', 'pakistan', 'karachi', 'friend', 'father', 'mother', 'principal', 'leave', 'letter',
  'application', 'respect', 'due', 'sir', 'madam', 'student', 'class', 'dear', 'sincerely',
  'obediently', 'write', 'writing', 'book', 'study', 'exam', 'examination', 'annual', 'hospital',
  'doctor', 'fever', 'ill', 'sick', 'request', 'grant', 'money', 'buy', 'need', 'important',
  'problem', 'water', 'city', 'country', 'education', 'teacher', 'lesson', 'learn', 'pollution',
  'traffic', 'solution', 'conclusion', 'introduction', 'first', 'second', 'finally', 'last',
  'great', 'happy', 'excited', 'win', 'won', 'score', 'scored', 'runs', 'wicket', 'ball', 'bat',
  'morning', 'evening', 'night', 'today', 'yesterday', 'tomorrow', 'sunday', 'monday', 'summer',
  'winter', 'holiday', 'vacation', 'family', 'home', 'house', 'village', 'street', 'road'
]);

export async function scoreWriting(content: string, topicType: string): Promise<WritingScore> {
  let text = content ?? '';
  let topic = topicType ?? '';

  // Only swap if arguments were clearly reversed (e.g. topic is full paragraph and text is a short title)
  if (topic.split(/\s+/).length > 15 && text.split(/\s+/).length <= 3) {
    const temp = text;
    text = topic;
    topic = temp;
  }

  return evaluateWritingContent(text, topic);
}

function isGibberishWord(word: string): boolean {
  const clean = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!clean) return false;
  if (clean.length === 1 && !['a', 'i'].includes(clean)) return true;

  // Check known dictionary word
  if (COMMON_ENGLISH_WORDS.has(clean)) return false;

  // Keyboard row spam sub-patterns (e.g. asd, asda, asdasd, qwer, zxcv, jkl)
  if (/(?:asd|sda|das|asdf|asda|asdasd|sdfg|dfgh|fghj|ghjk|hjkl|qwer|wert|erty|rtyu|tyui|yuio|uiop|zxcv|xcvb|cvbn|vbnm)/i.test(clean)) {
    return true;
  }

  // 3+ identical consecutive characters (e.g. aaaaa, ssss)
  if (/(.)\1\1/.test(clean)) return true;

  // Consonant clusters or lack of vowels in words > 2 chars
  const vowelCount = (clean.match(/[aeiouy]/gi) || []).length;
  const vowelRatio = vowelCount / clean.length;
  if (clean.length > 2 && (vowelRatio === 0 || vowelRatio > 0.8)) {
    return true;
  }

  // Repeated 2-char sequences (e.g. asdasd, adad, abab)
  if (/^([a-z]{2,3})\1+$/.test(clean)) return true;

  return false;
}

const TOPIC_SEMANTIC_KEYWORDS: Record<string, string[]> = {
  cricket: ['cricket', 'match', 'bat', 'ball', 'bowler', 'batsman', 'pitch', 'runs', 'overs', 'wickets', 'captain', 'team', 'stadium', 'trophy', 'score', 'innings', 'fielding', 'toss', 'victory', 'won', 'lost', 'play', 'player', 'ground', 'championship'],
  karachi: ['karachi', 'city', 'water', 'shortage', 'traffic', 'load shedding', 'electricity', 'roads', 'garbage', 'citizens', 'population', 'transport', 'problems', 'issues', 'pollution', 'infrastructure'],
  energy: ['energy', 'electricity', 'power', 'crisis', 'load shedding', 'gas', 'solar', 'dams', 'renewable', 'generation', 'economy', 'shortage', 'industries'],
  pollution: ['pollution', 'environment', 'smoke', 'air', 'water', 'plastic', 'garbage', 'clean', 'health', 'disease', 'factory', 'vehicles', 'traffic', 'trees', 'nature'],
  leave: ['leave', 'sick', 'fever', 'doctor', 'bed rest', 'ill', 'hospital', 'attend', 'grant', 'days', 'absent', 'school', 'principal', 'headmaster', 'prescribed', 'medicine'],
  letter: ['letter', 'father', 'mother', 'brother', 'sister', 'friend', 'salam', 'assalam', 'hostel', 'money', 'books', 'health', 'annual', 'exam', 'examination', 'preparation', 'regards'],
  application: ['application', 'principal', 'respected', 'sir', 'madam', 'grant', 'leave', 'concession', 'certificate', 'character', 'beg', 'state', 'student', 'obediently', 'school'],
  precis: ['précis', 'summary', 'passage', 'condensed', 'central idea', 'title', 'words', 'main point', 'author', 'concise', 'original'],
};

function evaluateWritingContent(content: string, topicType: string): WritingScore {
  const trimmed = content.trim();
  const rawWords = trimmed.split(/\s+/).filter((w) => w.length > 0);
  const wordCount = rawWords.length;

  // 1. Empty submission
  if (wordCount === 0) {
    return {
      score: 0,
      grade: 'F',
      grammarScore: 0,
      structureScore: 0,
      contentScore: 0,
      toneScore: 0,
      feedback: '⚠️ No content was provided. Please write a composition based on the given prompt.',
      suggestions: ['Write a complete response in the text area before submitting.'],
    };
  }

  // 2. Gibberish & Keyboard Mash Detection
  let gibberishCount = 0;
  for (const w of rawWords) {
    if (isGibberishWord(w)) {
      gibberishCount++;
    }
  }

  const singleLetterCount = rawWords.filter((w) => w.length === 1).length;
  if (wordCount > 4 && singleLetterCount / wordCount > 0.25) {
    gibberishCount += Math.floor(singleLetterCount / 2);
  }

  const gibberishRatio = gibberishCount / wordCount;
  if (gibberishRatio > 0.2 || (wordCount < 10 && gibberishCount > 1)) {
    return {
      score: 0,
      grade: 'F',
      grammarScore: 0,
      structureScore: 0,
      contentScore: 0,
      toneScore: 0,
      feedback:
        '⚠️ Incoherent / Invalid Input: Your submission contains random keyboard mashing, repeated characters, or non-English text. No academic credit can be awarded for gibberish.\n\nPlease write meaningful, coherent English sentences relevant to the assigned prompt.',
      suggestions: [
        'Use valid English vocabulary and full sentences.',
        'Address the assigned scenario or essay prompt directly.',
        'Avoid typing random repeated letters (e.g., "asdasd").',
      ],
    };
  }

  // 3. Repetition / Copy-Paste Spam Detection
  const sentences = trimmed
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  const sentenceCount = sentences.length;

  const cleanSentences = sentences.map((s) => s.toLowerCase().replace(/[^a-z0-9]/g, ''));
  const uniqueSentences = new Set(cleanSentences).size;
  const sentenceRepetitionRatio = sentenceCount > 1 ? (sentenceCount - uniqueSentences) / sentenceCount : 0;

  const rawParagraphs = trimmed
    .split(/\n\s*\n/)
    .map((p) => p.trim().toLowerCase().replace(/[^a-z0-9]/g, ''))
    .filter((p) => p.length > 0);
  const uniqueParagraphs = new Set(rawParagraphs).size;
  const paragraphRepetitionRatio =
    rawParagraphs.length > 1 ? (rawParagraphs.length - uniqueParagraphs) / rawParagraphs.length : 0;

  const uniqueWordRatio = wordCount > 0 ? new Set(rawWords.map((w) => w.toLowerCase())).size / wordCount : 1;

  if (
    sentenceRepetitionRatio > 0.3 ||
    paragraphRepetitionRatio > 0.25 ||
    (wordCount > 30 && uniqueWordRatio < 0.4)
  ) {
    return {
      score: 0,
      grade: 'F',
      grammarScore: 0,
      structureScore: 0,
      contentScore: 0,
      toneScore: 0,
      feedback:
        '⚠️ Excessive Repetition / Duplicate Text Detected: Your submission contains duplicated sentences or repeated paragraphs pasted multiple times. Academic writing requires progressive, original content in every paragraph.',
      suggestions: [
        'Write original, non-repeating sentences to develop your ideas.',
        'Follow a logical structure: Introduction → Body Paragraphs → Conclusion.',
        'Do not repeat the same phrases or paragraphs to increase word count.',
      ],
    };
  }

  // 4. Topic Relevancy Analysis (Whole-word token matching)
  const contentWordSet = new Set(rawWords.map((w) => w.toLowerCase().replace(/[^a-z0-9]/g, '')));
  const topicKeywords = topicType
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 3 && !['writing', 'task', 'class', 'mode'].includes(w));

  let relevantHits = 0;
  let isTopicRelevant = false;

  for (const [clusterKey, kwList] of Object.entries(TOPIC_SEMANTIC_KEYWORDS)) {
    if (topicType.toLowerCase().includes(clusterKey)) {
      for (const kw of kwList) {
        if (contentWordSet.has(kw.toLowerCase())) {
          relevantHits++;
        }
      }
      isTopicRelevant = relevantHits >= 2;
      break;
    }
  }

  if (!isTopicRelevant && topicKeywords.length > 0) {
    for (const kw of topicKeywords) {
      if (contentWordSet.has(kw.toLowerCase())) relevantHits++;
    }
    isTopicRelevant = relevantHits >= 1;
  }

  // 5. Structure & Grammar Calculations
  let capitalizedSentences = 0;
  for (const s of sentences) {
    if (/^[A-Z]/.test(s)) capitalizedSentences++;
  }
  const capitalizationRatio = sentenceCount > 0 ? capitalizedSentences / sentenceCount : 0;

  let grammar = Math.round(
    Math.min(25, Math.max(2, (1 - gibberishRatio) * 12 + capitalizationRatio * 8 + Math.min(sentenceCount, 5)))
  );

  const paragraphCount = rawParagraphs.length;
  let structure = Math.round(
    Math.min(25, Math.max(2, Math.min(wordCount / 10, 10) + Math.min(sentenceCount * 2, 8) + (paragraphCount > 1 ? 5 : 2)))
  );

  let contentScore = Math.round(
    Math.min(
      25,
      Math.max(
        2,
        Math.min(wordCount / 8, 12) +
          (isTopicRelevant ? 8 : 0) +
          (wordCount >= 100 ? 5 : Math.round(wordCount / 20))
      )
    )
  );

  const uniqueWords = new Set(rawWords.map((w) => w.toLowerCase())).size;
  const vocabularyVariety = wordCount > 0 ? uniqueWords / wordCount : 0;
  let tone = Math.round(
    Math.min(25, Math.max(2, vocabularyVariety * 12 + Math.min(wordCount / 15, 8) + (wordCount >= 50 ? 5 : 2)))
  );

  // Severe Penalties for Short Submissions
  if (wordCount < 15) {
    grammar = Math.min(grammar, 3);
    structure = Math.min(structure, 2);
    contentScore = Math.min(contentScore, 3);
    tone = Math.min(tone, 2);
  } else if (wordCount < 40) {
    grammar = Math.min(grammar, 8);
    structure = Math.min(structure, 7);
    contentScore = Math.min(contentScore, 8);
    tone = Math.min(tone, 7);
  }

  // If Off-Topic (and non-empty)
  if (!isTopicRelevant && topicKeywords.length > 0 && wordCount >= 15) {
    return {
      score: 5,
      grade: 'F',
      grammarScore: Math.min(grammar, 5),
      structureScore: Math.min(structure, 4),
      contentScore: 0,
      toneScore: Math.min(tone, 3),
      feedback: `⚠️ Off-Topic Submission: Your composition does not contain content relevant to the assigned topic ("${topicType}"). You must address the prompt directly to receive academic marks.`,
      suggestions: [
        `Write about key themes concerning "${topicType}".`,
        'Ensure every paragraph relates back to the question.',
        'Avoid submitting unrelated text or templates.',
      ],
    };
  }

  const totalScore = grammar + structure + contentScore + tone;

  const getGrade = (score: number) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 50) return 'D';
    return 'F';
  };

  const grade = getGrade(totalScore);

  let feedbackText = '';
  const suggestionsList: string[] = [];

  if (totalScore < 30) {
    feedbackText = `⚠️ Insufficient Submission (${wordCount} words): Your response is significantly under the expected length and lacks paragraph development.`;
    suggestionsList.push('Aim for at least 150–250 words to adequately cover the prompt.');
    suggestionsList.push('Structure your composition into Introduction, Body, and Conclusion.');
  } else if (totalScore < 60) {
    feedbackText = `Developing Effort (${wordCount} words): You have made a start on the prompt, but further detail, paragraph structure, and grammatical polish are required.`;
    suggestionsList.push('Expand each outline point with 2–3 supporting sentences.');
    suggestionsList.push('Ensure proper capitalization and punctuation throughout.');
  } else if (totalScore < 80) {
    feedbackText = `Good Effort (${wordCount} words): Clear progression of ideas with appropriate tone. Sentences are generally well-constructed with minor areas for refinement.`;
    suggestionsList.push('Use more transition words (e.g. "Furthermore", "In addition", "Consequently").');
    suggestionsList.push('Add richer descriptive vocabulary.');
  } else {
    feedbackText = `Excellent Composition (${wordCount} words): Well-structured, coherent, and highly relevant to the topic. Demonstrates strong vocabulary and sound grammatical accuracy suitable for board exams.`;
    suggestionsList.push('Maintain this high standard of organizational clarity.');
  }

  return {
    score: totalScore,
    grade,
    grammarScore: grammar,
    structureScore: structure,
    contentScore: contentScore,
    toneScore: tone,
    feedback: feedbackText,
    suggestions: suggestionsList,
  };
}
