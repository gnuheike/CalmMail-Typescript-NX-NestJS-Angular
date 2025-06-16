import { inMemoryEmailGatewayProviders, inMemoryFolderGatewayProviders } from '@calm-mail/frontend-infrastructure';
import { Environment } from './environment.interface';

/**
 * Represents the application environment configuration.
 */
export const environment: Environment = {
    production: false,
    gatewayProviders: [...inMemoryFolderGatewayProviders(), ...inMemoryEmailGatewayProviders()],
};
