// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
firebase.initializeApp(firebaseConfig);

// Reference your database
var FormDB = firebase.database().ref("businessform");

document.getElementById("businessForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();
    var firstName = getElementVal("firstName");
    var lastName = getElementVal("lastName");
    var idNumber = getElementVal("idNumber");
    var businessName = getElementVal("businessName");
    var registrationNumber = getElementVal("registrationNumber");
    var businessAddress = getElementVal("businessAddress");
    var businessType = getElementVal("businessType");
    var email = getElementVal("email");
    var phone = getElementVal("phone");
    var reason = getElementVal("reason");
    var community = getElementVal("community");
    var applicationId = generateUniqueId(); // Generate a unique application ID
    var fundManagerEmail = new URLSearchParams(window.location.search).get('fundManagerEmail'); // Retrieve the funding manager's email from the URL parameter
    var idDocument = document.getElementById("idDocument").files[0].name;
    var businessPlan = document.getElementById("businessPlan").files[0].name;

    saveApplication(applicationId, firstName, lastName, idNumber, businessName, registrationNumber, businessAddress, businessType, email,fundManagerEmail, phone, reason, community, idDocument, businessPlan);

  // Display success message
  const alertMessage = document.querySelector(".alert");
  alertMessage.style.display = "block";
  alertMessage.textContent = "Form submitted successfully.";

  // Redirect to fetch.html after 1 seconds
  setTimeout(() => {
    window.location.href = "fetch.html";
  }, 1000);
  
  // Reset the form
  document.getElementById("businessForm").reset();
}
  

const saveApplication = (applicationId, firstName, lastName, idNumber, businessName, registrationNumber, businessAddress, businessType, email, fundManagerEmail, phone, reason, community, idDocument, businessPlan) => {
    var newApplication = FormDB.push();

    newApplication.set({
        applicationId: applicationId,
        firstName: firstName,
        lastName: lastName,
        idNumber: idNumber,
        businessName: businessName,
        registrationNumber: registrationNumber,
        businessAddress: businessAddress,
        businessType: businessType,
        email: email,
        fundManagerEmail: fundManagerEmail,
        phone: phone,
        reason: reason,
        community: community,
        idDocument: idDocument,
        businessPlan: businessPlan
    });
};

const getElementVal = (id) => {
    return document.getElementById(id).value;
};

const generateUniqueId = () => {
    return 'BUS-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };