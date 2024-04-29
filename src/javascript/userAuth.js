import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

export default function registerUser(name, surname, email, password, role, company){
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;

        const db = getFirestore(auth.app);
        const userRef = collection(db, "users");

        addDoc(userRef, {
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