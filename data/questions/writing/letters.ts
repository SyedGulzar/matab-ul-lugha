/**
 * Letter Writing - Karachi Board SSC
 * Formal and Informal Letters for Pakistani students
 * Based on official BSEK syllabus and past papers 2023-2024
 */

export interface LetterTemplate {
    id: string;
    title: string;
    type: 'informal' | 'formal';
    recipient: string;
    scenario: string;
    format: string[];
    sampleContent: string;
}

export const LETTER_TEMPLATES: LetterTemplate[] = [
    // ============ INFORMAL LETTERS (to family/friends) ============
    {
        id: 'letter-1',
        title: 'Letter to Father Requesting Money',
        type: 'informal',
        recipient: 'Father',
        scenario: 'You are studying in a hostel and need money to buy books for your exams.',
        format: ['Your Address', 'Date', 'Dear Father', 'Body', 'Your loving son/daughter', 'Name'],
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
        id: 'letter-2',
        title: 'Letter to Mother About School Life',
        type: 'informal',
        recipient: 'Mother',
        scenario: 'Write to your mother telling her about your school life and activities.',
        format: ['Your Address', 'Date', 'Dear Mother', 'Body', 'Your loving son/daughter', 'Name'],
        sampleContent: `Hostel DEF,
Cadet College,
Petaro.
Date: __/__/____

Dear Mother,

Assalam-o-Alaikum! I hope you and the whole family are doing well. I am fine here by the grace of Allah.

I wanted to share about my school life. Our daily routine starts at 5:00 AM with morning exercise. After breakfast, we attend classes till 2:00 PM. The teachers here are very helpful and caring. I have made many good friends.

We also have sports in the evening. I have joined the cricket team and we practice daily. The food here is good but nothing compares to your cooking!

Please give my salam to Abbu and love to my siblings.

Your loving son/daughter,
[Your Name]`
    },
    {
        id: 'letter-3',
        title: 'Letter to Brother Advising About Exams',
        type: 'informal',
        recipient: 'Brother',
        scenario: 'Write to your younger brother advising him about exam preparation.',
        format: ['Your Address', 'Date', 'Dear Brother', 'Body', 'Your loving brother/sister', 'Name'],
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
    {
        id: 'letter-4',
        title: 'Letter to Sister About Career Choice',
        type: 'informal',
        recipient: 'Sister',
        scenario: 'Write to your elder sister asking for advice about choosing a career.',
        format: ['Your Address', 'Date', 'Dear Sister', 'Body', 'Your loving brother/sister', 'Name'],
        sampleContent: `[Your Address],
Karachi.
Date: __/__/____

Dear Fatima,

Assalam-o-Alaikum! I hope you are doing great in your studies. I am writing to seek your valuable advice.

I have passed my SSC examination and now I am confused about choosing my future career. I am interested in both medical and engineering fields. Our parents want me to become a doctor, but I find engineering fascinating too.

Please guide me with your experience. What factors should I consider while making this important decision?

Looking forward to your reply.

Your loving brother/sister,
[Your Name]`
    },
    {
        id: 'letter-5',
        title: 'Letter to Friend Congratulating on Success',
        type: 'informal',
        recipient: 'Friend',
        scenario: 'Your friend has topped in the board examination.',
        format: ['Your Address', 'Date', 'Dear Friend', 'Body', 'Your friend', 'Name'],
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
        id: 'letter-6',
        title: 'Letter to Friend About Summer Vacation',
        type: 'informal',
        recipient: 'Friend',
        scenario: 'Write to your friend describing how you spent your summer vacation.',
        format: ['Your Address', 'Date', 'Dear Friend', 'Body', 'Your friend', 'Name'],
        sampleContent: `[Your Address],
Karachi.
Date: __/__/____

Dear Hassan,

Assalam-o-Alaikum! I hope you had a wonderful summer vacation. Let me tell you about how I spent mine.

I went to Murree with my family for two weeks. The weather was pleasant and the scenery was breathtaking. We visited Mall Road, Pindi Point, and Kashmir Point. I also enjoyed horse riding and chairlift.

After returning, I joined a computer course to learn programming. It was a productive vacation overall.

How did you spend your holidays? I am eager to know.

Your friend,
[Your Name]`
    },
    {
        id: 'letter-7',
        title: 'Letter to Friend Apologizing for Absence',
        type: 'informal',
        recipient: 'Friend',
        scenario: 'Write to your friend apologizing for not attending their family function.',
        format: ['Your Address', 'Date', 'Dear Friend', 'Body', 'Your friend', 'Name'],
        sampleContent: `[Your Address],
Karachi.
Date: __/__/____

Dear Bilal,

Assalam-o-Alaikum! I hope you and your family are doing well.

I am writing to sincerely apologize for not being able to attend your sister's wedding last week. I was really looking forward to it, but unfortunately, I fell ill with high fever just a day before the ceremony.

I feel terrible about missing such an important occasion in your life. Please convey my best wishes and apologies to your family. InshaAllah, I will visit soon to meet everyone.

Please forgive me for this absence.

Your friend,
[Your Name]`
    },
    {
        id: 'letter-8',
        title: 'Letter to Cousin About Village Life',
        type: 'informal',
        recipient: 'Cousin',
        scenario: 'Write to your cousin in the city describing village life.',
        format: ['Your Address', 'Date', 'Dear Cousin', 'Body', 'Your loving cousin', 'Name'],
        sampleContent: `Village Khanpur,
District Haripur.
Date: __/__/____

Dear Adeel,

Assalam-o-Alaikum! I hope you are doing well in Karachi. I thought I would tell you about life here in our village.

Life here is very different from the city. We wake up early with the sound of birds chirping. The air is fresh and clean. Our family grows wheat and vegetables in the fields. I help my father in the farm after school.

There is no traffic noise or pollution here. At night, we can see thousands of stars in the clear sky. The only downside is that we don't have as many facilities as you have in the city.

Do visit us during your next vacation!

Your loving cousin,
[Your Name]`
    },
    {
        id: 'letter-9',
        title: 'Letter to Uncle Thanking for Gift',
        type: 'informal',
        recipient: 'Uncle',
        scenario: 'Write to your uncle thanking him for the gift he sent on your birthday.',
        format: ['Your Address', 'Date', 'Dear Uncle', 'Body', 'Your loving nephew/niece', 'Name'],
        sampleContent: `[Your Address],
Karachi.
Date: __/__/____

Dear Uncle,

Assalam-o-Alaikum! I hope you and the family are in good health.

I received the wonderful wristwatch you sent for my birthday. It is exactly what I wanted! The design is modern and it goes with all my clothes. I wear it every day with pride.

Thank you so much for remembering my birthday and for your generous gift. I am truly blessed to have such a caring uncle.

Please give my salam to Aunty and love to my cousins.

Your loving nephew/niece,
[Your Name]`
    },
    {
        id: 'letter-10',
        title: 'Letter to Friend Describing a Cricket Match',
        type: 'informal',
        recipient: 'Friend',
        scenario: 'Write to your friend describing an exciting cricket match you watched.',
        format: ['Your Address', 'Date', 'Dear Friend', 'Body', 'Your friend', 'Name'],
        sampleContent: `[Your Address],
Karachi.
Date: __/__/____

Dear Usman,

Assalam-o-Alaikum! I hope you are doing well. I am writing to share an exciting experience.

Last Sunday, I went to National Stadium to watch the Pakistan vs. India match. The atmosphere was electric! The stadium was packed with thousands of fans waving flags and chanting slogans.

Pakistan won the toss and chose to bat first. Babar Azam played a magnificent innings of 90 runs. The match went to the last over with Pakistan needing 8 runs. Shaheen Afridi hit a six on the last ball and we won!

I wish you could have been there with me.

Your friend,
[Your Name]`
    },

    // ============ FORMAL LETTERS (to authorities/businesses) ============
    {
        id: 'letter-11',
        title: 'Letter to Bank Manager for Account Opening',
        type: 'formal',
        recipient: 'Bank Manager',
        scenario: 'Write a letter to the bank manager requesting to open a savings account.',
        format: ['To', 'Subject', 'Respected Sir', 'Body', 'Yours faithfully', 'Name, Address, CNIC'],
        sampleContent: `To,
The Branch Manager,
Habib Bank Limited,
Saddar Branch, Karachi.

Subject: Request for Opening a Savings Account

Respected Sir,

I am writing to request the opening of a savings account in your esteemed bank. I am a student of Class 10 and wish to develop a habit of saving money.

I would like to open a "Bachaat Account" as it is designed for students. I am enclosing copies of my CNIC (B-Form) and a passport-size photograph.

Please guide me about the minimum deposit required and the procedure for account opening. I shall be very grateful for your assistance.

Yours faithfully,
[Your Name]
Address: [Your Address]
CNIC: _____________`
    },
    {
        id: 'letter-12',
        title: 'Letter to Editor About Environmental Issues',
        type: 'formal',
        recipient: 'Editor',
        scenario: 'Write a letter to the editor of a newspaper about increasing pollution in your city.',
        format: ['To', 'Subject', 'Respected Sir', 'Body', 'Yours faithfully', 'Name, Address'],
        sampleContent: `To,
The Editor,
Dawn Newspaper,
Karachi.

Subject: Rising Pollution Levels in Karachi

Respected Sir,

I am writing to draw public attention to the alarming increase in air pollution in our city through your esteemed newspaper.

The air quality in Karachi has deteriorated severely. Industrial emissions, vehicle exhaust, and burning of garbage have made breathing difficult. Many people, especially children and elderly, are suffering from respiratory diseases.

I urge the concerned authorities to take immediate steps such as promoting public transport, implementing emission standards, and planting more trees. Citizens should also switch to eco-friendly alternatives.

I hope you will publish this letter to create awareness among the public.

Yours faithfully,
[Your Name]
Resident, Gulshan-e-Iqbal, Karachi`
    },
    {
        id: 'letter-13',
        title: 'Letter to Editor About Traffic Problems',
        type: 'formal',
        recipient: 'Editor',
        scenario: 'Write a letter to the editor about traffic jams and their solutions.',
        format: ['To', 'Subject', 'Respected Sir', 'Body', 'Yours faithfully', 'Name, Address'],
        sampleContent: `To,
The Editor,
The News International,
Karachi.

Subject: Traffic Congestion in Karachi - Need for Urgent Action

Respected Sir,

I wish to highlight the severe traffic problems faced by citizens of Karachi through your newspaper.

Every day, millions of commuters spend hours stuck in traffic jams. The major causes include broken roads, illegal parking, encroachments, and lack of traffic signals. This wastes productive hours and causes mental stress.

I suggest the following solutions:
1. Strict enforcement of traffic rules
2. Construction of more flyovers and underpasses
3. Improvement of public transport system
4. Removal of encroachments from roads

I hope the concerned authorities will address this issue urgently.

Yours faithfully,
[Your Name]
Resident, North Nazimabad, Karachi`
    },
    {
        id: 'letter-14',
        title: 'Letter to Newspaper About Social Issues',
        type: 'formal',
        recipient: 'Editor',
        scenario: 'Write a letter to a newspaper about the problem of child labor.',
        format: ['To', 'Subject', 'Respected Sir', 'Body', 'Yours faithfully', 'Name, Address'],
        sampleContent: `To,
The Editor,
Daily Jang,
Karachi.

Subject: The Growing Problem of Child Labor

Respected Sir,

I wish to bring attention to the serious issue of child labor prevalent in our society.

It is heart-breaking to see young children working in factories, auto workshops, and hotels instead of attending school. These children are deprived of their basic right to education. They work long hours for minimal wages and often face abuse.

The government has laws against child labor, but implementation is weak. We need strict enforcement and awareness campaigns. NGOs and citizens should also play their role in rehabilitating these children.

Please publish this letter to create awareness.

Yours faithfully,
[Your Name]
Concerned Citizen, Karachi`
    },
    {
        id: 'letter-15',
        title: 'Letter to Shopkeeper Complaining About Product',
        type: 'formal',
        recipient: 'Shopkeeper',
        scenario: 'Write a complaint letter to a shopkeeper about a defective electronic item.',
        format: ['To', 'Subject', 'Respected Sir', 'Body', 'Yours faithfully', 'Name, Receipt No.'],
        sampleContent: `To,
The Manager,
ABC Electronics,
Tariq Road, Karachi.

Subject: Complaint About Defective Mobile Phone

Respected Sir,

I am writing to complain about a defective mobile phone purchased from your shop on [date], Receipt No. [number].

I bought a Samsung Galaxy A14 worth Rs. 35,000. Within a week, the phone started showing problems. The battery drains very quickly and the touch screen becomes unresponsive. Despite being a new phone, it heats up abnormally.

According to the warranty terms, I am entitled to a replacement or full refund. I kindly request you to either replace the phone with a new piece or refund my money.

I hope you will resolve this matter promptly.

Yours faithfully,
[Your Name]
Contact: [Phone Number]`
    },
    {
        id: 'letter-16',
        title: 'Letter Applying for Job',
        type: 'formal',
        recipient: 'HR Manager',
        scenario: 'Write a job application letter for a position in a company.',
        format: ['To', 'Subject', 'Respected Sir/Madam', 'Body', 'Yours faithfully', 'Name, Qualifications'],
        sampleContent: `To,
The Human Resource Manager,
XYZ Company Limited,
I.I. Chundrigar Road, Karachi.

Subject: Application for the Post of Junior Accountant

Respected Sir/Madam,

I am writing to apply for the position of Junior Accountant advertised in Dawn newspaper on [date].

I have recently completed my B.Com from University of Karachi with first division. I have good knowledge of accounting software including Tally and QuickBooks. I am hardworking, punctual, and possess excellent communication skills.

I am confident that my education and skills make me a suitable candidate for this position. I am enclosing my resume and copies of educational certificates.

I would be grateful for an opportunity to discuss how I can contribute to your organization.

Yours faithfully,
[Your Name]
B.Com (Hons), University of Karachi
Contact: [Phone Number]`
    },
    {
        id: 'letter-17',
        title: 'Letter to Landlord About Rent Issues',
        type: 'formal',
        recipient: 'Landlord',
        scenario: 'Write to your landlord requesting a reduction in rent due to financial difficulties.',
        format: ['To', 'Subject', 'Respected Sir', 'Body', 'Yours faithfully', 'Name, Flat No.'],
        sampleContent: `To,
Mr. Muhammad Yousuf,
Landlord, Yaseen Apartments,
Block 5, Gulshan-e-Iqbal, Karachi.

Subject: Request for Temporary Rent Reduction

Respected Sir,

I am your tenant residing in Flat No. 12 for the past three years. I am writing to request a temporary reduction in rent due to financial difficulties.

Unfortunately, I lost my job two months ago due to company downsizing. I am actively seeking new employment but have not found a suitable position yet. It has become very difficult to pay the current rent of Rs. 25,000.

I humbly request you to kindly reduce the rent to Rs. 18,000 for the next three months until I find new employment. I have always paid rent on time and will resume full payment as soon as my financial situation improves.

I hope you will consider my request sympathetically.

Yours faithfully,
[Your Name]
Flat No. 12, Yaseen Apartments`
    },
    {
        id: 'letter-18',
        title: 'Letter to Doctor Seeking Appointment',
        type: 'formal',
        recipient: 'Doctor',
        scenario: 'Write a letter to a specialist doctor requesting an appointment.',
        format: ['To', 'Subject', 'Respected Sir', 'Body', 'Yours faithfully', 'Name, Patient Details'],
        sampleContent: `To,
Dr. Ahmed Khan,
Consultant Cardiologist,
Aga Khan University Hospital,
Karachi.

Subject: Request for Appointment

Respected Sir,

I am writing to request an appointment for my father, Mr. Muhammad Saleem, age 58 years.

My father has been experiencing chest pain and shortness of breath for the past two weeks. Our family doctor has referred him to you for specialized consultation. He has a history of diabetes and high blood pressure.

Kindly grant us an appointment at your earliest convenience. We are available any day of the week. Please inform us about the fee and documents required.

Thank you for your time and consideration.

Yours faithfully,
[Your Name]
Contact: [Phone Number]
Patient: Mr. Muhammad Saleem`
    },
    {
        id: 'letter-19',
        title: 'Letter to WAPDA About Bill Correction',
        type: 'formal',
        recipient: 'WAPDA Officer',
        scenario: 'Write a complaint about an incorrect electricity bill.',
        format: ['To', 'Subject', 'Respected Sir', 'Body', 'Yours faithfully', 'Consumer ID, Address'],
        sampleContent: `To,
The Sub-Divisional Officer (SDO),
WAPDA Sub-Division,
North Nazimabad, Karachi.

Subject: Request for Correction of Electricity Bill

Respected Sir,

I am a consumer of your sub-division, Consumer ID: [number]. I am writing to request correction of my electricity bill for the month of [month/year].

I have received a bill of Rs. 45,000 which is unusually high compared to my average bill of Rs. 8,000. I believe there is an error in meter reading. My monthly consumption has not changed significantly.

I request you to kindly check the meter reading and issue a corrected bill. I am ready to pay the correct amount immediately after verification.

Please depute an official to check my meter at your earliest convenience.

Yours faithfully,
[Your Name]
Consumer ID: _______
Address: House No. 123, Block H,
North Nazimabad, Karachi`
    },
    {
        id: 'letter-20',
        title: 'Letter to Post Office About Lost Parcel',
        type: 'formal',
        recipient: 'Postmaster',
        scenario: 'Write a complaint about a registered parcel that has not been delivered.',
        format: ['To', 'Subject', 'Respected Sir', 'Body', 'Yours faithfully', 'Name, Tracking Number'],
        sampleContent: `To,
The Postmaster,
General Post Office,
Saddar, Karachi.

Subject: Complaint About Non-Delivery of Registered Parcel

Respected Sir,

I am writing to complain about a registered parcel that I sent two months ago but has not been delivered to the recipient.

On [date], I sent a registered parcel (Tracking No: RR123456789PK) containing important documents to Mr. Ahmed Ali in Lahore. According to online tracking, the parcel was dispatched from Karachi but there is no update after that.

I have visited the post office multiple times but have not received any satisfactory response. This delay is causing me great inconvenience as the documents were urgent.

I request you to kindly trace my parcel and ensure its delivery. Please take necessary action against any negligence.

Yours faithfully,
[Your Name]
Tracking No: RR123456789PK
Sender's Address: [Your Address]`
    },
    {
        id: 'letter-21',
        title: 'Letter to Mayor About Park Maintenance',
        type: 'formal',
        recipient: 'Mayor',
        scenario: 'Write a letter to the mayor requesting better maintenance of a public park.',
        format: ['To', 'Subject', 'Respected Sir', 'Body', 'Yours faithfully', 'Name, Area Representative'],
        sampleContent: `To,
The Mayor,
Karachi Metropolitan Corporation,
Civic Centre, Karachi.

Subject: Request for Maintenance of Public Park in Gulshan-e-Iqbal

Respected Sir,

On behalf of the residents of Gulshan-e-Iqbal Block 13, I am writing to request your attention to the poor condition of our neighborhood park.

The park, which was once beautiful, has fallen into neglect. The grass is overgrown, many trees have dried up, and the playing equipment for children is broken and rusty. The walking track is damaged, and there is no proper lighting in the evening.

This park is the only green space in our area where families come for recreation. I request you to kindly allocate funds for:
1. Repairing the walking track
2. Installing proper lighting
3. Maintaining the garden

We would be grateful for your prompt action.

Yours faithfully,
[Your Name]
General Secretary,
Block 13 Welfare Association`
    },
];

export const getLettersByType = (type: 'informal' | 'formal'): LetterTemplate[] => {
    return LETTER_TEMPLATES.filter(l => l.type === type);
};
