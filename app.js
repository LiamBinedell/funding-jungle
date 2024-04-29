const express = require('express');
const path = require('path');
const { registerUser } = require('./src/backend/userAuth');

const app = express();

app.use(express.static("./src"));

app.post("/register", async (req, res) => {
    const {name, surname, email, password, role, company} = req.body;
    const response = registerUser(name, surname, email, password, role, company);
    res.send(response);
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});