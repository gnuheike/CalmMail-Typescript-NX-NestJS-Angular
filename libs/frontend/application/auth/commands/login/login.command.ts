import { LoginRequest } from '@calm-mail/contract';
import { Command } from '@calm-mail/shared-domain';

export const LOGIN_COMMAND_TYPE = '[Auth] Login';

export class LoginCommand extends Command<void> {
    readonly type = LOGIN_COMMAND_TYPE;

    constructor(public readonly payload: LoginRequest) {
        super();
    }
}
