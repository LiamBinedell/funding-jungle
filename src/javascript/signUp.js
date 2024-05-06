let nameValid = surnameValid = emailValid = passwordValid = roleValid = companyValid = true;

function validateName(name, nameInput){
    nameValid = name.trim() !== "";
    renderWarning(nameInput, "invalidNameWarning", nameValid, "name");
}

function validateSurname(surname, surnameInput){
    surnameValid = surname.trim() !== "";
    renderWarning(surnameInput, "invalidSurnameWarning", surnameValid, "surname");
}

function validateEmail(emailAddress, emailInput){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    emailValid = emailRegex.test(emailAddress);
    renderWarning(emailInput, "invalidEmailWarning", emailValid, "email address");
}

function validatePass(password, passwordInput){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    passwordValid = passwordRegex.test(password);
    renderWarning(passwordInput, "invalidPassWarning", passwordValid, "password");
}

function validateCompany(company, companyInput){
    companyValid = company.trim() !== "";
    renderWarning(companyInput, "invalidCompanyWarning", companyValid, "company");
}

const allValid = () => {
    return nameValid && surnameValid && emailValid && passwordValid && companyValid;
}

function renderWarning(inputId, warningId, validate, value){
    const warningExists = document.getElementById(warningId);
    if (!warningExists){
        if (!validate){
            const warning = document.createElement("p");
            warning.id = warningId;
            warning.className = "warning";
            warning.textContent = `Please enter a valid ${value}`;
            
            const container = inputId.closest(".inputContainer");
            container.insertAdjacentElement("afterend", warning);
        } 
    } else if (validate) {
        warningExists.remove();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById("name");
    const surnameInput = document.getElementById("surname");
    const emailInput = document.getElementById("emailAddress");
    const passwordInput = document.getElementById("password");
    const roleSelect = document.getElementById("roleSelect");
    const roleSelectContainer = roleSelect.closest(".inputContainer");
    const btnSignUp = document.getElementById("btnSignUp");

    nameInput.addEventListener("input", () => {
        validateName(nameInput.value, nameInput);
    });

    surnameInput.addEventListener("input", () => {
        validateSurname(surnameInput.value, surnameInput);
    });

    emailInput.addEventListener("input", () => {
        validateEmail(emailInput.value, emailInput);
    });

    passwordInput.addEventListener("input", () => {
        validatePass(passwordInput.value, passwordInput);
    });

    roleSelect.addEventListener("change", () => {
        const selectedRole = roleSelect.value;
        
        // Check if the selected role is "fundingManager"
        if (selectedRole === "fundingManager") {
            // Create a company input field
            companyInput = document.createElement("input");
            companyInput.type = "text";
            companyInput.id = "company";
            companyInput.placeholder = "Enter your company";

            // Create a section for the company input field
            const companyInputContainer = document.createElement("section");
            companyInputContainer.classList.add("inputContainer");
            companyInputContainer.appendChild(companyInput);

            // Insert the company input section after the role select container
            roleSelectContainer.parentNode.insertBefore(companyInputContainer, roleSelectContainer.nextSibling);

            companyInput.addEventListener("input", () => {
                validateCompany(companyInput.value, companyInput);    
            });
        } else {
            // If the selected role is not "fundingManager", remove the company input if it exists
            const companyInput = document.getElementById("company");
            if (companyInput) {
                renderWarning(companyInput, "invalidCompanyWarning", true, "company");
                companyInput.parentElement.remove();
            }
        }
    });

    btnSignUp.addEventListener("click", () => {
        const companyInput = document.getElementById("company");
        validateName(nameInput.value, nameInput);
        validateSurname(surnameInput.value, surnameInput);
        validateEmail(emailInput.value, emailInput);
        validatePass(passwordInput.value, passwordInput);
        let company = "";
        if (companyInput){
            validateCompany(companyInput.value, companyInput);
            company = companyInput.value;
        }

        if (allValid()){
            const postOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: nameInput.value,
                    surname: surnameInput.value,
                    email: emailInput.value,
                    password: passwordInput.value,
                    role: roleSelect.value,
                    company: company,
                })
            };

            fetch('/api/register/', postOptions)
            .then(data => 
                data.text())
            .then(response => {
                alert(response);
                window.location.href = "../components/login.html";
            })
            .catch(error => console.log("ERROR(FETCH):", error));
        }
    });
});