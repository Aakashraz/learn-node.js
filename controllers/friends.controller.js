// import from the model
const model = require('../models/friends.model')

function getFriend(req, res) {
    const id = Number(req.params.id);
    const friend = model.friends[id];
    // Validation of the data: friend exist or not.
    if (friend) {
        res.json(friend);
    }
    else {
        res.status(404).json({
            message: 'Friend not found.'
        });
    }
}

function getFriends (req, res) {
    res.json(model.friends);
}

function postFriend(req, res) {
    if (!req.body.name) {
        // use return to avoid while encountering no/empty data.
        return res.status(400).json({
            message: "Friend's name is required."
        })
    }
    const newFriend = {
        id: model.friends.length,
        name: req.body.name,
    };
    model.friends.push(newFriend);
    return res.json(newFriend)
}

module.exports = {
    getFriend,
    getFriends,
    postFriend,
}

