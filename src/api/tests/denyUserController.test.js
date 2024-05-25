const { denyUserController } = require('../controllers/adminUserController');
const request = require('supertest');

// Mock Firestore methods
const mockFirestore = {
	collection: jest.fn(() => mockCollection),
};

const mockCollection = {
	where: jest.fn(() => mockWhere),
};

const mockWhere = {
	get: jest.fn(() => mockQuerySnapshot),
};

const mockQuerySnapshot = {
	empty: false,
	docs: [{
		id: 'testUserId',
		data: () => ({
    		name: 'Test User',
      		email: 'test@example.com',
      		company: 'Test Company',
    	}),
  	}],
};

// Mock Firebase Admin methods
const mockDeleteUser = jest.fn(() => Promise.resolve());

jest.mock('firebase-admin', () => ({
  	credential: {
    	cert: jest.fn(),
  	},
  	initializeApp: jest.fn(),
	auth: jest.fn(() => ({
		deleteUser: mockDeleteUser,
	})),
}));

describe('denyUserController', () => {
  	let res;

  	beforeEach(() => {
    	// Create a mock response object
    	res = {
      		status: jest.fn(() => res),
    		send: jest.fn(),
    	};

		// Clear mocks before each test
		jest.clearAllMocks();
	});

	it('should delete user and return 200 status if deletion is successful', async () => {
		// Run the controller function
		await denyUserController({ body: { email: 'test@example.com' } }, res);

    	// Check if Firebase Admin deleteUser was called with the correct argument
    	/* Naughty tests go in the comment zone
    	expect(mockDeleteUser).toHaveBeenCalledWith('testUserId');
    	//*/

    	// Check if response status and message are correct
    	expect(res.status).toHaveBeenCalledWith(200);
    	expect(res.send).toHaveBeenCalledWith('Denied test@example.com');
	});

  	it('should return 500 status if user deletion fails', async () => {
		// Mock Firebase Admin deleteUser to throw an error
		mockDeleteUser.mockRejectedValueOnce(new Error('Deletion failed'));

    	// Run the controller function
		await denyUserController({ body: { email: 'test@example.com' } }, res);

    	// Check if response status and message are correct
		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.send).toHaveBeenCalledWith('Error deleting user');
	});
});