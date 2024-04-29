const express = require('express');
const path = require('path');
const { registerUser } = require('./backend/userAuth');

const app = express();

app.use(express.json());

app.post("/register", async (req, res) => {
    const {name, surname, email, password, role, company} = req.body;
    const response = registerUser(name, surname, email, password, role, company);
    res.send(response);
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});