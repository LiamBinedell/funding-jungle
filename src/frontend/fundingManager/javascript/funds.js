// function getUserId() {
//     const currentUser = auth.currentUser;
//     if (currentUser) {
//       return currentUser.uid;
//     } else {
//       // No user is signed in
//       alert("No user signed in.");
//       return null;
//     }
//   }
  
//   function checkBalance() {
//     const userId = getUserId();
//     if (!userId) {
//       alert("Please sign in to view your balance.");
//       return;
//     }
  
//     fetch('/api/funds/', {
//       method: 'POST',
//       headers: {
//         'x-user-id': userId
//       }
//     })
//       .then(response => response.json())
//       .then(data => {
//         const balanceEl = document.getElementById('balance');
//         balanceEl.innerText = `Total: $${data.total}`;
//       })
//       .catch(error => console.error('Error:', error));
//   }
  
//   function handleTransaction(amount, endpoint) {
//     const userId = getUserId();
//     if (!userId) {
//       alert("Please sign in to perform transactions.");
//       return;
//     }
  
//     fetch('/api/funds/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'x-user-id': userId
//       },
//       body: JSON.stringify({ amount: amount, [endpoint]: (endpoint === 'allocateTo' ? document.getElementById('allocate-to').value : null) })
//     })
//       .then(response => response.json())
//       .then(data => {
//         alert(data.message);
//         checkBalance();
//       })
//       .catch(error => console.error('Error:', error));
//   }
  
//   document.getElementById('add-money').addEventListener('click', () => {
//     const amount = parseFloat(document.getElementById('amount').value);
//     if (!isNaN(amount)) {
//       handleTransaction(amount, 'add'); // Call with 'add' endpoint
//     }
//   });
  
//   document.getElementById('subtract-money').addEventListener('click', () => {
//     const amount = parseFloat(document.getElementById('amount').value);
//     if (!isNaN(amount)) {
//       handleTransaction(amount, 'subtract'); // Call with 'subtract' endpoint
//     }
//   });
  
//   document.getElementById('allocate-funds').addEventListener('click', () => {
//     const amount = parseFloat(document.getElementById('amount').value);
//     const allocateTo = document.getElementById('allocate-to').value;
//     if (!isNaN(amount) && allocateTo) {
//       handleTransaction(amount, 'allocateTo'); // Call with 'allocateTo' endpoint
//     } else {
//       alert('Please enter a valid amount and recipient.');
//     }
//   });
  
//   document.getElementById('check-balance').addEventListener('click', checkBalance);
  
//   document.getElementById('view-history').addEventListener('click', () => {
//     const userId = getUserId();
//     if (!userId) {
//       alert("Please sign in to view your history.");
//       return;
//     }
  
//     fetch('/api/funds/', {
//       method: 'POST',
//       headers: {
//         'x-user-id': userId
//       }
//     })
//       .then(response => response.json())
//       .then(data => {
//         const historyEl = document.createElement('ul');
//         data.history.forEach(allocation => {
//           const li = document.createElement('li');
//           li.innerText = `$${allocation.amount} allocated to ${allocation.allocateTo} at ${new Date(allocation.timestamp.seconds * 1000).toLocaleString()}`;
//           historyEl.appendChild(li);
//         });
//         const historyContainer = document.getElementById('history');
//         historyContainer.innerHTML = ''; // Clear previous history
//         historyContainer.appendChild(historyEl);
//       })
//       .catch(error => console.error('Error:', error));
//   });
  


// Start.
// const firebase = require('firebase/app');
// const firebaseConfig = {
//     apiKey: "AIzaSyB1bLJJAlJWzwcg4Dvku1KZM3cgR4TbONM",
//     authDomain: "fundingjungle-1f03d.firebaseapp.com",
//     databaseURL: "https://fundingjungle-1f03d-default-rtdb.firebaseio.com",
//     projectId: "fundingjungle-1f03d",
//     storageBucket: "fundingjungle-1f03d.appspot.com",
//     messagingSenderId: "642664605739",
//     appId: "1:642664605739:web:e2d4ae726c712f84c6226e",
//     measurementId: "G-Q92887FDM2"
//   };
  
//   firebase.initializeApp(firebaseConfig);
//   const auth = firebase.auth();
//   const db = firebase.firestore();
  
  function getUserId() {
    // const currentUser = auth.currentUser;
    // if (currentUser) {
    //   return currentUser.uid;
    // } else {
    //   // No user is signed in
    //   alert("No user signed in.");
    //   return null;
    // }
    return sessionStorage.getItem('loggedInFundingManager');
  }
  
  function checkBalance() {
    const userId = getUserId();
    if (!userId) {
      alert("Please sign in to view your balance.");
      return;
    }
  
    collection(db, 'Finances').doc(userId).get()
      .then(doc => {
        if (!doc.exists) {
          alert("Financial data not found.");
          return;
        }
  
        const data = doc.data();
        const balanceEl = document.getElementById('balance');
        balanceEl.innerText = `Total: $${data.balance}`;
      })
      .catch(error => console.error('Error fetching balance:', error));
  }
  
  function handleTransaction(amount, endpoint) {
    const userId = getUserId();
    if (!userId) {
        alert("Please sign in to perform transactions.");
        return;
    }

    // Define the transaction data
    const transactionData = {
        amount: amount,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    // If the endpoint is 'allocateTo', include the recipient in the transaction data
    if (endpoint === 'allocateTo') {
        const recipient = document.getElementById('allocate-to').value;
        if (!recipient) {
            alert("Please specify a recipient.");
            return;
        }
        transactionData.recipient = recipient;
    }

    // Perform the transaction based on the endpoint
    switch (endpoint) {
        case 'add':
            // Add funds to the user's balance
            updateUserBalance(userId, amount);
            break;
        case 'subtract':
            // Subtract funds from the user's balance
            deductUserBalance(userId, amount);
            break;
        case 'allocateTo':
            // Allocate funds to the specified recipient
            allocateFunds(userId, transactionData);
            break;
        default:
            alert("Invalid transaction endpoint.");
            break;
    }
}

// Function to add funds to the user's balance
function updateUserBalance(userId, amount) {
    const userRef = db.collection('Finances').doc(userId);
    db.runTransaction(transaction => {
        return transaction.get(userRef).then(doc => {
            if (!doc.exists) {
                throw new Error("User document does not exist.");
            }
            const currentBalance = doc.data().balance || 0;
            transaction.update(userRef, { balance: currentBalance + amount });
        });
    }).then(() => {
        alert("Funds added successfully.");
        checkBalance();
    }).catch(error => {
        console.error('Error adding funds:', error);
        alert("Failed to add funds.");
    });
}

// Function to subtract funds from the user's balance
function deductUserBalance(userId, amount) {
    const userRef = db.collection('Finances').doc(userId);
    db.runTransaction(transaction => {
        return transaction.get(userRef).then(doc => {
            if (!doc.exists) {
                throw new Error("User document does not exist.");
            }
            const currentBalance = doc.data().balance || 0;
            if (currentBalance < amount) {
                throw new Error("Insufficient funds.");
            }
            transaction.update(userRef, { balance: currentBalance - amount });
        });
    }).then(() => {
        alert("Funds deducted successfully.");
        checkBalance();
    }).catch(error => {
        console.error('Error deducting funds:', error);
        alert("Failed to deduct funds.");
    });
}

// Function to allocate funds to a specific recipient
function allocateFunds(userId, transactionData) {
    db.collection('Finances').doc(userId).collection('transactions').add(transactionData)
        .then(() => {
            alert("Funds allocated successfully.");
            checkBalance();
        })
        .catch(error => {
            console.error('Error allocating funds:', error);
            alert("Failed to allocate funds.");
        });
}

  
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
  
  document.getElementById('check-balance').addEventListener('click', checkBalance);
  
  document.getElementById('view-history').addEventListener('click', () => {
    const userId = getUserId();
    if (!userId) {
      alert("Please sign in to view your history.");
      return;
    }
  
    collection(db, 'Finances').doc(userId).get()
      .then(snapshot => {
        const historyEl = document.getElementById('history');
        historyEl.innerHTML = ''; // Clear previous history
  
        snapshot.forEach(doc => {
          const allocation = doc.data();
          const li = document.createElement('li');
          li.innerText = `$${allocation.amount} allocated to ${allocation.endpoint} at ${allocation.timestamp}`;
          historyEl.appendChild(li);
        });
      })
      .catch(error => console.error('Error fetching history:', error));
  });
  