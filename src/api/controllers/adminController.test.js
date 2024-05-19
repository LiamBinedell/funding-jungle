// Import necessary modules and functions
const {
    getUnactivatedController,
    approveUserController,
    denyUserController,
    deleteDeniedUser
} = require('./adminController');

jest.mock('./adminController', () => ({
    deleteDeniedUser: jest.fn()
  }));
  
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
    test('should approve user and return success message', async () => {
      // Mock request and response objects
      const req = {
        body: {
          email: 'test@example.com',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
  
      // Call the controller function
      await approveUserController(req, res);
  
      // Assert that status was called with 200 and send was called with success message
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(`Approved ${req.body.email}`);
    });
  });
  
  describe('denyUserController', () => {
    test('should delete user and return success message', async () => {
      // Mock request and response objects
      const req = {
        body: {
          email: 'test@example.com',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
  
      // Mock deleteDeniedUser to return true
      deleteDeniedUser.mockResolvedValue(true);
  
      // Call the controller function
      await denyUserController(req, res);
  
      // Assert that deleteDeniedUser and admin.auth().deleteUser were called and send was called with success message
      expect(deleteDeniedUser).toHaveBeenCalledWith(req.body.email);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(`Denied ${req.body.email}`);
    });
  
    test('should return error message if user deletion fails', async () => {
      // Mock request and response objects
      const req = {
        body: {
          email: 'test@example.com',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
  
      // Mock deleteDeniedUser to return false
      deleteDeniedUser.mockResolvedValue(false);
  
      // Call the controller function
      await denyUserController(req, res);
  
      // Assert that deleteDeniedUser was called and status 500 was sent
      expect(deleteDeniedUser).toHaveBeenCalledWith(req.body.email);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(`Error deleting user`);
    });
  });