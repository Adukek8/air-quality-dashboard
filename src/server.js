const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.routes");
const authMiddleware = require("./middleware/auth.middleware");

require("dotenv").config({ path: '../.env' });

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

console.log("Connected to mongoose");

const app = express();

app.use(cors());
app.use(express.json()); // For parsing JSON requests
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("Hello World")
});

app.get("/myprofile", authMiddleware, (req, res) => {
    res.send(req.user)
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});