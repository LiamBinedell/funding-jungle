import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getDatabase, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-database.js";

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
const database = getDatabase(app);
const formDB = ref(database, "contact");

document.getElementById("reviewForm").addEventListener("submit", submitForm);

async function submitForm(e) {
    e.preventDefault();
    const name = getElementVal("name");
    const message = getElementVal("message");
    const company = getElementVal("company");

    // Retrieve loggedInFundingManager email from sessionStorage
    const loggedInFundingManager = sessionStorage.getItem("loggedInFundingManager");

    // Get first name and last name from the educational form
    const educationalFormData = await getEducationalFormData();

    // Get the current date
    const currentDate = new Date().toLocaleDateString();

    saveApplication(name, company, loggedInFundingManager, message, educationalFormData.firstName, educationalFormData.lastName, educationalFormData.applicantEmail, currentDate);

    // Display success message
    const alertMessage = document.querySelector(".alert");
    alertMessage.style.display = "block";
    alertMessage.textContent = "Review submitted successfully.";

    // Redirect to another page after 1 second
    setTimeout(() => {
        window.location.href = "ManageApplications.html";
    }, 1000);

    // Reset the form
    document.getElementById("reviewForm").reset();
}

async function getEducationalFormData() {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, 'educationalform'));
    let firstName = '';
    let lastName = '';
    let applicantEmail = '';

    snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        // Assuming applicationId is a unique identifier stored in sessionStorage
        if (data.applicationId === sessionStorage.getItem('applicationId')) {
            firstName = data.firstName;
            lastName = data.lastName;
            applicantEmail = data.applicantEmail;
        }
    });

    return { firstName, lastName, applicantEmail };
}

const saveApplication = (name, company, email, message, firstName, lastName, applicantEmail, date) => {
    const newApplication = push(formDB);
    set(newApplication, {
        name: name,
        company: company,
        email: email,
        message: message,
        firstName: firstName,
        lastName: lastName,
        applicantEmail: applicantEmail,
        date: date // Save the current date
    });
};

const getElementVal = (id) => {
    return document.getElementById(id).value;
};