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

describe('loginController', () => {
    let req, res;

    beforeEach(() => {
        req = { body: { email: 'test@example.com', pass: 'password' } };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn(), send: jest.fn() };
    });

    it('should login user and return role if account is activated', async () => {
        const userCredential = {
            user: { uid: 'testUid' },
        };
        const docSnapshot = {
            exists: jest.fn().mockReturnValue(true),
            data: jest.fn().mockReturnValue({ role: 'fundingManager' }),
        };

        authorization.signInWithEmailAndPassword.mockResolvedValue(userCredential);
        firestore.getDoc.mockResolvedValue(docSnapshot);
        firestore.doc.mockReturnValue('mockedDoc');
        
        const checkIfAccountActivatedSpy = jest.spyOn(require('../controllers/loginController'), 'checkIfAccountActivated').mockResolvedValue(true);

        await loginController(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ uid: 'testUid', message: 'fundingManager' });

        checkIfAccountActivatedSpy.mockRestore();
    });

    //* Naughty tests go in the comment zone
    it('should sign out user and return 401 if account is not activated', async () => {
        const userCredential = {
            user: { uid: 'testUid' },
        };

        authorization.signInWithEmailAndPassword.mockResolvedValue(userCredential);
        authorization.signOut.mockResolvedValue(); // Ensure signOut is mocked

        const checkIfAccountActivatedSpy = jest.spyOn(require('../controllers/loginController'), 'checkIfAccountActivated').mockResolvedValue(false);

        // Add debugging statements inside loginController
        const originalLoginController = require('../controllers/loginController').loginController;
        const loginControllerWithDebug = async (req, res) => {
            try {
                console.log('Starting loginController');
                await originalLoginController(req, res);
                console.log('Finished loginController');
            } catch (error) {
                console.error('loginController error:', error);
            }
        };

        await loginControllerWithDebug(req, res);

        // Log the result to help debugging
        console.log('Authorization SignOut Calls:', authorization.signOut.mock.calls);
        console.log('Response Status Calls:', res.status.mock.calls);
        console.log('Response Send Calls:', res.send.mock.calls);

        expect(authorization.signOut).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith("Account pending verification. Please try again later");

        checkIfAccountActivatedSpy.mockRestore();
    });
    //*/

    it('should return 500 if an error occurs during login', async () => {
        authorization.signInWithEmailAndPassword.mockRejectedValue(new Error('Login error'));

        await loginController(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Login error" });
    });
});