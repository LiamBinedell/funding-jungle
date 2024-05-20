const {db, storage} = require('../databases/contact-form');
const {ref, set, push} = require('firebase/database');
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

module.exports = {createAdController};