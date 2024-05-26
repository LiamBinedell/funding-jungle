const { createBusinessApplicationController, createEducationApplicationController, createEventApplicationController } = require('../controllers/createApplicationController');
const firestore = require('firebase/firestore');

jest.mock('firebase/firestore');

describe('createBusinessApplicationController', () => {
    let req;
    let res;

    beforeEach(() => {
        req = {
            body: {
                applicationId: '123',
                firstName: 'John',
                lastName: 'Doe',
                idNumber: 'ABC123',
                businessName: 'Doe Enterprises',
                registrationNumber: 'REG456',
                businessAddress: '123 Business St',
                businessType: 'Retail',
                email: 'john.doe@example.com',
                fundManagerEmail: 'fund.manager@example.com',
                applicantEmail: 'applicant@example.com',
                phone: '123-456-7890',
                reason: 'Starting a new business',
                community: 'Tech Community',
                idDocument: 'id_doc_base64_string',
                businessPlan: 'business_plan_base64_string'
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should send a 200 response when the application is created successfully', async () => {
        firestore.setDoc.mockResolvedValueOnce();

        await createBusinessApplicationController(req, res);

        expect(firestore.setDoc).toHaveBeenCalledWith(
            undefined,
            expect.objectContaining({
                applicationId: '123',
                firstName: 'John',
                lastName: 'Doe',
                idNumber: 'ABC123',
                businessName: 'Doe Enterprises',
                registrationNumber: 'REG456',
                businessAddress: '123 Business St',
                businessType: 'Retail',
                email: 'john.doe@example.com',
                fundManagerEmail: 'fund.manager@example.com',
                applicantEmail: 'applicant@example.com',
                phone: '123-456-7890',
                reason: 'Starting a new business',
                community: 'Tech Community',
                idDocument: 'id_doc_base64_string',
                businessPlan: 'business_plan_base64_string'
            })
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith('Application sent');
    });

    it('should send a 500 response when there is an error creating the application', async () => {
        const error = new Error('Firestore error');
        firestore.setDoc.mockRejectedValueOnce(error);

        await createBusinessApplicationController(req, res);

        expect(firestore.setDoc).toHaveBeenCalledWith(
            undefined,
            expect.objectContaining({
                applicationId: '123',
                firstName: 'John',
                lastName: 'Doe',
                idNumber: 'ABC123',
                businessName: 'Doe Enterprises',
                registrationNumber: 'REG456',
                businessAddress: '123 Business St',
                businessType: 'Retail',
                email: 'john.doe@example.com',
                fundManagerEmail: 'fund.manager@example.com',
                applicantEmail: 'applicant@example.com',
                phone: '123-456-7890',
                reason: 'Starting a new business',
                community: 'Tech Community',
                idDocument: 'id_doc_base64_string',
                businessPlan: 'business_plan_base64_string'
            })
        );
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Error creating application');
    });
});

describe('createEducationApplicationController', () => {
    let req;
    let res;

    beforeEach(() => {
        req = {
            body: {
                applicationId: '123',
                firstName: 'Jane',
                lastName: 'Doe',
                idNumber: 'ID123',
                dob: '2000-01-01',
                gender: 'Female',
                email: 'jane.doe@example.com',
                fundManagerEmail: 'fund.manager@example.com',
                applicantEmail: 'applicant@example.com',
                phone: '123-456-7890',
                address1: '456 Education Lane',
                institution: 'University of Education',
                course: 'Computer Science',
                year: '2',
                grades: 'A',
                reason: 'Furthering education',
                community: 'Educational Community',
                idDocument: 'id_doc_base64_string',
                parentId: 'parent_123',
                incomeProof: 'income_proof_base64_string',
                results: 'results_base64_string'
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should send a 200 response when the application is created successfully', async () => {
        firestore.setDoc.mockResolvedValueOnce();

        await createEducationApplicationController(req, res);

        expect(firestore.setDoc).toHaveBeenCalledWith(
            undefined,
            expect.objectContaining({
                applicationId: '123',
                firstName: 'Jane',
                lastName: 'Doe',
                idNumber: 'ID123',
                dob: '2000-01-01',
                gender: 'Female',
                email: 'jane.doe@example.com',
                fundManagerEmail: 'fund.manager@example.com',
                applicantEmail: 'applicant@example.com',
                phone: '123-456-7890',
                address1: '456 Education Lane',
                institution: 'University of Education',
                course: 'Computer Science',
                year: '2',
                grades: 'A',
                reason: 'Furthering education',
                community: 'Educational Community',
                idDocument: 'id_doc_base64_string',
                parentId: 'parent_123',
                incomeProof: 'income_proof_base64_string',
                results: 'results_base64_string'
            })
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith('Application sent');
    });

    it('should send a 500 response when there is an error creating the application', async () => {
        const error = new Error('Firestore error');
        firestore.setDoc.mockRejectedValueOnce(error);

        await createEducationApplicationController(req, res);

        expect(firestore.setDoc).toHaveBeenCalledWith(
            undefined,
            expect.objectContaining({
                applicationId: '123',
                firstName: 'Jane',
                lastName: 'Doe',
                idNumber: 'ID123',
                dob: '2000-01-01',
                gender: 'Female',
                email: 'jane.doe@example.com',
                fundManagerEmail: 'fund.manager@example.com',
                applicantEmail: 'applicant@example.com',
                phone: '123-456-7890',
                address1: '456 Education Lane',
                institution: 'University of Education',
                course: 'Computer Science',
                year: '2',
                grades: 'A',
                reason: 'Furthering education',
                community: 'Educational Community',
                idDocument: 'id_doc_base64_string',
                parentId: 'parent_123',
                incomeProof: 'income_proof_base64_string',
                results: 'results_base64_string'
            })
        );
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Error creating application');
    });
});

describe('createEventApplicationController', () => {
    let req;
    let res;

    beforeEach(() => {
        req = {
            body: {
                applicationId: '123',
                firstName: 'John',
                lastName: 'Doe',
                idNumber: 'ID123',
                dob: '2000-01-01',
                gender: 'Male',
                email: 'john.doe@example.com',
                fundManagerEmail: 'fund.manager@example.com',
                applicantEmail: 'applicant@example.com',
                phone: '123-456-7890',
                address1: '123 Event Street',
                location: 'Event Hall',
                attendance: '100',
                budget: '5000',
                description: 'Event Description',
                reason: 'Hosting a community event',
                idDocument: 'id_doc_base64_string',
                poster: 'poster_base64_string'
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should send a 200 response when the application is created successfully', async () => {
        firestore.setDoc.mockResolvedValueOnce();

        await createEventApplicationController(req, res);

        expect(firestore.setDoc).toHaveBeenCalledWith(
            undefined,
            expect.objectContaining({
                applicationId: '123',
                firstName: 'John',
                lastName: 'Doe',
                idNumber: 'ID123',
                dob: '2000-01-01',
                gender: 'Male',
                email: 'john.doe@example.com',
                fundManagerEmail: 'fund.manager@example.com',
                applicantEmail: 'applicant@example.com',
                phone: '123-456-7890',
                address1: '123 Event Street',
                location: 'Event Hall',
                attendance: '100',
                budget: '5000',
                description: 'Event Description',
                reason: 'Hosting a community event',
                idDocument: 'id_doc_base64_string',
                poster: 'poster_base64_string'
            })
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith('Applicant sent');
    });

    it('should send a 500 response when there is an error creating the application', async () => {
        const error = new Error('Firestore error');
        firestore.setDoc.mockRejectedValueOnce(error);

        await createEventApplicationController(req, res);

        expect(firestore.setDoc).toHaveBeenCalledWith(
            undefined,
            expect.objectContaining({
                applicationId: '123',
                firstName: 'John',
                lastName: 'Doe',
                idNumber: 'ID123',
                dob: '2000-01-01',
                gender: 'Male',
                email: 'john.doe@example.com',
                fundManagerEmail: 'fund.manager@example.com',
                applicantEmail: 'applicant@example.com',
                phone: '123-456-7890',
                address1: '123 Event Street',
                location: 'Event Hall',
                attendance: '100',
                budget: '5000',
                description: 'Event Description',
                reason: 'Hosting a community event',
                idDocument: 'id_doc_base64_string',
                poster: 'poster_base64_string'
            })
        );
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Error creating application');
    });
});