const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

//import routers
const {registerRouter, loginRouter, adminRouter} = require('./api/routes/routerIndex');

const app = express();

app.use(express.static(path.resolve(__dirname, './')));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

//set routes
app.use('/api/register', registerRouter);
app.use('/api/admin', adminRouter);
app.use('/api/login', loginRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "components", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
