const authorization = require('firebase/auth');
const firebaseApp = require('firebase/app');
const firestore = require('firebase/firestore');

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

// Initialize Firebase
const firebaseDB = firebaseApp.initializeApp(firebaseConfig);
const db = firestore.getFirestore(firebaseDB);
const auth = authorization.getAuth();

const addFundsController = async (req, res) => {
    const { amount } = req.body;
  
    if (!amount) {
      return res.status(400).send('Amount is required to add funds');
    }
  
    const currentDate = new Date();
  
    const newFunds = {
      amount: amount,
      date: currentDate // Store current date
    };
  
    try {
      // Add funds to the Finances collection
      await db.collection('Finances').add(newFunds);
      res.status(200).send('Funds added successfully');
    } catch (error) {
      console.error("Error adding funds:", error);
      res.status(500).send("Error adding funds");
    }
  };
  

const subtractFundsController = async (req, res) => {
  const { id } = req.params; // Assuming id is the document ID to be deleted

  try {
    // Delete the document with the given ID from the Finances collection
    await db.collection('Finances').doc(id).delete();
    res.status(200).send("Funds subtracted successfully");
  } catch (error) {
    console.error("Error subtracting funds:", error);
    res.status(500).send("Error subtracting funds");
  }
};

const getFundsController = async (req, res) => {
  const { fundManagerEmail } = req.query;

  try {
    // Query Finances collection to get funds for the specified fund manager email
    const querySnapshot = await db.collection('Finances').where('fundManagerEmail', '==', fundManagerEmail).get();
    
    const funds = [];
    querySnapshot.forEach(doc => {
      funds.push({
        id: doc.id,
        data: doc.data()
      });
    });

    res.status(200).json(funds);
  } catch (error) {
    console.error("Error fetching funds:", error);
    res.status(500).send("Error fetching funds");
  }
};

module.exports = { addFundsController, subtractFundsController, getFundsController };
