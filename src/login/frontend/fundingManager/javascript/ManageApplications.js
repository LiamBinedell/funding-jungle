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

const educationalAppsContainer = document.getElementById('educationalApps');
const businessAppsContainer = document.getElementById('businessApps');
const eventsAppsContainer = document.getElementById('eventsApps');

function getEducationalForms() {
    const dbRef = ref(db);
    get(child(dbRef, 'educationalform')).then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            // Filter forms by fundManagerEmail
            if (data.fundManagerEmail === sessionStorage.getItem('loggedInFundingManager')) {
                addEducationalFormAsListItem(data);
            }
        });
    });
}

function addEducationalFormAsListItem(data) {
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

    // Add more attributes as needed

    const reviewButton = document.createElement('button');
    reviewButton.textContent = 'Review';
    reviewButton.className = 'review-button';

    reviewButton.addEventListener('click', () => {
        sessionStorage.setItem('applicationId', data.applicationId);
  
         // Redirect to ReviewApplications.html
          window.location.href = 'ReviewEduApplications.html';
    });

    ul.appendChild(reviewButton);

    educationalAppsContainer.appendChild(ul);
}

window.addEventListener('load', getEducationalForms);

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

function getEventForms() {
    const dbRef = ref(db);
    get(child(dbRef, 'eventsform')).then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            // Filter forms by fundManagerEmail
            if (data.fundManagerEmail === sessionStorage.getItem('loggedInFundingManager')) {
                addEventFormAsListItem(data);
            }
        });
    });
}

function addEventFormAsListItem(data) {
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

    const location = document.createElement('li');
    location.textContent = "Location of the event: " + data.location;
    ul.appendChild(location);

    const attendance = document.createElement('li');
    attendance.textContent = "Attendance Number: " + data.attendance;
    ul.appendChild(attendance);

    const budget = document.createElement('li');
    budget.textContent = "Budget of the event: " + data.budget;
    ul.appendChild(budget);



    // Add more attributes as needed

    const reviewButton = document.createElement('button');
    reviewButton.textContent = 'Review';
    reviewButton.className = 'review-button';

    reviewButton.addEventListener('click', () => {
        sessionStorage.setItem('applicationId', data.applicationId);
  
        // Redirect to ReviewApplications.html
         window.location.href = 'ReviewEveApplications.html';

    });

    ul.appendChild(reviewButton);

    eventsAppsContainer.appendChild(ul);
}

window.addEventListener('load', getEventForms);
