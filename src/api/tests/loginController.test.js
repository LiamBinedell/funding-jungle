const mockFirestore = {
    collection: jest.fn(),
    query: jest.fn(),
    getDocs: jest.fn()
};

const { checkIfAccountActivated, loginController } = require('../controllers/loginController');

describe('loginController', () => {
    test('should log in a user with valid credentials', async () => {
        // Mock request and response objects
        const req = { body: { email: 'john.doe@example.com', pass: 'password123' } };
        const res = { 
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        // Test with a valid email and password combination
        await loginController(req, res);

        // Check if status 200 is sent (logged in successfully)
        expect(res.status).toHaveBeenCalledWith(200);
        // Add more assertions if needed
    });

    // Add more test cases for other scenarios
});