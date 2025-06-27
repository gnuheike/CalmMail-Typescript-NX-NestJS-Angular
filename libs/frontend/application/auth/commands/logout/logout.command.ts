import { Command } from '@calm-mail/shared-domain';

export const LOGOUT_COMMAND_TYPE = '[Auth] Logout';

export class LogoutCommand extends Command<void> {
    readonly type = LOGOUT_COMMAND_TYPE;
}
