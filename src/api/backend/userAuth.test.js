const registerApplicant = require('./userAuth');
const registerManager = require("./userAuth");
const login = require("./userAuth");

//Names and shiz are just placeholders. Edit them later

describe("Register Applicant", () => {
    test('Registration fails if email is already registered', () => {
        expect(registerApplicant("LIAM", "BINEDELL", "liam.binedell@gmail.com","password1")).toBe('User with this email already exists');
    });
});

describe("Register Manager", () => {
    test('Registration fails if email is already registered', () => {
        expect(registerManager("LIAM", "BINEDELL", "liam.binedell@gmail.com","password1","Deez Nuts Inc")).toBe('User with this email already exists');
    });
});

describe("Login Applicant", () => {
    test('Login Fails if Email is incorrect', () => {
        expect(login("ligma.balls@deeznuts.com","password1","applicants")).toBe('Invalid username or password');
    });
    test('Login Fails if Password is incorrect', () => {
        expect(login("liam.binedell@gmail.com","password1","applicants")).toBe('Invalid username or password');
    });
    test('Login Succeeds if everything is correct', () => {
        expect(login("liam.binedell@gmail.com","password1","applicants")).toBe('Login successful!');
    });
});

describe("Login Manager", () => {
    test('Login Fails if Email is incorrect', () => {
        expect(login("ligma.balls@deeznuts.com","password1","fund_managers")).toBe('Invalid username or password');
    });
    test('Login Fails if Password is incorrect', () => {
        expect(login("liam.binedell@gmail.com","password1","fund_managers")).toBe('Invalid username or password');
    });
    test('Login Succeeds if everything is correct', () => {
        expect(login("liam.binedell@gmail.com","password1","fund_managers")).toBe('Login successful!');
    });
});

describe("Login Admin", () => {
    test('Login Fails if Email is incorrect', () => {
        expect(login("ligma.balls@deeznuts.com","password1","admin")).toBe('Invalid username or password');
    });
    test('Login Fails if Password is incorrect', () => {
        expect(login("liam.binedell@gmail.com","password1","admin")).toBe('Invalid username or password');
    });
    test('Login Succeeds if everything is correct', () => {
        expect(login("liam.binedell@gmail.com","password1","admin")).toBe('Login successful!');
    });
});
