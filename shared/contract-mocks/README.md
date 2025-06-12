# Contract Mocks Library

This library provides static mock data that aligns with the contracts defined in `shared/contract`. It serves as a centralized, logic-free source of realistic data for various parts of the monorepo (frontend, tests, storybook).

## Purpose

The sole purpose of this library is to house static, raw mock data structures. It does not contain any services, network simulation, or complex logic; it is purely for data definition.

## Usage

```typescript
// Import the mock data
import { MOCK_FOLDERS_INITIAL_STATE } from '@calm-mail/shared/contract-mocks';

// Use the mock data in your components, tests, or storybook stories
console.log(MOCK_FOLDERS_INITIAL_STATE);
```

## Available Mock Data

- **Folders**: `MOCK_FOLDERS_INITIAL_STATE` - A collection of default system folders and custom folders with realistic data.

## Building

Run `nx build contract-mocks` to build the library.

## Running unit tests

Run `nx test contract-mocks` to execute the unit tests via [Jest](https://jestjs.io).
