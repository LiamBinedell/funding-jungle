//initialize express
const express = require('express');
const router = express.Router();
const {loginController, logoutController} = require('../controllers/loginController');

router.post('/', loginController);

router.get('/logout', logoutController);

module.exports = router;