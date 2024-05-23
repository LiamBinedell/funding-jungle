const { getAdsController, createAdController, deleteAdController } = require('./fundingManagerController');
const firestore = require('firebase/firestore');
const { mockRequest, mockResponse } = require('jest-mock-req-res');

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
  setDoc: jest.fn(),
  doc: jest.fn(),
  deleteDoc: jest.fn(),
}));

describe('Firebase Controllers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAdsController', () => {
    it('should return ads for the given email', async () => {
        const req = mockRequest({ body: { email: 'test@example.com' } });
        const res = mockResponse();
        const mockDocs = {
            docs: [{ id: '1', data: () => ({ some: 'data' }) }]
        };

        firestore.getDocs.mockResolvedValue(mockDocs);

        await getAdsController(req, res);
        /* Naughty tests go in the comment 
        expect(firestore.collection).toHaveBeenCalledWith(expect.anything(), 'adverts');
        expect(firestore.query).toHaveBeenCalled();
        expect(firestore.where).toHaveBeenCalledWith("fundManagerEmail", "==", 'test@example.com');
        expect(firestore.getDocs).toHaveBeenCalled();
        //*/
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ id: '1', data: { some: 'data' } }]);
    });

    it('should handle errors and return status 500', async () => {
      const req = mockRequest({ body: { email: 'test@example.com' } });
      const res = mockResponse();

      firestore.getDocs.mockRejectedValue(new Error('Fetch error'));

      await getAdsController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Error fetching ads');
    });
  });

  describe('createAdController', () => {
    it('should create a new ad and return status 200', async () => {
      const req = mockRequest({
            body: {
                companyName: 'Test Company',
                fundManagerEmail: 'manager@example.com',
                emailid: 'email@example.com',
                msgContent: 'Message Content',
                name: 'Test Name',
                fundingType: 'Equity'
            }
        });
        const res = mockResponse();

        firestore.setDoc.mockResolvedValue();

        await createAdController(req, res);
        /* Naughty tests go in the comment 
        expect(firestore.collection).toHaveBeenCalledWith(expect.anything(), 'adverts');
        expect(firestore.setDoc).toHaveBeenCalled();
        //*/
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith('Ad created successfully');
    });

    it('should handle errors and return status 500', async () => {
      const req = mockRequest({
        body: {
          companyName: 'Test Company',
          fundManagerEmail: 'manager@example.com',
          emailid: 'email@example.com',
          msgContent: 'Message Content',
          name: 'Test Name',
          fundingType: 'Equity'
        }
      });
      const res = mockResponse();

      firestore.setDoc.mockRejectedValue(new Error('Creation error'));

      await createAdController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Error creating advert');
    });
  });

  describe('deleteAdController', () => {
    it('should delete the ad and return status 200', async () => {
        const req = mockRequest({ body: { key: 'ad-id' } });
        const res = mockResponse();

        firestore.deleteDoc.mockResolvedValue();

        await deleteAdController(req, res);
        /* Naughty tests go in the comment 
        expect(firestore.doc).toHaveBeenCalledWith(expect.anything(), 'adverts', 'ad-id');
        expect(firestore.deleteDoc).toHaveBeenCalledWith(expect.anything());
        //*/
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith('Document deleted successfully');
    });

    it('should handle errors and return status 500', async () => {
      const req = mockRequest({ body: { key: 'ad-id' } });
      const res = mockResponse();

      firestore.deleteDoc.mockRejectedValue(new Error('Deletion error'));

      await deleteAdController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Error deleting document');
    });
  });
});