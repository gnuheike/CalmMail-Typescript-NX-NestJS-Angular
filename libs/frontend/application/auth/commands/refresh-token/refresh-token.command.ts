import { DomainRefreshTokenRequest } from '@calm-mail/frontend-domain';
import { Command } from '@calm-mail/shared-domain';

export const REFRESH_TOKEN_COMMAND_TYPE = '[Auth] Refresh Token';

export class RefreshTokenCommand extends Command<void> {
    readonly type = REFRESH_TOKEN_COMMAND_TYPE;

    constructor(public readonly payload?: DomainRefreshTokenRequest) {
        super();
    }
}
