const { loginController } = require('./notLoginController'); // Assuming your function is exported from a file

describe('loginController', () => {
    let req;
    let res;

    beforeEach(() => {
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
        const checkIfAccountActivated = jest.fn().mockResolvedValue(false);
        const signInWithEmailAndPassword = jest.fn().mockResolvedValue({ user: { uid: 'test_uid' } });
        const firestore = jest.fn();

        await loginController(req, res, signInWithEmailAndPassword, checkIfAccountActivated, firestore);

        expect(signInWithEmailAndPassword).toHaveBeenCalled();
        expect(checkIfAccountActivated).toHaveBeenCalledWith('test@example.com');
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith('Account pending verification. Please try again later');
    });

    it('should return user role if account is activated and user document exists', async () => {
        const checkIfAccountActivated = jest.fn().mockResolvedValue(true);
        const existsMock = jest.fn().mockReturnValue(true);
        const getDocMock = jest.fn().mockResolvedValue({ exists: existsMock, data: () => ({ role: 'user_role' }) });
        const signInWithEmailAndPassword = jest.fn().mockResolvedValue({ user: { uid: 'test_uid' } });
        const firestore = { doc: jest.fn(() => ({ get: getDocMock })) };

        await loginController(req, res, signInWithEmailAndPassword, checkIfAccountActivated, firestore);

        expect(signInWithEmailAndPassword).toHaveBeenCalled();
        expect(checkIfAccountActivated).toHaveBeenCalledWith('test@example.com');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ uid: 'test_uid', message: 'user_role' });
    });
});