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

async function checkIfAccountActivated(email){
    const collectionRef = firestore.collection(db, "users");
    const q = firestore.query(collectionRef, firestore.where("email", "==", email), firestore.where("role", "==", "fundingManager"), firestore.where("accountActivated", "==", false));

    const docs = await firestore.getDocs(q);

    if (docs.docs.length > 0)
        return docs.docs[0].data()["accountActivated"];
    else return true;
}

const loginController = async (req, res, signInWithEmailAndPassword, checkIfAccountActivated, firestore) => {
    const {email, pass} = req.body;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, pass);
        const user = userCredential.user;
        const verificationStatus = await checkIfAccountActivated(email);

        if (!verificationStatus){
            await authorization.signOut(auth);

            res.status(401).send("Account pending verification. Please try again later");
        } else {
            console.log(`USER LOGIN: ${user.uid}: ${email}`);

            const documentRef = firestore.doc(db, "users", user.uid);

            const documentSnapshot = await firestore.getDoc(documentRef);

            if (documentSnapshot.exists()){
                const role = documentSnapshot.data()["role"];
                const result = {
                    uid: user.uid,
                    message: role
                };
                res.status(200).json(result);
            }
        }
    } catch (e) {
        console.error("ERROR:", e);
        res.status(500).json({message: "Login error"});
    }
};

module.exports = {loginController, checkIfAccountActivated};