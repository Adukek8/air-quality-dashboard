const mongoose = require("mongoose");

function connectDB() {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const connection = mongoose.connection;
    connection.once("open", () => {
        console.log("Connected to MongoDB");
    });

    return connection;
}

module.exports = connectDB;