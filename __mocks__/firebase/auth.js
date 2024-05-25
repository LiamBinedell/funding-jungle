const auth = {
  signInWithEmailAndPassword: jest.fn((auth, email, password) => {
    if (email === 'activated@example.com' && password === 'password123') {
      return Promise.resolve({ user: { uid: 'user123' } });
    } else {
      return Promise.reject(new Error('Invalid email or password'));
    }
  }),
  getAuth: jest.fn().mockReturnValue({ currentUser: null }),
};

module.exports = auth;
  