const {initializeApp} = require('firebase/app');
//const {getDatabase, ref, get, child} = require('firebase/database');

const firebaseConfig = {
    apiKey: "AIzaSyAlvmNiLshOuBnhR1k2w0UGbB21bFLfVC8",
    authDomain: "contact-form-6d16d.firebaseapp.com",
    databaseURL: "https://contact-form-6d16d-default-rtdb.firebaseio.com",
    projectId: "contact-form-6d16d",
    storageBucket: "contact-form-6d16d.appspot.com",
    messagingSenderId: "554996497997",
    appId: "1:554996497997:web:78a40239df3b559caae604",
    measurementId: "G-N3J938V17H"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase();

const getAdsController = async (req, res) => {
    const dbref = ref(db);

    try {
        const adsSnapshot = await get(child(dbref, 'contact-form'));

        const ads = [];
        adsSnapshot.forEach(adSnap => {
            const ad = adSnap.val();
            ads.push({
                company: ad['companyName'],
                date: ad['date'],
                type: ad['fundingType'],
                name: ad['name'],
                about: ad['msgContent']
            });
        });

        res.status(200).json(ads);
    } catch (e) {
        console.error("ERROR", e);
        res.status(500).send(e);
    }
};

module.exports = {getAdsController};