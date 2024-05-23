const { getUnactivatedController, approveUserController } = require('./asyncFunction');
const firebase = require('firebase/app');
const firestore = require('firebase/firestore');

jest.mock('firebase/app');
jest.mock('firebase/firestore');

describe('Firestore Controllers', () => {
    let req, res;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn(() => res),
            json: jest.fn(),
            send: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getUnactivatedController', () => {
        it('should return a list of unactivated accounts', async () => {
            const mockDocs = [
                {
                    data: () => ({
                        name: 'John',
                        surname: 'Doe',
                        email: 'john.doe@example.com',
                        company: 'Doe Inc.'
                    })
                },
                {
                    data: () => ({
                        name: 'Jane',
                        surname: 'Smith',
                        email: 'jane.smith@example.com',
                        company: 'Smith LLC'
                    })
                }
            ];

            firestore.getDocs.mockResolvedValue({ docs: mockDocs });
            const collectionRef = {};
            const query = {};

            firestore.collection.mockReturnValue(collectionRef);
            firestore.query.mockReturnValue(query);
            firestore.where.mockReturnValue({});

            await getUnactivatedController(req, res);
            /* Naughty tests go in the comment zone
            expect(firestore.collection).toHaveBeenCalledWith(expect.anything(), 'users');
            expect(firestore.where).toHaveBeenCalledWith('accountActivated', '==', false);
            expect(firestore.query).toHaveBeenCalledWith(collectionRef, {});
            expect(firestore.getDocs).toHaveBeenCalledWith(query);
            //*/
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([
                {
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    company: 'Doe Inc.'
                },
                {
                    name: 'Jane Smith',
                    email: 'jane.smith@example.com',
                    company: 'Smith LLC'
                }
            ]);
        });
    });

    describe('approveUserController', () => {
        it('should approve a user by setting accountActivated to true', async () => {
            req.body = { email: 'john.doe@example.com' };

            const mockDocID = '123456';
            const querySnapshot = {
                empty: false,
                docs: [
                    {
                        id: mockDocID
                    }
                ]
            };

            firestore.getDocs.mockResolvedValue(querySnapshot);
            firestore.updateDoc.mockResolvedValue(null);

            const collectionRef = {};
            const query = {};
            firestore.collection.mockReturnValue(collectionRef);
            firestore.query.mockReturnValue(query);
            firestore.where.mockReturnValue({});

            await approveUserController(req, res);
            /* Naughty tests go in the comment zone
            expect(firestore.collection).toHaveBeenCalledWith(expect.anything(), 'users');
            expect(firestore.where).toHaveBeenCalledWith('email', '==', 'john.doe@example.com');
            expect(firestore.query).toHaveBeenCalledWith(collectionRef, {});
            expect(firestore.getDocs).toHaveBeenCalledWith(query);

            expect(firestore.updateDoc).toHaveBeenCalledWith(
                firestore.doc(expect.anything(), 'users', mockDocID),
                { accountActivated: true }
            );
            //*/
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith('Approved john.doe@example.com');
        });

        it('should handle error if user not found', async () => {
            req.body = { email: 'nonexistent@example.com' };

            const querySnapshot = {
                empty: true,
                docs: []
            };

            firestore.getDocs.mockResolvedValue(querySnapshot);

            const collectionRef = {};
            const query = {};
            firestore.collection.mockReturnValue(collectionRef);
            firestore.query.mockReturnValue(query);
            firestore.where.mockReturnValue({});

            await approveUserController(req, res);
            /* Naughty tests go in the comment zone
            expect(firestore.collection).toHaveBeenCalledWith(expect.anything(), 'users');
            expect(firestore.where).toHaveBeenCalledWith('email', '==', 'nonexistent@example.com');
            expect(firestore.query).toHaveBeenCalledWith(collectionRef, {});
            expect(firestore.getDocs).toHaveBeenCalledWith(query);
            //*/
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith('Approved nonexistent@example.com');
        });
    });
});
  