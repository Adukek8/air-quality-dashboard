const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json()); // For parsing JSON requests

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send("Hello world")
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});