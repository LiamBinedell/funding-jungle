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
const auth = authorization.getAuth();

const getAdsController = async (req, res) => {
    const collectionRef = firestore.collection(db, 'adverts');
    const q = firestore.query(collectionRef);

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

module.exports = {getAdsController};