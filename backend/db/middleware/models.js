const users = require("../models/user")
//models here

const createModelMiddleware = async (req, res, next) => {
    req.models = {
        users: new users
    }
    next();
}


module.exports = {
    createModelMiddleware
}