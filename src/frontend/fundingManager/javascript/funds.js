// Funds.js

// Function to update balance in the UI
function updateBalance(balance) {
  const balanceEl = document.getElementById('balance');
  balanceEl.innerText = `Total: $${balance}`;
}

// Function to update transaction history in the UI
function updateHistory(history) {
  const historyEl = document.getElementById('history');
  historyEl.innerHTML = ''; // Clear previous history

  history.forEach(allocation => {
      const li = document.createElement('li');
      li.innerText = `$${allocation.amount} allocated to ${allocation.endpoint} at ${allocation.timestamp}`;
      historyEl.appendChild(li);
  });
}

// Function to fetch and update balance in the UI
function updateUI() {
  // Fetch balance
  fetch('/Finances/balance')
  .then(response => response.json())
  .then(data => {
      updateBalance(data.total);
  })
  .catch(error => console.error('Error fetching balance:', error));

  // Fetch transaction history
  fetch('/Finances/history')
  .then(response => response.json())
  .then(data => {
      updateHistory(data.history);
  })
  .catch(error => console.error('Error fetching history:', error));
}

// Event listeners for buttons
document.getElementById('add-money').addEventListener('click', () => {
  const amount = parseFloat(document.getElementById('amount').value);
  if (!isNaN(amount)) {
      handleTransaction(amount, 'add');
  }
});

document.getElementById('subtract-money').addEventListener('click', () => {
  const amount = parseFloat(document.getElementById('amount').value);
  if (!isNaN(amount)) {
      handleTransaction(amount, 'subtract');
  }
});

document.getElementById('allocate-money').addEventListener('click', () => {
  const amount = parseFloat(document.getElementById('amount').value);
  const allocateTo = document.getElementById('allocate-to').value;
  if (!isNaN(amount) && allocateTo) {
      handleTransaction(amount, 'allocateTo');
  } else {
      alert('Please enter a valid amount and recipient.');
  }
});

document.getElementById('check-balance').addEventListener('click', updateUI);
document.getElementById('view-history').addEventListener('click', updateUI);

// Initial UI update when the page loads
updateUI();
