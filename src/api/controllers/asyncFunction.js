// Joel is using this file to test the tests. Don't worry about it.
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
}
;
// Initialize Firebase
const firebaseDB = firebaseApp.initializeApp(firebaseConfig);
const db = firestore.getFirestore(firebaseDB);

async function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data fetched successfully!");
    }, 1000);
  });
}

async function getUnactivatedAccounts() {
	const collectionRef = firestore.collection(db, "users");
	const q = firestore.query(collectionRef, firestore.where("accountActivated", "==", false));

	const docs = await firestore.getDocs(q);
	const unverifiedAccounts = docs.docs.map(doc => ( {
		name: doc.data().name + ' ' + doc.data().surname,
		      email: doc.data().email,
		      company: doc.data().company
	}));
	// unverifiedAccounts = "bruh"
	return unverifiedAccounts;
}

const getUnactivatedController = async (req, res) => {
	const unverifiedAccounts = await getUnactivatedAccounts();
	res.status(200).json(unverifiedAccounts);
};

async function getDocByEmail(email) {
	try {
		const collectionRef = firestore.collection(db, "users");
		const query = firestore.query(collectionRef, firestore.where("email", "==", email));
		const querySnapshot = await firestore.getDocs(query);

		if (!querySnapshot.empty) {
			return querySnapshot.docs[0].id;
		} else {
			console.error('No document found with the provided email.');
			return null;
		}
	}
	catch (error) {
		console.error('Error retrieving document by email:', error);
		return null;
	}
}

const approveUserController = async (req, res) => {
	const {email} = req.body;
	const docID = await getDocByEmail(email);
	await firestore.updateDoc(firestore.doc(db, "users", docID), {
		accountActivated: true
	});
	res.status(200).send(`Approved ${email}`);
};

module.exports = {fetchData, getUnactivatedController, approveUserController};