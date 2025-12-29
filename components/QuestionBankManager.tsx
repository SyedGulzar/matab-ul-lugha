import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronRight, X, Eye, EyeOff, FileText, CheckCircle, BookOpen, PenTool, FileQuestion } from 'lucide-react';
import { QuestionType } from '../types';
import {
    PRESENT_SIMPLE,
    PRESENT_CONTINUOUS,
    PRESENT_PERFECT,
    PRESENT_PERFECT_CONTINUOUS,
    PAST_SIMPLE,
    PAST_CONTINUOUS,
    PAST_PERFECT,
    PAST_PERFECT_CONTINUOUS,
    FUTURE_SIMPLE,
    FUTURE_CONTINUOUS,
    FUTURE_PERFECT,
    FUTURE_PERFECT_CONTINUOUS,
    NOUNS,
    PRONOUNS,
    ADJECTIVES,
    ADVERBS,
    PREPOSITIONS,
    CONJUNCTIONS,
    ACTIVE_PASSIVE_VOICE,
    NARRATION,
    ARTICLES,
    CONDITIONALS,
    MODAL_VERBS,
    CAUSATIVE_VERBS,
    PUNCTUATION,
    PROVERBS,
    PAIR_OF_WORDS,
    COMPREHENSION_QUESTIONS,
    ESSAY_TOPICS,
    APPLICATION_TEMPLATES,
    getAllQuestions,
    OfflineQuestion,
} from '../data/offlineQuestionBank';
import { COMPREHENSION_PASSAGES } from '../data/questions/writing';

interface QuestionCategory {
    name: string;
    topics: { name: string; questions: OfflineQuestion[] }[];
}

const QUESTION_CATEGORIES: QuestionCategory[] = [
    {
        name: 'Tenses',
        topics: [
            { name: 'Present Simple', questions: PRESENT_SIMPLE },
            { name: 'Present Continuous', questions: PRESENT_CONTINUOUS },
            { name: 'Present Perfect', questions: PRESENT_PERFECT },
            { name: 'Present Perfect Continuous', questions: PRESENT_PERFECT_CONTINUOUS },
            { name: 'Past Simple', questions: PAST_SIMPLE },
            { name: 'Past Continuous', questions: PAST_CONTINUOUS },
            { name: 'Past Perfect', questions: PAST_PERFECT },
            { name: 'Past Perfect Continuous', questions: PAST_PERFECT_CONTINUOUS },
            { name: 'Future Simple', questions: FUTURE_SIMPLE },
            { name: 'Future Continuous', questions: FUTURE_CONTINUOUS },
            { name: 'Future Perfect', questions: FUTURE_PERFECT },
            { name: 'Future Perfect Continuous', questions: FUTURE_PERFECT_CONTINUOUS },
        ],
    },
    {
        name: 'Parts of Speech',
        topics: [
            { name: 'Nouns', questions: NOUNS },
            { name: 'Pronouns', questions: PRONOUNS },
            { name: 'Adjectives', questions: ADJECTIVES },
            { name: 'Adverbs', questions: ADVERBS },
            { name: 'Prepositions', questions: PREPOSITIONS },
            { name: 'Conjunctions', questions: CONJUNCTIONS },
        ],
    },
    {
        name: 'Voice',
        topics: [{ name: 'Active/Passive Voice', questions: ACTIVE_PASSIVE_VOICE }],
    },
    {
        name: 'Narration',
        topics: [{ name: 'Direct/Indirect Speech', questions: NARRATION }],
    },
    {
        name: 'Articles',
        topics: [{ name: 'A, An, The', questions: ARTICLES }],
    },
    {
        name: 'Conditionals',
        topics: [{ name: 'Conditional Sentences', questions: CONDITIONALS }],
    },
    {
        name: 'Modal Verbs',
        topics: [
            { name: 'Modals', questions: MODAL_VERBS },
            { name: 'Causative Verbs', questions: CAUSATIVE_VERBS },
        ],
    },
    {
        name: 'Advanced Grammar',
        topics: [
            { name: 'Punctuation Rules', questions: PUNCTUATION },
            { name: 'Proverbs', questions: PROVERBS },
            { name: 'Pair of Words', questions: PAIR_OF_WORDS },
            { name: 'Comprehension', questions: COMPREHENSION_QUESTIONS },
        ],
    },
];

type ViewTab = 'grammar' | 'essays' | 'applications' | 'comprehension';

export const QuestionBankManager: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState<ViewTab>('grammar');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedCategories, setExpandedCategories] = useState<string[]>(['Tenses']);
    const [selectedTopic, setSelectedTopic] = useState<string | null>('Present Simple');
    const [showAnswer, setShowAnswer] = useState<Record<number, boolean>>({});
    const [filterType, setFilterType] = useState<'all' | 'mcq' | 'fill'>('all');
    const [selectedEssayIndex, setSelectedEssayIndex] = useState(0);
    const [selectedAppIndex, setSelectedAppIndex] = useState(0);
    const [selectedPassageIndex, setSelectedPassageIndex] = useState(0);

    const allQuestions = useMemo(() => getAllQuestions(), []);
    const totalCount = allQuestions.length;

    const toggleCategory = (name: string) => {
        setExpandedCategories(prev =>
            prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]
        );
    };

    const getQuestionsForTopic = (topicName: string): OfflineQuestion[] => {
        for (const cat of QUESTION_CATEGORIES) {
            const topic = cat.topics.find(t => t.name === topicName);
            if (topic) return topic.questions;
        }
        return [];
    };

    const filteredQuestions = useMemo(() => {
        let questions = selectedTopic ? getQuestionsForTopic(selectedTopic) : allQuestions;

        if (filterType !== 'all') {
            questions = questions.filter(q =>
                filterType === 'mcq'
                    ? q.type === QuestionType.MULTIPLE_CHOICE
                    : q.type === QuestionType.FILL_IN_BLANK
            );
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            questions = questions.filter(
                q =>
                    q.questionText.toLowerCase().includes(query) ||
                    q.correctAnswer.toLowerCase().includes(query) ||
                    q.explanation.toLowerCase().includes(query)
            );
        }

        return questions;
    }, [selectedTopic, filterType, searchQuery, allQuestions]);

    const toggleAnswer = (index: number) => {
        setShowAnswer(prev => ({ ...prev, [index]: !prev[index] }));
    };

    const tabs = [
        { id: 'grammar' as ViewTab, label: 'Grammar', icon: FileText, count: totalCount },
        { id: 'essays' as ViewTab, label: 'Essays', icon: BookOpen, count: ESSAY_TOPICS.length },
        { id: 'applications' as ViewTab, label: 'Applications', icon: PenTool, count: APPLICATION_TEMPLATES.length },
        { id: 'comprehension' as ViewTab, label: 'Comprehension', icon: FileQuestion, count: COMPREHENSION_PASSAGES.length },
    ];

    const renderGrammarTab = () => (
        <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 bg-[#E6DEC8] dark:bg-slate-800/50 border-r-2 border-[#5D4037]/20 dark:border-amber-500/20 overflow-y-auto p-4">
                <button
                    onClick={() => setSelectedTopic(null)}
                    className={`w-full text-left px-3 py-2 rounded-lg mb-4 font-messiri font-bold transition-all ${selectedTopic === null
                            ? 'bg-[#4A3728] dark:bg-amber-600 text-white'
                            : 'bg-[#F0EAD6] dark:bg-slate-700 text-[#4A3728] dark:text-amber-500 hover:bg-[#5D4037]/10'
                        }`}
                >
                    📚 All Questions ({totalCount})
                </button>

                {QUESTION_CATEGORIES.map(category => {
                    const isExpanded = expandedCategories.includes(category.name);
                    const categoryTotal = category.topics.reduce((sum, t) => sum + t.questions.length, 0);

                    return (
                        <div key={category.name} className="mb-2">
                            <button
                                onClick={() => toggleCategory(category.name)}
                                className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#F0EAD6] dark:bg-slate-700 text-[#4A3728] dark:text-amber-500 font-messiri font-bold hover:bg-[#5D4037]/10 dark:hover:bg-slate-600 transition-all"
                            >
                                <span className="flex items-center gap-2">
                                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                    {category.name}
                                </span>
                                <span className="text-xs bg-[#4A3728]/20 dark:bg-amber-500/20 px-2 py-0.5 rounded-full">
                                    {categoryTotal}
                                </span>
                            </button>

                            {isExpanded && (
                                <div className="ml-4 mt-1 space-y-1">
                                    {category.topics.map(topic => (
                                        <button
                                            key={topic.name}
                                            onClick={() => setSelectedTopic(topic.name)}
                                            className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-all ${selectedTopic === topic.name
                                                    ? 'bg-[#4A3728] dark:bg-amber-600 text-white font-bold'
                                                    : 'text-[#5D4037] dark:text-slate-400 hover:bg-[#5D4037]/10 dark:hover:bg-slate-600'
                                                }`}
                                        >
                                            {topic.name} ({topic.questions.length})
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Filters */}
                <div className="p-4 bg-[#F5F0E0] dark:bg-slate-800/30 border-b border-[#5D4037]/10 dark:border-amber-500/10 flex flex-wrap items-center gap-4">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8D6E63] dark:text-slate-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search questions..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-700 border border-[#5D4037]/30 dark:border-slate-600 rounded-lg text-[#2C1810] dark:text-white placeholder:text-[#8D6E63] dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#4A3728] dark:focus:ring-amber-500"
                        />
                    </div>

                    <div className="flex gap-2">
                        {(['all', 'mcq', 'fill'] as const).map(type => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${filterType === type
                                        ? 'bg-[#4A3728] dark:bg-amber-600 text-white'
                                        : 'bg-[#F0EAD6] dark:bg-slate-700 text-[#5D4037] dark:text-slate-400 hover:bg-[#5D4037]/10'
                                    }`}
                            >
                                {type === 'all' ? 'All' : type === 'mcq' ? 'MCQ' : 'Fill-in'}
                            </button>
                        ))}
                    </div>

                    <span className="text-sm text-[#8D6E63] dark:text-slate-400">
                        Showing: <span className="font-bold text-[#4A3728] dark:text-amber-400">{filteredQuestions.length}</span>
                    </span>
                </div>

                {/* Questions List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {filteredQuestions.length === 0 ? (
                        <div className="text-center py-12 text-[#8D6E63] dark:text-slate-500">No questions found.</div>
                    ) : (
                        filteredQuestions.map((q, index) => (
                            <div key={index} className="bg-white dark:bg-slate-800 border border-[#5D4037]/20 dark:border-slate-700 rounded-xl p-4 hover:shadow-md transition-all">
                                <div className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[#4A3728] dark:bg-amber-600 text-white rounded-full text-sm font-bold">
                                        {index + 1}
                                    </span>
                                    <div className="flex-1">
                                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${q.type === QuestionType.MULTIPLE_CHOICE ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'}`}>
                                            {q.type === QuestionType.MULTIPLE_CHOICE ? 'MCQ' : 'Fill-in'}
                                        </span>
                                        <p className="text-[#2C1810] dark:text-white font-medium mt-2 mb-2">{q.questionText}</p>
                                        {q.options && (
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {q.options.map((opt, i) => (
                                                    <span key={i} className={`px-2 py-1 rounded text-sm ${showAnswer[index] && opt === q.correctAnswer ? 'bg-green-200 dark:bg-green-900/50 text-green-800 dark:text-green-300 font-bold' : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300'}`}>
                                                        {String.fromCharCode(65 + i)}. {opt}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        <button onClick={() => toggleAnswer(index)} className="text-sm text-[#4A3728] dark:text-amber-500 hover:underline flex items-center gap-1">
                                            {showAnswer[index] ? <EyeOff size={14} /> : <Eye size={14} />}
                                            {showAnswer[index] ? 'Hide Answer' : 'Show Answer'}
                                        </button>
                                        {showAnswer[index] && (
                                            <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <CheckCircle className="text-green-600 dark:text-green-400" size={16} />
                                                    <span className="font-bold text-green-700 dark:text-green-400">Answer: {q.correctAnswer}</span>
                                                </div>
                                                <p className="text-sm text-green-800 dark:text-green-300">{q.explanation}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );

    const renderEssaysTab = () => {
        const essay = ESSAY_TOPICS[selectedEssayIndex];
        return (
            <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-3xl mx-auto">
                    {/* Essay Selector */}
                    <div className="mb-6 flex flex-wrap gap-2">
                        {ESSAY_TOPICS.map((e, i) => (
                            <button
                                key={e.id}
                                onClick={() => setSelectedEssayIndex(i)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedEssayIndex === i ? 'bg-[#4A3728] dark:bg-amber-600 text-white' : 'bg-[#F0EAD6] dark:bg-slate-700 text-[#5D4037] dark:text-slate-400 hover:bg-[#5D4037]/10'}`}
                            >
                                {i + 1}. {e.title.substring(0, 20)}...
                            </button>
                        ))}
                    </div>

                    {/* Essay Content */}
                    <div className="bg-white dark:bg-slate-800 border-2 border-[#5D4037]/20 dark:border-amber-500/30 rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${essay.category === 'national' ? 'bg-red-100 text-red-700' : essay.category === 'social' ? 'bg-blue-100 text-blue-700' : essay.category === 'education' ? 'bg-green-100 text-green-700' : essay.category === 'technology' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                                {essay.category}
                            </span>
                            <span className="text-sm text-[#8D6E63] dark:text-slate-400">Word Limit: {essay.wordLimit}</span>
                        </div>
                        <h3 className="text-2xl font-messiri font-bold text-[#2C1810] dark:text-amber-500 mb-4">{essay.title}</h3>

                        <div className="mb-4">
                            <h4 className="font-bold text-[#4A3728] dark:text-amber-400 mb-2">Outline:</h4>
                            <ol className="list-decimal list-inside space-y-1 text-[#5D4037] dark:text-slate-300">
                                {essay.outline.map((point, i) => <li key={i}>{point}</li>)}
                            </ol>
                        </div>

                        <div>
                            <h4 className="font-bold text-[#4A3728] dark:text-amber-400 mb-2">Key Points:</h4>
                            <ul className="list-disc list-inside space-y-1 text-[#5D4037] dark:text-slate-300">
                                {essay.keyPoints.map((point, i) => <li key={i}>{point}</li>)}
                            </ul>
                        </div>

                        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
                            <p className="text-amber-800 dark:text-amber-300 text-sm">🖊️ <strong>Practice:</strong> Write your essay on this topic using the outline above. Aim for {essay.wordLimit} words.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderApplicationsTab = () => {
        const app = APPLICATION_TEMPLATES[selectedAppIndex];
        return (
            <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-3xl mx-auto">
                    {/* App Selector */}
                    <div className="mb-6 flex flex-wrap gap-2">
                        {APPLICATION_TEMPLATES.map((a, i) => (
                            <button
                                key={a.id}
                                onClick={() => setSelectedAppIndex(i)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedAppIndex === i ? 'bg-[#4A3728] dark:bg-amber-600 text-white' : 'bg-[#F0EAD6] dark:bg-slate-700 text-[#5D4037] dark:text-slate-400 hover:bg-[#5D4037]/10'}`}
                            >
                                {i + 1}. {a.title.substring(0, 15)}...
                            </button>
                        ))}
                    </div>

                    {/* Application Content */}
                    <div className="bg-white dark:bg-slate-800 border-2 border-[#5D4037]/20 dark:border-amber-500/30 rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center gap-2 mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${app.type === 'leave' ? 'bg-orange-100 text-orange-700' : app.type === 'request' ? 'bg-blue-100 text-blue-700' : app.type === 'complaint' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                {app.type}
                            </span>
                            <span className="text-sm text-[#8D6E63] dark:text-slate-400">To: {app.recipient}</span>
                        </div>
                        <h3 className="text-2xl font-messiri font-bold text-[#2C1810] dark:text-amber-500 mb-4">{app.title}</h3>

                        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <p className="text-blue-800 dark:text-blue-300"><strong>Scenario:</strong> {app.scenario}</p>
                        </div>

                        <div className="mb-4">
                            <h4 className="font-bold text-[#4A3728] dark:text-amber-400 mb-2">Format:</h4>
                            <ol className="list-decimal list-inside space-y-1 text-[#5D4037] dark:text-slate-300">
                                {app.format.map((point, i) => <li key={i}>{point}</li>)}
                            </ol>
                        </div>

                        <div>
                            <h4 className="font-bold text-[#4A3728] dark:text-amber-400 mb-2">Sample:</h4>
                            <pre className="bg-gray-50 dark:bg-slate-900 p-4 rounded-lg text-sm font-mono text-[#2C1810] dark:text-slate-300 whitespace-pre-wrap overflow-x-auto border border-gray-200 dark:border-slate-700">
                                {app.sampleContent}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderComprehensionTab = () => {
        const passage = COMPREHENSION_PASSAGES[selectedPassageIndex];
        return (
            <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-4xl mx-auto">
                    {/* Passage Selector */}
                    <div className="mb-6 flex flex-wrap gap-2">
                        {COMPREHENSION_PASSAGES.map((p, i) => (
                            <button
                                key={p.id}
                                onClick={() => { setSelectedPassageIndex(i); setShowAnswer({}); }}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedPassageIndex === i ? 'bg-[#4A3728] dark:bg-amber-600 text-white' : 'bg-[#F0EAD6] dark:bg-slate-700 text-[#5D4037] dark:text-slate-400 hover:bg-[#5D4037]/10'}`}
                            >
                                {i + 1}. {p.title}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Passage */}
                        <div className="bg-white dark:bg-slate-800 border-2 border-[#5D4037]/20 dark:border-amber-500/30 rounded-2xl p-6 shadow-lg">
                            <h3 className="text-xl font-messiri font-bold text-[#2C1810] dark:text-amber-500 mb-4">{passage.title}</h3>
                            <p className="text-[#5D4037] dark:text-slate-300 leading-relaxed whitespace-pre-line">{passage.passage}</p>
                        </div>

                        {/* Questions */}
                        <div className="space-y-4">
                            <h4 className="font-bold text-[#4A3728] dark:text-amber-400">Questions:</h4>
                            {passage.questions.map((q, i) => (
                                <div key={i} className="bg-white dark:bg-slate-800 border border-[#5D4037]/20 dark:border-slate-700 rounded-xl p-4">
                                    <div className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-[#4A3728] dark:bg-amber-600 text-white rounded-full text-xs font-bold">{i + 1}</span>
                                        <div className="flex-1">
                                            <p className="text-[#2C1810] dark:text-white font-medium mb-2">{q.questionText}</p>
                                            {q.options && (
                                                <div className="flex flex-wrap gap-2 mb-2">
                                                    {q.options.map((opt, j) => (
                                                        <span key={j} className={`px-2 py-1 rounded text-sm ${showAnswer[i] && opt === q.correctAnswer ? 'bg-green-200 dark:bg-green-900/50 text-green-800 font-bold' : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300'}`}>
                                                            {String.fromCharCode(65 + j)}. {opt}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            <button onClick={() => toggleAnswer(i)} className="text-sm text-[#4A3728] dark:text-amber-500 hover:underline flex items-center gap-1">
                                                {showAnswer[i] ? <EyeOff size={14} /> : <Eye size={14} />}
                                                {showAnswer[i] ? 'Hide' : 'Show Answer'}
                                            </button>
                                            {showAnswer[i] && (
                                                <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-sm">
                                                    <span className="font-bold text-green-700 dark:text-green-400">✓ {q.correctAnswer}</span>
                                                    <p className="text-green-800 dark:text-green-300 mt-1">{q.explanation}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#F0EAD6] dark:bg-slate-900 border-2 border-[#5D4037] dark:border-amber-500 rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="bg-[#E6DEC8] dark:bg-slate-800 border-b-2 border-[#5D4037] dark:border-amber-500 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <FileText className="text-[#4A3728] dark:text-amber-500" size={28} />
                        <div>
                            <h2 className="text-2xl font-messiri font-bold text-[#2C1810] dark:text-amber-500">Question Bank Manager</h2>
                            <p className="text-sm text-[#5D4037] dark:text-slate-400">
                                Total: <span className="font-bold text-[#4A3728] dark:text-amber-400">{totalCount}</span> grammar + <span className="font-bold">{ESSAY_TOPICS.length}</span> essays + <span className="font-bold">{APPLICATION_TEMPLATES.length}</span> applications + <span className="font-bold">{COMPREHENSION_PASSAGES.length}</span> passages
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F0EAD6] dark:bg-slate-700 border border-[#5D4037] dark:border-slate-600 text-[#4A3728] dark:text-amber-500 hover:bg-red-100 dark:hover:bg-red-900/30 hover:border-red-500 hover:text-red-600 transition-all">
                        <X size={20} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="bg-[#E6DEC8]/50 dark:bg-slate-800/50 border-b border-[#5D4037]/20 dark:border-amber-500/20 px-4 flex gap-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-3 font-messiri font-bold transition-all border-b-2 ${activeTab === tab.id ? 'border-[#4A3728] dark:border-amber-500 text-[#4A3728] dark:text-amber-500' : 'border-transparent text-[#8D6E63] dark:text-slate-500 hover:text-[#4A3728] dark:hover:text-amber-400'}`}
                        >
                            <tab.icon size={18} />
                            {tab.label} <span className="text-xs px-1.5 py-0.5 rounded-full bg-[#4A3728]/10 dark:bg-amber-500/20">{tab.count}</span>
                        </button>
                    ))}
                </div>

                {/* Content */}
                {activeTab === 'grammar' && renderGrammarTab()}
                {activeTab === 'essays' && renderEssaysTab()}
                {activeTab === 'applications' && renderApplicationsTab()}
                {activeTab === 'comprehension' && renderComprehensionTab()}
            </div>
        </div>
    );
};
