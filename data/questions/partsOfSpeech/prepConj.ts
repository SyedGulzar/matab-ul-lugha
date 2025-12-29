/**
 * Prepositions & Conjunctions - 35 Questions each
 */
import { QuestionType } from '../../../types';
import type { OfflineQuestion } from '../../offlineQuestionBank';

export const PREPOSITIONS: OfflineQuestion[] = [
    // Place
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The book is ___ the table.', options: ['on', 'at', 'by', 'in'], correctAnswer: 'on', explanation: 'On = touching surface.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She lives ___ Karachi.', options: ['in', 'on', 'at', 'by'], correctAnswer: 'in', explanation: 'In for cities.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The cat is ___ the box.', correctAnswer: 'in', explanation: 'In for inside.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'He is standing ___ the door.', options: ['at', 'in', 'on', 'by'], correctAnswer: 'at', explanation: 'At for specific point.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The picture is ___ the wall.', options: ['on', 'in', 'at', 'by'], correctAnswer: 'on', explanation: 'On for surfaces.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The bird flew ___ the window.', correctAnswer: 'through', explanation: 'Through = passing inside.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The mouse ran ___ the table.', options: ['over', 'under', 'on', 'in'], correctAnswer: 'under', explanation: 'Under = below.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'We met ___ the station.', options: ['at', 'in', 'on', 'by'], correctAnswer: 'at', explanation: 'At for locations.' },
    // Time
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The meeting is ___ Monday.', correctAnswer: 'on', explanation: 'On for days.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'He arrived ___ 5 PM.', options: ['at', 'in', 'on', 'by'], correctAnswer: 'at', explanation: 'At for specific times.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I was born ___ 1990.', options: ['in', 'on', 'at', 'by'], correctAnswer: 'in', explanation: 'In for years.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'School starts ___ 8 AM.', correctAnswer: 'at', explanation: 'At for times.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'We will meet ___ the morning.', options: ['in', 'on', 'at', 'by'], correctAnswer: 'in', explanation: 'In for parts of day.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I\'ll finish ___ Friday.', options: ['by', 'on', 'in', 'at'], correctAnswer: 'by', explanation: 'By = before deadline.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'They arrived ___ night.', correctAnswer: 'at', explanation: 'At night (exception).' },
    // Movement
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The cat jumped ___ the box.', options: ['into', 'onto', 'in', 'on'], correctAnswer: 'into', explanation: 'Into = movement inside.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She walked ___ the bridge.', correctAnswer: 'across', explanation: 'Across = one side to other.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'He drove ___ the tunnel.', options: ['through', 'across', 'over', 'in'], correctAnswer: 'through', explanation: 'Through = inside passage.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The plane flew ___ the clouds.', options: ['over', 'under', 'through', 'above'], correctAnswer: 'through', explanation: 'Through clouds.' },
    // Pakistani Context
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The masjid is ___ the corner.', correctAnswer: 'at/on', explanation: 'At/on the corner.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'He traveled ___ Lahore ___ Karachi.', options: ['from/to', 'to/from', 'in/at', 'at/in'], correctAnswer: 'from/to', explanation: 'From...to for travel.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The shop is ___ MR Road.', options: ['on', 'in', 'at', 'by'], correctAnswer: 'on', explanation: 'On for roads.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'We pray ___ Fajr.', correctAnswer: 'at', explanation: 'At for prayer times.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The food is ___ the container.', options: ['in', 'on', 'at', 'by'], correctAnswer: 'in', explanation: 'In for inside.' },
    // Other Prepositions
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I agree ___ you.', options: ['with', 'to', 'on', 'for'], correctAnswer: 'with', explanation: 'Agree with (person).' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She is good ___ math.', correctAnswer: 'at', explanation: 'Good at (subject).' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I am afraid ___ spiders.', options: ['of', 'from', 'with', 'to'], correctAnswer: 'of', explanation: 'Afraid of.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'This book belongs ___ me.', options: ['to', 'for', 'with', 'of'], correctAnswer: 'to', explanation: 'Belong to.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'I am interested ___ history.', correctAnswer: 'in', explanation: 'Interested in.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She is married ___ a doctor.', options: ['to', 'with', 'by', 'for'], correctAnswer: 'to', explanation: 'Married to.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I am proud ___ my country.', options: ['of', 'with', 'for', 'to'], correctAnswer: 'of', explanation: 'Proud of.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'He is famous ___ his cooking.', correctAnswer: 'for', explanation: 'Famous for.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She is similar ___ her mother.', options: ['to', 'with', 'as', 'like'], correctAnswer: 'to', explanation: 'Similar to.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I am different ___ my brother.', options: ['from', 'to', 'than', 'with'], correctAnswer: 'from', explanation: 'Different from.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She apologized ___ being late.', correctAnswer: 'for', explanation: 'Apologize for.' },
];

export const CONJUNCTIONS: OfflineQuestion[] = [
    // Coordinating
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I like tea ___ coffee.', options: ['and', 'but', 'or', 'so'], correctAnswer: 'and', explanation: 'And connects similar ideas.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She is smart ___ lazy.', options: ['and', 'but', 'or', 'so'], correctAnswer: 'but', explanation: 'But shows contrast.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Study hard, ___ you will fail.', correctAnswer: 'or', explanation: 'Or shows consequence.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'He was tired, ___ he continued.', options: ['and', 'but', 'yet', 'so'], correctAnswer: 'yet', explanation: 'Yet = but/however.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'It was raining, ___ I took an umbrella.', options: ['and', 'but', 'or', 'so'], correctAnswer: 'so', explanation: 'So shows result.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'I was hungry, ___ I ate.', correctAnswer: 'so', explanation: 'So shows result.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'She doesn\'t eat meat ___ fish.', options: ['and', 'but', 'or', 'nor'], correctAnswer: 'or', explanation: 'Or in negative.' },
    // Subordinating
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I will go ___ you come with me.', options: ['if', 'unless', 'because', 'although'], correctAnswer: 'if', explanation: 'If introduces condition.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She stayed home ___ she was sick.', correctAnswer: 'because', explanation: 'Because gives reason.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ it rained, we went out.', options: ['Although', 'Because', 'If', 'Unless'], correctAnswer: 'Although', explanation: 'Although shows contrast.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I will wait ___ you come.', options: ['until', 'unless', 'if', 'because'], correctAnswer: 'until', explanation: 'Until = up to time.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Call me ___ you arrive.', correctAnswer: 'when', explanation: 'When for time.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ he is rich, he is not happy.', options: ['Although', 'Because', 'If', 'Unless'], correctAnswer: 'Although', explanation: 'Although shows contrast.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I\'ll help you ___ I have time.', options: ['if', 'unless', 'although', 'because'], correctAnswer: 'if', explanation: 'If for condition.' },
    // Correlative
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Neither tea ___ coffee is available.', correctAnswer: 'nor', explanation: 'Neither...nor.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Both Ali ___ Ahmed are coming.', options: ['and', 'or', 'but', 'nor'], correctAnswer: 'and', explanation: 'Both...and.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Either you ___ I will go.', options: ['and', 'or', 'but', 'nor'], correctAnswer: 'or', explanation: 'Either...or.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Not only is she smart ___ also hardworking.', correctAnswer: 'but', explanation: 'Not only...but also.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Whether you like it ___ not, you must go.', options: ['and', 'or', 'but', 'nor'], correctAnswer: 'or', explanation: 'Whether...or.' },
    // Pakistani Context
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I fasted ___ I was tired.', options: ['although', 'because', 'if', 'unless'], correctAnswer: 'although', explanation: 'Although = despite.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'We will celebrate ___ Pakistan wins.', correctAnswer: 'if', explanation: 'If for condition.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I pray ___ I am thankful.', options: ['because', 'although', 'if', 'unless'], correctAnswer: 'because', explanation: 'Because gives reason.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'We eat biryani ___ korma on Eid.', options: ['and', 'but', 'or', 'so'], correctAnswer: 'and', explanation: 'And connects items.' },
    // More Practice
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I\'ll take tea ___ coffee, whichever is ready.', options: ['and', 'or', 'but', 'so'], correctAnswer: 'or', explanation: 'Or for choices.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'He speaks ___ he knows everything.', correctAnswer: 'as if', explanation: 'As if = pretending.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I came late ___ there was traffic.', options: ['because', 'although', 'if', 'unless'], correctAnswer: 'because', explanation: 'Because gives reason.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '___ you study, you will fail.', options: ['If', 'Unless', 'Although', 'Because'], correctAnswer: 'Unless', explanation: 'Unless = if not.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'I will go ___ he goes.', correctAnswer: 'wherever', explanation: 'Wherever = any place.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'He left ___ he finished eating.', options: ['after', 'before', 'while', 'during'], correctAnswer: 'after', explanation: 'After for sequence.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I\'ll wait ___ he comes.', options: ['until', 'unless', 'if', 'because'], correctAnswer: 'until', explanation: 'Until = up to time.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She sings ___ she dances.', correctAnswer: 'while', explanation: 'While for simultaneous.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'I\'ll help ___ I can.', options: ['as much as', 'although', 'unless', 'if not'], correctAnswer: 'as much as', explanation: 'As much as = extent.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'He is older ___ wiser.', options: ['and', 'but', 'or', 'so'], correctAnswer: 'and', explanation: 'And connects adjectives.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'I came ___ I could help.', correctAnswer: 'so that', explanation: 'So that for purpose.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Take notes ___ you don\'t forget.', options: ['so that', 'although', 'unless', 'because'], correctAnswer: 'so that', explanation: 'So that for purpose.' },
];
