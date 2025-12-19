const https = require('https');
const fs = require('fs');
const path = require('path');

// Read constants.ts directly to extract URLs
// This avoids needing to transpile TS or handle ESM modules in this simple script
const constantsPath = path.join(__dirname, 'constants.ts');
const constantsContent = fs.readFileSync(constantsPath, 'utf8');

const urls = [];
// Regex to capture the videoUrl from the TS object structure
const urlRegex = /videoUrl:\s*"(https:\/\/www\.youtube\.com\/watch\?v=[^"]+)"/g;
let match;

while ((match = urlRegex.exec(constantsContent)) !== null) {
    if (!urls.includes(match[1])) {
        urls.push(match[1]);
    }
}

console.log(`Found ${urls.length} unique URLs to verify from constants.ts`);

async function checkUrl(url, index) {
    return new Promise((resolve) => {
        const req = https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (data.includes('"playabilityStatus":{"status":"ERROR"') ||
                    data.includes('"playabilityStatus":{"status":"UNPLAYABLE"')) {
                    resolve({ url, status: 'BROKEN', reason: 'Unplayable' });
                } else if (data.includes('This video is unavailable') ||
                    data.includes('This video isn\'t available anymore')) {
                    resolve({ url, status: 'BROKEN', reason: 'Unavailable' });
                } else {
                    const titleMatch = data.match(/<title>(.*?)<\/title>/);
                    const title = titleMatch ? titleMatch[1] : 'No Title';
                    if (title === 'YouTube') {
                        resolve({ url, status: 'SUSPICIOUS', title });
                    } else {
                        resolve({ url, status: 'OK' });
                    }
                }
            });
        });

        req.on('error', (e) => {
            resolve({ url, status: 'ERROR', error: e.message });
        });
    });
}

function chunkArray(array, size) {
    const chunked = [];
    for (let i = 0; i < array.length; i += size) {
        chunked.push(array.slice(i, i + size));
    }
    return chunked;
}

async function run() {
    console.log('Checking URLs in batches...');
    const batches = chunkArray(urls, 5); // Check 5 at a time to avoid rate limiting
    let brokenCount = 0;

    for (let i = 0; i < batches.length; i++) {
        const batch = batches[i];
        console.log(`Processing batch ${i + 1}/${batches.length}...`);

        const promises = batch.map(url => checkUrl(url));
        const results = await Promise.all(promises);

        results.forEach(result => {
            if (result.status !== 'OK') {
                console.log(`[${result.status}] ${result.url} - ${result.reason || result.error}`);
                brokenCount++;
            }
        });

        // Small delay between batches
        if (i < batches.length - 1) {
            await new Promise(r => setTimeout(r, 1000));
        }
    }

    console.log('---------------------------------------------------');
    if (brokenCount === 0) {
        console.log('All links verified successfully! No broken links found.');
    } else {
        console.log(`Found ${brokenCount} broken or suspicious links.`);
    }
}

run();
