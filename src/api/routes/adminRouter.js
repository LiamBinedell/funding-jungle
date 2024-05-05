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

const express = require('express');
const router = express.Router();

async function getUnactivatedAccounts(){
    const collectionRef = firestore.collection(db, "users");
    const q = firestore.query(collectionRef, firestore.where("accountActivated", "==", false));

    const docs = await firestore.getDocs(q);

    const unverifiedAccounts = docs.docs.map(doc => ({
      name: doc.data().name + ' ' + doc.data().surname,
      email: doc.data().email,
      company: doc.data().company
    }));
    return unverifiedAccounts;
}

async function getDocByEmail(email){

}

async function deleteDeniedUserDoc(doc){

}

async function deleteDeniedUser(email){

}

router.get('/', async (req, res) => {
    const unverifiedAccounts = await getUnactivatedAccounts();

    res.status(200).json(unverifiedAccounts);
});

router.post('/approve', async (req, res) => {
    const { email } = req.body;
    res.status(200).send(`Approved ${email}`);
});

router.post('/deny', async (req, res) => {
    const { email } = req.body;
    res.status(200).send(`Denied ${email}`);
});

module.exports = router;