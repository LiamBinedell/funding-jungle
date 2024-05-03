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
      alert(`${response} successfully logged in`);
      switch (response){
        case "applicant":
          break;
        case "fundingManager":
          break;
      }
    })
    .catch(error => console.log("ERROR(FETCH):", error));
  });
})