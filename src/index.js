const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

//import routers
const registerRouter = require('./api/routes/register');
const adminRouter = require('./api/routes/admin');


const app = express();

app.use(express.static(path.resolve(__dirname, './')));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

//set routes
app.use('/api/register', registerRouter);
app.use('/api/admin', adminRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "components", "index.html"));
});

// app.get('/signUp.html', (req, res) => {
//     res.sendFile(path.join(__dirname, "components", "signUp.html"));
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});