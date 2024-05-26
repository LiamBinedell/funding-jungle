import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getDatabase, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-database.js";

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

    // Get first name and last name from the business form
    const businessFormData = await getBusinessFormData();

    // Get the current date
    const currentDate = new Date().toLocaleDateString();

    saveApplication(name, company, loggedInFundingManager, message, businessFormData.firstName, businessFormData.lastName, businessFormData.applicantEmail, currentDate);

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

async function getBusinessFormData() {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, 'businessform'));
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