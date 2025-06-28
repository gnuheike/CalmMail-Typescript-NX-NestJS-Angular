import { CommandHandler } from '@calm-mail/shared-domain';
import { INITIALIZE_AUTH_COMMAND_TYPE, InitializeAuthCommand } from './initialize-auth.command';
import { AuthPersistencePort, AuthStatePort } from '@calm-mail/frontend-domain';
import { inject, Injectable } from '@angular/core';
import { RefreshTokenCommandHandler } from '../refresh-token/refresh-token.command.handler';
import { RefreshTokenCommand } from '../refresh-token/refresh-token.command';
import { LoggerPort } from '@calm-mail/frontend-shared';

@Injectable({
    providedIn: 'root',
})
export class InitializeAuthCommandHandler implements CommandHandler<InitializeAuthCommand> {
    readonly commandType = INITIALIZE_AUTH_COMMAND_TYPE;
    private readonly logger = inject(LoggerPort);
    private readonly state = inject(AuthStatePort);
    private readonly storage = inject(AuthPersistencePort);
    private readonly refreshTokenCommandHandler = inject(RefreshTokenCommandHandler);

    async execute(): Promise<void> {
        try {
            const state = await this.storage.load();

            if (!state) {
                return;
            }

            await this.state.setState(state);

            if (state.isTokenExpired()) {
                await this.refreshTokenCommandHandler.execute(new RefreshTokenCommand());
            }
        } catch (error) {
            await this.logger.error('Failed to initialize auth state', error);
            throw error;
        }
    }
}
