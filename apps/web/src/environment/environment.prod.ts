import { inMemoryEmailGatewayProviders, inMemoryFolderGatewayProviders } from '@calm-mail/frontend-infrastructure';
import { Environment } from './environment';

export const environment: Environment = {
    production: true,
    gatewayProviders: [...inMemoryFolderGatewayProviders(), ...inMemoryEmailGatewayProviders()],
};
