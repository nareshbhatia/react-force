module.exports = {
    verbose: true,
    testEnvironment: 'jest-environment-jsdom-sixteen',
    setupFilesAfterEnv: ['./jest.setup.ts'],
    collectCoverageFrom: ['./src/**/*.{ts,tsx,js,jsx}'],
    coverageThreshold: {
        global: {
            branches: 75,
            functions: 75,
            lines: 80,
            statements: 80,
        },
    },
};
