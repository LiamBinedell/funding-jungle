const { loginController, checkIfAccountActivated } = require('../controllers/loginController');
const authorization = require('firebase/auth');
const firestore = require('firebase/firestore');

jest.mock('firebase/auth');
jest.mock('firebase/firestore');

describe('checkIfAccountActivated', () => {
    it('should return false if account is not activated', async () => {
        const email = 'test@example.com';
        const docs = {
            docs: [{ data: () => ({ accountActivated: false }) }],
        };

        firestore.getDocs.mockResolvedValue(docs);
        firestore.query.mockReturnValue('mockedQuery');
        firestore.collection.mockReturnValue('mockedCollection');
        firestore.where.mockReturnValue('mockedWhere');

        const result = await checkIfAccountActivated(email);
        expect(result).toBe(false);
    });

    it('should return true if account is activated or no matching documents', async () => {
        const email = 'test@example.com';
        const docs = {
            docs: [],
        };

        firestore.getDocs.mockResolvedValue(docs);
        firestore.query.mockReturnValue('mockedQuery');
        firestore.collection.mockReturnValue('mockedCollection');
        firestore.where.mockReturnValue('mockedWhere');

        const result = await checkIfAccountActivated(email);
        expect(result).toBe(true);
    });
});