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

document.addEventListener("DOMContentLoaded", function () {
    const adsContainer = document.getElementById('form');
    const approveButton = document.getElementById('approve-btn');
    const declineButton = document.getElementById('decline-btn');

    function getBusinessForms() {
        const dbRef = ref(db);
        get(child(dbRef, 'businessform')).then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val();
                if (data.applicationId === sessionStorage.getItem('applicationId')) {
                    addFormAsListItem(data);
                }
            });
        });
    }

    function addFormAsListItem(data) {
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

const reason = document.createElement('li');
reason.textContent = "Motivation Why We Should Award Applicant This Funding: " + data.reason;
ul.appendChild(reason);

const community = document.createElement('li');
community.textContent = "How Will The Applicant Give Back To The community: " + data.community;
ul.appendChild(community);

const businessPlan = document.createElement('li');
businessPlan.textContent = "Business Plan Document: " + data.businessPlan;
        ul.appendChild(businessPlan);

        const idDocument = document.createElement('li');
        idDocument.textContent = "Applicant Certified Id Document: " + data.idDocument;
        ul.appendChild(idDocument);


        adsContainer.appendChild(ul);
    }

    getBusinessForms();

    // Approve Button Click Event
    approveButton.addEventListener('click', () => {
        window.location.href = "BusReviewForm.html";
    });

    // Decline Button Click Event
    declineButton.addEventListener('click', () => {
        window.location.href = "BusReviewForm.html";
    });
});