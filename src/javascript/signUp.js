// import { initializeApp } from 'firebase/app';
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// import { addDoc, collection, getFirestore } from 'firebase/firestore'

let nameValid = surnameValid = emailValid = passwordValid = roleValid = companyValid = true;

function validateName(name){
    nameValid = name.trim() !== "";
}

function validateSurname(surname){
    surnameValid = surname.trim() !== "";
}

function validateEmail(emailAddress){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    emailValid = emailRegex.test(emailAddress);
}

function validatePass(password){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    passwordValid = passwordRegex.test(password);
}

function validateCompany(company){
    companyValid = company.trim() !== "";
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

document.addEventListener("DOMContentLoaded", function() {
    const nameInput = document.getElementById("name");
    const surnameInput = document.getElementById("surname");
    const emailInput = document.getElementById("emailAddress");
    const passwordInput = document.getElementById("password");
    const roleSelect = document.getElementById("roleSelect");
    const roleSelectContainer = roleSelect.closest(".inputContainer");

    nameInput.addEventListener("input", function() {
        validateName(nameInput.value);

        renderWarning(nameInput, "invalidNameWarning", nameValid, "name");
    });

    surnameInput.addEventListener("input", function(){
        validateSurname(surnameInput.value);

        renderWarning(surnameInput, "invalidSurnameWarning", surnameValid, "surname");
    });

    emailInput.addEventListener("input", function(){
        validateEmail(emailInput.value);

        renderWarning(emailInput, "invalidEmailWarning", emailValid, "email address");
    });

    passwordInput.addEventListener("input", function(){
        validatePass(passwordInput.value);

        renderWarning(passwordInput, "invalidPassWarning", passwordValid, "password");
    });

    roleSelect.addEventListener("change", function() {
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

            companyInput.addEventListener("input", function(){
                validateCompany(companyInput.value);
    
                renderWarning(companyInput, "invalidCompanyWarning", companyValid, "company");
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


});