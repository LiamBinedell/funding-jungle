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
var FormDB = firebase.database().ref("educationalform");

document.getElementById("bursaryForm").addEventListener("submit", submitForm);

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
  var institution = getElementVal("institution");
  var course = getElementVal("course");
  var year = getElementVal("year");
  var grades = getElementVal("grades");
  var reason = getElementVal("reason");
  var community = getElementVal("community");
  var fundManagerEmail = new URLSearchParams(window.location.search).get('fundManagerEmail'); // Retrieve the funding manager's email from the URL parameter
  var applicantEmail = sessionStorage.getItem('loggedInApplicant');

  var idDocument = document.getElementById("idDocument").files[0].name;
  var parentId = document.getElementById("parentId").files[0].name;
  var incomeProof = document.getElementById("incomeProof").files[0].name;
  var results = document.getElementById("results").files[0].name;
  var applicationId = generateUniqueId(); // Generate a unique application ID
  saveApplication(applicationId, firstName, lastName, idNumber, dob, gender, email, fundManagerEmail, applicantEmail, phone, address1, institution, course, year, grades, reason, community, idDocument, parentId, incomeProof, results);

  // Display success message
  const alertMessage = document.querySelector(".alert");
  alertMessage.style.display = "block";
  alertMessage.textContent = "Form submitted successfully.";

  // Redirect to fetch.html after 1 second
  setTimeout(() => {
    window.location.href = "fetch.html";
  }, 1000);
  
  // Reset the form
  document.getElementById("bursaryForm").reset();
}

const saveApplication = (applicationId, firstName, lastName, idNumber, dob, gender, email, fundManagerEmail, applicantEmail, phone, address1, institution, course, year, grades, reason, community, idDocument, parentId, incomeProof, results) => {
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
    institution: institution,
    course: course,
    year: year,
    grades: grades,
    reason: reason,
    community: community,
    idDocument: idDocument,
    parentId: parentId,
    incomeProof: incomeProof,
    results: results,
    status: "Pending" // Add the status field with a default value of "Pending"
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};

const generateUniqueId = () => {
  return 'EDU-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};
