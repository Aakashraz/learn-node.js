const express = require("express");
const friendsController = require('../controllers/friends.controller')

const friendsRouter = express.Router();
// using middleware to log ip address
// When you attach a middleware function to a router using router.use(), it means that the middleware function
// will be executed for every incoming request to any route that is handled by that specific router.

// How Middleware is Called:
// When a request is made to any route handled by friendsRouter, the middleware function attached using friendsRouter.use() is called first.
// The middleware function performs its task (in this case, logging the IP address) and then calls next() to pass control to the next middleware function or route handler.

friendsRouter.use((req, res, next) => {
    console.log('IP address: ', req.ip);
    next();
})

// route handlers.
friendsRouter.post('/', friendsController.postFriend)
friendsRouter.get('/', friendsController.getAllFriends)
friendsRouter.get('/:id', friendsController.getFriend)

module.exports = friendsRouter;