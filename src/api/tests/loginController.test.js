const { loginController } = require('../controllers/loginController'); // Assuming your function is exported from a file

describe('loginController', () => {
    // Mock req and res objects
    let req;
    let res;

    beforeEach(() => {
        // Initialize req and res objects before each test
        req = {
            body: {
                email: 'test@example.com',
                pass: 'password'
            }
        };
        res = {
            status: jest.fn(() => res),
            send: jest.fn(),
            json: jest.fn()
        };
    });

    it('should return status 401 if account is not activated', async () => {
        // Mock checkIfAccountActivated to return false
        const checkIfAccountActivated = jest.fn().mockResolvedValue(false);

        // Mock authorization.signInWithEmailAndPassword
        const signInWithEmailAndPassword = jest.fn().mockResolvedValue({ user: { uid: 'test_uid' } });

        // Call the function with mocked dependencies
        await loginController(req, res, { signInWithEmailAndPassword }, checkIfAccountActivated);

        // Expectations
        expect(signInWithEmailAndPassword).toHaveBeenCalled();
        expect(checkIfAccountActivated).toHaveBeenCalledWith('test@example.com');
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith('Account pending verification. Please try again later');
    });

    it('should return user role if account is activated and user document exists', async () => {
        // Mock checkIfAccountActivated to return true
        const checkIfAccountActivated = jest.fn().mockResolvedValue(true);

        // Mock documentSnapshot.exists to return true
        const existsMock = jest.fn().mockReturnValue(true);
        const getDocMock = jest.fn().mockResolvedValue({ exists: existsMock, data: () => ({ role: 'user_role' }) });

        // Mock authorization.signInWithEmailAndPassword
        const signInWithEmailAndPassword = jest.fn().mockResolvedValue({ user: { uid: 'test_uid' } });

        // Call the function with mocked dependencies
        await loginController(req, res, { signInWithEmailAndPassword }, checkIfAccountActivated, getDocMock);

        // Expectations
        expect(signInWithEmailAndPassword).toHaveBeenCalled();
        expect(checkIfAccountActivated).toHaveBeenCalledWith('test@example.com');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ uid: 'test_uid', message: 'user_role' });
    });

    // Add more test cases as needed...
});