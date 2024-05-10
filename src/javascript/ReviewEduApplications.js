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

    function getEducationalFormById(applicationId) {
        const dbRef = ref(db, 'educationalform/' + applicationId);
        return get(dbRef);
    }

    function displayForm(data) {
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

        const address = document.createElement('li');
        address.textContent = "Address: " + data.address1;
        ul.appendChild(address);

        const institution = document.createElement('li');
        institution.textContent = "Institution: " + data.institution;
        ul.appendChild(institution);

        const course = document.createElement('li');
        course.textContent = "Course: " + data.course;
        ul.appendChild(course);

        const grades = document.createElement('li');
        grades.textContent = "Grades: " + data.grades;
        ul.appendChild(grades);

        adsContainer.appendChild(ul);
    }

    const applicationId = sessionStorage.getItem('applicationId');

    if (applicationId) {
        getEducationalFormById(applicationId).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                displayForm(data);
            } else {
                console.log("No data available for the provided applicationId.");
            }
        }).catch((error) => {
            console.error("Error fetching form data:", error);
        });
    } else {
        console.log("No applicationId found in sessionStorage.");
    }
});