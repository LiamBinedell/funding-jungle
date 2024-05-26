// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, get, child, remove } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

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
