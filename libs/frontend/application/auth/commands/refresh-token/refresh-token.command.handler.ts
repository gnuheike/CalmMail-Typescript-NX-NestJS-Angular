import { CommandHandler } from '@calm-mail/shared-domain';
import { REFRESH_TOKEN_COMMAND_TYPE, RefreshTokenCommand } from './refresh-token.command';
import { firstValueFrom } from 'rxjs';
import { AuthPersistencePort, AuthRepositoryPort, AuthStatePort, mapAuthTokenToVm } from '@calm-mail/frontend-domain';
import { inject, Injectable } from '@angular/core';
import { LogoutCommandHandler } from '../logout/logout.command.handler';
import { LoggerPort } from '@calm-mail/frontend-shared';
import { AuthContractMapper } from '@calm-mail/frontend-adapter';

@Injectable({
    providedIn: 'root',
})
export class RefreshTokenCommandHandler implements CommandHandler<RefreshTokenCommand> {
    readonly commandType = REFRESH_TOKEN_COMMAND_TYPE;
    private readonly logger = inject(LoggerPort);
    private readonly repository = inject(AuthRepositoryPort);
    private readonly state = inject(AuthStatePort);
    private readonly storage = inject(AuthPersistencePort);
    private readonly logoutCommandHandler = inject(LogoutCommandHandler);

    private refreshInProgress: Promise<void> | null = null;

    async execute(command: RefreshTokenCommand): Promise<void> {
        // If a refresh is already in progress, return that promise
        if (this.refreshInProgress) {
            return this.refreshInProgress;
        }

        try {
            // Create a new promise and store it
            this.refreshInProgress = this.refreshToken(command);
            return this.refreshInProgress;
        } finally {
            // Ensure refreshInProgress is reset when the promise resolves or rejects
            this.refreshInProgress?.finally(() => {
                this.refreshInProgress = null;
            });
        }
    }

    private async refreshToken(command: RefreshTokenCommand): Promise<void> {
        // Get current state
        const currentState = this.state.getState()();

        // Early exit if no state or refresh token
        if (!currentState || !currentState.tokens?.refreshToken) {
            throw new Error('No refresh token found. Please login again.');
        }

        try {
            // Use refresh token from command payload or from current state
            const refreshToken = command.payload?.refreshToken || currentState.tokens.refreshToken;

            // Create domain request and convert to contract
            const domainRequest = { refreshToken };
            const contractRequest = AuthContractMapper.toContractRefreshToken(domainRequest);

            // Call repository to refresh token
            const response = await firstValueFrom(this.repository.refreshToken(contractRequest));

            // Map response to view model
            const tokens = mapAuthTokenToVm(response.tokens);

            // Update tokens in state
            await this.state.updateTokens(tokens);

            // Get updated state
            const updatedState = this.state.getState()();

            // Save updated state to storage
            if (updatedState) {
                await this.storage.save(updatedState);
            }
        } catch (error) {
            // Log error and logout on failure
            await this.logger.error('Token refresh failed', error);
            await this.logoutCommandHandler.execute();
        }
    }
}
