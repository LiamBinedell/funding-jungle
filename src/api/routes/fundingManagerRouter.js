const express = require('express');
const router = express.Router();
const {createAdController, deleteAdController, getAdsController} = require('../controllers/fundingManagerController');

// fetch('/api/fundManager/'); should activate 'someFundFunctionController'
router.post('/ads', getAdsController);

router.post('/create', createAdController);

router.post('/delete', deleteAdController);

module.exports = router;