/**
 * Comprehension Passages - Karachi Board SSC
 * Reading comprehension with questions based on BSEK syllabus
 */

import { QuestionType } from '../../../types';
import type { OfflineQuestion } from '../../offlineQuestionBank';

export interface ComprehensionPassage {
    id: string;
    title: string;
    passage: string;
    questions: OfflineQuestion[];
}

export const COMPREHENSION_PASSAGES: ComprehensionPassage[] = [
    {
        id: 'comp-1',
        title: 'Importance of Trees',
        passage: `Trees are extremely important for our survival. They give us oxygen to breathe and absorb carbon dioxide from the air. Trees provide shade, fruits, and wood. They prevent soil erosion and help bring rainfall. Many animals and birds make their homes in trees.

Unfortunately, humans are cutting down trees at an alarming rate. Deforestation is causing many problems like global warming, flooding, and loss of wildlife. The temperature of the Earth is increasing every year.

We must plant more trees to save our environment. Many countries have started tree plantation campaigns. In Pakistan, the government launched the "Billion Tree Tsunami" project. We should all participate in such efforts. Every individual can make a difference by planting at least one tree.`,
        questions: [
            { type: QuestionType.MULTIPLE_CHOICE, questionText: 'What do trees give us to breathe?', options: ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen'], correctAnswer: 'Oxygen', explanation: 'Trees produce oxygen and absorb CO2.' },
            { type: QuestionType.FILL_IN_BLANK, questionText: 'Trees prevent _____ erosion.', correctAnswer: 'soil', explanation: 'Tree roots hold the soil together.' },
            { type: QuestionType.MULTIPLE_CHOICE, questionText: 'What is causing global warming according to the passage?', options: ['Pollution', 'Deforestation', 'Factories', 'Vehicles'], correctAnswer: 'Deforestation', explanation: 'Passage mentions deforestation causing global warming.' },
            { type: QuestionType.MULTIPLE_CHOICE, questionText: 'What project was launched in Pakistan?', options: ['Green Pakistan', 'Billion Tree Tsunami', 'Save Trees', 'Plant More'], correctAnswer: 'Billion Tree Tsunami', explanation: 'Mentioned in the passage.' },
            { type: QuestionType.FILL_IN_BLANK, questionText: 'Many animals and _____ make their homes in trees.', correctAnswer: 'birds', explanation: 'From the passage: "Many animals and birds make their homes in trees."' },
        ]
    },
    {
        id: 'comp-2',
        title: 'Allama Muhammad Iqbal',
        passage: `Allama Muhammad Iqbal was born on November 9, 1877, in Sialkot. He was a great poet, philosopher, and thinker. He received his early education in Sialkot and later studied in Lahore and Europe.

Allama Iqbal is known as the "Poet of the East" because of his beautiful poetry. He wrote in Urdu and Persian. His famous poems include "Lab Pe Aati Hai Dua" and "Shikwa Jawab-e-Shikwa." His poetry awakens the spirit of self-respect and hard work.

Iqbal dreamed of a separate homeland for Muslims of the subcontinent. He presented this idea in his famous Allahabad Address in 1930. He passed away on April 21, 1938, but his poetry continues to inspire millions of people across the world.`,
        questions: [
            { type: QuestionType.MULTIPLE_CHOICE, questionText: 'When was Allama Iqbal born?', options: ['November 9, 1877', 'August 14, 1947', 'April 21, 1938', 'March 23, 1940'], correctAnswer: 'November 9, 1877', explanation: 'First line of the passage states this.' },
            { type: QuestionType.FILL_IN_BLANK, questionText: 'Allama Iqbal is known as the "Poet of the _____."', correctAnswer: 'East', explanation: 'He is called the Poet of the East.' },
            { type: QuestionType.MULTIPLE_CHOICE, questionText: 'In which languages did Iqbal write?', options: ['Urdu and Persian', 'English and Urdu', 'Arabic and Persian', 'Hindi and Urdu'], correctAnswer: 'Urdu and Persian', explanation: 'Passage states he wrote in Urdu and Persian.' },
            { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Where did Iqbal present his famous address?', options: ['Lahore', 'Allahabad', 'Sialkot', 'Delhi'], correctAnswer: 'Allahabad', explanation: 'He presented the idea in his Allahabad Address in 1930.' },
            { type: QuestionType.FILL_IN_BLANK, questionText: 'Iqbal received his early education in _____.', correctAnswer: 'Sialkot', explanation: 'He received early education in Sialkot.' },
        ]
    },
    {
        id: 'comp-3',
        title: 'The Internet',
        passage: `The Internet has revolutionized the way we live, work, and communicate. It is a global network that connects millions of computers around the world. Through the Internet, we can send emails, browse websites, watch videos, and shop online.

The Internet has made education more accessible. Students can attend online classes and access study materials from anywhere. Many universities now offer online degree programs. Research has become easier with vast amounts of information available at our fingertips.

However, the Internet also has disadvantages. Children may access inappropriate content. Cybercrime is increasing, including hacking and fraud. Many young people are addicted to social media and games. We must use the Internet responsibly and teach our children about online safety.`,
        questions: [
            { type: QuestionType.MULTIPLE_CHOICE, questionText: 'What is the Internet?', options: ['A computer', 'A global network', 'A website', 'A mobile phone'], correctAnswer: 'A global network', explanation: 'Internet is described as a global network.' },
            { type: QuestionType.FILL_IN_BLANK, questionText: 'Through the Internet, we can send _____, browse websites, and shop online.', correctAnswer: 'emails', explanation: 'From the passage.' },
            { type: QuestionType.MULTIPLE_CHOICE, questionText: 'How has the Internet helped education?', options: ['Made books expensive', 'Made education more accessible', 'Closed schools', 'Reduced teachers'], correctAnswer: 'Made education more accessible', explanation: 'Passage states Internet made education more accessible.' },
            { type: QuestionType.MULTIPLE_CHOICE, questionText: 'What is one disadvantage of the Internet mentioned?', options: ['Fast speed', 'Cybercrime', 'Free information', 'Easy communication'], correctAnswer: 'Cybercrime', explanation: 'Cybercrime is mentioned as a disadvantage.' },
            { type: QuestionType.FILL_IN_BLANK, questionText: 'We must use the Internet _____.', correctAnswer: 'responsibly', explanation: 'Last line emphasizes responsible use.' },
        ]
    },
    {
        id: 'comp-4',
        title: 'Health is Wealth',
        passage: `Health is the greatest blessing of Allah. A healthy person can enjoy life fully and work efficiently. Money is important, but it is useless without good health. That is why it is said that "Health is Wealth."

To stay healthy, we should eat a balanced diet with fruits, vegetables, and proteins. Junk food and sugary drinks should be avoided. Regular exercise keeps our body fit and strong. Walking, playing sports, and yoga are excellent forms of exercise.

Sleep is also essential for good health. Children need 8-10 hours of sleep, while adults need 7-8 hours. We should also maintain personal hygiene by washing hands regularly and keeping our surroundings clean. A healthy mind is equally important, so we should avoid stress and think positively.`,
        questions: [
            { type: QuestionType.MULTIPLE_CHOICE, questionText: 'According to the passage, what is the greatest blessing?', options: ['Money', 'Health', 'Education', 'Family'], correctAnswer: 'Health', explanation: 'First line states health is the greatest blessing.' },
            { type: QuestionType.FILL_IN_BLANK, questionText: 'A balanced diet should include fruits, vegetables, and _____.', correctAnswer: 'proteins', explanation: 'From the passage about balanced diet.' },
            { type: QuestionType.MULTIPLE_CHOICE, questionText: 'How many hours of sleep do children need?', options: ['5-6 hours', '6-7 hours', '8-10 hours', '10-12 hours'], correctAnswer: '8-10 hours', explanation: 'Passage mentions children need 8-10 hours.' },
            { type: QuestionType.MULTIPLE_CHOICE, questionText: 'What should be avoided according to the passage?', options: ['Fruits', 'Exercise', 'Junk food', 'Walking'], correctAnswer: 'Junk food', explanation: 'Junk food and sugary drinks should be avoided.' },
            { type: QuestionType.FILL_IN_BLANK, questionText: '"Health is _____" is a famous saying.', correctAnswer: 'Wealth', explanation: 'Famous proverb mentioned in passage.' },
        ]
    },
    {
        id: 'comp-5',
        title: 'A Visit to a Museum',
        passage: `Last month, our school arranged a trip to the Pakistan Maritime Museum in Karachi. We were all very excited as it was our first educational trip. We assembled at school at 8 AM and traveled by bus.

The museum was huge and displayed many interesting exhibits. We saw old ships, submarines, and naval weapons. There was a real PNS Ghazi submarine that we could enter and explore. The guides explained the history of Pakistan Navy and its brave officers.

The most fascinating part was the aquarium with colorful fish and marine life. We also visited the park area where we had our lunch. Our teachers took many photographs. We returned to school by 4 PM, tired but happy. This trip taught us about our naval heritage and the importance of our seas.`,
        questions: [
            { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Which museum did the students visit?', options: ['National Museum', 'Pakistan Maritime Museum', 'Lahore Museum', 'Science Museum'], correctAnswer: 'Pakistan Maritime Museum', explanation: 'Mentioned in the first paragraph.' },
            { type: QuestionType.FILL_IN_BLANK, questionText: 'The students traveled to the museum by _____.', correctAnswer: 'bus', explanation: 'They traveled by bus from school.' },
            { type: QuestionType.MULTIPLE_CHOICE, questionText: 'What real submarine could students enter?', options: ['PNS Hamza', 'PNS Ghazi', 'PNS Alamgir', 'PNS Saif'], correctAnswer: 'PNS Ghazi', explanation: 'PNS Ghazi submarine is mentioned.' },
            { type: QuestionType.MULTIPLE_CHOICE, questionText: 'What was the most fascinating part?', options: ['Ships', 'Weapons', 'Aquarium', 'Park'], correctAnswer: 'Aquarium', explanation: 'Passage says aquarium was most fascinating.' },
            { type: QuestionType.FILL_IN_BLANK, questionText: 'The trip taught students about Pakistan\'s _____ heritage.', correctAnswer: 'naval', explanation: 'Last line mentions naval heritage.' },
        ]
    },
    {
        id: 'comp-6',
        title: 'Importance of Time',
        passage: `Time is one of the most precious things in our life. Once time passes, it never comes back. That is why we often hear the saying, "Time and tide wait for none." Successful people understand the value of time and use every moment wisely.

Students should learn to manage their time properly. Making a timetable helps us organize our daily activities. We should allocate time for studies, recreation, and rest. Wasting time on mobile phones and unnecessary activities leads to failure.

Great personalities like Allama Iqbal and other successful scholars were very particular about time. They never wasted a single moment. We should follow their example and be punctual. Remember, the time you have today is the most valuable gift. Use it wisely and you will succeed in life.`,
        questions: [
            { type: QuestionType.MULTIPLE_CHOICE, questionText: 'What is one of the most precious things according to the passage?', options: ['Money', 'Health', 'Time', 'Education'], correctAnswer: 'Time', explanation: 'First sentence states time is most precious.' },
            { type: QuestionType.FILL_IN_BLANK, questionText: '"Time and tide wait for _____" is a famous saying.', correctAnswer: 'none', explanation: 'Famous proverb mentioned in passage.' },
            { type: QuestionType.MULTIPLE_CHOICE, questionText: 'What helps us organize daily activities?', options: ['Mobile phone', 'Timetable', 'Friends', 'Teacher'], correctAnswer: 'Timetable', explanation: 'Making a timetable helps organize activities.' },
            { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Which personality is mentioned as an example?', options: ['Prophet Muhammad (PBUH)', 'Allama Iqbal', 'Einstein', 'Newton'], correctAnswer: 'Allama Iqbal', explanation: 'Allama Iqbal and successful scholars are mentioned.' },
            { type: QuestionType.FILL_IN_BLANK, questionText: 'Wasting time leads to _____.', correctAnswer: 'failure', explanation: 'Passage states wasting time leads to failure.' },
        ]
    },
];

// Get all comprehension questions as a flat array
export const getAllComprehensionQuestions = (): OfflineQuestion[] => {
    return COMPREHENSION_PASSAGES.flatMap(p => p.questions);
};

export const COMPREHENSION_QUESTIONS = getAllComprehensionQuestions();
