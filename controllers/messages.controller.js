const path = require('path');
// to fetch absolute path

function getMessage(req,res) {
    // to send a photo file
    res.sendFile(path.join(__dirname, '..', 'public','images','car.jpg'))
    // path.join is a method provided by the path module to join all given path segments together using
    // the appropriate platform-specific separator (i.e., / on Unix-based systems and \ on Windows).

    // res.send('<ul><li>Hello James Clerk Maxwell</li></ul>')
}

function postMessage(req,res) {
    console.log("Updating message ...")
}

module.exports = {
    getMessage,
    postMessage,
}