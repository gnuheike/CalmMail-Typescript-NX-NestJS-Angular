import { RegisterRequest } from '@calm-mail/contract';
import { Command } from '@calm-mail/shared-domain';

export const REGISTER_COMMAND_TYPE = '[Auth] Register';

export class RegisterCommand extends Command<void> {
    readonly type = REGISTER_COMMAND_TYPE;

    constructor(public readonly payload: RegisterRequest) {
        super();
    }
}
