const request = require('supertest');
const express = require('express');
const {
    createBusinessApplicationController,
    createEducationApplicationController,
    createEventApplicationController,
    updateStatusController,
    createReviewController
} = require('../controllers/createApplicationController'); // Adjust the path to your controller file

const app = express();
app.use(express.json());

app.post('/business-application', createBusinessApplicationController);
app.post('/education-application', createEducationApplicationController);
app.post('/event-application', createEventApplicationController);
app.post('/update-status', updateStatusController);
app.post('/review', createReviewController);

// Mocking Firebase dependencies
jest.mock('firebase/app', () => {
    return {
        initializeApp: jest.fn().mockReturnValue({})
    };
});

const mockSet = jest.fn();
const mockCollection = jest.fn(() => ({
    doc: jest.fn(() => ({
        set: mockSet
    }))
}));

jest.mock('firebase/firestore', () => {
    return {
        getFirestore: jest.fn(() => ({
            collection: mockCollection
        })),
        collection: mockCollection,
        doc: jest.fn(() => ({
            set: mockSet
        })),
        setDoc: mockSet
    };
});

describe('Controller Tests', () => {
    beforeEach(() => {
        mockSet.mockClear();
        mockCollection.mockClear();
    });

    describe('createBusinessApplicationController', () => {
        it('should create a business application successfully', async () => {
            const response = await request(app)
                .post('/business-application')
                .send({
                    applicationId: "app123",
                    firstName: "John",
                    lastName: "Doe",
                    idNumber: "ID123456",
                    businessName: "Business LLC",
                    registrationNumber: "REG123",
                    businessAddress: "123 Business St",
                    businessType: "Retail",
                    email: "john.doe@example.com",
                    fundManagerEmail: "manager@example.com",
                    applicantEmail: "applicant@example.com",
                    phone: "123-456-7890",
                    reason: "Funding required for expansion",
                    community: "Community A",
                    idDocument: "document",
                    businessPlan: "business plan"
                });
            expect(response.status).toBe(200);
            expect(response.text).toBe('Application sent');
            expect(mockSet).toHaveBeenCalledTimes(1);
        });

        it('should handle errors gracefully', async () => {
            mockSet.mockImplementationOnce(() => {
                throw new Error('Firestore error');
            });
            const response = await request(app)
                .post('/business-application')
                .send({
                    applicationId: "app123",
                    firstName: "John",
                    lastName: "Doe",
                    idNumber: "ID123456",
                    businessName: "Business LLC",
                    registrationNumber: "REG123",
                    businessAddress: "123 Business St",
                    businessType: "Retail",
                    email: "john.doe@example.com",
                    fundManagerEmail: "manager@example.com",
                    applicantEmail: "applicant@example.com",
                    phone: "123-456-7890",
                    reason: "Funding required for expansion",
                    community: "Community A",
                    idDocument: "document",
                    businessPlan: "business plan"
                });
            expect(response.status).toBe(500);
            expect(response.text).toBe('Error creating application');
            expect(mockSet).toHaveBeenCalledTimes(1);
        });
    });

    // Similarly write tests for the other controllers...

    describe('createEducationApplicationController', () => {
        it('should create an education application successfully', async () => {
            const response = await request(app)
                .post('/education-application')
                .send({
                    applicationId: "app123",
                    firstName: "Jane",
                    lastName: "Doe",
                    idNumber: "ID654321",
                    dob: "2000-01-01",
                    gender: "Female",
                    email: "jane.doe@example.com",
                    fundManagerEmail: "manager@example.com",
                    applicantEmail: "applicant@example.com",
                    phone: "987-654-3210",
                    address1: "456 Education Rd",
                    institution: "University",
                    course: "Course",
                    year: "2022",
                    grades: "A",
                    reason: "Scholarship required",
                    community: "Community B",
                    idDocument: "document",
                    parentId: "parent123",
                    incomeProof: "income proof",
                    results: "results"
                });
            expect(response.status).toBe(200);
            expect(response.text).toBe('Application sent');
            expect(mockSet).toHaveBeenCalledTimes(1);
        });

        it('should handle errors gracefully', async () => {
            mockSet.mockImplementationOnce(() => {
                throw new Error('Firestore error');
            });
            const response = await request(app)
                .post('/education-application')
                .send({
                    applicationId: "app123",
                    firstName: "Jane",
                    lastName: "Doe",
                    idNumber: "ID654321",
                    dob: "2000-01-01",
                    gender: "Female",
                    email: "jane.doe@example.com",
                    fundManagerEmail: "manager@example.com",
                    applicantEmail: "applicant@example.com",
                    phone: "987-654-3210",
                    address1: "456 Education Rd",
                    institution: "University",
                    course: "Course",
                    year: "2022",
                    grades: "A",
                    reason: "Scholarship required",
                    community: "Community B",
                    idDocument: "document",
                    parentId: "parent123",
                    incomeProof: "income proof",
                    results: "results"
                });
            expect(response.status).toBe(500);
            expect(response.text).toBe('Error creating application');
            expect(mockSet).toHaveBeenCalledTimes(1);
        });
    });

    describe('createEventApplicationController', () => {
        // Add tests similar to createBusinessApplicationController
    });

    describe('updateStatusController', () => {
        it('should update status successfully', async () => {
            const response = await request(app)
                .post('/update-status')
                .send({
                    key: "app123",
                    status: "approved",
                    type: "business"
                });
            expect(response.status).toBe(200);
            expect(response.text).toBe('Status updated');
            expect(mockSet).toHaveBeenCalledTimes(1);
        });

        it('should handle errors gracefully', async () => {
            mockSet.mockImplementationOnce(() => {
                throw new Error('Firestore error');
            });
            const response = await request(app)
                .post('/update-status')
                .send({
                    key: "app123",
                    status: "approved",
                    type: "business"
                });
            expect(response.status).toBe(500);
            expect(response.text).toBe('Error updating status');
            expect(mockSet).toHaveBeenCalledTimes(1);
        });
    });

    describe('createReviewController', () => {
        // Add tests for createReviewController
    });
});