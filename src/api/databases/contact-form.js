// firebase.js
const { initializeApp, getApps, getApp } = require('firebase/app');
const { getDatabase } = require('firebase/database');
const { getAuth } = require('firebase/auth');
const { getStorage } = require('firebase/storage');

const firebaseConfig = {
    apiKey: "AIzaSyAlvmNiLshOuBnhR1k2w0UGbB21bFLfVC8",
    authDomain: "contact-form-6d16d.firebaseapp.com",
    databaseURL: "https://contact-form-6d16d-default-rtdb.firebaseio.com",
    projectId: "contact-form-6d16d",
    storageBucket: "contact-form-6d16d.appspot.com",
    messagingSenderId: "554996497997",
    appId: "1:554996497997:web:78a40239df3b559caae604",
    measurementId: "G-N3J938V17H"
};

let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

const db = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);

module.exports = { db, auth, storage };