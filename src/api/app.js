const express = require('express');
const cors = require('cors');
const app = express();
const registerRouter = require('./routes/register');

//app.use(express.static(__dirname));
app.use(cors());
app.use('/api/register', registerRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});