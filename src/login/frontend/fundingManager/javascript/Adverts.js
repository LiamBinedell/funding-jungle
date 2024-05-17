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
  firebase.initializeApp(firebaseConfig);
  
  // Reference your database
  var contactFormDB = firebase.database().ref("contactForm");
  
  document.getElementById("contactForm").addEventListener("submit", submitForm);
  
  function submitForm(e) {
    e.preventDefault();
    var name = getElementVal("name");
    var companyName = getElementVal("companyName");
    
    // Retrieve the stored email address of the funding manager
    var fundManagerEmail = sessionStorage.getItem('loggedInFundingManager');

    var emailid = getElementVal("companyEmail");
  
    var msgContent = getElementVal("msgContent");
    var Inpimg = document.getElementById("Inpimg").files[0];
    var fundingType = getElementVal("fundingType");
    var currentDate = getCurrentDate(); // Get current date
  
    saveMessages(companyName, fundManagerEmail, emailid, msgContent, Inpimg, name, fundingType, currentDate);
  
    // Enable alert
    document.querySelector(".alert").style.display = "block";
  
    // Remove the alert
    setTimeout(() => {
      document.querySelector(".alert").style.display = "none";
    }, 3000);
  
    // Reset the form
    document.getElementById("contactForm").reset();
  }
  
  const saveMessages = (companyName, fundManagerEmail, emailid, msgContent, Inpimg, name, fundingType, currentDate) => {
    var newContactForm = contactFormDB.push();
  
    newContactForm.set({
      name: name,
      companyName: companyName,
      emailid: emailid,
      fundManagerEmail : fundManagerEmail,
      msgContent: msgContent,
      image: Inpimg.name,
      fundingType: fundingType, // Store funding type
      date: currentDate // Store current date
    });
  
    // Upload image to Firebase storage
    var storageRef = firebase.storage().ref("images/" + Inpimg.name);
    storageRef.put(Inpimg);
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
