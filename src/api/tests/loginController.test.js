const { loginController, checkIfAccountActivated } = require('../controllers/loginController'); // Replace 'your_file_name' with the actual file name


// Mocking the request and response objects
const req = {
    body: {
        email: 'test@example.com',
        pass: 'testpassword'
    }
};
const res = {
    status: jest.fn(() => res),
    send: jest.fn()
};

// Mocking the Firebase functions
jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(() => ({})),
    signInWithEmailAndPassword: jest.fn(),
}));
jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(() => ({})),
    collection: jest.fn(() => ({})),
    query: jest.fn(() => ({})),
    where: jest.fn(() => ({})),
    getDocs: jest.fn(() => ({ docs: [{ data: () => ({ accountActivated: true }) }] })),
    doc: jest.fn(() => ({})),
    getDoc: jest.fn(() => ({ exists: true, data: () => ({ role: 'mocked_role' }) }))
}));

describe('loginController function', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return status 200 and role if account is activated and login is successful', async () => {
        await loginController(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith('mocked_role');
    });

    it('should return status 401 and appropriate message if account is not activated', async () => {
        jest.spyOn(checkIfAccountActivated, 'mockResolvedValueOnce(false)');
        await loginController(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith('Account pending verification. Please try again later');
    });

    it('should return status 401 and appropriate message if login fails', async () => {
        jest.spyOn(checkIfAccountActivated, 'mockResolvedValueOnce(true)');
        jest.spyOn(require('firebase/auth'), 'signInWithEmailAndPassword').mockRejectedValueOnce('Invalid email or password');
        await loginController(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith('Invalid email or password');
    });
});