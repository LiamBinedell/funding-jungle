if (sessionStorage.getItem('uid'))  
  sessionStorage.removeItem('uid');

async function login(emailAddr, password) {
  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: emailAddr,
      pass: password
    })
  };

  const data = await fetch('/api/login/', postOptions);
  const response = await data.json();

  switch (response['message']) {
    case "applicant":
      alert('Applicant successfully logged in');
      sessionStorage.setItem('loggedInApplicant', emailAddr);
      sessionStorage.setItem('uid', response['uid']);
      window.location.href = "../../applicant/html/Applicant.html";
      break;
    case "fundingManager":
      alert('Funding manager successfully logged in');
      // Store email address in sessionStorage
      sessionStorage.setItem('loggedInFundingManager', emailAddr);
      sessionStorage.setItem('uid', response['uid']);
      window.location.href = "../../fundingManager/html/FundingManager.html";
      break;
    case "admin":
      alert('Admin successfully logged in');
      sessionStorage.setItem('uid', response['uid']);
      window.location.href = "../../admin/html/adminDashboard.html";
      break;
    default:
      alert(response['message']);
      break;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginButton = document.getElementById("login");

  loginButton.addEventListener("click", () => {
    login(emailInput.value, passwordInput.value);
  });
});