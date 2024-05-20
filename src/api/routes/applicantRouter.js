const express = require('express');
const router = express.Router();
const {getAdsController} = require('../controllers/applicantController');

// fetch('/api/applicant/'); should activate 'someApplicantFunctionController'
router.get('/', getAdsController);

module.exports = router;