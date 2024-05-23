// Import necessary modules
const { getAdsController } = require('./adminAdController'); // Adjust the path to your actual controller file
const { ref, child, get } = require('firebase/database');
const httpMocks = require('node-mocks-http');
const jestMock = require('jest-mock');

// Mocking firebase/database methods
jest.mock('firebase/database', () => ({
    ref: jest.fn(),
    child: jest.fn(),
    get: jest.fn(),
}));

describe('getAdsController', () => {
    let req, res, dbref;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        dbref = {}; // This can be any mock object since we are mocking the actual implementation

        ref.mockReturnValue(dbref);
    });

    it('should return a list of ads with status 200', async () => {
        const mockAdsData = {
            val: () => ({
                'companyName': 'Company A',
                'date': '2023-05-22',
                'fundingType': 'Seed',
                'name': 'John Doe',
                'msgContent': 'Some content'
            })
        };

        const adsSnapshot = {
            forEach: jest.fn((callback) => {
                callback(mockAdsData);
            })
        };

        get.mockResolvedValue(adsSnapshot);

        await getAdsController(req, res);

        expect(ref).toHaveBeenCalledWith(expect.anything()); // Check if ref was called correctly
        expect(child).toHaveBeenCalledWith(dbref, 'contact-form');
        expect(get).toHaveBeenCalledWith(expect.anything());

        const responseData = res._getJSONData();
        expect(res.statusCode).toBe(200);
        expect(responseData).toEqual([
            {
                company: 'Company A',
                date: '2023-05-22',
                type: 'Seed',
                name: 'John Doe',
                about: 'Some content'
            }
        ]);
    });

    it('should handle errors and return status 500', async () => {
        const mockError = new Error('Database fetch failed');

        get.mockRejectedValue(mockError);

        await getAdsController(req, res);

        expect(ref).toHaveBeenCalledWith(expect.anything()); // Check if ref was called correctly
        expect(child).toHaveBeenCalledWith(dbref, 'contact-form');
        expect(get).toHaveBeenCalledWith(expect.anything());

        expect(res.statusCode).toBe(500);
        expect(res._getData()).toBe(mockError);
    });
});