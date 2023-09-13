const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

// save password, ensure to hash
userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8);
    }

    next();
});

userSchema.methods.checkPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET);

    if (!user.tokens) {
        user.tokens = [];
    }

    user.tokens = user.tokens.concat({token});
    await user.save();

    return token;
}

const User = mongoose.model("User", userSchema);
module.exports = User;