 const express = require('express');
 const authorization = require('firebase/auth');
 const firebaseApp = require('firebase/app');
 const firestore = require('firebase/firestore');


 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

 const router = express.Router();
 const auth = authorization.getAuth();
 // Route for user registration
 router.post('/', (req, res) => {
    const { name, surname, email, password, role, company } = req.body;
    
    // Register user with email and password
    authorization.createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Additional user data (name, surname, role) can be stored in Firebase database or other storage
            // For simplicity, let's just log the user data here
            const user = userCredential.user;
            firestore.setDoc(firestore.doc(db, "users", user.uid), {
                email: email,
                name: name,
                role: role,
                surname, surname,
                uid: user.uid
            })
            .then(() => {
                console.log("User doc created");
            })
            .catch((error) => {
                console.error("ERROR:",error);
            })
            console.log("User registered:", user.uid, name, surname, role);

            // Send success response
            res.status(200).json({ message: `User: ${user.email} created successfully` });
        })
        .catch((error) => {
            // Handle registration errors
            console.error("Error registering user:", error);
            res.status(500).json({ error: "Error registering user." });
        });
 });
 
 module.exports = router;