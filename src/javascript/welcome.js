import { auth } from '../firebaseConfig';

function getLoggedIn(){
    return auth.currentUser !== null;
}

addEventListener("DOMContentLoaded", (e) => {
    if (!getLoggedIn()){
        //create nav element
        const nav = document.createElement('nav');
        
        //create nav buttons
        const signUp = document.createElement('a');
        signUp.href = "../components/signUp.html";
        const login = document.createElement('a');
        login.href = "../components/login.html";

        //append nav buttons
        nav.appendChild(signUp);
        nav.appendChild(login);

        document.getElementById("welcomeHeader").appendChild(nav);
    } else {
        
    }
});

