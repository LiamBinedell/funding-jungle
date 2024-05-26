const { getBusinessController, getEducationController, getEventController } = require('../controllers/getApplicationController');

// Mocking Firebase services
jest.mock('firebase/app', () => ({
    initializeApp: jest.fn()
}));

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn()
}));

jest.mock('firebase/firestore', () => {
    const collection = jest.fn();
    const query = jest.fn();
    const getDocs = jest.fn();

    return {
        getFirestore: jest.fn(),
        collection,
        query,
        getDocs,
        doc: jest.fn(),
        getDoc: jest.fn()
    };
});

const firestore = require('firebase/firestore');

// Helper function to mock request and response
const mockRequest = () => {
    return {
        body: {},
        params: {},
        query: {}
    };
};

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

describe('Firebase Controllers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('getEducationController should fetch education applications', async () => {
        const req = mockRequest();
        const res = mockResponse();

        const mockDocs = {
            docs: [
                { id: '1', data: jest.fn().mockReturnValue({ name: 'Application 1' }) },
                { id: '2', data: jest.fn().mockReturnValue({ name: 'Application 2' }) }
            ]
        };

        firestore.getDocs.mockResolvedValue(mockDocs);

        await getEducationController(req, res);

        expect(firestore.collection).toHaveBeenCalledWith(undefined, 'educationApplications');
        expect(firestore.getDocs).toHaveBeenCalledWith(undefined);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([
            { id: '1', data: { name: 'Application 1' } },
            { id: '2', data: { name: 'Application 2' } }
        ]);
    });

    test('getBusinessController should fetch business applications', async () => {
        const req = mockRequest();
        const res = mockResponse();

        const mockDocs = {
            docs: [
                { id: '1', data: jest.fn().mockReturnValue({ name: 'Application 1' }) },
                { id: '2', data: jest.fn().mockReturnValue({ name: 'Application 2' }) }
            ]
        };

        firestore.getDocs.mockResolvedValue(mockDocs);

        await getBusinessController(req, res);

        expect(firestore.collection).toHaveBeenCalledWith(undefined, 'businessApplications');
        expect(firestore.getDocs).toHaveBeenCalledWith(undefined);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([
            { id: '1', data: { name: 'Application 1' } },
            { id: '2', data: { name: 'Application 2' } }
        ]);
    });

    test('getEventController should fetch event applications', async () => {
        const req = mockRequest();
        const res = mockResponse();

        const mockDocs = {
            docs: [
                { id: '1', data: jest.fn().mockReturnValue({ name: 'Application 1' }) },
                { id: '2', data: jest.fn().mockReturnValue({ name: 'Application 2' }) }
            ]
        };

        firestore.getDocs.mockResolvedValue(mockDocs);

        await getEventController(req, res);

        expect(firestore.collection).toHaveBeenCalledWith(undefined, 'eventApplications');
        expect(firestore.getDocs).toHaveBeenCalledWith(undefined);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([
            { id: '1', data: { name: 'Application 1' } },
            { id: '2', data: { name: 'Application 2' } }
        ]);
    });

    test('should handle errors in getEducationController', async () => {
        const req = mockRequest();
        const res = mockResponse();

        firestore.getDocs.mockRejectedValue(new Error('Firestore error'));

        await getEducationController(req, res);

        expect(firestore.collection).toHaveBeenCalledWith(undefined, 'educationApplications');
        expect(firestore.getDocs).toHaveBeenCalledWith(undefined);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith("Error fetching applications");
    });

    test('should handle errors in getBusinessController', async () => {
        const req = mockRequest();
        const res = mockResponse();

        firestore.getDocs.mockRejectedValue(new Error('Firestore error'));

        await getBusinessController(req, res);

        expect(firestore.collection).toHaveBeenCalledWith(undefined, 'businessApplications');
        expect(firestore.getDocs).toHaveBeenCalledWith(undefined);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith("Error fetching applications");
    });

    test('should handle errors in getEventController', async () => {
        const req = mockRequest();
        const res = mockResponse();

        firestore.getDocs.mockRejectedValue(new Error('Firestore error'));

        await getEventController(req, res);

        expect(firestore.collection).toHaveBeenCalledWith(undefined, 'eventApplications');
        expect(firestore.getDocs).toHaveBeenCalledWith(undefined);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith("Error fetching applications");
    });
});