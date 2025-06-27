import {
    consoleLoggerProvider,
    inMemoryAuthProvider,
    inMemoryEmailRepositoryProvider,
    inMemoryFolderRepositoryProvider,
    staticFolderIconsProvider
} from '@calm-mail/frontend-adapter';
import { Provider } from '@angular/core';
import { environment } from '../environment/environment';

/**
 * An array of providers used for the production environment.
 * Each provider is responsible for supplying specific functionalities such as
 * authentication, logging, icons management, folder repository, and email repository.
 * These providers are initialized with their respective configurations for in-memory implementation.
 */
const productionProviders: Provider[] = [
    ...inMemoryAuthProvider(),
    ...consoleLoggerProvider(),
    ...staticFolderIconsProvider(),
    ...inMemoryFolderRepositoryProvider(),
    ...inMemoryEmailRepositoryProvider(),
];

/**
 * An array of providers used during development. These providers are initialized by spreading
 * their respective factory functions' output arrays. Each provider contributes specific
 * functionality or services suited for a development environment.
 *
 * This variable includes:
 * - Providers for in-memory authentication.
 * - A logging provider that outputs logs to the console.
 * - A static folder provider for managing icons.
 * - An in-memory repository for managing folder-related data.
 * - An in-memory repository for managing email-related data.
 *
 * @type {Provider[]} Array of development-specific providers.
 */
const developmentProviders: Provider[] = [
    ...inMemoryAuthProvider(),
    ...consoleLoggerProvider(),
    ...staticFolderIconsProvider(),
    ...inMemoryFolderRepositoryProvider(),
    ...inMemoryEmailRepositoryProvider(),
];

export const provideCalmMailEnvironment = (): Provider[] => {
    return environment.production ? productionProviders : developmentProviders;
};
