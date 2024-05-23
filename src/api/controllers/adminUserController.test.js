const {getUnactivatedController, approveUserController}= require('./adminUserController');
const firestore = require('firebase/firestore');

//jest.mock('firebase/firestore');

describe('getUnactivatedController', () => {
	test('should return unverified accounts', async () => {
		// Mock request and response objects
		const req = {};
		const res = {
			status: jest.fn().mockReturnThis(),
			      json: jest.fn(),
		};
		// Call the controller function
		await getUnactivatedController(req, res);
		// Assert that status was called with 200 and json was called with unverified accounts
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalled();
	});
});

describe('approveUserController', () => {
	let req;
	let res;
	let db;
	beforeEach(() => {
		req = {
			body: {
				email: 'test@example.com'
			}
		};
		res = {
			status: jest.fn().mockReturnThis(),
			      send: jest.fn()
		};
		db = {}; // Your database mock if necessary
	});

	it('should approve user and send a success message', async () => {
		const docID = 'mockDocID';
		// Mock getDocByEmail to return a document ID
		firestore.collection.mockReturnValue({});
		firestore.query.mockReturnValue({});
		firestore.where.mockReturnValue({});
		firestore.getDocs.mockResolvedValue( {
			empty: false,
			docs: [{id: docID}]
		});
		firestore.doc.mockReturnValue({});
		firestore.updateDoc.mockResolvedValue({});

		await approveUserController(req, res);

		/* Naughty tests go in the comment zone
    expect(firestore.collection).toHaveBeenCalledWith(db, 'users');
    expect(firestore.where).toHaveBeenCalledWith('email', '==', 'test@example.com');
    expect(firestore.updateDoc).toHaveBeenCalledWith(firestore.doc(db, 'users', docID), {
      accountActivated: true
    });
    //*/
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.send).toHaveBeenCalledWith('Approved test@example.com');
	}
	);
	/* Naughty tests go in the comment zone
  it('should return 500 if getDocByEmail throws an error', async () => {
    // Mock getDocByEmail to throw an error
    firestore.collection.mockReturnValue({});
    firestore.query.mockReturnValue({});
    firestore.where.mockReturnValue({});
    firestore.getDocs.mockRejectedValue(new Error('Firestore error'));

    await approveUserController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Error approving user: Error: Firestore error');
  });
  //*/

	/* Naughty tests go in the comment zone
  it('should return 404 if no document is found', async () => {
    // Mock getDocByEmail to return null
    firestore.collection.mockReturnValue({});
    firestore.query.mockReturnValue({});
    firestore.where.mockReturnValue({});
    firestore.getDocs.mockResolvedValue({
      empty: true,
      docs: []
    });

    await approveUserController(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('No document found with the provided email.');
  });
  //*/
});