const express = require('express');
//const firebaseApp = require('../backend/userAuth')

const router = express.Router();

router.post('/', (req, res) =>{
    //const {name, surname, email, password, role, company} = req.body;
    //firebaseApp.registerUser(name, surname, email, password, role, company);
    res.send("You've reached the register api");
});