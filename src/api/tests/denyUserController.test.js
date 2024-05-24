const { getUnactivatedController, approveUserController, denyUserController } = require('../controllers/adminUserController');
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

  describe('denyUserController', () => {
    it('should deny a user by email', async () => {
      firestore.getDocs.mockResolvedValue({
        empty: false,
        docs: [{ id: '123', data: () => ({ email: 'john@example.com' }) }]
      });

      firestore.deleteDoc.mockResolvedValue();

      const mockDeleteUser = jest.fn().mockResolvedValue();
      admin.auth.mockReturnValue({
        deleteUser: mockDeleteUser
      });

      const response = await request(app).post('/deny').send({ email: 'john@example.com' });
      expect(response.status).toBe(200);
      expect(response.text).toBe('Denied john@example.com');
      expect(mockDeleteUser).toHaveBeenCalledWith('123');
    });

    it('should handle errors when denying a user', async () => {
      firestore.getDocs.mockResolvedValue({
        empty: false,
        docs: [{ id: '123', data: () => ({ email: 'john@example.com' }) }]
      });

      firestore.deleteDoc.mockRejectedValue(new Error('Delete error'));

      const mockDeleteUser = jest.fn().mockRejectedValue(new Error('Delete error'));
      admin.auth.mockReturnValue({
        deleteUser: mockDeleteUser
      });

      const response = await request(app).post('/deny').send({ email: 'john@example.com' });
      expect(response.status).toBe(500);
      expect(response.text).toBe('Error deleting user');
    });
  });
});