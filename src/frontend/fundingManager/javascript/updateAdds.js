
// Initialize Firebase
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
firebase.initializeApp(firebaseConfig);

// Reference your database
var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();
    var name = getElementVal("name");
    var companyName = getElementVal("companyName");
    var emailid = getElementVal("companyEmail");
    var msgContent = getElementVal("msgContent");
    var Inpimg = document.getElementById("Inpimg").files[0];
    var fundingType = getElementVal("fundingType");
    var currentDate = getCurrentDate(); // Get current date

    // Delete existing ad
    const adId = getAdIdFromURL(); // Get ad ID from URL parameters
    removeAdFromDatabase(adId); // Remove the existing ad from the database

    // Save the new ad
    saveMessages(companyName, emailid, msgContent, Inpimg, name, fundingType, currentDate);

    // Enable alert
    document.querySelector(".alert").style.display = "block";

    // Remove the alert
    setTimeout(() => {
        document.querySelector(".alert").style.display = "none";
    }, 3000);

    // Reset the form
    document.getElementById("contactForm").reset();
    window.location.href = "fundingManagerAdds.html";
}

async function saveMessages (companyName, fundManagerEmail, emailid, msgContent, Inpimg, name, fundingType, currentDate) {
    const postOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        companyName: companyName,
        emailid: emailid,
        fundManagerEmail : fundManagerEmail,
        msgContent: msgContent,
        image: Inpimg.name,
        fundingType: fundingType, // Store funding type
        date: currentDate // Store current date
      })
    }
  
    try {
      const data = await fetch('/api/fundManager/create', postOptions);
      const response = data.text();
      alert(response);
    } catch (e) {
      console.error("ERROR:", e)
    }
  };

const getElementVal = (id) => {
    return document.getElementById(id).value;
};

const getCurrentDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    var yyyy = today.getFullYear();

    return dd + '/' + mm + '/' + yyyy;
};

function getAdIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

async function removeAdFromDatabase(adKey) {
    const postOptions = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            key: adKey
        })
    };

    try {
        const data = await fetch('/api/fundManager/delete', postOptions);
        const response = await data.text();
    } catch (e) {
        console.error("ERROR:", e);
    }
}

function previewImage(event) {
    var img = document.getElementById('newimg');
    img.src = URL.createObjectURL(event.target.files[0]);
}
