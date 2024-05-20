document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();
    var name = getElementVal("name");
    var companyName = getElementVal("companyName");
    var emailid = getElementVal("companyEmail");
    var msgContent = getElementVal("msgContent");
    var fundingType = getElementVal("fundingType");

    // Delete existing ad
    const adId = getAdIdFromURL(); // Get ad ID from URL parameters
    removeAdFromDatabase(adId); // Remove the existing ad from the database

    // Save the new ad
    saveMessages(companyName, emailid, msgContent, Inpimg, name, fundingType);

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
      const response = data.text();
      alert(response);
    } catch (e) {
      console.error("ERROR:", e)
    }
  };

const getElementVal = (id) => {
    return document.getElementById(id).value;
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
