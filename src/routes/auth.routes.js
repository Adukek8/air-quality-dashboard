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
        if (e.code === 11000) {  // This is a MongoDB error code for duplicate key
            res.status(400).send({ error: "Username already exists. Please select a different username" });
        } else {
            res.status(400).send(e);
        }
    }
});

router.post("/login", async (req, res) => {
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

router.post("/logout", authMiddlewarem, async (req, res) => {
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