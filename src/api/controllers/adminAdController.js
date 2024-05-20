const { db } = require('../databases/contact-form')
const {ref, get, child} = require('firebase/database');


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