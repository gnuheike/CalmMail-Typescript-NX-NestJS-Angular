import { CommandHandler } from '@calm-mail/shared-domain';
import { GET_ACCESS_TOKEN_COMMAND_TYPE, GetAccessTokenCommand } from './get-access-token.command';
import { AuthStatePort, LoggerPort } from '@calm-mail/frontend-domain';
import { inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class GetAccessTokenCommandHandler implements CommandHandler<GetAccessTokenCommand> {
    readonly commandType = GET_ACCESS_TOKEN_COMMAND_TYPE;
    private readonly logger = inject(LoggerPort);
    private readonly state = inject(AuthStatePort);

    async execute(): Promise<string | undefined> {
        try {
            const state = this.state.getState()();

            const authToken = state?.tokens;
            if (authToken && authToken.accessToken) {
                return authToken.accessToken;
            }

            // Fallback: Return undefined if we can't access the token
            await this.logger.warn('Unable to access auth token. Check AuthStatePort implementation.');
            return undefined;
        } catch (error) {
            await this.logger.error('Failed to get access token', error);
            return undefined;
        }
    }
}
