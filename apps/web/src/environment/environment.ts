import { inMemoryEmailGatewayProviders, inMemoryFolderGatewayProviders } from '@calm-mail/frontend-infrastructure';
import { Provider } from '@angular/core';

/**
 * Represents the environment configuration of an application.
 *
 * @interface Environment
 *
 * @property {boolean} production - A flag indicating whether the application is running in production mode.
 * @property {Provider[]} gatewayProviders - An array of gateway providers used in the application.
 */
export interface Environment {
    production: boolean;
    gatewayProviders: Provider[];
}

/**
 * Represents the application environment configuration.
 */
export const environment: Environment = {
    production: false,
    gatewayProviders: [...inMemoryFolderGatewayProviders(), ...inMemoryEmailGatewayProviders()],
};
