const path = require('path');
// to fetch absolute path

function getMessage(req,res) {
    // to send a photo file
    res.sendfile(path.join(__dirname, '..', 'public', 'car.jpg'))
    // res.send('<ul><li>Hello James Clerk Maxwell</li></ul>')
}

function postMessage(req,res) {
    console.log("Updating message ...")
}

module.exports = {
    getMessage,
    postMessage,
}