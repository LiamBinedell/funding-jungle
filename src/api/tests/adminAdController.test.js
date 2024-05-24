const { getAdsController } = require('../controllers/adminAdController');
const { ref, child, get } = require('firebase/database'); // Import these
const httpMocks = require('node-mocks-http');
const { jest } = require('@jest/globals'); // Correctly import jest

// Mock the firebase functions
jest.mock('firebase/database', () => ({
    ref: jest.fn(),
    child: jest.fn(),
    get: jest.fn(),
}));

describe('getAdsController', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
    });

    it('should return 200 and the correct ads data when the database call is successful', async () => {
        const adsData = [
            { companyName: 'Company A', date: '2022-01-01', fundingType: 'Type A', name: 'Name A', msgContent: 'Content A' },
            { companyName: 'Company B', date: '2022-02-01', fundingType: 'Type B', name: 'Name B', msgContent: 'Content B' }
        ];

        const adsSnapshot = {
            forEach: jest.fn(callback => {
                adsData.forEach(ad => callback({ val: () => ad }));
            })
        };

        get.mockResolvedValue(adsSnapshot);

        await getAdsController(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual([
            { company: 'Company A', date: '2022-01-01', type: 'Type A', name: 'Name A', about: 'Content A' },
            { company: 'Company B', date: '2022-02-01', type: 'Type B', name: 'Name B', about: 'Content B' }
        ]);
    });

    it('should return 500 when there is an error in the database call', async () => {
        const error = new Error('Database error');
        get.mockRejectedValue(error);

        await getAdsController(req, res);

        expect(res.statusCode).toBe(500);
        expect(res._getData()).toBe(error.toString());
    });

    it('should properly format the returned ads array', async () => {
        const adsData = [
            { companyName: 'Company A', date: '2022-01-01', fundingType: 'Type A', name: 'Name A', msgContent: 'Content A' }
        ];

        const adsSnapshot = {
            forEach: jest.fn(callback => {
                adsData.forEach(ad => callback({ val: () => ad }));
            })
        };

        get.mockResolvedValue(adsSnapshot);

        await getAdsController(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual([
            { company: 'Company A', date: '2022-01-01', type: 'Type A', name: 'Name A', about: 'Content A' }
        ]);
    });
});