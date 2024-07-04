function getMessage(req,res) {
    res.send('<ul><li>Hello James Clerk Maxwell</li></ul>')
}

function postMessage(req,res) {
    console.log("Updating message ...")
}

module.exports = {
    getMessage,
    postMessage,
}