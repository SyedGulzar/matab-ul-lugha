/**
 * Application Writing - Karachi Board SSC
 * Formal applications to authorities (Principal, Commissioner, etc.)
 * Based on official BSEK syllabus and past papers 2023-2024
 */

export interface ApplicationTemplate {
    id: string;
    title: string;
    type: 'leave' | 'complaint' | 'request' | 'official';
    recipient: string;
    scenario: string;
    format: string[];
    sampleContent: string;
}

export const APPLICATION_TEMPLATES: ApplicationTemplate[] = [
    // ============ LEAVE APPLICATIONS ============
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
    {
        id: 'app-3',
        title: 'Application for Casual Leave',
        type: 'leave',
        recipient: 'Principal',
        scenario: 'You have a family emergency and need one day off.',
        format: ['To', 'Subject', 'Respected Sir/Madam', 'Body', 'Yours obediently', 'Name, Class, Roll No.'],
        sampleContent: `To,
The Principal,
[School Name],
Karachi.

Subject: Application for Casual Leave

Respected Sir/Madam,

With due respect, I beg to state that I am a student of Class 10, Section [A/B]. Due to an urgent family matter, I need to accompany my parents to the hospital today.

Kindly grant me leave for one day on [date]. I shall cover all the missed lessons from my classmates. I shall be very thankful to you.

Yours obediently,
[Your Name]
Class: 10, Roll No: __
Date: __/__/____`
    },

    // ============ REQUEST APPLICATIONS (CERTIFICATES) ============
    {
        id: 'app-4',
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
        id: 'app-5',
        title: 'Application for Transfer Certificate',
        type: 'request',
        recipient: 'Principal',
        scenario: 'Your family is moving to another city and you need a transfer certificate.',
        format: ['To', 'Subject', 'Respected Sir/Madam', 'Body', 'Yours obediently', 'Name, Class, Roll No.'],
        sampleContent: `To,
The Principal,
[School Name],
Karachi.

Subject: Request for Transfer Certificate

Respected Sir/Madam,

With due respect, I beg to state that I am a student of Class 10, Section [A/B]. Due to my father's job transfer, our family is moving to Islamabad.

I humbly request you to kindly issue me a Transfer Certificate at your earliest convenience so that I may continue my studies in another school. I shall be very grateful to you.

Yours obediently,
[Your Name]
Class: 10, Roll No: __
Date: __/__/____`
    },

    // ============ REQUEST APPLICATIONS (FEE/ADMISSION) ============
    {
        id: 'app-6',
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
        id: 'app-7',
        title: 'Application for Scholarship',
        type: 'request',
        recipient: 'Principal',
        scenario: 'You are a merit student and want to apply for a scholarship.',
        format: ['To', 'Subject', 'Respected Sir/Madam', 'Body', 'Yours obediently', 'Name, Class, Roll No.'],
        sampleContent: `To,
The Principal,
[School Name],
Karachi.

Subject: Application for Merit Scholarship

Respected Sir/Madam,

With due respect, I beg to state that I am a student of Class 10, Section [A/B]. I have consistently secured first position in my class for the past three years. I come from a middle-class family and would like to continue my studies without burdening my parents financially.

I humbly request you to kindly consider me for a merit scholarship. I promise to maintain my academic performance and bring honor to the school.

Yours obediently,
[Your Name]
Class: 10, Roll No: __
Date: __/__/____`
    },
    {
        id: 'app-8',
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
        id: 'app-9',
        title: 'Application for Late Admission',
        type: 'request',
        recipient: 'Principal',
        scenario: 'You missed the admission deadline due to unavoidable circumstances.',
        format: ['To', 'Subject', 'Respected Sir/Madam', 'Body', 'Yours obediently', 'Name, Father\'s Name'],
        sampleContent: `To,
The Principal,
[School Name],
Karachi.

Subject: Request for Late Admission

Respected Sir/Madam,

With due respect, I beg to state that I was unable to apply for admission in Class 9 during the regular admission period. My father was hospitalized, and I had to take care of him.

Now that my father has recovered, I earnestly request you to kindly consider my late admission. I have good academic record and will work hard to catch up with my classmates.

Yours obediently,
[Your Name]
S/o Muhammad Ali
Date: __/__/____`
    },

    // ============ REQUEST APPLICATIONS (SCHOOL FACILITIES) ============
    {
        id: 'app-10',
        title: 'Application for Arranging a Study Trip',
        type: 'request',
        recipient: 'Principal',
        scenario: 'You want the school to arrange an educational trip to a museum.',
        format: ['To', 'Subject', 'Respected Sir/Madam', 'Body', 'Yours obediently', 'Name, Class Monitor'],
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
        id: 'app-11',
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
    {
        id: 'app-12',
        title: 'Application for Library Card Issuance',
        type: 'request',
        recipient: 'Principal',
        scenario: 'You want a library card to borrow books from the school library.',
        format: ['To', 'Subject', 'Respected Sir/Madam', 'Body', 'Yours obediently', 'Name, Class, Roll No.'],
        sampleContent: `To,
The Principal,
[School Name],
Karachi.

Subject: Request for Issuance of Library Card

Respected Sir/Madam,

With due respect, I beg to state that I am a student of Class 10, Section [A/B]. I am very keen to improve my reading habits and prepare better for my examinations.

I humbly request you to kindly issue me a library card so that I may borrow books from the school library. I assure you that I will take good care of the books and return them on time.

Yours obediently,
[Your Name]
Class: 10, Roll No: __
Date: __/__/____`
    },
    {
        id: 'app-13',
        title: 'Application for Sports Equipment',
        type: 'request',
        recipient: 'Principal',
        scenario: 'The school sports equipment is old and needs replacement.',
        format: ['To', 'Subject', 'Respected Sir/Madam', 'Body', 'Yours obediently', 'Name, Sports Captain'],
        sampleContent: `To,
The Principal,
[School Name],
Karachi.

Subject: Request for New Sports Equipment

Respected Sir/Madam,

With due respect, on behalf of the school sports team, I wish to bring to your kind attention that our sports equipment has become old and worn out. The cricket bats are cracked, and the footballs are deflated.

With the inter-school sports competition approaching, I humbly request you to kindly provide us with new sports equipment. This will help us practice better and bring laurels to our school.

Yours obediently,
[Your Name]
Sports Captain, Class 10
Date: __/__/____`
    },
    {
        id: 'app-14',
        title: 'Application for Lab Access Permission',
        type: 'request',
        recipient: 'Principal',
        scenario: 'You want extra lab time to prepare for science practical exams.',
        format: ['To', 'Subject', 'Respected Sir/Madam', 'Body', 'Yours obediently', 'Name, Class, Roll No.'],
        sampleContent: `To,
The Principal,
[School Name],
Karachi.

Subject: Request for Extra Lab Access

Respected Sir/Madam,

With due respect, I beg to state that I am a student of Class 10, Section [A/B]. The annual practical examinations are approaching, and I need more practice time in the science laboratory.

I humbly request you to kindly allow me to use the laboratory for an extra hour after school on weekdays. I promise to follow all safety rules and handle the equipment carefully.

Yours obediently,
[Your Name]
Class: 10, Roll No: __
Date: __/__/____`
    },
    {
        id: 'app-15',
        title: 'Application for School Bus Service',
        type: 'request',
        recipient: 'Principal',
        scenario: 'You live far from school and need school bus facility.',
        format: ['To', 'Subject', 'Respected Sir/Madam', 'Body', 'Yours obediently', 'Name, Class, Address'],
        sampleContent: `To,
The Principal,
[School Name],
Karachi.

Subject: Request for School Bus Service

Respected Sir/Madam,

With due respect, I beg to state that I am a student of Class 10, Section [A/B]. I live in North Nazimabad, Block L, which is quite far from the school. Public transport is unreliable and I often reach late.

I humbly request you to kindly provide me with school bus service. I am ready to pay the required fare. This will help me attend school on time every day.

Yours obediently,
[Your Name]
Class: 10, Address: Block L, North Nazimabad
Date: __/__/____`
    },
    {
        id: 'app-16',
        title: 'Application for Extra Classes',
        type: 'request',
        recipient: 'Principal',
        scenario: 'You are weak in Mathematics and request extra coaching classes.',
        format: ['To', 'Subject', 'Respected Sir/Madam', 'Body', 'Yours obediently', 'Name, Class, Roll No.'],
        sampleContent: `To,
The Principal,
[School Name],
Karachi.

Subject: Request for Extra Coaching in Mathematics

Respected Sir/Madam,

With due respect, I beg to state that I am a student of Class 10, Section [A/B]. I am facing difficulty in understanding certain topics in Mathematics, especially Algebra and Geometry.

I humbly request you to kindly arrange extra coaching classes for weak students like me. This will help us improve our grades in the upcoming board examinations.

Yours obediently,
[Your Name]
Class: 10, Roll No: __
Date: __/__/____`
    },
    {
        id: 'app-17',
        title: 'Application to Change Subject',
        type: 'request',
        recipient: 'Principal',
        scenario: 'You want to change from Computer Science to Biology.',
        format: ['To', 'Subject', 'Respected Sir/Madam', 'Body', 'Yours obediently', 'Name, Class, Roll No.'],
        sampleContent: `To,
The Principal,
[School Name],
Karachi.

Subject: Request for Change of Subject

Respected Sir/Madam,

With due respect, I beg to state that I am a student of Class 9, Section [A/B]. I am currently studying Computer Science as my elective subject. However, I have developed a keen interest in medical science and wish to pursue a career in medicine.

I humbly request you to kindly allow me to change my subject from Computer Science to Biology. I am prepared to work hard to make up for the missed lessons.

Yours obediently,
[Your Name]
Class: 9, Roll No: __
Date: __/__/____`
    },
    {
        id: 'app-18',
        title: 'Application for Replacement of Lost ID Card',
        type: 'request',
        recipient: 'Principal',
        scenario: 'You have lost your school ID card and need a replacement.',
        format: ['To', 'Subject', 'Respected Sir/Madam', 'Body', 'Yours obediently', 'Name, Class, Roll No.'],
        sampleContent: `To,
The Principal,
[School Name],
Karachi.

Subject: Request for Replacement of Lost ID Card

Respected Sir/Madam,

With due respect, I beg to state that I am a student of Class 10, Section [A/B]. Unfortunately, I have lost my school identity card while traveling on public transport yesterday.

I humbly request you to kindly issue me a duplicate ID card. I am ready to pay the required fee for the replacement. I will be more careful in the future.

Yours obediently,
[Your Name]
Class: 10, Roll No: __
Date: __/__/____`
    },

    // ============ COMPLAINT APPLICATIONS ============
    {
        id: 'app-19',
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
        id: 'app-20',
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
    {
        id: 'app-21',
        title: 'Complaint About Water Supply Issues',
        type: 'complaint',
        recipient: 'Water Board',
        scenario: 'Your area is not receiving water supply for several days.',
        format: ['To', 'Subject', 'Respected Sir', 'Body', 'Yours faithfully', 'Name, Address'],
        sampleContent: `To,
The Managing Director,
Karachi Water & Sewerage Board,
Karachi.

Subject: Complaint About Irregular Water Supply

Respected Sir,

I am writing on behalf of the residents of Liaquatabad, Block 4 to complain about the severe water shortage in our area. For the past two weeks, we have not received regular water supply from the main lines.

Residents are forced to buy expensive tanker water for their daily needs. This is causing great hardship, especially to low-income families. Our repeated complaints to the local office have not been addressed.

I request you to kindly look into this matter and restore regular water supply immediately.

Yours faithfully,
[Your Name]
Representative, Block 4 Welfare Association
Liaquatabad, Karachi`
    },
    {
        id: 'app-22',
        title: 'Complaint About Exam Center Change',
        type: 'complaint',
        recipient: 'Board Chairman',
        scenario: 'The examination center assigned to you is too far from your home.',
        format: ['To', 'Subject', 'Respected Sir', 'Body', 'Yours faithfully', 'Roll No., School Name'],
        sampleContent: `To,
The Chairman,
Board of Secondary Education Karachi,
Karachi.

Subject: Request for Change of Examination Center

Respected Sir,

I am a student of Class 10, Roll No. [number], from [School Name]. I have been assigned examination center at [Center Name] in Malir which is about 40 km from my home in North Nazimabad.

Due to lack of direct transport and poor road conditions, reaching this center on time every day will be extremely difficult. My parents are also concerned about my safety.

I humbly request you to kindly assign me an examination center near my residence. I shall be very grateful for your kind consideration.

Yours faithfully,
[Your Name]
Roll No: _______
School: [School Name]`
    },
];

export const getApplicationsByType = (type: string): ApplicationTemplate[] => {
    return APPLICATION_TEMPLATES.filter(a => a.type === type);
};
