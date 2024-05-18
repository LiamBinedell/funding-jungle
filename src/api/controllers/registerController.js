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

const registerController = async (req, res) => {
    const { name, surname, email, password, role, company } = req.body;
    
    // Register user with email and password
    authorization.createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Additional user data (name, surname, role) can be stored in Firebase database or other storage
            // For simplicity, let's just log the user data here
            const user = userCredential.user;
            if (role === "applicant"){
                firestore.setDoc(firestore.doc(db, "users", user.uid), {
                    email: email,
                    name: name,
                    role: role,
                    surname: surname,
                    uid: user.uid
                })
                .then(() => {
                    console.log("User doc created");
                })
                .catch((error) => {
                    console.error("ERROR:",error);
                })
                console.log("User registered:", user.uid, name, surname, role);
            } else if (role === "fundingManager"){
                firestore.setDoc(firestore.doc(db, "users", user.uid), {
                    email: email,
                    name: name,
                    role: role,
                    surname: surname,
                    company: company,
                    accountActivated: false,
                    uid: user.uid
                })
                .then(() => {
                    console.log("User doc created");
                })
                .catch((error) => {
                    console.error("ERROR:",error);
                })
                console.log("User registered:", user.uid, name, surname, role);                
            }
            // Send success response
            res.status(200).send(`Account created successfully, redirecting...`);
        })
        .catch((error) => {
            // Handle registration errors
            console.error("Error registering user:", error);
            res.status(500).send("Error: Error registering user.");
        });
 }

 module.exports = {registerController};