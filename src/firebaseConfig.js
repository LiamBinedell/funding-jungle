const admin = require('firebase-admin');

// Replace with your service account key file path or credentials JSON
const serviceAccount = require('./api/backend/fundingjungle-1f03d-firebase-adminsdk-ohbee-893fc1c340.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fundingjungle-1f03d-default-rtdb.firebaseio.com"
});

const auth = admin.auth();
const db = admin.firestore();

module.exports = { auth, db };