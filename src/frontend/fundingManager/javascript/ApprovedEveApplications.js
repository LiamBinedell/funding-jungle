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

    function getEventsForms() {
        const dbRef = ref(db);
        get(child(dbRef, 'eventsform')).then((snapshot) => {
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
        reason.textContent = "Motivation Why We Should Award Applicant This Funding: " + data.reason;
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
});
