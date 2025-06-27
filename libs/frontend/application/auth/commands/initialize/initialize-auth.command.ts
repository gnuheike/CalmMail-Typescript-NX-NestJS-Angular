import { Command } from '@calm-mail/shared-domain';

export const INITIALIZE_AUTH_COMMAND_TYPE = '[Auth] Initialize';

export class InitializeAuthCommand extends Command<void> {
    readonly type = INITIALIZE_AUTH_COMMAND_TYPE;
}
