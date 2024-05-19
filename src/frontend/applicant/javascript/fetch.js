        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
        import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

        const firebaseConfig = {
            apiKey: "AIzaSyAlvmNiLshOuBnhR1k2w0UGbB21bFLfVC8",
            authDomain: "contact-form-6d16d.firebaseapp.com",
            databaseURL: "https://contact-form-6d16d-default-rtdb.firebaseio.com",
            projectId: "contact-form-6d16d",
            storageBucket: "contact-form-6d16d.appspot.com",
            messagingSenderId: "554996497997",
            appId: "1:554996497997:web:78a40239df3b559caae604",
            measurementId: "G-N3J938V17H"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);

        const db = getDatabase();

        // Get references to the containers for each group of adverts
        let educationalAds = document.getElementById('educationalAds');
        let businessAds = document.getElementById('businessAds');
        let eventsAds = document.getElementById('eventsAds');

        let no = 1;

        function Getads() {
            const dbref = ref(db);
            get(child(dbref, 'contactForm')).then((adsSnapshot) => {
                adsSnapshot.forEach(adSnapshot => {
                    AddadsAsListItem(adSnapshot);
                });
            });
        }
        let educationalNo = 1;
        let businessNo = 1;
        let eventsNo = 1;

    function AddadsAsListItem(adSnapshot) {
    let adData = adSnapshot.val();

    let fundManagerEmail = adData.fundManagerEmail;

    let adContainer = document.createElement('div');
    adContainer.classList.add('ad-container');

    let adTitle = document.createElement('h3');
  adTitle.textContent = "Funding Advert ";

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

    let name = document.createElement('p');
    name.textContent = "Name: " + adData.name;

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

    let applyButton = document.createElement('button');
    applyButton.textContent = "Apply";
    applyButton.className = "apply-button";

    // Capture the current value of 'no' in a closure
    (function(adNumber, fundingType, fundManagerEmail) { // Pass fundManagerEmail to the closure
    applyButton.addEventListener('click', () => {
      // Redirect to the appropriate form page based on the funding type
      switch (fundingType) {
        case 'educational':
          window.location.href = "EducationalForm.html?id=" + adNumber + "&fundManagerEmail=" + fundManagerEmail;
          break;
        case 'business':
          window.location.href = "BusinessForm.html?id=" + adNumber + "&fundManagerEmail=" + fundManagerEmail;
          break;
        case 'events':
          window.location.href = "EventsForm.html?id=" + adNumber + "&fundManagerEmail=" + fundManagerEmail;
          break;
        default:
          break;
      }
    });
  })(no, adData.fundingType, fundManagerEmail);

    adContainer.appendChild(adTitle);
    adContainer.appendChild(name);
    adContainer.appendChild(company);
    adContainer.appendChild(msg);
    adContainer.appendChild(email);
    adContainer.appendChild(image); // Append the image element
    adContainer.appendChild(datePosted);
    adContainer.appendChild(adType);
    adContainer.appendChild(applyButton);

    // Append the ad container to the appropriate group based on the funding type
    switch (adData.fundingType) {
        case 'educational':
            educationalAds.appendChild(adContainer);
            break;
        case 'business':
            businessAds.appendChild(adContainer);
            break;
        case 'events':
            eventsAds.appendChild(adContainer);
            break;
        default:
            break;
    }

    no++;
}


        window.addEventListener('load', Getads);