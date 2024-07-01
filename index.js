//  --------------- Stream API  -------------------------

// The Node.js Stream API is a powerful feature that allows you to efficiently handle data flow in Node.js applications.

// key concepts and components of the Node.js Stream API:
//
// Readable Streams: Instances where data can be read from, such as reading a file or receiving an HTTP request body. Readable streams emit data events when new data is available and end event when no more data is available.
//
// Writable Streams: Instances where data can be written to, such as writing to a file or sending an HTTP response. Writable streams have methods like write() to write data and end() to signify the end of writing.
//
// Duplex Streams: Streams that are both readable and writable, such as TCP sockets.
//
// Transform Streams: A type of duplex stream where the output is computed based on input data, such as compression streams (zlib).

const fs = require ('fs');
const parse = require('csv-parse');

const habitablePlanets = [];

function isHabitablePlanets(planet) {
        return (planet['koi_disposition']=== 'CONFIRMED' || planet['koi_disposition']==='CANDIDATE')
            && planet['koi_insol'] > 0.36
            && planet['koi_insol'] < 1.11
            && planet['koi_prad'] < 1.6;
    // threshold value required to be a habitable planet.
}

fs.createReadStream('kepler-data.csv')
    .pipe(parse.parse({
        comment: '#',   // specify the comment character correctly
        columns: true   // Use 'columns' instead of 'column'
    }))
    .on('data', data=> {
        if (isHabitablePlanets(data)) {
            habitablePlanets.push(data);
        }
    })
    .on('error', err => console.error(err))
    .on('end', () => {
        console.log(`${habitablePlanets.length} probable (also including CANDIDATE) habitable planets found.`);

        const name = habitablePlanets.map( planet => {
            return planet['kepler_name']})
        console.log(name)
        console.log("Done!!!");
    })
