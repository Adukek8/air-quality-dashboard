const mongoose = require("mongoose");
const bcrypt = require("bcrypt.js");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

// hash password
userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8);
    }

    next();
});

userSchema.methods.checkPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);
module.exports = User;