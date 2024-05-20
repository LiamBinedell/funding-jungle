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
