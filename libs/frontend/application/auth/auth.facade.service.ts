import { computed, inject, Injectable } from '@angular/core';
import { LoginCommand } from './commands/login/login.command';
import { RegisterCommand } from './commands/register/register.command';
import { LogoutCommand } from './commands/logout/logout.command';
import { RefreshTokenCommand } from './commands/refresh-token/refresh-token.command';
import { GetAccessTokenCommand } from './commands/get-access-token/get-access-token.command';
import { InitializeAuthCommand } from './commands/initialize/initialize-auth.command';
import { AuthStatePort, DomainLoginRequest, DomainRegisterRequest } from '@calm-mail/frontend-domain';
import { CommandBus } from '@calm-mail/shared-domain';

@Injectable()
export class AuthFacade {
    readonly #commandBus = inject(CommandBus);
    readonly #authState = inject(AuthStatePort);
    readonly #currentState = this.#authState.getState();
    readonly currentUserEmail = computed(() => {
        return this.#currentState().user?.email;
    });
    readonly currentUserId = computed(() => {
        return this.#currentState().user?.id;
    });

    /**
     * Initialize auth state from storage
     * Should be used with APP_INITIALIZER
     */
    initialize(): Promise<void> {
        return this.#commandBus.dispatch(new InitializeAuthCommand());
    }

    login(email: string, password: string): Promise<void> {
        const domainRequest: DomainLoginRequest = { email, password };
        return this.#commandBus.dispatch(new LoginCommand(domainRequest));
    }

    register(email: string, password: string, name?: string): Promise<void> {
        const domainRequest: DomainRegisterRequest = { email, password };
        if (name !== undefined) {
            domainRequest.name = name;
        }
        return this.#commandBus.dispatch(new RegisterCommand(domainRequest));
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
