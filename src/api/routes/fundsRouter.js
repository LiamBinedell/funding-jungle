const express = require('express');
const router = express.Router();
const { addFundsController, subtractFundsController, getFundsController } = require('../controllers/fundsController');

// Route to add funds
router.post('/add-funds', addFundsController);

// Route to subtract funds
router.delete('/subtract-funds/:id', subtractFundsController);

// Route to get funds for a specific fund manager
router.get('/get-funds', getFundsController);

module.exports = router;