import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();

// @ts-expect-error https://thymikee.github.io/jest-preset-angular/docs/getting-started/test-environment
globalThis.ngJest = {
    testEnvironmentOptions: {
        errorOnUnknownElements: true,
        errorOnUnknownProperties: true
    }
};

// Mock URL.createObjectURL
globalThis.URL = globalThis.URL || {};
globalThis.URL.createObjectURL = jest.fn(() => 'mocked-blob-url');
