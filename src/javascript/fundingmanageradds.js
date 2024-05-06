// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, remove, get, child } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAlvmNiLshOuBnhR1k2w0UGbB21bFLfVC8",
    authDomain: "contact-form-6d16d.firebaseapp.com",
    databaseURL: "https://contact-form-6d16d-default-rtdb.firebaseio.com",
    projectId: "contact-form-6d16d",
    storageBucket: "contact-form-6d16d.appspot.com",
    messagingSenderId: "554996497997",
    appId: "1:554996497997:web:78a40239df3b559caae604",
    measurementId: "G-N3J938V17H"
    };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase();

let ads = document.getElementById('ads');
let no = 1;

function Getads() {
    const dbref = ref(db);
    const loggedInEmail = sessionStorage.getItem('loggedInFundingManager');
    if (loggedInEmail) {
        get(child(dbref, 'contactForm')).then((adsSnapshot) => {
            adsSnapshot.forEach(adSnapshot => {
                let adData = adSnapshot.val();
                // Check if the ad was posted by the logged-in user
                if (adData.emailid === loggedInEmail) {
                    AddadsAsListItem(adSnapshot);
                }
            });
        });
    } else {
        console.log("No user logged in");
    }
}

function AddadsAsListItem(adSnapshot) {
    let adData = adSnapshot.val();

    let adContainer = document.createElement('div');
    adContainer.classList.add('ad-container');

    let adTitle = document.createElement('h3');
    adTitle.textContent = "Ad #" + no;

    let name = document.createElement('p');
    name.textContent = "Name: " + adData.name;

    let company = document.createElement('p');
    company.textContent = "Company Name: " + adData.companyName;

    let msg = document.createElement('p');
    msg.textContent = "Description: " + adData.msgContent;

    let email = document.createElement('p');
    email.textContent = "Email: " + adData.emailid;

    // Create an image element
    let image = document.createElement('img');
    image.src = adData.image; // Set the src attribute to the image URL
    image.alt = "Advert Image"; // Optional: Set alt attribute for accessibility

    let datePosted = document.createElement('p');
    datePosted.textContent = "Date Posted: " + adData.date;

    let adType = document.createElement('p');
    adType.textContent = "Funding Type: " + adData.fundingType;

    let editButton = document.createElement('button');
    editButton.textContent = "Edit";

    let deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";

    // Add event listener to the delete button
    deleteButton.addEventListener('click', () => {
        // Remove ad container from the DOM
        adContainer.remove();
        // Remove ad data from Firebase database
        removeAdFromDatabase(adSnapshot.key);
    });

    // Add event listener to the edit button
    editButton.addEventListener('click', () => {
        // Redirect to Update.html page
        window.location.href = "UpdateAdds.html?id=" + adSnapshot.key;
    });

    adContainer.appendChild(adTitle);
    adContainer.appendChild(name);
    adContainer.appendChild(company);
    adContainer.appendChild(msg);
    adContainer.appendChild(email);
    adContainer.appendChild(image); // Append the image element
    adContainer.appendChild(datePosted);
    adContainer.appendChild(adType);
    adContainer.appendChild(editButton);
    adContainer.appendChild(deleteButton);

    ads.appendChild(adContainer);
    no++;
}


function removeAdFromDatabase(adKey) {
    // Reference the specific ad in the database
    const adRef = ref(db, 'contactForm/' + adKey);
    // Remove the ad data from the database
    remove(adRef).then(() => {
        console.log("Ad removed successfully");
    }).catch((error) => {
        console.error("Error removing ad: ", error);
    });
}

window.addEventListener('load', Getads);