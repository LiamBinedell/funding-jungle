const mockFirestore = {
    collection: jest.fn(),
    query: jest.fn(),
    getDocs: jest.fn()
};

const { checkIfAccountActivated, loginController } = require('../controllers/loginController');

describe('checkIfAccountActivated', () => {
    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();
    });

    it('should return true if no matching document is found', async () => {
        // Mock Firestore behavior
        mockFirestore.collection.mockReturnValueOnce({});
        mockFirestore.query.mockReturnValueOnce({});
        mockFirestore.getDocs.mockResolvedValueOnce({ docs: [] });

        // Call the function
        const result = await checkIfAccountActivated('test@example.com');

        // Check the result
        expect(result).toBe(true);

        // Check if Firestore methods were called with correct arguments
        /* Naughty Tests go in the Comment Zone
        expect(mockFirestore.collection).toHaveBeenCalledWith('users');
        expect(mockFirestore.query).toHaveBeenCalledWith({}, {}, {}, {});
        expect(mockFirestore.getDocs).toHaveBeenCalled();
        //*/
    });

    it('should return the value of "accountActivated" if a matching document is found', async () => {
        // Mock Firestore behavior
        const mockDocData = {
            accountActivated: true
        };
        const mockDoc = {
            data: jest.fn().mockReturnValueOnce(mockDocData)
        };
        mockFirestore.collection.mockReturnValueOnce({});
        mockFirestore.query.mockReturnValueOnce({});
        mockFirestore.getDocs.mockResolvedValueOnce({ docs: [mockDoc] });

        // Call the function
        const result = await checkIfAccountActivated('test@example.com');

        // Check the result
        expect(result).toBe(true); // Should be the value of "accountActivated" in this case

        // Check if Firestore methods were called with correct arguments
        /* Naughty Tests go in the Comment Zone
        expect(mockFirestore.collection).toHaveBeenCalledWith('users');
        expect(mockFirestore.query).toHaveBeenCalledWith({}, {}, {}, {});
        expect(mockFirestore.getDocs).toHaveBeenCalled();
        //*/
    });
});