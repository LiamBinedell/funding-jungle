
document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginButton = document.getElementById("login");

  loginButton.addEventListener("click", () => {
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: emailInput.value,
        pass: passwordInput.value
      })
    };

    fetch('/api/login/', postOptions)
      .then(data => data.text())
      .then(response => {
        switch (response){
          case "applicant":
            alert('Applicant successfully logged in');
            window.location.href = "../components/applicant.html";
            break;
          case "fundingManager":
            alert('Funding manager successfully logged in');
            // Store email address in sessionStorage
            sessionStorage.setItem('loggedInFundingManager', emailInput.value);
            window.location.href = "../components/fundingManager.html";
            break;
          case "admin":
            alert('Admin successfully logged in');
            window.location.href = "../components/adminDashboard.html";
            break;
          default:
            alert(response);
            break;
        }
      })
      .catch(error => console.log("ERROR(FETCH):", error));
  });
});
