export default {
    displayName: 'frontend-adapter',
    preset: '../../../jest.preset.js',
    testEnvironment: 'node',
    transform: {
        '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$|@ionic|@stencil/core)'],
    coverageDirectory: '../../../../coverage/libs/frontend/adapter',
};
