import { computed, inject, Injectable } from '@angular/core';
import { LoginCommand } from './commands/login/login.command';
import { RegisterCommand } from './commands/register/register.command';
import { LogoutCommand } from './commands/logout/logout.command';
import { RefreshTokenCommand } from './commands/refresh-token/refresh-token.command';
import { GetAccessTokenCommand } from './commands/get-access-token/get-access-token.command';
import { InitializeAuthCommand } from './commands/initialize/initialize-auth.command';
import { AuthStatePort } from '@calm-mail/frontend-domain';
import { CommandBus } from '@calm-mail/shared-domain';

@Injectable()
export class AuthFacade {
    readonly #commandBus = inject(CommandBus);
    readonly #authState = inject(AuthStatePort);
    readonly #currentState = this.#authState.getState();
    readonly currentUserEmail = computed(() => {
        return this.#currentState().user?.email;
    });

    /**
     * Initialize auth state from storage
     * Should be used with APP_INITIALIZER
     */
    initialize(): Promise<void> {
        return this.#commandBus.dispatch(new InitializeAuthCommand());
    }

    login(email: string, password: string): Promise<void> {
        return this.#commandBus.dispatch(new LoginCommand({ email, password }));
    }

    register(email: string, password: string, name?: string): Promise<void> {
        const command = new RegisterCommand({ email, password, name });
        return this.#commandBus.dispatch(command);
    }

    logout(): Promise<void> {
        return this.#commandBus.dispatch(new LogoutCommand());
    }

    refreshToken(): Promise<void> {
        return this.#commandBus.dispatch(new RefreshTokenCommand());
    }

    getAccessToken(): Promise<string | undefined> {
        return this.#commandBus.dispatch(new GetAccessTokenCommand());
    }
}
