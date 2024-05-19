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

    function getEventsForms() {
        const dbRef = ref(db);
        get(child(dbRef, 'eventsform')).then((snapshot) => {
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

        const dob = document.createElement('li');
        dob.textContent = "Date of Birth: " + data.dob;
        ul.appendChild(dob);

        const gender = document.createElement('li');
        gender.textContent = "Gender: " + data.gender;
        ul.appendChild(gender);

        const email = document.createElement('li');
        email.textContent = "Email: " + data.email;
        ul.appendChild(email);

        const phone = document.createElement('li');
        phone.textContent = "Phone: " + data.phone;
        ul.appendChild(phone);

        const address1 = document.createElement('li');
        address1.textContent = "Address: " + data.address1;
        ul.appendChild(address1);

        const location = document.createElement('li');
        location.textContent = "Location Of The Event: " + data.location;
        ul.appendChild(location);

        const attendance = document.createElement('li');
        attendance.textContent = "Attendance Number: " + data.attendance;
        ul.appendChild(attendance);

        const budget = document.createElement('li');
        budget.textContent = "Budget Of The Event: " + data.budget;
        ul.appendChild(budget);

        const description = document.createElement('li');
        description.textContent = "Description Of The Event: " + data.description;
        ul.appendChild(description);

        const reason = document.createElement('li');
        reason.textContent = "Motivation Why We should Award Applicant this Funding: " + data.reason;
        ul.appendChild(reason);

        const idDocument = document.createElement('li');
        idDocument.textContent = "Applicant Certified ID Document: " + data.idDocument;
        ul.appendChild(idDocument);

        const poster = document.createElement('li');
        poster.textContent = "Poster: " + data.poster;
        ul.appendChild(poster);

        adsContainer.appendChild(ul);
    }

    getEventsForms();

    // Approve Button Click Event
    approveButton.addEventListener('click', () => {
        window.location.href = "EveReviewForm.html";
    });

    // Decline Button Click Event
    declineButton.addEventListener('click', () => {
        window.location.href = "EveReviewForm.html";
    });
});