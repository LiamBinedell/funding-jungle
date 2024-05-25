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
const auth = authorization.getAuth(firebaseDB);

const registerController = async (req, res) => {
    const { name, surname, email, password, role, company } = req.body;

    try {
        const userCredential = await authorization.createUserWithEmailAndPassword(auth, email, password);

        const user = userCredential.user;

        if (role == "applicant") {
            await firestore.setDoc(firestore.doc(db, "users", user.uid), {
                email: email,
                name: name,
                role: role,
                surname: surname,
                uid: user.uid
            });
        } else if (role == "fundingManager"){
            await firestore.setDoc(firestore.doc(db, "users", user.uid), {
                email: email,
                name: name,
                role: role,
                surname: surname,
                company: company,
                accountActivated: false,
                uid: user.uid
            });           
        }
        console.log("User registered:", user.uid, name, surname, role);

        res.status(200).send("Account created successfully. Redirecting...");
    } catch (e) {
        console.error("ERROR:", e);
        res.status(500).send("Error registering user");
    }
}

module.exports = { registerController };