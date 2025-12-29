/**
 * Essay Topics - Karachi Board SSC
 * Based on official BSEK syllabus and past papers 2023-2024
 */

export interface EssayTopic {
    id: string;
    title: string;
    category: 'national' | 'social' | 'education' | 'technology' | 'general';
    difficulty: 'easy' | 'medium' | 'hard';
    outline: string[];
    keyPoints: string[];
    wordLimit: number;
}

export const ESSAY_TOPICS: EssayTopic[] = [
    // National Issues
    {
        id: 'essay-1',
        title: 'Problems of Karachi',
        category: 'national',
        difficulty: 'medium',
        outline: ['Introduction', 'Traffic Problems', 'Water Shortage', 'Law and Order', 'Pollution', 'Suggestions', 'Conclusion'],
        keyPoints: ['Karachi is the largest city of Pakistan', 'Population over 20 million', 'Economic hub of the country', 'Faces many challenges including traffic, water, electricity'],
        wordLimit: 300
    },
    {
        id: 'essay-2',
        title: 'Energy Crisis in Pakistan',
        category: 'national',
        difficulty: 'medium',
        outline: ['Introduction', 'Causes of Energy Crisis', 'Effects on Economy', 'Effects on Daily Life', 'Possible Solutions', 'Conclusion'],
        keyPoints: ['Load shedding affects industries', 'Shortage of electricity and gas', 'Need for renewable energy', 'CPEC power projects'],
        wordLimit: 300
    },
    {
        id: 'essay-3',
        title: 'Terrorism and Its Effects',
        category: 'national',
        difficulty: 'hard',
        outline: ['Introduction', 'Types of Terrorism', 'Causes', 'Effects on Society', 'Effects on Economy', 'How to Combat', 'Conclusion'],
        keyPoints: ['Global issue', 'Affects peace and stability', 'Economic losses', 'Pakistan\'s sacrifices in war against terror'],
        wordLimit: 350
    },
    {
        id: 'essay-4',
        title: 'Inflation in Pakistan',
        category: 'national',
        difficulty: 'medium',
        outline: ['Introduction', 'Causes of Inflation', 'Effects on Common Man', 'Effects on Economy', 'Government Measures', 'Conclusion'],
        keyPoints: ['Rising prices of daily commodities', 'Affects poor the most', 'Dollar rate impact', 'Need for self-reliance'],
        wordLimit: 300
    },
    {
        id: 'essay-5',
        title: 'CPEC - China Pakistan Economic Corridor',
        category: 'national',
        difficulty: 'hard',
        outline: ['Introduction', 'What is CPEC', 'Benefits for Pakistan', 'Challenges', 'Gwadar Port', 'Future Prospects', 'Conclusion'],
        keyPoints: ['$62 billion investment', 'Economic game changer', 'Infrastructure development', 'Friendship between nations'],
        wordLimit: 350
    },
    // Social Issues
    {
        id: 'essay-6',
        title: 'Impact of Social Media on Youth',
        category: 'social',
        difficulty: 'medium',
        outline: ['Introduction', 'Benefits of Social Media', 'Negative Effects', 'Impact on Studies', 'Impact on Health', 'Suggestions', 'Conclusion'],
        keyPoints: ['Facebook, Instagram, TikTok usage', 'Connectivity vs addiction', 'Cyberbullying', 'Mental health concerns'],
        wordLimit: 300
    },
    {
        id: 'essay-7',
        title: 'Environmental Pollution',
        category: 'social',
        difficulty: 'medium',
        outline: ['Introduction', 'Types of Pollution', 'Causes', 'Effects on Health', 'Effects on Environment', 'Solutions', 'Conclusion'],
        keyPoints: ['Air, water, land, noise pollution', 'Industrial waste', 'Vehicle emissions', 'Plantation drives needed'],
        wordLimit: 300
    },
    {
        id: 'essay-8',
        title: 'Drug Addiction Among Youth',
        category: 'social',
        difficulty: 'hard',
        outline: ['Introduction', 'Causes of Drug Addiction', 'Types of Drugs', 'Effects on Individual', 'Effects on Society', 'Prevention', 'Conclusion'],
        keyPoints: ['Growing problem in Pakistan', 'Peer pressure', 'Destroys families', 'Rehabilitation centers needed'],
        wordLimit: 350
    },
    {
        id: 'essay-9',
        title: 'Water Crisis in Pakistan',
        category: 'social',
        difficulty: 'medium',
        outline: ['Introduction', 'Causes of Water Shortage', 'Effects on Agriculture', 'Effects on Daily Life', 'Solutions', 'Conclusion'],
        keyPoints: ['Pakistan becoming water scarce', 'Dam construction needed', 'Water conservation', 'Avoid water wastage'],
        wordLimit: 300
    },
    // Education
    {
        id: 'essay-10',
        title: 'Importance of Education',
        category: 'education',
        difficulty: 'easy',
        outline: ['Introduction', 'Benefits of Education', 'Education in Islam', 'Types of Education', 'Present Condition in Pakistan', 'Conclusion'],
        keyPoints: ['Education is the key to success', 'Islam emphasizes education', 'Literacy rate in Pakistan', 'Quality vs quantity'],
        wordLimit: 250
    },
    {
        id: 'essay-11',
        title: 'An Ideal Student',
        category: 'education',
        difficulty: 'easy',
        outline: ['Introduction', 'Qualities of an Ideal Student', 'Studies and Discipline', 'Respect for Teachers', 'Character', 'Conclusion'],
        keyPoints: ['Hard working', 'Punctual', 'Respectful', 'Helpful to others', 'Well-mannered'],
        wordLimit: 250
    },
    {
        id: 'essay-12',
        title: 'My Aim in Life',
        category: 'education',
        difficulty: 'easy',
        outline: ['Introduction', 'Why Doctor/Teacher/Engineer', 'How I Will Achieve It', 'How I Will Serve the Country', 'Conclusion'],
        keyPoints: ['Everyone should have an aim', 'Work hard to achieve', 'Serve humanity', 'Make parents proud'],
        wordLimit: 250
    },
    {
        id: 'essay-13',
        title: 'Co-Education: Advantages and Disadvantages',
        category: 'education',
        difficulty: 'medium',
        outline: ['Introduction', 'What is Co-Education', 'Advantages', 'Disadvantages', 'Situation in Pakistan', 'Conclusion'],
        keyPoints: ['Mixed gender schools', 'Healthy competition', 'Cultural considerations', 'Both systems exist'],
        wordLimit: 300
    },
    {
        id: 'essay-14',
        title: 'Importance of Technical Education',
        category: 'education',
        difficulty: 'medium',
        outline: ['Introduction', 'What is Technical Education', 'Benefits', 'Need in Pakistan', 'Government Initiatives', 'Conclusion'],
        keyPoints: ['Skills-based learning', 'Employment opportunities', 'Self-employment', 'Economic growth'],
        wordLimit: 300
    },
    // Technology
    {
        id: 'essay-15',
        title: 'Advantages and Disadvantages of Mobile Phone',
        category: 'technology',
        difficulty: 'easy',
        outline: ['Introduction', 'Advantages', 'Disadvantages', 'Impact on Students', 'Suggestions', 'Conclusion'],
        keyPoints: ['Communication made easy', 'Information at fingertips', 'Addiction problem', 'Health effects'],
        wordLimit: 250
    },
    {
        id: 'essay-16',
        title: 'Science and Technology',
        category: 'technology',
        difficulty: 'medium',
        outline: ['Introduction', 'Role in Daily Life', 'Benefits to Society', 'Drawbacks', 'In Pakistan', 'Conclusion'],
        keyPoints: ['Modern inventions', 'Medical advances', 'Communication revolution', 'Digital Pakistan'],
        wordLimit: 300
    },
    {
        id: 'essay-17',
        title: 'Internet: A Blessing or Curse',
        category: 'technology',
        difficulty: 'medium',
        outline: ['Introduction', 'Benefits of Internet', 'Dangers of Internet', 'Impact on Youth', 'How to Use Wisely', 'Conclusion'],
        keyPoints: ['Knowledge access', 'Online education', 'Cybercrime', 'Misinformation'],
        wordLimit: 300
    },
    // General
    {
        id: 'essay-18',
        title: 'A Cricket Match',
        category: 'general',
        difficulty: 'easy',
        outline: ['Introduction', 'The Teams', 'The Match', 'Exciting Moments', 'Result', 'Conclusion'],
        keyPoints: ['Cricket is national passion', 'Pakistan vs India rivalry', 'Famous cricketers', 'Team spirit'],
        wordLimit: 250
    },
    {
        id: 'essay-19',
        title: 'My Mother',
        category: 'general',
        difficulty: 'easy',
        outline: ['Introduction', 'Her Role in My Life', 'Her Sacrifices', 'Her Love and Care', 'What She Taught Me', 'Conclusion'],
        keyPoints: ['Mother is a blessing', 'First teacher', 'Unconditional love', 'Her prayers', 'Paradise lies at her feet'],
        wordLimit: 300
    },
    {
        id: 'essay-20',
        title: 'Life in a Big City',
        category: 'general',
        difficulty: 'easy',
        outline: ['Introduction', 'Advantages', 'Disadvantages', 'Comparison with Village Life', 'Conclusion'],
        keyPoints: ['Facilities available', 'Job opportunities', 'Pollution and noise', 'Crowded places'],
        wordLimit: 250
    },
];

export const getEssaysByCategory = (category: string): EssayTopic[] => {
    return ESSAY_TOPICS.filter(e => e.category === category);
};

export const getEssaysByDifficulty = (difficulty: string): EssayTopic[] => {
    return ESSAY_TOPICS.filter(e => e.difficulty === difficulty);
};
