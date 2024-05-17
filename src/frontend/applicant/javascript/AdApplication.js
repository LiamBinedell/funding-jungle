// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  
  // initialize firebase
  firebase.initializeApp(firebaseConfig);
  
  // reference your database
  var FormDB = firebase.database().ref("simpleform");
  
  document.getElementById("simpleform").addEventListener("submit", submitForm);
  
  function submitForm(e) {
    e.preventDefault();
    var name = getElementVal("name")
    var IDno = getElementVal("IDno");
    var email = getElementVal("Email");
    var msgContent = getElementVal("msgContent");
    var address = getElementVal("address");
  
    saveMessages(IDno, email, msgContent, name, address);
    
    //   enable alert
    document.querySelector(".alert").style.display = "block";
    
    //   remove the alert
    setTimeout(() => {
      document.querySelector(".alert").style.display = "none";
    }, 3000);
    
    //   reset the form
    document.getElementById("simpleform").reset();
  }
  
  const saveMessages = (IDno, Email, msgContent, name,address) => {
    var newContactForm = FormDB.push();
    
    newContactForm.set({
      name : name,
      IDno : IDno,
      Email: Email,
      address: address,
      msgContent: msgContent
    });
  };
  
  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };
