// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, get, child, remove } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

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

// Get a reference to the container
let contactContainer = document.getElementById('contact-container');

function GetContacts() {
  const dbRef = ref(db);
  const loggedInApplicant = sessionStorage.getItem('loggedInApplicant');
  get(child(dbRef, 'contact')).then((contactsSnapshot) => {
    contactsSnapshot.forEach(contactSnapshot => {
      if (contactSnapshot.val().applicantEmail === loggedInApplicant) {
        DisplayContactAsNotification(contactSnapshot);
      }
    });
  });
}

function DisplayContactAsNotification(contactSnapshot) {
  let contactData = contactSnapshot.val();
  let contactKey = contactSnapshot.key; // Get the unique key of the contact

  let contactNotification = document.createElement('div');
  contactNotification.classList.add('notification');

  let messageContent = `
    <div class="notification-content">
      <p>Dear ${contactData.firstName} ${contactData.lastName},</p>
      <p>You received a notification from ${contactData.company} on ${contactData.date}.</p>
      <p>${contactData.message}</p>
      <p>For more info, contact ${contactData.email}.</p>
      <p>Sincerely,</p>
      <p>${contactData.name}</p>
    </div>
    <div class="delete-icon" title="Delete" data-key="${contactKey}">&#128465;</div>
  `;

  contactNotification.innerHTML = messageContent;
  contactContainer.appendChild(contactNotification);

  // Add event listener for delete icon
  let deleteIcon = contactNotification.querySelector('.delete-icon');
  deleteIcon.addEventListener('click', function() {
    DeleteContact(contactKey, contactNotification);
  });
}

function DeleteContact(contactKey, contactElement) {
  const dbRef = ref(db, 'contact/' + contactKey);
  remove(dbRef).then(() => {
    // Remove the contact element from the DOM
    contactElement.remove();
  }).catch((error) => {
    console.error("Error removing document: ", error);
  });
}

window.addEventListener('load', GetContacts);
