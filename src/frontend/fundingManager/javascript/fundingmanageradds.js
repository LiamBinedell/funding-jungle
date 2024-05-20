let educationalAds = document.getElementById('educationalAds');
let businessAds = document.getElementById('businessAds');
let eventsAds = document.getElementById('eventsAds');
let educationalNo = 1;
let businessNo = 1;
let eventsNo = 1;

async function Getads() {
    const loggedInEmail = sessionStorage.getItem('loggedInFundingManager');
    if (loggedInEmail) {
        const postOptions = {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: loggedInEmail
            })
        }
        
        try {
            const data = await fetch('/api/fundManager/ads', postOptions);
            const response = await data.json();
            response.forEach(ad => {
                AddadsAsListItem(ad);
            })
        } catch (e) {
            console.error("ERROR:", e)
        }
    } else {
        console.log("No user logged in");
    }
}

function AddadsAsListItem(adSnapshot) {
    let adData = adSnapshot.val();

    let adContainer = document.createElement('div');
    adContainer.classList.add('ad-container');

    let adTitle = document.createElement('h3');
    adTitle.textContent = "Funding Advert ";

    let name = document.createElement('p');
    name.textContent = "Names: " + adData.name;

    let company = document.createElement('p');
    company.textContent = "Company Name: " + adData.companyName;

    let msg = document.createElement('p');
    msg.textContent = "Description: " + adData.msgContent;

    let email = document.createElement('p');
    email.textContent = "Company Email: " + adData.emailid;

    // Create an image element
    let image = document.createElement('img');
    image.src = adData.image; // Set the src attribute to the image URL
    image.alt = "Advert Image"; // Optional: Set alt attribute for accessibility

    let datePosted = document.createElement('p');
    datePosted.textContent = "Date Posted: " + adData.date;

    let adType = document.createElement('p');
    adType.textContent = "Funding Type: " + adData.fundingType;

    let editButton = document.createElement('button');
    editButton.textContent = "Edit";

    let deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";

    // Add event listener to the delete button
    deleteButton.addEventListener('click', () => {
        // Remove ad container from the DOM
        adContainer.remove();
        // Remove ad data from Firebase database
        removeAdFromDatabase(adSnapshot.key);
    });

    // Add event listener to the edit button
    editButton.addEventListener('click', () => {
        // Redirect to Update.html page
        window.location.href = "UpdateAdds.html?id=" + adSnapshot.key;
    });

    adContainer.appendChild(adTitle);
    adContainer.appendChild(name);
    adContainer.appendChild(company);
    adContainer.appendChild(msg);
    adContainer.appendChild(email);
    adContainer.appendChild(image); // Append the image element
    adContainer.appendChild(datePosted);
    adContainer.appendChild(adType);
    adContainer.appendChild(editButton);
    adContainer.appendChild(deleteButton);

    // Append the advert to the respective container based on its funding type
    switch (adData.fundingType) {
        case 'educational':
            adTitle.textContent += educationalNo;
            educationalAds.appendChild(adContainer);
            educationalNo++;
            break;
        case 'business':
            adTitle.textContent += businessNo;
            businessAds.appendChild(adContainer);
            businessNo++;
            break;
        case 'events':
            adTitle.textContent += eventsNo;
            eventsAds.appendChild(adContainer);
            eventsNo++;
            break;
        default:
            break;
    }
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

window.addEventListener('load', Getads);
