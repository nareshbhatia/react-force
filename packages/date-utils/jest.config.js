module.exports = {
    verbose: true,
    collectCoverageFrom: ['./src/**/*.{ts,tsx,js,jsx}'],
    coverageThreshold: {
        global: {
            branches: 60,
            functions: 70,
            lines: 80,
            statements: 80,
        },
    },
};
