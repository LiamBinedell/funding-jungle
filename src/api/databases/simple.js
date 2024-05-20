// firebase.js
const { initializeApp, getApps, getApp } = require('firebase/app');
const { getDatabase } = require('firebase/database');
const { getAuth } = require('firebase/auth');

const firebaseConfig = {
    //include simple config
};

let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

const db = getDatabase(app);
const auth = getAuth(app);

module.exports = { db, auth };