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
  var applicantEmail = sessionStorage.getItem('loggedInApplicant');

  var idDocument = document.getElementById("idDocument").files[0].name;
  var businessPlan = document.getElementById("businessPlan").files[0].name;

  saveApplication(applicationId, firstName, lastName, idNumber, businessName, registrationNumber, businessAddress, businessType, email,fundManagerEmail, applicantEmail, phone, reason, community, idDocument, businessPlan);

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
  

const saveApplication = (applicationId, firstName, lastName, idNumber, businessName, registrationNumber, businessAddress, businessType, email, fundManagerEmail, applicantEmail, phone, reason, community, idDocument, businessPlan) => {
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
    applicantEmail: applicantEmail,
    phone: phone,
    reason: reason,
    community: community,
    idDocument: idDocument,
    businessPlan: businessPlan,
    status: "Pending" // Add the status field with a default value of "Pending"
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};

const generateUniqueId = () => {
  return 'BUS-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};
