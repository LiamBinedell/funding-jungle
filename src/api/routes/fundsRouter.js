const express = require('express');
const router = express.Router();

router.get('/doStuff', async (req, res) => {
    res.status(200).send('do stuff');
})

module.exports = router;