const express = require('express');
const router = express.Router();
const {someFundFunctionController} = require('../controllers/fundingManagerController');

// fetch('/api/fundManager/'); should activate 'someFundFunctionController'
router.get('/create', async (req, res) => {
    
});

module.exports = router;