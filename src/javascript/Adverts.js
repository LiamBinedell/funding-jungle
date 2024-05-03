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
  
  // initialize firebase
  firebase.initializeApp(firebaseConfig);
  
  // reference your database
  var contactFormDB = firebase.database().ref("contactForm");
  
  document.getElementById("contactForm").addEventListener("submit", submitForm);
  
  function submitForm(e) {
    e.preventDefault();
    var name = getElementVal("name")
    var companyName = getElementVal("companyName");
    var emailid = getElementVal("companyEmail");
    var msgContent = getElementVal("msgContent");
    var Inpimg = document.getElementById("Inpimg").files[0];
  
    saveMessages(companyName, emailid, msgContent, Inpimg, name);
    
    //   enable alert
    document.querySelector(".alert").style.display = "block";
    
    //   remove the alert
    setTimeout(() => {
      document.querySelector(".alert").style.display = "none";
    }, 3000);
    
    //   reset the form
    document.getElementById("contactForm").reset();
  }
  
  const saveMessages = (companyName, emailid, msgContent, Inpimg, name) => {
    var newContactForm = contactFormDB.push();
    
    newContactForm.set({
      name : name,
      companyName: companyName,
      emailid: emailid,
      msgContent: msgContent,
      image: Inpimg.name
    });
    
    // upload image to firebase storage
    var storageRef = firebase.storage().ref("images/" + Inpimg.name);
    storageRef.put(Inpimg);
  };
  
  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };
     
    