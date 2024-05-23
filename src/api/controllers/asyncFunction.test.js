const { getUnactivatedController, approveUserController, denyUserController } = require('./asyncFunction');
const firebase = require('firebase/app');
const firestore = require('firebase/firestore');
const admin = require("firebase-admin");
const express = require('express');
const request = require('supertest');

jest.mock('firebase/app');
jest.mock('firebase/firestore');
jest.mock('firebase/auth');
jest.mock('firebase-admin');

describe('Controller Tests', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.get('/unactivated', getUnactivatedController);
    app.post('/approve', approveUserController);
    app.post('/deny', denyUserController);
  });

  describe('getUnactivatedController', () => {
    it('should return unactivated accounts', async () => {
      const mockDocs = [
        { data: () => ({ name: 'John', surname: 'Doe', email: 'john@example.com', company: 'ExampleCorp' }) },
        { data: () => ({ name: 'Jane', surname: 'Doe', email: 'jane@example.com', company: 'ExampleCorp' }) }
      ];

      firestore.getDocs.mockResolvedValue({ docs: mockDocs });

      const response = await request(app).get('/unactivated');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        { name: 'John Doe', email: 'john@example.com', company: 'ExampleCorp' },
        { name: 'Jane Doe', email: 'jane@example.com', company: 'ExampleCorp' }
      ]);
    });
  });

  describe('approveUserController', () => {
    it('should approve a user by email', async () => {
      firestore.getDocs.mockResolvedValue({
        empty: false,
        docs: [{ id: '123', data: () => ({ email: 'john@example.com' }) }]
      });

      firestore.updateDoc.mockResolvedValue();

      const response = await request(app).post('/approve').send({ email: 'john@example.com' });
      expect(response.status).toBe(200);
      expect(response.text).toBe('Approved john@example.com');
    });
  });

  describe('denyUserController', () => {
    it('should deny a user by email', async () => {
      firestore.getDocs.mockResolvedValue({
        empty: false,
        docs: [{ id: '123', data: () => ({ email: 'john@example.com' }) }]
      });

      firestore.deleteDoc.mockResolvedValue();
      admin.auth().deleteUser.mockResolvedValue();

      const response = await request(app).post('/deny').send({ email: 'john@example.com' });
      expect(response.status).toBe(200);
      expect(response.text).toBe('Denied john@example.com');
    });

    it('should handle errors when denying a user', async () => {
      firestore.getDocs.mockResolvedValue({
        empty: false,
        docs: [{ id: '123', data: () => ({ email: 'john@example.com' }) }]
      });

      firestore.deleteDoc.mockRejectedValue(new Error('Delete error'));
      admin.auth().deleteUser.mockRejectedValue(new Error('Delete error'));

      const response = await request(app).post('/deny').send({ email: 'john@example.com' });
      expect(response.status).toBe(500);
      expect(response.text).toBe('Error deleting user');
    });
  });
});