import { DomainLoginRequest } from '@calm-mail/frontend-domain';
import { Command } from '@calm-mail/shared-domain';

export const LOGIN_COMMAND_TYPE = '[Auth] Login';

export class LoginCommand extends Command<void> {
    readonly type = LOGIN_COMMAND_TYPE;

    constructor(public readonly payload: DomainLoginRequest) {
        super();
    }
}
