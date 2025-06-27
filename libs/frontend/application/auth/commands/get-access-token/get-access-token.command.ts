import { Command } from '@calm-mail/shared-domain';

export const GET_ACCESS_TOKEN_COMMAND_TYPE = '[Auth] Get Access Token';

export class GetAccessTokenCommand extends Command<string | undefined> {
    readonly type = GET_ACCESS_TOKEN_COMMAND_TYPE;
}
