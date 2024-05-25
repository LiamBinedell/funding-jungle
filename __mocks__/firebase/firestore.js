let usersCollection = [];

const firestore = {
  getFirestore: jest.fn().mockReturnValue({}),
  collection: jest.fn(() => ({})),
  addDoc: jest.fn((collectionRef, data) => {
    const id = `id_${usersCollection.length + 1}`;
    usersCollection.push({ ...data, id });
    return Promise.resolve({ id });
  }),
  query: jest.fn((collectionRef, ...queryConstraints) => {
    let filteredUsers = usersCollection;
    queryConstraints.forEach(constraint => {
      if (constraint.field === 'email') {
        filteredUsers = filteredUsers.filter(user => user.email === constraint.value);
      } else if (constraint.field === 'role') {
        filteredUsers = filteredUsers.filter(user => user.role === constraint.value);
      } else if (constraint.field === 'accountActivated') {
        filteredUsers = filteredUsers.filter(user => user.accountActivated === constraint.value);
      }
    });
    return { docs: filteredUsers.map(user => ({ data: () => user })) };
  }),
  where: jest.fn((field, op, value) => ({ field, op, value })),
  getDocs: jest.fn((q) => q),
  doc: jest.fn((db, collection, uid) => ({ id: uid })),
  getDoc: jest.fn((docRef) => {
    const user = usersCollection.find(user => user.id === docRef.id);
    if (user) {
      return Promise.resolve({ exists: true, data: () => user });
    }
    return Promise.resolve({ exists: false });
  }),
  reset: jest.fn(() => { usersCollection = []; }),
};

module.exports = firestore;