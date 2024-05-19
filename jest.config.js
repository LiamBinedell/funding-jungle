module.exports = {
    transform: {
      "^.+\\.[t|j]sx?$": "babel-jest"
    },
    testEnvironment: "node",
    moduleFileExtensions: ["js", "jsx", "json", "node"],
    testPathIgnorePatterns: ["/node_modules/"],
    verbose: true,
};