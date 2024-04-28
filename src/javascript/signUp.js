document.addEventListener("DOMContentLoaded", function() {
    const roleSelect = document.getElementById("roleSelect");
    const roleSelectContainer = roleSelect.closest(".inputContainer");

    roleSelect.addEventListener("change", function() {
        const selectedRole = roleSelect.value;
        
        // Check if the selected role is "fundingManager"
        if (selectedRole === "fundingManager") {
            // Create a company input field
            const companyInput = document.createElement("input");
            companyInput.type = "text";
            companyInput.id = "companyInput";
            companyInput.placeholder = "Enter your company";

            // Create a section for the company input field
            const companyInputContainer = document.createElement("section");
            companyInputContainer.classList.add("inputContainer");
            companyInputContainer.appendChild(companyInput);

            // Insert the company input section after the role select container
            roleSelectContainer.parentNode.insertBefore(companyInputContainer, roleSelectContainer.nextSibling);
        } else {
            // If the selected role is not "fundingManager", remove the company input if it exists
            const companyInput = document.getElementById("companyInput");
            if (companyInput) {
                companyInput.parentElement.remove();
            }
        }
    });
});
