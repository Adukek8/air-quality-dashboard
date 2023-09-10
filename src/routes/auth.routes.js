const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e)
    }
});

router.post("/login", async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if (!user || !(await user.checkPassword)) {
            throw new Error();
        }

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        res.send({token})
    } catch (e) {
        res.status(401).send({error: "Login failed"});
    }
});

module.exports = router;