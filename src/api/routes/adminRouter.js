const express = require('express');
const router = express.Router();
const {getUnactivatedController, approveUserController, denyUserController, logOutController} = require('../controllers/adminUserController');
const {getAdsController} = require('../controllers/adminAdController');

router.get('/', getUnactivatedController);

router.post('/approve', approveUserController);

router.post('/deny', denyUserController);

router.get('/ads', getAdsController);

router.get('/out', logOutController);

module.exports = router;