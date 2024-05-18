const express = require('express');
const router = express.Router();
const {someApplicantFunctionController} = require('../controllers/applicantController');

// fetch('/api/applicant/'); should activate 'someApplicantFunctionController'
app.get('/', someApplicantFunctionController);

module.exports = router;