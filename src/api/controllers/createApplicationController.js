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

const createBusinessApplicationController = async (req, res) => {
    const {
        applicationId,
        firstName,
        lastName,
        idNumber,
        businessName,
        registrationNumber,
        businessAddress,
        businessType,
        email,
        fundManagerEmail,
        applicantEmail,
        phone,
        reason,
        community,
        idDocument,
        businessPlan
    } = req.body;

    try {
        await firestore.setDoc(firestore.doc(firestore.collection(db, 'businessApplications')), {
            applicationId: applicationId,
            firstName: firstName,
            lastName: lastName,
            idNumber: idNumber,
            businessName: businessName,
            registrationNumber: registrationNumber,
            businessAddress: businessAddress,
            businessType: businessType,
            email: email,
            fundManagerEmail: fundManagerEmail,
            applicantEmail: applicantEmail,
            phone: phone,
            reason: reason,
            community: community,
            idDocument: idDocument,
            businessPlan: businessPlan
        });

        res.status(200).send('Application sent');
    } catch (e) {
        console.error("ERROR:", e);
        res.status(500).send('Error creating application');
    }
};

const createEducationApplicationController = async (req, res) => {
    const {
        applicationId,
        firstName,
        lastName,
        idNumber,
        dob,
        gender,
        email,
        fundManagerEmail,
        applicantEmail,
        phone,
        address1,
        institution,
        course,
        year,
        grades,
        reason,
        community,
        idDocument,
        parentId,
        incomeProof,
        results
    } = req.body;

    try {
        await firestore.setDoc(firestore.doc(firestore.collection(db, 'educationApplications')), {
            applicationId: applicationId,
            firstName: firstName,
            lastName: lastName,
            idNumber: idNumber,
            dob: dob,
            gender: gender,
            email: email,
            fundManagerEmail: fundManagerEmail,
            applicantEmail: applicantEmail,
            phone: phone,
            address1: address1,
            institution: institution,
            course: course,
            year: year,
            grades: grades,
            reason: reason,
            community: community,
            idDocument: idDocument,
            parentId: parentId,
            incomeProof: incomeProof,
            results: results
        });

        res.status(200).send('Application sent');
    } catch (e) {
        console.error("ERROR:", e);
        res.status(500).send('Error creating application');
    }
};

const createEventApplicationController = async (req, res) => {
    const {
        applicationId,
        firstName,
        lastName,
        idNumber,
        dob,
        gender,
        email,
        fundManagerEmail,
        applicantEmail,
        phone,
        address1,
        location,
        attendance,
        budget,
        description,
        reason,
        idDocument,
        poster
    } = req.body;

    try {
        await firestore.setDoc(firestore.doc(firestore.collection(db, 'eventApplications')), {
            applicationId: applicationId,
            firstName: firstName,
            lastName: lastName,
            idNumber: idNumber,
            dob: dob,
            gender: gender,
            email: email,
            fundManagerEmail: fundManagerEmail,
            applicantEmail: applicantEmail,
            phone: phone,
            address1: address1,
            location: location,
            attendance: attendance,
            budget: budget,
            description: description,
            reason: reason,
            idDocument: idDocument,
            poster: poster,
        });

        res.status(200).send('Applicant sent');
    } catch (e) {
        console.error("ERROR:", e);
        res.status(500).send('Error creating application');
    }
};

const updateStatusController = async (req, res) => {
    const { key, status, type } = req.body;

    try {
        await firestore.setDoc(firestore.doc(db, type + 'Applications', key), {
            status: status
        }, { merge: true });

        res.status(200).send('Status updated');
    } catch (e) {
        console.error("ERROR:", e);
        res.status(500).send('Error updating status');
    }
};

const createReviewController = async (req, res) => {
    const {
        name, company, email, message, applicantEmail, date
    } = req.body;

    const newReview = {
        name: name,
        company: company,
        email: email,
        message: message,
        applicantEmail: applicantEmail,
        date: date
    }

    try {
        await firestore.setDoc(firestore.doc(firestore.collection(db, 'reviews')), newReview);
        console.log('Review set');
        res.status(200).send('Review posted');
    } catch (e) {
        console.error("ERROR:", e);
        res.status(500).send('Error posting review');
    }
};

module.exports = {
    createBusinessApplicationController,
    createEducationApplicationController,
    createEventApplicationController,
    updateStatusController,
    createReviewController
};