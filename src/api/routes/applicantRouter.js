const express = require('express');
const router = express.Router();
const {someApplicantFunctionController} = require('../controllers/applicantController');

// fetch('/api/applicant/'); should activate 'someApplicantFunctionController'
router.get('/', someApplicantFunctionController);

module.exports = router;