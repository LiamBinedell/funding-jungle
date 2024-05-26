  document.getElementById("contactForm").addEventListener("submit", submitForm);
  //hello
  function submitForm(e) {
    e.preventDefault();
    var name = getElementVal("name");
    var companyName = getElementVal("companyName");
    
    // Retrieve the stored email address of the funding manager
    var fundManagerEmail = sessionStorage.getItem('loggedInFundingManager');

    var emailid = getElementVal("companyEmail");
  
    var msgContent = getElementVal("msgContent");
    var fundingType = getElementVal("fundingType");
  
    saveMessages(companyName, fundManagerEmail, emailid, msgContent, name, fundingType);
  
    // Enable alert
    document.querySelector(".alert").style.display = "block";
  
    // Remove the alert
    setTimeout(() => {
      document.querySelector(".alert").style.display = "none";
    }, 3000);
  
    // Reset the form
    document.getElementById("contactForm").reset();
  }
  
  async function saveMessages (companyName, fundManagerEmail, emailid, msgContent, name, fundingType) {
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
        fundingType: fundingType, // Store funding type
      })
    }
  
    try {
      const data = await fetch('/api/fundManager/create', postOptions);
      const response = await data.text();
      alert(response);
    } catch (e) {
      console.error("ERROR:", e)
    }
  };
  
  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };