function clearDOM(){
    const main = document.getElementById('content');
    while (main.hasChildNodes())
        main.firstChild.remove();
}

async function loadUserApplications(){
    clearDOM();
    const data = await fetch('/api/admin/');
    const response = await data.json();

    console.log(response);

    const main = document.getElementById('content');

    const ul = document.createElement('ul');
    main.appendChild(ul);

    response.forEach(user => {
        const listElement = document.createElement('li');
        listElement.classList.add('listElement');

        listElement.innerHTML = `
            <section class="elementInfo">
                <p>Name: ${user["name"]}</p>
                <p>Email: ${user["email"]}</p>
                <p>Company: ${user["company"]}</p>
            </section>
        `;

        const buttonContainer = document.createElement('section');
        buttonContainer.classList.add('buttonContainer');

        const approve = document.createElement('button');
        approve.textContent = "Approve";

        const deny = document.createElement('button');
        deny.textContent = "Deny";

        buttonContainer.appendChild(approve);
        buttonContainer.appendChild(deny);

        listElement.appendChild(buttonContainer);

        ul.appendChild(listElement);
    });
}

async function loadFundingAdverts(){

}

document.addEventListener('DOMContentLoaded', () => {
    const userApplications = document.getElementById('userApplications');

    userApplications.addEventListener('click', loadUserApplications);
});