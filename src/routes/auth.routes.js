const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

require("dotenv").config({ path: '../.env' });

router.post("/register", async (req, res) => {
    console.log("Received registration request");

    try {
        const user = new User(req.body);
        await user.save();

        const sanitizedUser = {
            username: user.username,
            _id: user._id,
        };

        res.status(201).send(sanitizedUser);
    } catch (e) {
        if (e.code === 11000) {  // This is a MongoDB error code for duplicate key
            res.status(400).send({ error: "Username already exists. Please select a different username" });
        } else {
            res.status(400).send({ error: e.message });
        }
    }
});

router.post("/login", async (req, res) => {
    console.log("Received login request");

    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if (!user || !(await user.checkPassword(password))) {
            throw new Error();
        }

        const token = await user.generateAuthToken();
        res.send({token})
    } catch (e) {
        res.status(401).send({error: "Login failed"});
    }
});

router.post("/logout", authMiddleware, async (req, res) => {
    console.log("Received logout request");

    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });

        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;