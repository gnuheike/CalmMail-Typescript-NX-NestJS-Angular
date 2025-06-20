import { Environment } from './environment.interface';
import {
    consoleLoggerProvider,
    inMemoryAuthGatewayProvider,
    inMemoryEmailGatewayProvider,
    inMemoryFolderGatewayProvider
} from '@calm-mail/frontend/adapter';

/**
 * Represents the application environment configuration.
 */
export const environment: Environment = {
    production: false,
    gatewayProviders: [...inMemoryFolderGatewayProvider(), ...inMemoryEmailGatewayProvider(), ...inMemoryAuthGatewayProvider()],
    loggerProviders: [...consoleLoggerProvider()],
};
