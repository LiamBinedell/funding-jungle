const express = require('express');
const router = express.Router();
const { getBusinessController, getEducationController, getEventController } = require('../controllers/getApplicationController');
const { 
    createBusinessApplicationController, 
    createEducationApplicationController, 
    createEventApplicationController,
    updateStatusController,
    createReviewController
} = require('../controllers/createApplicationController');

router.get('/business', getBusinessController);

router.get('/education', getEducationController);

router.get('/event', getEventController);

router.post('/business/create', createBusinessApplicationController);

router.post('/education/create', createEducationApplicationController);

router.post('/event/create', createEventApplicationController);

router.post('/status', updateStatusController);

router.post('/review', createReviewController)

module.exports = router;