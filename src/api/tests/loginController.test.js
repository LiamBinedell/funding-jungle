const { loginController, logoutController } = require('../controllers/loginController');
const supertest = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { getAuth, signInWithEmailAndPassword, signOut } = require('firebase/auth');
const { getFirestore, collection, query, where, getDocs, doc, getDoc } = require('firebase/firestore');

// Mock Firebase functions
jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn()
}));

jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(),
    collection: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    getDocs: jest.fn(),
    doc: jest.fn(),
    getDoc: jest.fn()
}));

// Setup Express app
const app = express();
app.use(bodyParser.json());
app.post('/login', loginController);
app.post('/logout', logoutController);

describe('Auth Controller Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should login successfully with an activated account', async () => {
        // Mock user credential
        const mockUser = { uid: '12345', email: 'test@example.com' };

        // Mock Firebase auth functions
        signInWithEmailAndPassword.mockResolvedValue({ user: mockUser });

        // Mock Firebase Firestore functions
        getDocs.mockResolvedValue({ docs: [] }); // No documents with accountActivated: false
        getDoc.mockResolvedValue({
            exists: true,
            data: () => ({ role: 'user' })
        });

        // Perform the request
        const res = await supertest(app)
            .post('/login')
            .send({ email: 'test@example.com', pass: 'correctpassword' });

        // Assert the response
        expect(res.status).toBe(200);
        expect(res.text).toBe('user');
    });

    it('should fail login with a pending verification account', async () => {
        // Mock user credential
        const mockUser = { uid: '12345', email: 'test@example.com' };

        // Mock Firebase auth functions
        signInWithEmailAndPassword.mockResolvedValue({ user: mockUser });

        // Mock Firebase Firestore functions
        getDocs.mockResolvedValue({
            docs: [{ data: () => ({ accountActivated: false }) }]
        });

        // Perform the request
        const res = await supertest(app)
            .post('/login')
            .send({ email: 'test@example.com', pass: 'correctpassword' });

        // Assert the response
        expect(res.status).toBe(401);
        expect(res.text).toBe('Account pending verification. Please try again later');
    });

    it('should fail login with incorrect credentials', async () => {
        // Mock Firebase auth functions
        signInWithEmailAndPassword.mockRejectedValue(new Error('Incorrect credentials'));

        // Perform the request
        const res = await supertest(app)
            .post('/login')
            .send({ email: 'test@example.com', pass: 'wrongpassword' });

        // Assert the response
        expect(res.status).toBe(500);
        expect(res.body.message).toBe('Login error');
    });

    it('should logout successfully', async () => {
        // Mock Firebase auth functions
        signOut.mockResolvedValue();

        // Perform the request
        const res = await supertest(app)
            .post('/logout');

        // Assert the response
        expect(res.status).toBe(200);
        expect(res.text).toBe('Logging out...');
    });
});