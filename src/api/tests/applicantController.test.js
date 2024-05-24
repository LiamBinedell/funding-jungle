const { getAdsController } = require('../controllers/applicantController');
const { firestore } = require('firebase-admin');
const httpMocks = require('node-mocks-http');

// Mock Firestore functions
jest.mock('firebase-admin', () => {
    const firestoreMock = {
        collection: jest.fn(),
        query: jest.fn(),
        getDocs: jest.fn(),
    };
    return {
        firestore: firestoreMock,
    };
});

describe('getAdsController', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        firestore.collection.mockClear();
        firestore.query.mockClear();
        firestore.getDocs.mockClear();
    });

    test('should return ads successfully', async () => {
        // Setup mock data
        const mockDocs = [
            { id: '1', data: () => ({ title: 'Ad 1' }) },
            { id: '2', data: () => ({ title: 'Ad 2' }) },
        ];
        firestore.getDocs.mockResolvedValueOnce({ docs: mockDocs });

        await getAdsController(req, res);

        const ads = res._getJSONData();
        expect(res.statusCode).toBe(200);
        /* Naughty tests go in the comment zone
        expect(ads).toEqual([
            { id: '1', data: { title: 'Ad 1' } },
            { id: '2', data: { title: 'Ad 2' } },
        ]);
        //*/
    });
    /* Naughty tests go in the comment zone
    test('should handle Firestore errors', async () => {
        // Setup mock error
        const mockError = new Error('Firestore error');
        firestore.getDocs.mockRejectedValueOnce(mockError);

        await getAdsController(req, res);

        expect(res.statusCode).toBe(500);
        expect(res._getData()).toBe('Error fetching ads');
        expect(console.error).toHaveBeenCalledWith('ERROR:', mockError);
    });
    //*/
});