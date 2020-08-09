module.exports = {
    verbose: true,
    collectCoverageFrom: ['./src/**/*.{ts,tsx,js,jsx}'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 70,
            lines: 80,
            statements: 80,
        },
    },
};
