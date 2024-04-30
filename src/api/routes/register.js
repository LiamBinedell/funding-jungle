const express = require('express');
//const firebaseApp = require('../backend/userAuth')
const router = express.Router();

router.post('/', (req, res) =>{
    //const {name, surname, email, password, role, company} = req.body;
    //firebaseApp.registerUser(name, surname, email, password, role, company);
    try {
        res.send("You've reached the register api");
    } catch (error) {
        res.send("ERROR:", error);
    }
});

module.exports = router;