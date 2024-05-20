let educationalAds = document.getElementById('educationalAds');
let businessAds = document.getElementById('businessAds');
let eventsAds = document.getElementById('eventsAds');

let no = 1;

async function Getads() {
  try {
    const data = await fetch('/api/applicant/');
    const response = await data.json();
    console.log(response);
    response.forEach(ad => {
      AddadsAsListItem(ad);
    });
  } catch (e) {
    console.error("ERROR:", e)
  }

}

let educationalNo = 1;
let businessNo = 1;
let eventsNo = 1;

function AddadsAsListItem(adData) {
  const ad = adData.data;
  const adId = adData.id; // Get the document ID

  let fundManagerEmail = ad.fundManagerEmail;

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
  name.textContent = "Name: " + ad.name;

  let company = document.createElement('p');
  company.textContent = "Company Name: " + ad.companyName;

  let msg = document.createElement('p');
  msg.textContent = "Description: " + ad.msgContent;

  let email = document.createElement('p');
  email.textContent = "Company Email: " + ad.emailid;

  let datePosted = document.createElement('p');
  datePosted.textContent = "Date Posted: " + ad.date;

  let adType = document.createElement('p');
  adType.textContent = "Funding Type: " + ad.fundingType;

  let applyButton = document.createElement('button');
  applyButton.textContent = "Apply";
  applyButton.className = "apply-button";

  // Capture the current value of 'no' in a closure
  (function (adNumber, fundingType, fundManagerEmail) { // Pass fundManagerEmail to the closure
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
  })(no, ad.fundingType, fundManagerEmail);

  adContainer.appendChild(adTitle);
  adContainer.appendChild(name);
  adContainer.appendChild(company);
  adContainer.appendChild(msg);
  adContainer.appendChild(email);
  adContainer.appendChild(datePosted);
  adContainer.appendChild(adType);
  adContainer.appendChild(applyButton);

  // Append the ad container to the appropriate group based on the funding type
  switch (ad.fundingType) {
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