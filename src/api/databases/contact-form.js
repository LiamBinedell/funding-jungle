// // firebase.js
// const { initializeApp, getApps, getApp } = require('firebase/app');
// const { getDatabase } = require('firebase/database');
// const { getStorage } = require('firebase/storage');
// const { getAuth } = require('firebase/auth'); // Add this import

// const firebaseConfig = {
//     apiKey: "YOUR_API_KEY",
//     authDomain: "YOUR_AUTH_DOMAIN",
//     databaseURL: "YOUR_DATABASE_URL",
//     projectId: "YOUR_PROJECT_ID",
//     storageBucket: "YOUR_STORAGE_BUCKET",
//     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//     appId: "YOUR_APP_ID",
//     measurementId: "YOUR_MEASUREMENT_ID" // Add this line if you're using Firebase Analytics
// };

// const app = initializeApp(firebaseConfig);

// const db = getDatabase(app);
// const auth = getAuth(app); // Initialize Firebase Auth
// const storage = getStorage(app);

// module.exports = { db, app, auth, storage }; // Include 'auth' in exports
