/**
 * Conditionals - 60 Questions
 */
import { QuestionType } from '../../../types';
import type { OfflineQuestion } from '../../offlineQuestionBank';

export const CONDITIONALS: OfflineQuestion[] = [
    // Zero Conditional
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'If you heat water, it ___.', options: ['boil', 'boils', 'will boil', 'would boil'], correctAnswer: 'boils', explanation: 'Zero conditional: present + present.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'If you mix red and blue, you ___ (get) purple.', correctAnswer: 'get', explanation: 'Scientific fact: both present.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Ice ___ if you heat it.', options: ['melt', 'melts', 'will melt', 'would melt'], correctAnswer: 'melts', explanation: 'General truth.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'If the sun sets, it ___ dark.', options: ['get', 'gets', 'will get', 'would get'], correctAnswer: 'gets', explanation: 'Natural phenomenon.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Plants ___ (die) if they don\'t get water.', correctAnswer: 'die', explanation: 'General fact.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'If you touch fire, you ___ burned.', options: ['get', 'gets', 'will get', 'getting'], correctAnswer: 'get', explanation: 'General truth.' },
    // First Conditional
    { type: QuestionType.FILL_IN_BLANK, questionText: 'If it rains, I ___ (stay) home.', correctAnswer: 'will stay', explanation: 'First conditional: present + will.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'If you study hard, you ___ pass.', options: ['would', 'will', 'can', 'might'], correctAnswer: 'will', explanation: 'Real/possible future.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'If she calls, I ___ answer.', options: ['would', 'will', 'can', 'might'], correctAnswer: 'will', explanation: 'Likely future action.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'If the bus is late, we ___ (miss) the meeting.', correctAnswer: 'will miss', explanation: 'First conditional.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Unless you study, you ___ fail.', options: ['will', 'would', 'can', 'might'], correctAnswer: 'will', explanation: 'Unless = if not.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'If he ___ early, we can go together.', options: ['come', 'comes', 'will come', 'would come'], correctAnswer: 'comes', explanation: 'Present in if-clause.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'If you don\'t hurry, you ___ (be) late.', correctAnswer: 'will be', explanation: 'First conditional negative.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'If I ___ time, I will come.', options: ['have', 'had', 'will have', 'would have'], correctAnswer: 'have', explanation: 'Present in if-clause.' },
    // Second Conditional
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'If I ___ rich, I would travel.', options: ['am', 'was', 'were', 'will be'], correctAnswer: 'were', explanation: 'Second conditional: were (subjunctive).' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'If I ___ (know) the answer, I would tell you.', correctAnswer: 'knew', explanation: 'Past simple in if-clause.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'If I were you, I ___ accept the offer.', options: ['will', 'would', 'can', 'am'], correctAnswer: 'would', explanation: 'Advice with second conditional.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'If she ___ harder, she would pass.', options: ['study', 'studies', 'studied', 'will study'], correctAnswer: 'studied', explanation: 'Past in if-clause.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'If I ___ (be) a bird, I would fly.', correctAnswer: 'were', explanation: 'Were for all subjects.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'If he ___ more money, he would buy a car.', options: ['have', 'has', 'had', 'will have'], correctAnswer: 'had', explanation: 'Unreal present/future.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'If we ___ (have) more time, we would stay longer.', correctAnswer: 'had', explanation: 'Hypothetical situation.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'If I won the lottery, I ___ donate to charity.', options: ['will', 'would', 'can', 'am'], correctAnswer: 'would', explanation: 'Imaginary situation.' },
    // Third Conditional
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'If she had studied, she ___ passed.', options: ['would', 'would have', 'will have', 'had'], correctAnswer: 'would have', explanation: 'Third conditional.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'If I ___ (know) earlier, I would have helped.', correctAnswer: 'had known', explanation: 'Past perfect in if-clause.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'If he had arrived on time, he ___ caught the bus.', options: ['would', 'would have', 'will have', 'has'], correctAnswer: 'would have', explanation: 'Unreal past.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'If I ___ seen him, I would have said hello.', options: ['have', 'has', 'had', 'would'], correctAnswer: 'had', explanation: 'Past perfect.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'If we ___ (not miss) the train, we would have arrived on time.', correctAnswer: 'had not missed', explanation: 'Negative past perfect.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She would have passed if she ___ harder.', options: ['studied', 'had studied', 'studies', 'would study'], correctAnswer: 'had studied', explanation: 'Third conditional.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'If I ___ (be) there, I would have helped.', correctAnswer: 'had been', explanation: 'Past perfect.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'If they had listened, they ___ understood.', options: ['would', 'would have', 'will have', 'had'], correctAnswer: 'would have', explanation: 'Regret about past.' },
    // Mixed Conditionals
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'If I were smarter, I ___ have passed.', options: ['would', 'will', 'can', 'had'], correctAnswer: 'would', explanation: 'Mixed: unreal present + past result.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'If he had practiced, he ___ (be) better now.', correctAnswer: 'would be', explanation: 'Past action → present result.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'If she hadn\'t moved, she ___ still here.', options: ['will be', 'would be', 'was', 'is'], correctAnswer: 'would be', explanation: 'Mixed conditional.' },
    // Pakistani Context
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'If Pakistan wins, we ___ celebrate.', options: ['would', 'will', 'can', 'might'], correctAnswer: 'will', explanation: 'Possible future.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'If it doesn\'t rain, the crops ___ (suffer).', correctAnswer: 'will suffer', explanation: 'First conditional.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'If I were the Prime Minister, I ___ build schools.', options: ['will', 'would', 'can', 'am'], correctAnswer: 'would', explanation: 'Imaginary situation.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'If Eid falls on Friday, people ___ extra happy.', options: ['are', 'will be', 'would be', 'were'], correctAnswer: 'will be', explanation: 'First conditional.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'If I had money, I ___ (visit) Makkah.', correctAnswer: 'would visit', explanation: 'Second conditional.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'If he had prayed, Allah ___ helped.', options: ['would', 'would have', 'will have', 'had'], correctAnswer: 'would have', explanation: 'Third conditional.' },
    // Unless / Provided / As long as
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Unless you hurry, you ___ miss the bus.', options: ['would', 'will', 'can', 'might'], correctAnswer: 'will', explanation: 'Unless = if not.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'I\'ll help you provided you ___ (tell) the truth.', correctAnswer: 'tell', explanation: 'Provided = if.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'As long as you study, you ___ succeed.', options: ['would', 'will', 'can', 'might'], correctAnswer: 'will', explanation: 'As long as = if.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Unless otherwise stated, answers ___ be in English.', options: ['should', 'would', 'might', 'could'], correctAnswer: 'should', explanation: 'Formal condition.' },
    // Wish / If only
    { type: QuestionType.FILL_IN_BLANK, questionText: 'I wish I ___ (be) taller.', correctAnswer: 'were', explanation: 'Wish + past.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'If only I ___ more time.', options: ['have', 'has', 'had', 'will have'], correctAnswer: 'had', explanation: 'Regret = past.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I wish I ___ attended the party.', options: ['have', 'has', 'had', 'would'], correctAnswer: 'had', explanation: 'Past regret.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'If only he ___ (not leave) so early.', correctAnswer: 'had not left', explanation: 'Third conditional regret.' },
    // More Practice
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'If I find it, I ___ let you know.', options: ['would', 'will', 'can', 'might'], correctAnswer: 'will', explanation: 'Real possibility.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'If you ___ (see) her, give her my regards.', correctAnswer: 'see', explanation: 'Present in if-clause.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'What would you do if you ___ a ghost?', options: ['see', 'saw', 'have seen', 'will see'], correctAnswer: 'saw', explanation: 'Hypothetical question.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'If I had known, I ___ not have come.', options: ['would', 'will', 'can', 'might'], correctAnswer: 'would', explanation: 'Third conditional.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'If he ___ (ask) politely, I would have helped.', correctAnswer: 'had asked', explanation: 'Third conditional.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'If water freezes, it ___ ice.', options: ['become', 'becomes', 'will become', 'would become'], correctAnswer: 'becomes', explanation: 'Zero conditional.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Should you need help, ___ me.', options: ['call', 'called', 'calling', 'to call'], correctAnswer: 'call', explanation: 'Formal: Should = If.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Were I you, I ___ (accept) the offer.', correctAnswer: 'would accept', explanation: 'Formal: Were I = If I were.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Had I known, I ___ have come.', options: ['would', 'will', 'can', 'might'], correctAnswer: 'would', explanation: 'Formal: Had I = If I had.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'If she ___ the truth, she wouldn\'t be angry.', options: ['know', 'knows', 'knew', 'will know'], correctAnswer: 'knew', explanation: 'Second conditional.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'If I ___ (have) wings, I would fly.', correctAnswer: 'had', explanation: 'Imaginary.' },
];
