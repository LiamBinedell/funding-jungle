const { getAdsController } = require('../controllers/applicantController');

// Mock Firebase services
const firebaseApp = require('firebase/app');
const firestore = require('firebase/firestore');
const authorization = require('firebase/auth');

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  query: jest.fn(),
  getDocs: jest.fn(),
}));
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
}));

describe('getAdsController', () => {
  test('should return ads array', async () => {
    // Mock Firestore functions
    const mockCollection = jest.fn();
    const mockQuery = jest.fn();
    const mockGetDocs = jest.fn(() => ({
      docs: [{ id: '1', data: () => ({ /* ad data */ }) }],
    }));

    // Mock Firestore collection and query
    firestore.collection.mockImplementationOnce(mockCollection);
    firestore.query.mockImplementationOnce(mockQuery);
    firestore.getDocs.mockImplementationOnce(mockGetDocs);

    // Mock Express response object
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };

    // Call the controller function
    await getAdsController({}, mockRes);

    // Assert the response
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith([{ id: '1', data: { /* ad data */ } }]);

    // Assert Firestore function calls
    expect(firestore.collection).toHaveBeenCalledWith(undefined, 'adverts');
    expect(firestore.query).toHaveBeenCalled();
    expect(firestore.getDocs).toHaveBeenCalled();
  });

  test('should handle error', async () => {
    // Mock Firestore functions to throw an error
    firestore.getDocs.mockImplementationOnce(() => {
      throw new Error('Firestore error');
    });

    // Mock Express response object
    const mockRes = {
      status: jest.fn(() => mockRes),
      send: jest.fn(),
    };

    // Call the controller function
    await getAdsController({}, mockRes);

    // Assert the error handling
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith('Error fetching ads');
  });
});