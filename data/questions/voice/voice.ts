/**
 * Active/Passive Voice - 80 Questions
 */
import { QuestionType } from '../../../types';
import type { OfflineQuestion } from '../../offlineQuestionBank';

export const ACTIVE_PASSIVE_VOICE: OfflineQuestion[] = [
    // Present Simple
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"She writes a letter." - Passive?', options: ['A letter is written by her.', 'A letter was written by her.', 'A letter is being written by her.', 'A letter has been written by her.'], correctAnswer: 'A letter is written by her.', explanation: 'Present simple: is + PP.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The door is ___ (open) by the guard.', correctAnswer: 'opened', explanation: 'Is + past participle.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"He teaches English." - Passive?', options: ['English is taught by him.', 'English was taught by him.', 'English is being taught.', 'English has been taught.'], correctAnswer: 'English is taught by him.', explanation: 'Is + taught.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Rice ___ grown in Pakistan.', options: ['is', 'are', 'was', 'were'], correctAnswer: 'is', explanation: 'Rice (singular) + is.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'English ___ (speak) in many countries.', correctAnswer: 'is spoken', explanation: 'Is + spoken.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"People speak Urdu in Pakistan." - Passive?', options: ['Urdu is spoken in Pakistan.', 'Urdu was spoken in Pakistan.', 'Urdu is being spoken.', 'Urdu has been spoken.'], correctAnswer: 'Urdu is spoken in Pakistan.', explanation: 'By + agent often omitted.' },
    // Present Continuous
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"She is cooking biryani." - Passive?', options: ['Biryani is being cooked by her.', 'Biryani was being cooked.', 'Biryani is cooked by her.', 'Biryani has been cooked.'], correctAnswer: 'Biryani is being cooked by her.', explanation: 'Is being + cooked.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The house is being ___ (paint).', correctAnswer: 'painted', explanation: 'Is being + PP.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"They are watching TV." - Passive?', options: ['TV is being watched by them.', 'TV was being watched.', 'TV is watched.', 'TV has been watched.'], correctAnswer: 'TV is being watched by them.', explanation: 'Is being + watched.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The road ___ being repaired now.', options: ['is', 'was', 'are', 'were'], correctAnswer: 'is', explanation: 'Road (singular) + is being.' },
    // Present Perfect
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"She has finished the work." - Passive?', options: ['The work has been finished by her.', 'The work was finished.', 'The work is finished.', 'The work is being finished.'], correctAnswer: 'The work has been finished by her.', explanation: 'Has been + finished.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The letter has been ___ (write).', correctAnswer: 'written', explanation: 'Has been + PP.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"Someone has stolen my wallet." - Passive?', options: ['My wallet has been stolen.', 'My wallet was stolen.', 'My wallet is stolen.', 'My wallet is being stolen.'], correctAnswer: 'My wallet has been stolen.', explanation: 'Has been + stolen.' },
    // Past Simple
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"He wrote a letter." - Passive?', options: ['A letter was written by him.', 'A letter is written by him.', 'A letter was being written.', 'A letter had been written.'], correctAnswer: 'A letter was written by him.', explanation: 'Was + written.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The window was ___ (break) by the children.', correctAnswer: 'broken', explanation: 'Was + broken.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"They built this house in 1990." - Passive?', options: ['This house was built in 1990.', 'This house is built in 1990.', 'This house has been built.', 'This house was being built.'], correctAnswer: 'This house was built in 1990.', explanation: 'Was + built.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The match ___ won by Pakistan.', options: ['was', 'is', 'has', 'have'], correctAnswer: 'was', explanation: 'Past simple passive.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The book was ___ (publish) last year.', correctAnswer: 'published', explanation: 'Was + published.' },
    // Past Continuous
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"They were building a bridge." - Passive?', options: ['A bridge was being built by them.', 'A bridge was built.', 'A bridge is being built.', 'A bridge had been built.'], correctAnswer: 'A bridge was being built by them.', explanation: 'Was being + built.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The car was being ___ (repair) when I arrived.', correctAnswer: 'repaired', explanation: 'Was being + PP.' },
    // Future Simple
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"They will complete the work." - Passive?', options: ['The work will be completed by them.', 'The work is completed.', 'The work was completed.', 'The work has been completed.'], correctAnswer: 'The work will be completed by them.', explanation: 'Will be + completed.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'A new school will be ___ (build) next year.', correctAnswer: 'built', explanation: 'Will be + built.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"She will send the email." - Passive?', options: ['The email will be sent by her.', 'The email is sent.', 'The email was sent.', 'The email is being sent.'], correctAnswer: 'The email will be sent by her.', explanation: 'Will be + sent.' },
    // Modal Verbs in Passive
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"You must finish the work." - Passive?', options: ['The work must be finished.', 'The work is finished.', 'The work was finished.', 'The work has been finished.'], correctAnswer: 'The work must be finished.', explanation: 'Must be + PP.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The rules should be ___ (follow).', correctAnswer: 'followed', explanation: 'Should be + PP.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"We can solve this problem." - Passive?', options: ['This problem can be solved.', 'This problem is solved.', 'This problem was solved.', 'This problem has been solved.'], correctAnswer: 'This problem can be solved.', explanation: 'Can be + solved.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"Someone may help you." - Passive?', options: ['You may be helped.', 'You are helped.', 'You were helped.', 'You have been helped.'], correctAnswer: 'You may be helped.', explanation: 'May be + helped.' },
    // Pakistani Context
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"Ammi cooked biryani." - Passive?', options: ['Biryani was cooked by Ammi.', 'Biryani is cooked by Ammi.', 'Biryani was being cooked.', 'Biryani has been cooked.'], correctAnswer: 'Biryani was cooked by Ammi.', explanation: 'Was + cooked.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The Quran is ___ (recite) daily.', correctAnswer: 'recited', explanation: 'Is + recited.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"They celebrate Eid every year." - Passive?', options: ['Eid is celebrated every year.', 'Eid was celebrated.', 'Eid is being celebrated.', 'Eid has been celebrated.'], correctAnswer: 'Eid is celebrated every year.', explanation: 'Is + celebrated.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Cricket ___ played in Pakistan.', options: ['is', 'are', 'was', 'were'], correctAnswer: 'is', explanation: 'Cricket (singular) + is.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The national anthem was ___ (sing).', correctAnswer: 'sung', explanation: 'Was + sung.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"Pakistan won the match." - Passive?', options: ['The match was won by Pakistan.', 'The match is won.', 'The match has been won.', 'The match was being won.'], correctAnswer: 'The match was won by Pakistan.', explanation: 'Was + won.' },
    // Interrogative Passive
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"Did he write this?" - Passive?', options: ['Was this written by him?', 'Is this written by him?', 'Has this been written?', 'Will this be written?'], correctAnswer: 'Was this written by him?', explanation: 'Was + this + written?' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Was the letter ___ (send)?', correctAnswer: 'sent', explanation: 'Was + sent?' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"Will they select him?" - Passive?', options: ['Will he be selected?', 'Is he selected?', 'Was he selected?', 'Has he been selected?'], correctAnswer: 'Will he be selected?', explanation: 'Will + he + be selected?' },
    // Negative Passive
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"She didn\'t write the letter." - Passive?', options: ['The letter was not written by her.', 'The letter is not written.', 'The letter has not been written.', 'The letter will not be written.'], correctAnswer: 'The letter was not written by her.', explanation: 'Was not + written.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The work has not been ___ (complete).', correctAnswer: 'completed', explanation: 'Has not been + completed.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"They won\'t invite us." - Passive?', options: ['We won\'t be invited.', 'We aren\'t invited.', 'We weren\'t invited.', 'We haven\'t been invited.'], correctAnswer: 'We won\'t be invited.', explanation: 'Won\'t be + invited.' },
    // Imperative Passive
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"Open the door." - Passive?', options: ['Let the door be opened.', 'The door is opened.', 'The door was opened.', 'The door has been opened.'], correctAnswer: 'Let the door be opened.', explanation: 'Let + object + be + PP.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Let the work be ___ (do).', correctAnswer: 'done', explanation: 'Let + be + done.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"Close the windows." - Passive?', options: ['Let the windows be closed.', 'The windows are closed.', 'The windows were closed.', 'The windows have been closed.'], correctAnswer: 'Let the windows be closed.', explanation: 'Let + object + be + PP.' },
    // Mixed Practice
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The cake ___ by my mother.', options: ['was baked', 'is baking', 'bakes', 'baked'], correctAnswer: 'was baked', explanation: 'Was + baked.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The building is being ___ (construct).', correctAnswer: 'constructed', explanation: 'Is being + constructed.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'English ___ taught at this school.', options: ['is', 'are', 'was', 'were'], correctAnswer: 'is', explanation: 'English + is taught.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The homework ___ done by Ali.', options: ['was', 'is', 'has', 'have'], correctAnswer: 'was', explanation: 'Was + done.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The exam results will be ___ (announce) tomorrow.', correctAnswer: 'announced', explanation: 'Will be + announced.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'This novel ___ written by a Pakistani author.', options: ['was', 'is', 'has', 'have'], correctAnswer: 'was', explanation: 'Was + written.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Help is ___ (need) urgently.', correctAnswer: 'needed', explanation: 'Is + needed.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Mistakes should ___ avoided.', options: ['be', 'been', 'being', 'is'], correctAnswer: 'be', explanation: 'Should be + avoided.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The guests have been ___ (invite).', correctAnswer: 'invited', explanation: 'Have been + invited.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The rules must ___ followed.', options: ['be', 'been', 'being', 'is'], correctAnswer: 'be', explanation: 'Must be + followed.' },
    // More Mixed
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"Who wrote this book?" - Passive?', options: ['By whom was this book written?', 'By whom is this book written?', 'By whom has this book been written?', 'By whom will this book be written?'], correctAnswer: 'By whom was this book written?', explanation: 'By whom + was + written.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The tea is being ___ (make).', correctAnswer: 'made', explanation: 'Is being + made.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The problem ___ be solved easily.', options: ['can', 'is', 'was', 'has'], correctAnswer: 'can', explanation: 'Can be + solved.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Newspapers ___ printed daily.', options: ['are', 'is', 'was', 'were'], correctAnswer: 'are', explanation: 'Newspapers (plural) + are.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The door had been ___ (lock) before we arrived.', correctAnswer: 'locked', explanation: 'Had been + locked.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"They are going to build a mall." - Passive?', options: ['A mall is going to be built.', 'A mall was going to be built.', 'A mall is being built.', 'A mall has been built.'], correctAnswer: 'A mall is going to be built.', explanation: 'Is going to be + built.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The story had been ___ (tell) before.', correctAnswer: 'told', explanation: 'Had been + told.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Medicine should ___ taken on time.', options: ['be', 'been', 'being', 'is'], correctAnswer: 'be', explanation: 'Should be + taken.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The movie ___ being shown at the cinema.', options: ['is', 'are', 'was', 'were'], correctAnswer: 'is', explanation: 'Movie (singular) + is being.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'All students were ___ (give) prizes.', correctAnswer: 'given', explanation: 'Were + given.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"People respect teachers." - Passive?', options: ['Teachers are respected.', 'Teachers were respected.', 'Teachers are being respected.', 'Teachers have been respected.'], correctAnswer: 'Teachers are respected.', explanation: 'Are + respected.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'A new policy will be ___ (implement).', correctAnswer: 'implemented', explanation: 'Will be + implemented.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The thief ___ caught by police.', options: ['was', 'is', 'has', 'have'], correctAnswer: 'was', explanation: 'Was + caught.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'This song ___ sung by many artists.', options: ['has been', 'is being', 'was being', 'had been'], correctAnswer: 'has been', explanation: 'Has been + sung.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The project is being ___ (review).', correctAnswer: 'reviewed', explanation: 'Is being + reviewed.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Orders must ___ obeyed.', options: ['be', 'been', 'being', 'is'], correctAnswer: 'be', explanation: 'Must be + obeyed.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The meeting ___ postponed.', options: ['has been', 'is being', 'was being', 'had was'], correctAnswer: 'has been', explanation: 'Has been + postponed.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The decision will be ___ (make) tomorrow.', correctAnswer: 'made', explanation: 'Will be + made.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: '"Don\'t touch it." - Passive?', options: ['Let it not be touched.', 'It is not touched.', 'It was not touched.', 'It has not been touched.'], correctAnswer: 'Let it not be touched.', explanation: 'Let + not + be + touched.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'Many languages are ___ (speak) in Pakistan.', correctAnswer: 'spoken', explanation: 'Are + spoken.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'The bridge ___ constructed by the army.', options: ['was', 'is', 'has', 'have'], correctAnswer: 'was', explanation: 'Was + constructed.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'New roads ___ being built.', options: ['are', 'is', 'was', 'were'], correctAnswer: 'are', explanation: 'Roads (plural) + are being.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'She was ___ (award) a prize.', correctAnswer: 'awarded', explanation: 'Was + awarded.' },
    { type: QuestionType.MULTIPLE_CHOICE, questionText: 'Homework ___ be done on time.', options: ['should', 'is', 'was', 'has'], correctAnswer: 'should', explanation: 'Should be + done.' },
    { type: QuestionType.FILL_IN_BLANK, questionText: 'The truth will be ___ (reveal) soon.', correctAnswer: 'revealed', explanation: 'Will be + revealed.' },
];

export { ACTIVE_PASSIVE_VOICE as VOICE };
