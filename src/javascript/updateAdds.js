// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, remove, get, child, update } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAlvmNiLshOuBnhR1k2w0UGbB21bFLfVC8",
    authDomain: "contact-form-6d16d.firebaseapp.com",
    databaseURL: "https://contact-form-6d16d-default-rtdb.firebaseio.com",
    projectId: "contact-form-6d16d",
    storageBucket: "contact-form-6d16d.appspot.com",
    messagingSenderId: "554996497997",
    appId: "1:554996497997:web:78a40239df3b559caae604",
    measurementId: "G-N3J938V17H"
    };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.database();

window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');

    // Extract ad ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const adId = urlParams.get('id');

    // Fetch ad data from Firebase
    const adRef = db.ref(`contactForm/${adId}`);
    adRef.once('value', (snapshot) => {
        const adData = snapshot.val();
        if (adData) {
            // Pre-fill form fields with ad data
            document.getElementById('companyName').value = adData.companyName;
            document.getElementById('companyEmail').value = adData.emailid;
            document.getElementById('name').value = adData.name;
            document.getElementById('msgContent').value = adData.msgContent;
            document.getElementById('fundingType').value = adData.fundingType;
            // You can handle image prefilling separately
        }
    });

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get updated values from form fields
        const updatedAd = {
            companyName: document.getElementById('companyName').value,
            emailid: document.getElementById('companyEmail').value,
            name: document.getElementById('name').value,
            msgContent: document.getElementById('msgContent').value,
            fundingType: document.getElementById('fundingType').value,
            // Add logic to handle image updating if necessary
        };

        // Update ad data in Firebase
        db.ref(`contactForm/${adId}`).update(updatedAd)
            .then(() => {
                console.log("Ad updated successfully");
                // Redirect to previous page or any other desired action
            })
            .catch((error) => {
                console.error("Error updating ad: ", error);
            });
    });
});
