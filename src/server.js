const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const authMiddleware = require("./middleware/auth.middleware");
const connectDB = require("./db/connect"); // Import the new connection module

require("dotenv").config({ path: '../.env' });

connectDB();

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