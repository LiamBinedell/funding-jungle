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

const adsContainer = document.getElementById('form');

function Getforms() {
    const dbref = ref(db);
    get(child(dbref, 'simpleform')).then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            AddadsAsListItem(data);
        });
    });
}

function AddadsAsListItem(data) {
    const ul = document.createElement('ul');

    const name = document.createElement('li');
    name.textContent = "Name: " + data.name;
    ul.appendChild(name);

    const msg = document.createElement('li');
    msg.textContent = "Description: " + data.msgContent;
    ul.appendChild(msg);

    const email = document.createElement('li');
    email.textContent = "Email: " + data.Email;
    ul.appendChild(email);

    const IDno = document.createElement('li');
    IDno.textContent = "Id number: " + data.IDno;
    ul.appendChild(IDno);

    const address = document.createElement('li');
    address.textContent = "Address: " + data.address;
    ul.appendChild(address);

    const reviewButton = document.createElement('button');
    reviewButton.textContent = 'Review';
    reviewButton.className = 'review-button';

    reviewButton.addEventListener('click', () => {
        // Review functionality
        alert("Review button clicked for " + data.name);
    });

    ul.appendChild(reviewButton);

    adsContainer.appendChild(ul);
}

window.addEventListener('load', Getforms);
