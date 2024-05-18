const express = require('express');
const router = express.Router();
const {getUnactivatedController, approveUserController, denyUserController} = require('../controllers/adminController');

router.get('/', getUnactivatedController);

router.post('/approve', approveUserController);

router.post('/deny', denyUserController);

module.exports = router;