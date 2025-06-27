import { EnvironmentProviders, inject, provideAppInitializer, Provider } from '@angular/core';
import { AuthFacade } from '../auth.facade.service';
import { COMMAND_HANDLER_TOKEN } from '@calm-mail/frontend-adapter';
import { LoginCommandHandler } from '../commands/login/login.command.handler';
import { RegisterCommandHandler } from '../commands/register/register.command.handler';
import { LogoutCommandHandler } from '../commands/logout/logout.command.handler';
import { RefreshTokenCommandHandler } from '../commands/refresh-token/refresh-token.command.handler';
import { GetAccessTokenCommandHandler } from '../commands/get-access-token/get-access-token.command.handler';
import { InitializeAuthCommandHandler } from '../commands/initialize/initialize-auth-command-handler.service';

/**
 * Setup function for the auth service initialization
 */
export function setupAuthService(): () => Promise<void> {
    return () => {
        const authService = inject(AuthFacade);
        return authService.initialize();
    };
}

/**
 * Provides the auth service initializer for the application
 */
export function provideAuthFeature(): Array<EnvironmentProviders | Provider> {
    return [
        provideAppInitializer(setupAuthService()),
        AuthFacade,
        { provide: COMMAND_HANDLER_TOKEN, useExisting: LoginCommandHandler, multi: true },
        { provide: COMMAND_HANDLER_TOKEN, useExisting: RegisterCommandHandler, multi: true },
        { provide: COMMAND_HANDLER_TOKEN, useExisting: LogoutCommandHandler, multi: true },
        { provide: COMMAND_HANDLER_TOKEN, useExisting: RefreshTokenCommandHandler, multi: true },
        { provide: COMMAND_HANDLER_TOKEN, useExisting: GetAccessTokenCommandHandler, multi: true },
        { provide: COMMAND_HANDLER_TOKEN, useExisting: InitializeAuthCommandHandler, multi: true },
    ];
}
