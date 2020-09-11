module.exports = {
    verbose: true,
    collectCoverageFrom: ['./src/**/*.{ts,tsx,js,jsx}'],
    coverageThreshold: {
        global: {
            branches: 5,
            functions: 10,
            lines: 30,
            statements: 30,
        },
    },
};
