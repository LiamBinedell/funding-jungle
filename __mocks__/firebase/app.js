module.exports = {
    initializeApp: jest.fn().mockReturnValue({
      firestore: jest.fn(),
    }),
  };