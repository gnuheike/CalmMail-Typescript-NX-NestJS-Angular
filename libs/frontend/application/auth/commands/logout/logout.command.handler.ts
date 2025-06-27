import { CommandHandler } from '@calm-mail/shared-domain';
import { LOGOUT_COMMAND_TYPE, LogoutCommand } from './logout.command';
import { AuthPersistencePort, AuthStatePort, LoggerPort } from '@calm-mail/frontend-domain';
import { inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LogoutCommandHandler implements CommandHandler<LogoutCommand> {
    readonly commandType = LOGOUT_COMMAND_TYPE;
    private readonly logger = inject(LoggerPort);
    private readonly state = inject(AuthStatePort);
    private readonly storage = inject(AuthPersistencePort);

    async execute(): Promise<void> {
        try {
            await Promise.all([this.state.clear(), this.storage.clear()]);
            await this.logger.info('User logged out successfully');
        } catch (error) {
            await this.logger.error('Logout failed', error);
            throw new Error('Logout failed. Please try again.');
        }
    }
}
