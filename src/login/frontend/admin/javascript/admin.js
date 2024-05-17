document.addEventListener("DOMContentLoaded", () => {
    fetch('/api/admin/')
    .then(data => data.json())
    .then(response => {
        console.log(response);
        const managerList = document.getElementById('managerList');
        response.forEach((user) => {
            const listElement = document.createElement('li');
            listElement.classList.add("listElement");
            
            const elementInfo = document.createElement('section');
            elementInfo.classList.add("elementInfo");

            for (let [key, value] of Object.entries(user)){
                console.log(`${key}: ${value}`);
                const p = document.createElement('p');
                p.textContent = value;
                elementInfo.appendChild(p);
            }

            listElement.appendChild(elementInfo);

            const approveButton = document.createElement('button');
            approveButton.type = "button";
            approveButton.textContent = "Approve";

            const denyButton = document.createElement('button');
            denyButton.type = "button";
            denyButton.textContent = "Deny";

            listElement.appendChild(approveButton);
            listElement.appendChild(denyButton);

            managerList.appendChild(listElement);

            approveButton.addEventListener("click", () => {
                const postOptions = {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      email: user["email"]
                    })
                };

                console.log(`Clicked approve ${user["email"]}`);

                fetch('/api/admin/approve', postOptions)
                .then(data => data.text())
                .then(response => {
                    alert(response);
                    listElement.remove();
                })
                .catch(error => console.error("ERROR:", error));
            });

            denyButton.addEventListener("click", () => {
                const postOptions = {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      email: user["email"]
                    })
                };

                console.log(`Clicked deny ${user["email"]}`);

                fetch('/api/admin/deny', postOptions)
                .then(data => data.text())
                .then(response => {
                    alert(response);
                    listElement.remove();
                })
                .catch(error => console.error("ERROR:", error));
            });
        })
    })
    .catch(error => console.error("ERROR:", error));  
    const buttons = document.querySelectorAll(".removeButton");

    buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            const listItem = this.closest(".listElement");
            if (listItem){
                listItem.remove();
            }
        });
    });
});