const https = require('https');

const videos = [
    { id: 'YiAC2UckEx0', name: 'Basic Concepts' },
    { id: '2TEjsM0MsqY', name: 'Common Noun' },
    { id: '-WvQET4Ruec', name: 'Noun Types' },
    { id: 'yjFQUcKzC7Y', name: 'Pronouns' },
    { id: 'puQJYmtTQrY', name: 'Adjectives' },
    { id: 'ifnFQ61IkdI', name: 'Indefinite Articles' },
    { id: 'UT-KZdmVz0E', name: 'Definite Article' },
    { id: 'TcaJtVF2T0k', name: 'Verbs Intro' },
    { id: 'gT-u4B0j04E', name: 'Transitive' },
    { id: 'y2qGaXbSxtU', name: 'Linking Verbs' },
    { id: 'yJ3OaGaww-g', name: 'Adverbs' },
    { id: 'D-h5aN2P-iM', name: 'Prepositions' },
    { id: '9pN8wI1Jq0A', name: 'Conjunctions 1' },
    { id: '_P7x3z-4XlU', name: 'Conjunctions 2' },
    { id: 'f2vOQuBw3c8', name: 'Interjections' },
    { id: 'rZArbC0S-44', name: 'Intro Tenses' },
    { id: 'B97z044aV7c', name: 'Present Simple' },
    { id: 'DdVy51hP4Fk', name: 'Present Indef Speaking' },
    { id: 'wzOkAofS_4Y', name: 'Present Cont' },
    { id: 'hBHyE-Bk2bM', name: 'Present Perfect' },
    { id: 'VWYv-sRpdvA', name: 'Present Perf Cont' },
    { id: 'M5-GomD8r-Y', name: 'Past Simple' },
    { id: 'kDFP7y2dJc8', name: 'Past Cont' },
    { id: '2j4V4D4O8vU', name: 'Past Perfect' },
    { id: 'lB8IfBwB-fQ', name: 'Past Perf Cont' },
    { id: 'F_fP-6eGz8U', name: 'Future Simple' },
    { id: 'tJLUzCXLZk8', name: 'Future Cont' },
    { id: 'Q-F30n_nIkw', name: 'Future Perfect' },
    { id: '8bTgW6K1xBE', name: 'Future Perf Cont' },
    { id: 'A8vBLxDNs5U', name: 'Intro Moods' },
    { id: '_S1hS1YyYmY', name: 'Narrations 1' },
    { id: 'uCg14cSRK7A', name: 'Narrations 2' },
    { id: 'tFwAAJ9Wq0k', name: 'Narrations 3' },
    { id: 'dY8M2a6z-fs', name: 'Narrations 4' },
    { id: 'uZdYc8a6r6E', name: 'Voice 1' },
    { id: 'C7G7b-9gT-I', name: 'Voice 2' },
    { id: 'n7e2Wz4nAcw', name: 'Voice 3' },
    { id: 'W-LzH-Kig5Y', name: 'Conditionals 1' },
    { id: '68D0WlSkq1Q', name: 'Conditionals 2' },
    { id: 'f-E5WJwVz9c', name: 'Conditionals 3' },
    { id: 'N_o7e7wL5cQ', name: 'Modals' },
    { id: 'F0C0txyP1Lg', name: 'Precis' },
    { id: '_-JO8CrwZoo', name: 'Correction' },
    { id: 'EB8xp9blmuQ', name: 'Punctuation' },
    { id: '5GQPx3XDxiQ', name: 'Essay' },
    { id: 'FmQcrHEsE9U', name: 'Voice Practice' },
    { id: 'xHZQNdJUW84', name: 'Pair of Words' },
    { id: 'CEMv_mMOFf0', name: 'Identify POS' }
];

function check(index) {
    if (index >= videos.length) return;
    const v = videos[index];
    const req = https.get({
        host: 'www.youtube.com',
        path: `/watch?v=${v.id}`,
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            const match = data.match(/"lengthSeconds":"(\d+)"/);
            if (match) {
                const seconds = parseInt(match[1], 10);
                const minutes = Math.floor(seconds / 60);
                console.log(`${v.name}: ${minutes} mins`);
            } else {
                console.log(`${v.name}: Not found`);
            }
            // Add a small delay to be nice
            setTimeout(() => check(index + 1), 500);
        });
    });

    req.on('error', (e) => {
        console.log(`${v.name}: Error`);
        check(index + 1);
    });
}

check(0);
