export const auth = {
    signInWithEmailAndPassword: jest.fn((email, password) => {
      return Promise.resolve({
        user: { email, uid: '12345' }
      });
    }),
};