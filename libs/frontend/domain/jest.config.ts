export default {
    displayName: 'domain',
    preset: '../../../jest.preset.js',
    testEnvironment: 'node',
    transform: {
        '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
    },
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$|@ionic|@stencil/core)'],
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory: '../../../coverage/libs/frontend/domain',
};
