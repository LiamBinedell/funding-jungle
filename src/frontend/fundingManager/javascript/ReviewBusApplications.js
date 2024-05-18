import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCuTCXOYw--m1mg6F2q2zCp1gvf2uw6PYI",
    authDomain: "simple-633fa.firebaseapp.com",
    databaseURL: "https://simple-633fa-default-rtdb.firebaseio.com",
    projectId: "simple-633fa",
    storageBucket: "simple-633fa.appspot.com",
    messagingSenderId: "616105900248",
    appId: "1:616105900248:web:728ee133191dfba3f97fad",
    measurementId: "G-LVEZE5P5F4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const businessAppsContainer = document.getElementById('businessApps');


function getBusinessForms() {
    const dbRef = ref(db);
    get(child(dbRef, 'businessform')).then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            // Filter forms by fundManagerEmail
            if (data.fundManagerEmail === sessionStorage.getItem('loggedInFundingManager')) {
                addBusinessFormAsListItem(data);
            }
        });
    });
}


function addBusinessFormAsListItem(data) {
    const ul = document.createElement('ul');

    const firstName = document.createElement('li');
    firstName.textContent = "First Name: " + data.firstName;
    ul.appendChild(firstName);

    const lastName = document.createElement('li');
    lastName.textContent = "Last Name: " + data.lastName;
    ul.appendChild(lastName);

    const idNumber = document.createElement('li');
    idNumber.textContent = "ID Number: " + data.idNumber;
    ul.appendChild(idNumber);

    const businessName = document.createElement('li');
    businessName.textContent = "Business Name: " + data.businessName;
    ul.appendChild(businessName);

    const registrationNumber = document.createElement('li');
    registrationNumber.textContent = "Registration Number: " + data.registrationNumber;
    ul.appendChild(registrationNumber);

    const businessAddress = document.createElement('li');
    businessAddress.textContent = "Business Address: " + data.businessAddress;
    ul.appendChild(businessAddress);

    const businessType = document.createElement('li');
    businessType.textContent = "Business Type: " + data.businessType;
    ul.appendChild(businessType);

    const email = document.createElement('li');
    email.textContent = "Email: " + data.email;
    ul.appendChild(email);

    const phone = document.createElement('li');
    phone.textContent = "Phone: " + data.phone;
    ul.appendChild(phone);

    // Add more attributes as needed

    const reviewButton = document.createElement('button');
    reviewButton.textContent = 'Review';
    reviewButton.className = 'review-button';

    reviewButton.addEventListener('click', () => {
        sessionStorage.setItem('applicationId', data.applicationId);
  
        // Redirect to ReviewApplications.html
         window.location.href = 'ReviewBusApplications.html';
    });

    ul.appendChild(reviewButton);

    businessAppsContainer.appendChild(ul);
}

window.addEventListener('load', getBusinessForms);