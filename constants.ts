import { DifficultyLevel } from './types';

export interface TopicItem {
  name: string;
  time: string;
  videoUrl?: string;
  type?: 'writing' | 'practice'; // 'writing' for Essay/Application, 'practice' for MCQs
}

export const DIFFICULTY_LEVELS: DifficultyLevel[] = [
  'Beginner (A1)',
  'Elementary (A2)',
  'Intermediate (B1)',
  'Upper Intermediate (B2)',
  'Advanced (C1)',
  'Proficiency (C2)',
  'Class 1-5',
  'Class 6-8',
  'Class 9',
  'Class 10',
  'Class 11',
  'Class 12'
];

export const VALID_USERNAMES = [
  'ZH_Designing',
  'AJ_Speaking',
  'AR_Learning',
  'MS_Looking',
  'AH_Coding',
  'Admin_141225'
];

// User information with display names and roles
export interface UserInfo {
  username: string;
  displayName: string;
  role: 'user' | 'admin';
}

export const USERS: UserInfo[] = [
  { username: 'ZH_Designing', displayName: 'Zahir Shah', role: 'user' },
  { username: 'AJ_Speaking', displayName: 'Abdul Jalil', role: 'user' },
  { username: 'AR_Learning', displayName: 'Adil Rashid', role: 'user' },
  { username: 'MS_Looking', displayName: 'Muhammad Shah', role: 'user' },
  { username: 'AH_Coding', displayName: 'Abdul Ahad', role: 'user' },
  { username: 'Admin_141225', displayName: 'Administrator', role: 'admin' },
];

// Helper functions for user management
export const getUserInfo = (username: string): UserInfo | undefined =>
  USERS.find(u => u.username === username);

export const isAdmin = (username: string): boolean =>
  getUserInfo(username)?.role === 'admin';


export const TOPIC_CATEGORIES: Record<string, TopicItem[]> = {
  "Parts of Speech (Nouns/Pronouns)": [
    { name: "Basic Concepts", time: "45 mins", videoUrl: "https://www.youtube.com/watch?v=YiAC2UckEx0&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=1" },
    { name: "Common, Proper & Material Nouns", time: "13 mins", videoUrl: "https://www.youtube.com/watch?v=2TEjsM0MsqY&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=2" },
    { name: "Noun & Its Types", time: "36 mins", videoUrl: "https://www.youtube.com/watch?v=-WvQET4Ruec&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=3" },
    { name: "Pronouns: Interrogative, Relative, Indefinite", time: "12 mins", videoUrl: "https://www.youtube.com/watch?v=yjFQUcKzC7Y&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=4" }
  ],
  "Parts of Speech (others)": [
    { name: "Adjectives", time: "17 mins", videoUrl: "https://www.youtube.com/watch?v=puQJYmtTQrY&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=5" },
    { name: "Adverbs", time: "13 mins", videoUrl: "https://www.youtube.com/watch?v=jmYbe1UmLC0&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=9" },
    { name: "Prepositions", time: "24 mins", videoUrl: "https://www.youtube.com/watch?v=kfqHYvPbm_c&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=10" },
    { name: "Conjunctions & Types", time: "12 mins", videoUrl: "https://www.youtube.com/watch?v=b6UtoqTqzGs&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=11" },
    { name: "Interjections", time: "6 mins", videoUrl: "https://www.youtube.com/watch?v=hqhpXYuzQc0&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=12" },
    { name: "Parts of Speech (Poem)", time: "4 mins", videoUrl: "https://www.youtube.com/watch?v=EbYfj2kVgCo&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=13" },
    { name: "Identify Parts of Speech", time: "28 mins", videoUrl: "https://www.youtube.com/watch?v=CEMv_mMOFf0&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=48" }
  ],
  "Articles": [
    { name: "Indefinite Articles (A & An)", time: "6 mins", videoUrl: "https://www.youtube.com/watch?v=ifnFQ61IkdI&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=6" },
    { name: "Definite Article (The) & Omission", time: "30 mins", videoUrl: "https://www.youtube.com/watch?v=UT-KZdmVz0E&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=7" }
  ],
  "Verbs & Moods": [
    { name: "Verbs & Types", time: "25 mins", videoUrl: "https://www.youtube.com/watch?v=awiVHoilk3o&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=8" },
    { name: "Causative Verbs (Let, Make, Have, Get)", time: "9 mins", videoUrl: "https://www.youtube.com/watch?v=zxuhDOSYbaA&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=38" },
    { name: "Modal Verbs", time: "12 mins", videoUrl: "https://www.youtube.com/watch?v=KAHuZ06ZSYw&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=39" }
  ],
  "Tenses": [
    { name: "Present Simple", time: "17 mins", videoUrl: "https://www.youtube.com/watch?v=s4cpgEphKAs&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=14" },
    { name: "Present Continuous", time: "6 mins", videoUrl: "https://www.youtube.com/watch?v=btOEF1RIjbQ&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=15" },
    { name: "Present Perfect", time: "19 mins", videoUrl: "https://www.youtube.com/watch?v=NLQSfr4UmA0&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=16" },
    { name: "Present Perfect Continuous", time: "8 mins", videoUrl: "https://www.youtube.com/watch?v=RFupBFBGBR4&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=17" },
    { name: "Past Simple", time: "8 mins", videoUrl: "https://www.youtube.com/watch?v=Mex5P9its2Q&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=18" },
    { name: "Past Continuous", time: "3 mins", videoUrl: "https://www.youtube.com/watch?v=ycTxG-4mRag&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=19" },
    { name: "Past Perfect", time: "8 mins", videoUrl: "https://www.youtube.com/watch?v=0sZjOTfWfaI&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=20" },
    { name: "Past Perfect Continuous", time: "6 mins", videoUrl: "https://www.youtube.com/watch?v=z2FkJP0QHKQ&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=21" },
    { name: "Future Simple", time: "5 mins", videoUrl: "https://www.youtube.com/watch?v=jSxs4XXgNnA&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=22" },
    { name: "Future Continuous", time: "3 mins", videoUrl: "https://www.youtube.com/watch?v=WIOCGVn2kHA&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=23" },
    { name: "Future Perfect", time: "4 mins", videoUrl: "https://www.youtube.com/watch?v=nLwKrKBtq_o&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=24" },
    { name: "Future Perfect Continuous", time: "4 mins", videoUrl: "https://www.youtube.com/watch?v=kVX4vqCnlig&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=25" }
  ],
  "Narrations (Direct/Indirect)": [
    { name: "Assertive Narration", time: "24 mins", videoUrl: "https://www.youtube.com/watch?v=P1JdFvD42Ow&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=32" },
    { name: "Interrogative Narration", time: "9 mins", videoUrl: "https://www.youtube.com/watch?v=BC_Wr48Nmjs&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=33" },
    { name: "Imperative Narration", time: "13 mins", videoUrl: "https://www.youtube.com/watch?v=UOH7OKMJ2vk&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=34" },
    { name: "Exclamatory & Optative Narration", time: "23 mins", videoUrl: "https://www.youtube.com/watch?v=2_KoBZ5Ln_A&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=35" }
  ],
  "Active / Passive Voice": [
    { name: "Intro to Voice", time: "14 mins", videoUrl: "https://www.youtube.com/watch?v=xNR-bbvzAOY&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=27" },
    { name: "Imperative Sentences", time: "9 mins", videoUrl: "https://www.youtube.com/watch?v=VqCCdn-SFNE&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=28" },
    { name: "WH-Interrogative Voice", time: "6 mins", videoUrl: "https://www.youtube.com/watch?v=zvd73rjyJlI&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=29" },
    { name: "Voice with Modal Verbs", time: "7 mins", videoUrl: "https://www.youtube.com/watch?v=T9b5PLDqWP8&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=30" },
    { name: "Voice with Double Objects", time: "7 mins", videoUrl: "https://www.youtube.com/watch?v=LkKeWlnc_g4&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=31" },
    { name: "Voice Practice Class", time: "19 mins", videoUrl: "https://www.youtube.com/watch?v=FmQcrHEsE9U&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=46" }
  ],
  "Advanced Grammar": [
    { name: "Conditional Sentences (Part 1)", time: "22 mins", videoUrl: "https://www.youtube.com/watch?v=ZdEbYTLPmSE&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=36" },
    { name: "Conditional Sentences (Part 2)", time: "12 mins", videoUrl: "https://www.youtube.com/watch?v=t3RTlxiEjJ4&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=37" },
    { name: "Proverbs", time: "15 mins", videoUrl: "https://www.youtube.com/watch?v=zixcKIRj5eA&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=26" },
    { name: "Pair of Words", time: "24 mins", videoUrl: "https://www.youtube.com/watch?v=xHZQNdJUW84&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=47" },
    { name: "Correction of Errors", time: "10 mins", videoUrl: "https://www.youtube.com/watch?v=_-JO8CrwZoo&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=43" }
  ],
  "Writing & Mechanics": [
    { name: "Application Writing", time: "16 mins", type: "writing", videoUrl: "https://www.youtube.com/watch?v=W5lecG3TDrw&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=40" },
    { name: "Comprehension Techniques", time: "17 mins", videoUrl: "https://www.youtube.com/watch?v=zYoOviCoO64&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=41" },
    { name: "Précis Writing", time: "17 mins", type: "writing", videoUrl: "https://www.youtube.com/watch?v=J9rslkNLUwk&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=42" },
    { name: "Punctuation Rules", time: "13 mins", videoUrl: "https://www.youtube.com/watch?v=EB8xp9blmuQ&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=44" },
    { name: "Essay Writing", time: "23 mins", type: "writing", videoUrl: "https://www.youtube.com/watch?v=5GQPx3XDxiQ&list=PLl0gj7VYsUWeeIEofDADaAYpAmbN3MIqT&index=45" }
  ],
};
