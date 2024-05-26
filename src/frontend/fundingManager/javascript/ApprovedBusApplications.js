import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, get, child, update } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

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
                    addFormAsListItem(data, childSnapshot.key);
                }
            });
        });
    }

    function addFormAsListItem(data, key) {
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
        community.textContent = "How Will The Applicant Give Back To The Community: " + data.community;
        ul.appendChild(community);

        const businessPlan = document.createElement('li');
        businessPlan.textContent = "Business Plan Document: " + data.businessPlan;
        ul.appendChild(businessPlan);

        const idDocument = document.createElement('li');
        idDocument.textContent = "Applicant Certified ID Document: " + data.idDocument;
        ul.appendChild(idDocument);

        adsContainer.appendChild(ul);


    }



    getBusinessForms();
});
