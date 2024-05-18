 const express = require('express');
 const router = express.Router();
 const {registerController} = require('../controllers/registerController');

 // Route for user registration
 router.post('/', registerController);
 
 module.exports = router;