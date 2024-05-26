const { loginController, checkIfAccountActivated, logoutController } = require('../controllers/loginController');
const supertest = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const firebase = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, signOut } = require('firebase/auth');
const { getFirestore, collection, query, where, getDocs, doc, getDoc } = require('firebase/firestore');

jest.mock('firebase/auth', () => {
    const originalModule = jest.requireActual('firebase/auth');
    return {
        ...originalModule,
        getAuth: jest.fn(),
        signInWithEmailAndPassword: jest.fn(),
        signOut: jest.fn()
    };
});

jest.mock('firebase/firestore', () => {
    const originalModule = jest.requireActual('firebase/firestore');
    return {
        ...originalModule,
        getFirestore: jest.fn(),
        collection: jest.fn(),
        query: jest.fn(),
        where: jest.fn(),
        getDocs: jest.fn(),
        doc: jest.fn(),
        getDoc: jest.fn()
    };
});

const app = express();
app.use(bodyParser.json());
app.post('/login', loginController);
app.post('/logout', logoutController);

describe('Auth Controller Tests', () => {
    let mockAuth;
    let mockFirestore;

    beforeEach(() => {
        mockAuth = getAuth();
        mockFirestore = getFirestore();
    });

    it('should login successfully with an activated account', async () => {
        signInWithEmailAndPassword.mockResolvedValue({
            user: { uid: '12345', email: 'test@example.com' }
        });

        getDocs.mockResolvedValue({
            docs: []
        });

        getDoc.mockResolvedValue({
            exists: true,
            data: () => ({ role: 'user' })
        });

        const res = await supertest(app)
            .post('/login')
            .send({ email: 'test@example.com', pass: 'correctpassword' });

        expect(res.status).toBe(200);
        expect(res.text).toBe('user');
    });

    it('should fail login with a pending verification account', async () => {
        signInWithEmailAndPassword.mockResolvedValue({
            user: { uid: '12345', email: 'test@example.com' }
        });

        getDocs.mockResolvedValue({
            docs: [
                { data: () => ({ accountActivated: false }) }
            ]
        });

        const res = await supertest(app)
            .post('/login')
            .send({ email: 'test@example.com', pass: 'correctpassword' });

        expect(res.status).toBe(401);
        expect(res.text).toBe('Account pending verification. Please try again later');
    });

    it('should fail login with incorrect credentials', async () => {
        signInWithEmailAndPassword.mockRejectedValue(new Error('Incorrect credentials'));

        const res = await supertest(app)
            .post('/login')
            .send({ email: 'test@example.com', pass: 'wrongpassword' });

        expect(res.status).toBe(500);
        expect(res.body.message).toBe('Login error');
    });

    it('should logout successfully', async () => {
        signOut.mockResolvedValue();

        const res = await supertest(app)
            .post('/logout');

        expect(res.status).toBe(200);
        expect(res.text).toBe('Logging out...');
    });
});