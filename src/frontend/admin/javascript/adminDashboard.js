function clearDOM() {
    const main = document.getElementById('content');
    while (main.hasChildNodes())
        main.firstChild.remove();
}

function removeListElement(listElement) {
    listElement.remove();
}

async function approveUser(emailAddr, listElement) {
    const postOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailAddr
        })
    };

    const data = await fetch('/api/admin/approve' + token, postOptions);
    const response = await data.text();
    alert(response);
    removeListElement(listElement);
}

async function denyUser(emailAddr, listElement) {
    const postOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailAddr
        })
    };

    try {
        const data = await fetch('/api/admin/deny' + token, postOptions);
        const response = await data.text();
        alert(response);
        removeListElement(listElement);
    } catch (e) {
        alert("ERROR:", e);
    }
}

async function loadUserApplications() {
    clearDOM();
    try {
        const data = await fetch('/api/admin/' + token);
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
            approve.addEventListener('click', () => {
                approveUser(user['email'], listElement);
            });

            const deny = document.createElement('button');
            deny.textContent = "Deny";
            deny.addEventListener('click', () => {
                denyUser(user['email'], listElement);
            });

            buttonContainer.appendChild(approve);
            buttonContainer.appendChild(deny);

            listElement.appendChild(buttonContainer);

            ul.appendChild(listElement);
        });
    } catch (e) {
        alert("ERROR:", e);
    }
}

async function deleteAdvert(key, listElement){
    const postOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            key: key
        })
    };

    try {
        const data = await fetch('/api/fundManager/delete' + token, postOptions);
        const response = await data.text();
        alert(response);
        removeListElement(listElement);
    } catch (e) {
        alert("ERROR:", e);
    }
}

async function loadFundingAdverts() {
    clearDOM();
    try {
        const data = await fetch('/api/applicant/' + token);
        const ads = await data.json();

        console.log(ads);

        const main = document.getElementById('content');

        const ul = document.createElement('ul');
        main.appendChild(ul);

        ads.forEach(adData => {
            const ad = adData.data;
            const adID = adData.id;

            const listElement = document.createElement('li');
            listElement.classList.add('listElement');

            listElement.innerHTML = `
                <section class="elementInfo">
                    <h2>${ad["companyName"]}</h2>
                    <h3>${ad["fundingType"]}</h3>
                    <p>Fund Manager: ${ad["name"]}</p>
                    <p>Email: ${ad["fundManagerEmail"]}</p>
                    <p>Description: ${ad["msgContent"]}</p>
                </section>
            `;

            const buttonContainer = document.createElement('section');
            buttonContainer.classList.add('buttonContainer');

            const deleteAd = document.createElement('button');
            deleteAd.textContent = "Delete Ad";
            deleteAd.addEventListener('click', () => {
                deleteAdvert(adID, listElement);
            });

            buttonContainer.appendChild(deleteAd);

            listElement.appendChild(buttonContainer);

            ul.appendChild(listElement);
        });
    } catch (e) {
        alert("ERROR:", e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const fundingAds = document.getElementById('fundingAds');
    const userApplications = document.getElementById('userApplications');
    const signOut = document.getElementById('signOut');

    fundingAds.addEventListener('click', loadFundingAdverts);

    userApplications.addEventListener('click', loadUserApplications);

    document.getElementById('signOut').addEventListener('click', async () => {
        try {
            const response = await fetch('/api/login/logout');

            const data = await response.text();
            alert(data);
            window.location.href = '../../login/html/login.html';
        } catch (e) {
            console.error("ERROR:", e);
        }
    });
});