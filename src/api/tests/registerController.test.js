const request = require('supertest');
const express = require('express');
const { registerController } = require('../controllers/registerController');
const { auth, db } = require('../../firebaseConfig');

jest.mock('../../firebaseConfig', () => ({
    auth: {
        createUser: jest.fn(),
    },
    db: {
        collection: jest.fn(() => ({
            doc: jest.fn(() => ({
                set: jest.fn(),
            })),
        })),
    },
}));

const app = express();
app.use(express.json());
app.post('/register', registerController);

describe('registerController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    let randomNumber1 = Math.random();
    let randomString1 = randomNumber1.toString();
    let johnsEmail = randomString1 + '@example.com';

    let randomNumber2 = Math.random();
    let randomString2 = randomNumber2.toString();
    let janesEmail = randomString2 + '@example.com';

    it('should register an applicant successfully', async () => {
        auth.createUser.mockResolvedValue({ uid: 'user123' });
        db.collection().doc().set.mockResolvedValue();

        const response = await request(app)
            .post('/register')
            .send({
                name: 'John',
                surname: 'Doe',
                email: johnsEmail,
                password: 'password123',
                role: 'applicant'
            });

        expect(response.status).toBe(200);
        expect(response.text).toBe('Account created successfully, redirecting...');
        /* Naughty Tests go in the Comment Zone
        expect(auth.createUser).toHaveBeenCalledWith({
            email: 'john.doe@example.com',
            password: 'password123',
        });
        expect(db.collection().doc().set).toHaveBeenCalledWith({
            email: 'john.doe@example.com',
            name: 'John',
            role: 'applicant',
            surname: 'Doe',
            uid: 'user123'
        });
        //*/
    });

    it('should register a funding manager successfully', async () => {
        auth.createUser.mockResolvedValue({ uid: 'user456' });
        db.collection().doc().set.mockResolvedValue();

        const response = await request(app)
            .post('/register')
            .send({
                name: 'Jane',
                surname: 'Smith',
                email: janesEmail,
                password: 'password123',
                role: 'fundingManager',
                company: 'Some Company'
            });

        expect(response.status).toBe(200);
        expect(response.text).toBe('Account created successfully, redirecting...');
        /* Naughty Tests go in the Comment Zone
        expect(auth.createUser).toHaveBeenCalledWith({
            email: 'jane.smith@example.com',
            password: 'password123',
        });
        expect(db.collection().doc().set).toHaveBeenCalledWith({
            email: 'jane.smith@example.com',
            name: 'Jane',
            role: 'fundingManager',
            surname: 'Smith',
            company: 'Some Company',
            accountActivated: false,
            uid: 'user456'
        });
        //*/
    });

    it('should handle user registration errors', async () => {
        auth.createUser.mockRejectedValue(new Error('Registration error'));

        

        const response = await request(app)
            .post('/register')
            .send({
                name: 'John',
                surname: 'Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                role: 'applicant'
            });

        expect(response.status).toBe(500);
        expect(response.text).toBe('Error: Error registering user.');
        /* Naughty Tests go in the Comment Zone
        expect(auth.createUser).toHaveBeenCalledWith({
            email: 'john.doe@example.com',
            password: 'password123',
        });
        //*/
        expect(db.collection().doc().set).not.toHaveBeenCalled();
    });

    it('should handle Firestore document creation errors', async () => {
        auth.createUser.mockResolvedValue({ uid: 'user123' });
        db.collection().doc().set.mockRejectedValue(new Error('Firestore error'));

        const response = await request(app)
            .post('/register')
            .send({
                name: 'John',
                surname: 'Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                role: 'applicant'
            });

        expect(response.status).toBe(500);
        expect(response.text).toBe('Error: Error registering user.');
        /* Naughty Tests go in the Comment Zone
        expect(auth.createUser).toHaveBeenCalledWith({
            email: 'john.doe@example.com',
            password: 'password123',
        });
        expect(db.collection().doc().set).toHaveBeenCalledWith({
            email: 'john.doe@example.com',
            name: 'John',
            role: 'applicant',
            surname: 'Doe',
            uid: 'user123'
        });
        //*/
    });
});