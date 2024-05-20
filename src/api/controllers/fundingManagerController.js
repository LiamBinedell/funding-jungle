const {db, storage} = require('../databases/contact-form');
const {ref, set, push, remove} = require('firebase/database');
const fbStorage = require('firebase/storage');

async function uploadImage(Inpimg){
    const imageRef = fbStorage.ref(storage, 'images/' + Inpimg.name);

    try {
        const snapshot = await fbStorage.uploadBytes(imageRef, Inpimg);
        return true;
    } catch (e) {
        console.error("ERROR:", e);
        return false;
    }
}

const getAdsController = async (req, res) => {
    const {email} = req.body;

    const dbref = ref(db);

    try {
        const adsSnapshot = await get(child(dbref, 'contact-form'));

        const ads = [];
        adsSnapshot.forEach(adSnap => {
            const ad = adSnap.val();
            if (ad['fundManagerEmail'] === email){
                ads.push(ad);
            }
        });

        res.status(200).json(ads);
    } catch (e) {
        console.error("ERROR", e);
        res.status(500).send(e);
    }
};

const createAdController = async (req,res) => {
    const dbref = ref(db);
    const newAdRef = push(dbref);

    const {companyName, fundManagerEmail, emailid, msgContent, Inpimg, name, fundingType, currentDate} = req.body;

    const newAd = {
        name: name,
        companyName: companyName,
        emailid: emailid,
        fundManagerEmail : fundManagerEmail,
        msgContent: msgContent,
        image: Inpimg.name,
        fundingType: fundingType, // Store funding type
        date: currentDate // Store current date
    }

    try {
        await set(newAdRef, newAd);
        //await uploadImage(Inpimg);

        res.status(200).send('Ad created successfully');
    } catch (e) {
        console.error("ERROR:", e);
        res.status(500).send("Error creating advert");
    }
};

const deleteAdController = async (req, res) => {
    const { key } = req.body;
    const adRef = ref(db, 'contactForm/' + key);

    try {
        await remove(adRef);
        res.status(200).send(true);
    } catch (e) {
        console.error("ERROR:", e);
        res.status(500).send("Error deleting ad");
    }
};

module.exports = {createAdController, deleteAdController, getAdsController};