/**
 * Application/Letter Writing - Karachi Board SSC
 * Based on official BSEK syllabus and past papers 2023-2024
 */

export interface ApplicationTemplate {
    id: string;
    title: string;
    type: 'leave' | 'complaint' | 'request' | 'personal' | 'official';
    recipient: string;
    scenario: string;
    format: string[];
    sampleContent: string;
}

export const APPLICATION_TEMPLATES: ApplicationTemplate[] = [
    // Leave Applications
    {
        id: 'app-1',
        title: 'Application for Sick Leave',
        type: 'leave',
        recipient: 'Principal',
        scenario: 'You are suffering from fever and need 3 days leave from school.',
        format: ['To', 'Subject', 'Respected Sir/Madam', 'Body', 'Yours obediently', 'Name, Class, Roll No.'],
        sampleContent: `To,
The Principal,
[School Name],
Karachi.

Subject: Application for Sick Leave

Respected Sir/Madam,

With due respect, I beg to state that I am a student of Class 10, Section [A/B]. I am suffering from high fever and the doctor has advised me complete bed rest for three days. Therefore, I cannot attend school from [date] to [date].

Kindly grant me leave for three days. I shall be very thankful to you.

Yours obediently,
[Your Name]
Class: 10, Roll No: __
Date: __/__/____`
    },
    {
        id: 'app-2',
        title: 'Application for Character Certificate',
        type: 'request',
        recipient: 'Principal',
        scenario: 'You need a character certificate for admission to college.',
        format: ['To', 'Subject', 'Respected Sir/Madam', 'Body', 'Yours obediently', 'Name, Class, Roll No.'],
        sampleContent: `To,
The Principal,
[School Name],
Karachi.

Subject: Request for Character Certificate

Respected Sir/Madam,

With due respect, I beg to state that I was a student of your esteemed institution. I passed my SSC examination in [year]. Now I need a character certificate for admission to [College Name].

I would be grateful if you kindly issue me a character certificate at your earliest convenience. I shall be very thankful to you.

Yours obediently,
[Your Name]
Ex-student, Class: 10
Date: __/__/____`
    },
    {
        id: 'app-3',
        title: 'Application for Fee Concession',
        type: 'request',
        recipient: 'Principal',
        scenario: 'Your father has lost his job and you cannot afford full fees.',
        format: ['To', 'Subject', 'Respected Sir/Madam', 'Body', 'Yours obediently', 'Name, Class, Roll No.'],
        sampleContent: `To,
The Principal,
[School Name],
Karachi.

Subject: Application for Fee Concession

Respected Sir/Madam,

With due respect, I beg to state that I am a student of Class 10, Section [A/B]. My father has recently lost his job and our family is facing financial difficulties. It is very difficult for us to pay the full fee.

I am a hardworking student and always maintain good grades. I humbly request you to kindly grant me a 50% fee concession. I shall be very thankful to you.

Yours obediently,
[Your Name]
Class: 10, Roll No: __
Date: __/__/____`
    },
    {
        id: 'app-4',
        title: 'Application for Re-admission',
        type: 'request',
        recipient: 'Principal',
        scenario: 'You left school due to illness and now want to rejoin.',
        format: ['To', 'Subject', 'Respected Sir/Madam', 'Body', 'Yours obediently', 'Name, Class, Roll No.'],
        sampleContent: `To,
The Principal,
[School Name],
Karachi.

Subject: Application for Re-admission

Respected Sir/Madam,

With due respect, I beg to state that I was a student of Class 9 in your school last year. Due to a serious illness, I had to leave school for treatment. Alhamdulillah, I have now fully recovered.

I humbly request you to kindly grant me re-admission in Class 10. I promise to work hard and maintain good discipline. I shall be very grateful to you.

Yours obediently,
[Your Name]
Ex-student, Class: 9
Date: __/__/____`
    },
    {
        id: 'app-5',
        title: 'Application for Urgent Leave',
        type: 'leave',
        recipient: 'Principal',
        scenario: 'You have to attend a family wedding in another city.',
        format: ['To', 'Subject', 'Respected Sir/Madam', 'Body', 'Yours obediently', 'Name, Class, Roll No.'],
        sampleContent: `To,
The Principal,
[School Name],
Karachi.

Subject: Application for Urgent Leave

Respected Sir/Madam,

With due respect, I beg to state that I am a student of Class 10, Section [A/B]. My elder sister's wedding is scheduled on [date] in Lahore. My presence is very important at the function.

Kindly grant me leave for five days from [date] to [date]. I assure you that I will complete all the missed work after returning. I shall be very thankful to you.

Yours obediently,
[Your Name]
Class: 10, Roll No: __
Date: __/__/____`
    },
    // School Improvement Requests
    {
        id: 'app-6',
        title: 'Application for Arranging a Study Trip',
        type: 'request',
        recipient: 'Principal',
        scenario: 'You want the school to arrange an educational trip to a museum.',
        format: ['To', 'Subject', 'Respected Sir/Madam', 'Body', 'Yours obediently', 'Name, Class, Roll No.'],
        sampleContent: `To,
The Principal,
[School Name],
Karachi.

Subject: Request for Arranging an Educational Trip

Respected Sir/Madam,

With due respect, on behalf of the students of Class 10, I humbly request you to arrange an educational trip to the Pakistan Maritime Museum. Such trips enhance our knowledge and make learning more interesting.

We promise to maintain discipline during the trip. Kindly consider our request favorably. We shall be very thankful to you.

Yours obediently,
[Your Name]
Class Monitor, Class 10-A
Date: __/__/____`
    },
    {
        id: 'app-7',
        title: 'Application for Improving School Facilities',
        type: 'request',
        recipient: 'Principal',
        scenario: 'The drinking water facility in school is not working properly.',
        format: ['To', 'Subject', 'Respected Sir/Madam', 'Body', 'Yours obediently', 'Name, Class, Roll No.'],
        sampleContent: `To,
The Principal,
[School Name],
Karachi.

Subject: Request for Improving Drinking Water Facility

Respected Sir/Madam,

With due respect, I wish to bring to your kind attention that the water cooler on the ground floor has not been working for the past two weeks. Students are facing a lot of difficulty, especially in this hot weather.

I humbly request you to kindly get the water cooler repaired as soon as possible. We shall be very grateful to you.

Yours obediently,
[Your Name]
Class: 10, Roll No: __
Date: __/__/____`
    },
    // Personal Letters
    {
        id: 'app-8',
        title: 'Letter to Father Requesting Money',
        type: 'personal',
        recipient: 'Father',
        scenario: 'You need money to buy books for your exams.',
        format: ['Address', 'Date', 'Dear Father', 'Body', 'Your loving son/daughter', 'Name'],
        sampleContent: `Hostel ABC,
Government College,
Karachi.
Date: __/__/____

Dear Father,

Assalam-o-Alaikum! I hope this letter finds you in good health. I am fine here and focusing on my studies.

I am writing to request some money. The annual examinations are approaching and I need to buy some reference books for better preparation. I need approximately Rs. 3,000 for the books.

Please send the money at your earliest convenience. Give my salam to Ammi and love to younger siblings.

Your loving son/daughter,
[Your Name]`
    },
    {
        id: 'app-9',
        title: 'Letter Congratulating a Friend on Success',
        type: 'personal',
        recipient: 'Friend',
        scenario: 'Your friend has topped in the board examination.',
        format: ['Address', 'Date', 'Dear Friend', 'Body', 'Your friend', 'Name'],
        sampleContent: `[Your Address],
Karachi.
Date: __/__/____

Dear Ahmed,

Assalam-o-Alaikum! I am very happy to learn that you have topped in the SSC examination. Congratulations! MashaAllah, you truly deserve this success.

Your hard work and dedication have paid off. I am proud to be your friend. May Allah bless you with more success in life. I hope you will continue to excel in your studies.

Please convey my regards to your parents.

Your friend,
[Your Name]`
    },
    {
        id: 'app-10',
        title: 'Letter to Brother About Exam Preparation',
        type: 'personal',
        recipient: 'Brother',
        scenario: 'Write to your younger brother advising him about exam preparation.',
        format: ['Address', 'Date', 'Dear Brother', 'Body', 'Your loving brother/sister', 'Name'],
        sampleContent: `[Your Address],
Karachi.
Date: __/__/____

Dear Ali,

Assalam-o-Alaikum! I hope you are doing well. I am writing to advise you about your upcoming examinations.

Please focus on your studies and avoid wasting time on games and mobile phone. Make a proper timetable and follow it strictly. Revise all subjects regularly and practice past papers. Seek help from your teachers if you have any difficulties.

Remember, hard work is the key to success. I am confident you will make us proud.

Your loving brother,
[Your Name]`
    },
    // Official Complaints
    {
        id: 'app-11',
        title: 'Complaint About Street Problems',
        type: 'complaint',
        recipient: 'Commissioner',
        scenario: 'Write to the Commissioner about broken roads in your area.',
        format: ['To', 'Subject', 'Respected Sir', 'Body', 'Yours faithfully', 'Name, Address'],
        sampleContent: `To,
The Commissioner,
Karachi Metropolitan Corporation,
Karachi.

Subject: Complaint About Poor Road Condition

Respected Sir,

I am writing this letter to bring to your kind attention the deteriorating condition of roads in Gulshan-e-Iqbal, Block 13. The main road has several large potholes that make driving extremely dangerous.

This has caused many accidents and inconvenience to the residents. During rains, the road becomes completely flooded. Despite several verbal complaints, no action has been taken.

I request you to kindly take immediate steps to repair the roads. The residents will be very grateful.

Yours faithfully,
[Your Name]
Resident, Gulshan-e-Iqbal, Block 13`
    },
    {
        id: 'app-12',
        title: 'Complaint About Load Shedding',
        type: 'complaint',
        recipient: 'K-Electric',
        scenario: 'Write a complaint about excessive load shedding in your area.',
        format: ['To', 'Subject', 'Respected Sir', 'Body', 'Yours faithfully', 'Consumer ID, Address'],
        sampleContent: `To,
The General Manager (Complaints),
K-Electric,
Karachi.

Subject: Complaint About Excessive Load Shedding

Respected Sir,

I am writing to complain about the severe electricity load shedding in our area, North Nazimabad, Block H. For the past month, we are facing 6-8 hours of power cuts daily.

This has badly affected our daily life. Students cannot study properly, and food items get spoiled. The situation becomes worse in summer heat. We are paying our bills regularly but not getting proper service.

I request you to please look into this matter urgently and reduce the load shedding.

Yours faithfully,
[Your Name]
Consumer ID: ____
North Nazimabad, Block H`
    },
];

export const getApplicationsByType = (type: string): ApplicationTemplate[] => {
    return APPLICATION_TEMPLATES.filter(a => a.type === type);
};
