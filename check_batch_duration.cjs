const https = require('https');

const videos = [
    { id: 'YiAC2UckEx0', name: 'Basic Concepts' },
    { id: '2TEjsM0MsqY', name: 'Common Noun' },
    { id: '-WvQET4Ruec', name: 'Noun Types' },
    { id: 'yjFQUcKzC7Y', name: 'Pronouns' },
    { id: 'puQJYmtTQrY', name: 'Adjectives' },
    { id: 'yJ3OaGaww-g', name: 'Adverbs' },
    { id: 'D-h5aN2P-iM', name: 'Prepositions' },
    { id: '9pN8wI1Jq0A', name: 'Conjunctions 1' },
    { id: 'ifnFQ61IkdI', name: 'Indefinite Articles' },
    { id: 'UT-KZdmVz0E', name: 'Definite Article' },
    { id: 'B97z044aV7c', name: 'Present Simple' },
    { id: '_S1hS1YyYmY', name: 'Narrations 1' },
    { id: 'uZdYc8a6r6E', name: 'Active/Passive 1' },
    { id: 'W-LzH-Kig5Y', name: 'Conditionals 1' },
    { id: 'EB8xp9blmuQ', name: 'Punctuation' }
];

function check(index) {
    if (index >= videos.length) return;
    const v = videos[index];
    https.get(`https://www.youtube.com/watch?v=${v.id}`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            const match = data.match(/"lengthSeconds":"(\d+)"/);
            if (match) {
                const seconds = parseInt(match[1], 10);
                const minutes = Math.floor(seconds / 60);
                console.log(`${v.name}: ${minutes} mins (${seconds}s)`);
            } else {
                console.log(`${v.name}: Not found`);
            }
            check(index + 1);
        });
    }).on('error', (e) => {
        console.log(`${v.name}: Error`);
        check(index + 1);
    });
}

check(0);
