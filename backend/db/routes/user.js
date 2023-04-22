const express = require("express");
const router = express.Router();
const control = require("../controllers/user")

router.post('/', async(req, res, next) => {
    try {
        const result = await control.createUser(req.models.users, req.body);
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.toString() });
    }
    next();
});

module.exports = router;