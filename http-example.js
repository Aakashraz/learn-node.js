const { get } = require('https.mjs');

get('https://www.google.com', res => {
    res.on('data', chunk => console.log(`Data chunk: ${chunk}\n`));
    res.on('end', () => console.log('No More Data'));
});

// req.end();