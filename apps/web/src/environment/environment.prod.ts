import { Environment } from './environment.interface';
import { consoleLoggerProvider, inMemoryAuthGatewayProvider, inMemoryEmailGatewayProvider, inMemoryFolderGatewayProvider } from '@calm-mail/frontend/adapter';

export const environment: Environment = {
    production: true,
    gatewayProviders: [...inMemoryFolderGatewayProvider(), ...inMemoryEmailGatewayProvider(), ...inMemoryAuthGatewayProvider()],
    loggerProviders: [...consoleLoggerProvider()],
};
