const { app } = require('@azure/functions');
const { registerUser } = require('../../backend/userAuth');

app.post('register', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const {name, surname, email, password, role, company} = request.body;
        const response = registerUser(name, surname, email, password, role, company);
        return response;
    },
});