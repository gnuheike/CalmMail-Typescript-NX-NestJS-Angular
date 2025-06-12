const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  collectCoverage: true,
  coverageReporters: [
    'json', // For merging with istanbul-merge
    'json-summary', // For quick CI checks
    'lcov', // For codecov and PR comments
    'text', // For console output
    'text-summary', // For CI summary
    'html', // For local development
    'cobertura', // For some CI systems (Azure DevOps, etc.)
  ],
  moduleFileExtensions: ['ts', 'js', 'html'],
  collectCoverageFrom: [
    '**/*.{js,ts,jsx,tsx}',
    '!**/*.d.ts',
    '!**/*.config.{js,ts}',
    '!**/*.spec.{js,ts,jsx,tsx}',
    '!**/*.test.{js,ts,jsx,tsx}',
    '!**/test-setup.ts',
    '!**/jest.config.ts',
    '!**/index.ts',
    '!**/main.ts',
    '!**/polyfills.ts',
    '!**/environment*.ts',
    '!**/generated.*',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/coverage/**',
    '!**/.nx/**',
    '!**/migrations/**',
    '!**/e2e/**',
    '!**/cypress/**',
    '!**/*.routes.ts',
    '!**/__tests__/**',
  ],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
