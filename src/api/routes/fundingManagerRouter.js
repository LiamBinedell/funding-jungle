const express = require('express');
const router = express.Router();
const {createAdController} = require('../controllers/fundingManagerController');

// fetch('/api/fundManager/'); should activate 'someFundFunctionController'
router.get('/create', createAdController);

module.exports = router;