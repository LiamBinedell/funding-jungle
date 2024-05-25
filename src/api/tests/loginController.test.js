const { loginController, checkIfAccountActivated } = require('../controllers/loginController'); 
const httpMocks = require('node-mocks-http');

jest.mock('firebase/auth');
jest.mock('firebase/app');
jest.mock('firebase/firestore');

const firestore = require('firebase/firestore');

describe('checkIfAccountActivated', () => {
  beforeEach(() => {
    firestore.reset();
  });

  it('should return false if account is not activated', async () => {
    firestore.addDoc(firestore.collection(), {
      email: 'test@example.com',
      role: 'fundingManager',
      accountActivated: false,
    });

    const result = await checkIfAccountActivated('test@example.com');
    expect(result).toBe(false);
  });

  it('should return true if account is activated', async () => {
    firestore.addDoc(firestore.collection(), {
      email: 'activated@example.com',
      role: 'fundingManager',
      accountActivated: true,
    });

    const result = await checkIfAccountActivated('activated@example.com');
    expect(result).toBe(true);
  });

  it('should return true if no matching account is found', async () => {
    const result = await checkIfAccountActivated('nonexistent@example.com');
    expect(result).toBe(true);
  });
});

describe('loginController', () => {
  beforeEach(() => {
    firestore.reset();
  });

  it('should respond with 401 if account is not activated', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/login',
      body: {
        email: 'test@example.com',
        pass: 'password123',
      },
    });
    const res = httpMocks.createResponse();

    firestore.addDoc(firestore.collection(), {
      email: 'test@example.com',
      role: 'fundingManager',
      accountActivated: false,
    });

    await loginController(req, res);
    expect(res.statusCode).toBe(401);
    expect(res._getData()).toBe('Account pending verification. Please try again later');
  });

  it('should respond with 200 and role if login is successful', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/login',
      body: {
        email: 'activated@example.com',
        pass: 'password123',
      },
    });
    const res = httpMocks.createResponse();

    firestore.addDoc(firestore.collection(), {
      uid: 'user123',
      email: 'activated@example.com',
      role: 'fundingManager',
    });

    await loginController(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getData()).toBe('fundingManager');
  });

  it('should respond with 401 if login credentials are invalid', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/login',
      body: {
        email: 'invalid@example.com',
        pass: 'wrongpassword',
      },
    });
    const res = httpMocks.createResponse();

    await loginController(req, res);
    expect(res.statusCode).toBe(401);
    expect(res._getData()).toBe('Invalid email or password');
  });
});