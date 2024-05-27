const authorization = require('firebase/auth');
const firebaseApp = require('firebase/app');
const firestore = require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyB1bLJJAlJWzwcg4Dvku1KZM3cgR4TbONM",
    authDomain: "fundingjungle-1f03d.firebaseapp.com",
    databaseURL: "https://fundingjungle-1f03d-default-rtdb.firebaseio.com",
    projectId: "fundingjungle-1f03d",
    storageBucket: "fundingjungle-1f03d.appspot.com",
    messagingSenderId: "642664605739",
    appId: "1:642664605739:web:e2d4ae726c712f84c6226e",
    measurementId: "G-Q92887FDM2"
};

// Initialize Firebase
const firebaseDB = firebaseApp.initializeApp(firebaseConfig);
const db = firestore.getFirestore(firebaseDB);
const auth = authorization.getAuth(firebaseDB);

const getEducationController = async (req, res) => {
    const collectionRef = firestore.collection(db, 'educationApplications');
    const q = firestore.query(collectionRef);

    try {
        const docs = await firestore.getDocs(q);

        const applications = docs.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        }));

        console.log(applications);
        res.status(200).json(applications);
    } catch (e) {
        console.error("ERROR:", e);
        res.status(500).send("Error fetching applications");
    }
};

const getBusinessController = async (req, res) => {
    const collectionRef = firestore.collection(db, 'businessApplications');
    const q = firestore.query(collectionRef);

    try {
        const docs = await firestore.getDocs(q);

        const applications = docs.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        }));

        console.log(applications);
        res.status(200).json(applications);
    } catch (e) {
        console.error("ERROR:", e);
        res.status(500).send("Error fetching applications");
    }
};

const getEventController = async (req, res) => {
    const collectionRef = firestore.collection(db, 'eventApplications');
    const q = firestore.query(collectionRef);

    try {
        const docs = await firestore.getDocs(q);

        const applications = docs.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        }));

        console.log(applications);
        res.status(200).json(applications);
    } catch (e) {
        console.error("ERROR:", e);
        res.status(500).send("Error fetching applications");
    }
};

module.exports = {getBusinessController, getEducationController, getEventController};