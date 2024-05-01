 // Import the functions you need from the SDKs you need

 //TODO: these need to be require statements. we have the firebase dependency installed if that helps
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
 //import { getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.11.1/firebase/auth.js";

 const registerController = require('../controllers/registerController');
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

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
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
 //const auth = getAuth();

 const express = require('express');
 //const firebaseApp = require('../backend/userAuth')
 const router = express.Router();
 
 // Import Firebase Auth
 const { getAuth, createUserWithEmailAndPassword } = require("https://www.gstatic.com/firebasejs/10.11.1/firebase/auth.js");
 
 // Get Firebase Auth instance
 const auth = getAuth();
 
 // Route for user registration
 router.post('/', (req, res) => {
    const { name, surname, email, password, role, company } = req.body;
    
    // Register user with email and password
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Additional user data (name, surname, role) can be stored in Firebase database or other storage
            // For simplicity, let's just log the user data here
            const user = userCredential.user;
            console.log("User registered:", user.uid, name, surname, role);

            // Send success response
            res.status(200).json({ message: "User registered successfully." });
        })
        .catch((error) => {
            // Handle registration errors
            console.error("Error registering user:", error);
            res.status(500).json({ error: "Error registering user." });
        });
 });
 
 module.exports = router;
 
