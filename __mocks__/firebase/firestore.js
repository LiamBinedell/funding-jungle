let usersCollection = [];

const firestore = {
  getFirestore: jest.fn().mockReturnValue({
    // Returning the mock Firestore instance itself
  }),
  collection: jest.fn(() => firestore),
  addDoc: jest.fn((collectionRef, data) => {
    const id = `id_${usersCollection.length + 1}`;
    usersCollection.push({ ...data, id });
    return Promise.resolve({ id });
  }),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(() => ({
    docs: usersCollection.map((user) => ({
      data: () => user,
    })),
  })),
  doc: jest.fn((db, collection, uid) => ({
    id: uid,
  })),
  getDoc: jest.fn((docRef) => {
    const user = usersCollection.find((user) => user.id === docRef.id);
    if (user) {
      return Promise.resolve({
        exists: true,
        data: () => user,
      });
    }
    return Promise.resolve({
      exists: false,
    });
  }),
  reset: jest.fn(() => {
    usersCollection = [];
  }),
};

module.exports = firestore;