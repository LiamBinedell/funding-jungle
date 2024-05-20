// const authorization = require('firebase/auth');
// const firebase = require('firebase/app');
// const firestore = require('firebase/firestore');

// const firebaseConfig = {
//   apiKey: "AIzaSyB1bLJJAlJWzwcg4Dvku1KZM3cgR4TbONM",
//   authDomain: "fundingjungle-1f03d.firebaseapp.com",
//   databaseURL: "https://fundingjungle-1f03d-default-rtdb.firebaseio.com",
//   projectId: "fundingjungle-1f03d",
//   storageBucket: "fundingjungle-1f03d.appspot.com",
//   messagingSenderId: "642664605739",
//   appId: "1:642664605739:web:e2d4ae726c712f84c6226e",
//   measurementId: "G-Q92887FDM2"
// };

// // Initialize Firebase
// const firebaseDB = firebase.initializeApp(firebaseConfig);
// const db = firestore.getFirestore(firebaseDB);
// const auth = authorization.getAuth();


// const express = require('express');
// const router = express.Router();

// const usersCollection = firestore.collection(db, 'users');
// const financesCollection = firestore.collection(db, 'Finances');

// const app = express();
// const port = process.env.PORT || 3000; // Set port

// // Middleware to parse incoming JSON data
// app.use(express.json());

// // Route for POST requests (replace with actual endpoint URL)
// app.post('/', async (req, res) => {
//   const userId = req.headers['x-user-id'];
//   const action = req.body.action;

//   if (!userId) {
//     return res.status(400).send({ message: 'Missing user ID' });
//   }

//   if (action === 'getBalance') {
//     const userDoc = await usersCollection.doc(userId).get();
//     if (!userDoc.exists) {
//       return res.status(404).send({ message: 'User not found' });
//     }

//     const financesDoc = await financesCollection.doc(userId).get();
//     if (!financesDoc.exists) {
//       return res.status(404).send({ message: 'Financial data not found' });
//     }

//     const data = financesDoc.data();
//     return res.json({ total: data.balance }); // Assuming 'balance' field in financesDoc
//   } else if (action === 'getHistory') {
//     const financesDoc = await financesCollection.doc(userId).get();
//     if (!financesDoc.exists) {
//       return res.status(404).send({ message: 'Financial data not found' });
//     }

//     const data = financesDoc.data();
//     return res.json({ history: data.history || [] }); // Assuming 'history' field in financesDoc
//   } else if (action === 'add' || action === 'subtract' || action === 'allocateTo') {
//     // Implement logic for adding/subtracting/allocating funds (refer to security notes)
//     // Update user's balance and/or history in Finances collection
//     return res.json({ message: 'Transaction successful (placeholder)' }); // Replace with actual message
//   } else {
//     return res.status(400).send({ message: 'Invalid action' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });


// module.exports = router;

// Start.

const express = require('express');
const { getAuth } = require('firebase/auth');
const { getFirestore, collection, doc, getDoc } = require('firebase/firestore');
const firebase = require('firebase/app');

const router = express.Router();

const firebaseConfig = {
    apiKey: "AIzaSyB1bLJJAlJWzwcg4Dvku1KZM3cgR4TbONM",
    authDomain: "fundingjungle-1f03d.firebaseapp.com",
    databaseURL: "https://fundingjungle-1f03d-default-rtdb.firebaseio.com",
    projectId: "fundingjungle-1f03d",
    storageBucket: "fundingjungle-1f03d.appspot.com",
    messagingSenderId: "642664605739",
    appId: "1:642664605739:web:e2d4ae726c712f84c6226e",
    measurementId: "G-Q92887FDM2"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

router.post('/', async (req, res) => {
  const userId = req.headers['x-user-id'];
  const action = req.body.action;

  if (!userId) {
    return res.status(400).json({ message: 'Missing user ID' });
  }

  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (!userDoc.exists()) {
      return res.status(404).json({ message: 'User not found' });
    }

    const financesDoc = await getDoc(doc(db, 'Finances', userId));
    if (!financesDoc.exists()) {
      return res.status(404).json({ message: 'Financial data not found' });
    }

    const data = financesDoc.data();
    if (action === 'getBalance') {
      return res.json({ total: data.balance });
    } else if (action === 'getHistory') {
      return res.json({ history: data.history || [] });
    } else if (action === 'add' || action === 'subtract' || action === 'allocateTo') {
      // Implement your logic for transactions here
      return res.json({ message: 'Transaction successful (placeholder)' });
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/allocate', async (req, res) => {
    
});

module.exports = router;
