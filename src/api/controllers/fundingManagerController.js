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

const getCurrentDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    return dd + '/' + mm + '/' + yyyy;
};

const getAdsController = async (req, res) => {
    const { email } = req.body;

    const collectionRef = firestore.collection(db, 'adverts');
    const q = firestore.query(collectionRef, firestore.where("fundManagerEmail", "==", email));

    try {
        const docs = await firestore.getDocs(q);

        // Extract data from the docs array and construct a new array of ads
        const ads = docs.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        }));

        console.log(ads);
        res.status(200).json(ads); // Return the array of ads as JSON
    } catch (e) {
        console.error("ERROR:", e);
        res.status(500).send("Error fetching ads");
    }

};

const createAdController = async (req, res) => {
    const { companyName, fundManagerEmail, emailid, msgContent, name, fundingType } = req.body;

    const currentDate = getCurrentDate();

    const newAd = {
        name: name,
        companyName: companyName,
        emailid: emailid,
        fundManagerEmail: fundManagerEmail,
        msgContent: msgContent,
        fundingType: fundingType, // Store funding type
        date: currentDate.toString() // Store current date
    }

    try {
        await firestore.setDoc(firestore.doc(firestore.collection(db, 'adverts')), newAd);

        res.status(200).send('Ad created successfully');
    } catch (e) {
        console.error("ERROR:", e);
        res.status(500).send("Error creating advert");
    }
};

const deleteAdController = async (req, res) => {
    const { key } = req.body;

    const adRef = firestore.doc(db, 'adverts', key); // Assuming 'adverts' is your collection name

    try {
        await firestore.deleteDoc(adRef);
        res.status(200).send("Document deleted successfully");
    } catch (e) {
        console.error("ERROR:", e);
        res.status(500).send("Error deleting document");
    }
};

module.exports = { createAdController, deleteAdController, getAdsController };