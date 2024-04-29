const fireBaseAuth = require('firebase/auth');
const fireStore = require('firebase/firestore');
const auth = require('../firebaseConfig');

export default function registerUser(name, surname, email, password, role, company){
    fireBaseAuth.createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;

        const db = fireStore.getFirestore(auth.app);
        const userRef = fireStore.collection(db, "users");

        fireStore.addDoc(userRef, {
            uid: user.uid,
            email: email,
            name: name,
            surname: surname,
            role: role,
        })
        .then(() => {
            console.log("User registered successfully!");
            return "User registered successfully!";
        })
        .catch((error) => {
            console.error("Error registering user:", error);
            return error;
        });
    })
    .catch((error) => {
        console.error(error.code, error.message);
        return error;
    });
}