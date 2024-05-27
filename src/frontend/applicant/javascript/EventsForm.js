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
var FormDB = firebase.database().ref("eventsform");

document.getElementById("eventsForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  var firstName = getElementVal("firstName");
  var lastName = getElementVal("lastName");
  var idNumber = getElementVal("idNumber");
  var dob = getElementVal("dob");
  var gender = getElementVal("gender");
  var email = getElementVal("email");
  var phone = getElementVal("phone");
  var address1 = getElementVal("address1");
  var location = getElementVal("institution");
  var description = getElementVal("course");
  var attendance = getElementVal("year");
  var budget = getElementVal("grades");
  var reason = getElementVal("reason");
  var applicationId = generateUniqueId(); // Generate a unique application ID
  var fundManagerEmail = new URLSearchParams(window.location.search).get('fundManagerEmail'); // Retrieve the funding manager's email from the URL parameter
  var applicantEmail = sessionStorage.getItem('loggedInApplicant');

  var idDocument = document.getElementById("idDocument").files[0].name;
  var poster = document.getElementById("parentId").files[0].name;
  saveApplication(applicationId, firstName, lastName, idNumber, dob, gender, email, fundManagerEmail, applicantEmail, phone, address1, location, attendance, budget, description, reason, idDocument, poster);

  // Display success message
  const alertMessage = document.querySelector(".alert");
  alertMessage.style.display = "block";
  alertMessage.textContent = "Form submitted successfully.";

  // Redirect to fetch.html after 1 second
  setTimeout(() => {
    window.location.href = "fetch.html";
  }, 1000);
  
  // Reset the form
  document.getElementById("eventsForm").reset();
}

const saveApplication = (applicationId, firstName, lastName, idNumber, dob, gender, email, fundManagerEmail, applicantEmail, phone, address1, location, attendance, budget, description, reason, idDocument, poster) => {
  var newApplication = FormDB.push();

  newApplication.set({
    applicationId: applicationId,
    firstName: firstName,
    lastName: lastName,
    idNumber: idNumber,
    dob: dob,
    gender: gender,
    email: email,
    fundManagerEmail: fundManagerEmail,
    applicantEmail: applicantEmail,
    phone: phone,
    address1: address1,
    location: location,
    attendance: attendance,
    budget: budget,
    description: description,
    reason: reason,
    idDocument: idDocument,
    poster: poster,
    status: "Pending" // Add the status field with a default value of "Pending"
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};

const generateUniqueId = () => {
  return 'EVE-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};
