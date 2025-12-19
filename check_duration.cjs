const https = require('https');

https.get('https://www.youtube.com/watch?v=YiAC2UckEx0', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        // Look for lengthSeconds in the HTML
        const match = data.match(/"lengthSeconds":"(\d+)"/);
        if (match) {
            const seconds = parseInt(match[1], 10);
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            console.log(`Duration: ${minutes}:${remainingSeconds} (${seconds} seconds)`);
        } else {
            console.log('Duration not found in metadata');
        }
    });
}).on('error', (e) => {
    console.error(e);
});
