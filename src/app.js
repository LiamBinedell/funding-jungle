// const express = require('express');
// const app = express();
// const registerRouter = require('../api/routes/register');

import express from 'express';
const app = express();
import registerRouter from '../api/routes/register';

app.use('/api/register', registerRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});