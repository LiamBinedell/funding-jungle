// funds.js

// Function to get the logged-in user's ID from sessionStorage
function getUserId() {
  return sessionStorage.getItem('loggedInFundingManager');
}

// Function to fetch and display balance
function checkBalance() {
  const userId = getUserId();
  if (!userId) {
      alert("Please sign in to view your balance.");
      return;
  }

  fetch(`/api/funds/get-funds?fundManagerEmail=${userId}`)
      .then(response => response.json())
      .then(data => {
          const balanceEl = document.getElementById('balance');
          if (data.length > 0) {
              balanceEl.innerText = `Total: $${data[0].data.balance}`;
          } else {
              balanceEl.innerText = "No balance available";
          }
      })
      .catch(error => console.error('Error:', error));
}

// Function to handle fund transactions
function handleTransaction(amount, endpoint) {
  const userId = getUserId();
  if (!userId) {
      alert("Please sign in to perform transactions.");
      return;
  }

  fetch(`/api/funds/${endpoint}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: amount, fundManagerEmail: userId })
  })
      .then(response => response.json())
      .then(data => {
          alert(data.message);
          checkBalance();
      })
      .catch(error => console.error('Error:', error));
}

// Function to initialize the page
function initializePage() {
  checkBalance();

  // Event listeners for transaction buttons
  document.getElementById('add-money').addEventListener('click', () => {
      const amount = parseFloat(document.getElementById('amount').value);
      if (!isNaN(amount)) {
          handleTransaction(amount, 'add-funds');
      }
  });

  document.getElementById('subtract-money').addEventListener('click', () => {
      const amount = parseFloat(document.getElementById('amount').value);
      if (!isNaN(amount)) {
          handleTransaction(amount, 'subtract-funds');
      }
  });
}

// Initialize page when DOM is ready
document.addEventListener('DOMContentLoaded', initializePage);
