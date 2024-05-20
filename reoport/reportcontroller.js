const { db } = require('../databases/businessform')
const {ref, get, child} = require('firebase/database');


const getAdsController = async (req, res) => {
    const dbref = ref(db);

    try {
        const adsSnapshot = await get(child(dbref, 'businessform'));

        const ads = [];
        adsSnapshot.forEach(adSnap => {
            const ad = adSnap.val();
            ads.push({
              
                firstName: ad['firstName'],
                reason: ad['reason'],
                email: ad['email'],
                
            });
        });

        res.status(200).json(ads);
    } catch (e) {
        console.error("ERROR", e);
        res.status(500).send(e);
    }
};

module.exports = {reportController};