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

// const fs = require ('fs');
// const parse = require('csv-parse');
//
// const habitablePlanets = [];
//
// function isHabitablePlanets(planet) {
//     // Bracket Notation is used to access the element of javaScripts object,
//     // the incoming planet(data) is already converted to javaScripts objects.
//
//         return (planet['koi_disposition']=== 'CONFIRMED' || planet['koi_disposition']==='CANDIDATE')    // to make the condition work for OR logic by enclosing inside the brackets
//             && planet['koi_insol'] > 0.36
//             && planet['koi_insol'] < 1.11
//             && planet['koi_prad'] < 1.6;
//     // threshold value required to be a habitable planet.
// }
//
// fs.createReadStream('kepler-data.csv')
//     .pipe(parse.parse({
//         comment: '#',   // specify the comment character correctly
//         columns: true   // Use 'columns' instead of 'column'
//     }))
//     .on('data', data=> {
//         if (isHabitablePlanets(data)) {
//             habitablePlanets.push(data);
//         }
//     })
//     .on('error', err => console.error(err))
//     .on('end', () => {
//         console.log(`${habitablePlanets.length} probable (also including CANDIDATE) habitable planets found.`);
//
//         console.log(habitablePlanets.map( planet => {
//             return planet['kepler_name']}))
//         console.log("Done!!!");
//     })



// ---------------------------- Web Server -------------------------------------


// const http = require('http');
//
// // this is an Event Emitter example
// const server = http.createServer();
//
// const friends = [
//     {
//         id: 0,
//         name: 'Niko Tesla'
//     },
//     {
//         id: 1,
//         name: 'Tom Edisson'
//     },
//     {
//         id: 2,
//         name: 'James Clerk Maxwell'
//     }
// ]
//
// server.on('request',(request,response) => {
//     const items = request.url.split('/');
//     //  '/friends/2' will yield ['', 'friends', '2']
//
//     if (request.method === 'POST' && items[1] === 'friends') {
//         request.on('data', chunk => {
//             const friend = chunk.toString();    // converting buffer chunk of data to string to make it readable
//             console.log(`chunk request data: ${friend}`);
//             friends.push(JSON.parse(friend));
//         })
//         // we don't need to call 'end' event because the 'pipe' event call will automatically end it.
//         request.pipe(response)
//     }
//
//     else if(request.method === "GET" && items[1] === 'friends') {
//         // to Set the response header
//         response.writeHead(200, {
//             'Content-Type': 'application/json',
//         });
//
//         if (items.length === 3) {
//             const friendIndex = Number(items[2]);
//
//             console.log(`friendIndex: ${friendIndex} , friends.length:${friends.length}`);
//             // if the input number in 'friends/(number)' is greater than available data
//             if (friendIndex >= friends.length) {
//                 response.statusCode= 404;
//                 response.end('Not Found');
//             }
//             response.end(JSON.stringify(friends[friendIndex]))
//         }
//         else {
//             response.end(JSON.stringify(friends));
//             // To acknowledge the end of sending response data, 'response.end()' needs to be called everytime.
//             // expects the json.stringify() to make enable to read a json object response
//         }
//     }
//
//     else if (items[1] === 'message') {
//         response.statusCode = 200;
//         response.setHeader('Content-Type', 'text/html; charset=UTF-8')
//         response.end('THIS IS A MESSAGE');
//         }
//
//     else {
//         response.statusCode = 404;
//         response.end('Page Not Found');
//         }
//
// });
//
// server.listen(3000, ()=>{
//     console.log("Server started on port 3000");
// });



//  -------------------------------------------    Express.js  ------------------------------------------------



const express = require('express');
const app = express();

const friendsRouter = require('./routes/friends.router');
const messagesRouter = require('./routes/messages.router');

const PORT = 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))

// Middleware uses;
app.use((req, res, next) => {
    const startTime = Date.now();
    next();
    const delta = Date.now() - startTime;
    console.log(`${req.method}${req.baseUrl} ${req.url}, Middleware Time:${delta}ms`);

});

// Built-in Middleware to parse JSON bodies.
app.use(express.json());

app.use('/friends', friendsRouter);
app.use('/messages', messagesRouter);