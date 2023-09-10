const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.route");


require("dotenv").config();

const app = express();

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json()); // For parsing JSON requests

app.use("auth/", authRoutes);

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("Hello world")
});

app.listen(PORT, () => {
    console.log("Server is running on port ${PORT}");
});