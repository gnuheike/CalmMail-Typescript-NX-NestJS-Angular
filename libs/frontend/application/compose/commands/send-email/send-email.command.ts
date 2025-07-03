import { Command } from '@calm-mail/shared-domain';
import { EmailEntity, DomainCreateEmailRequest } from '@calm-mail/frontend-domain';

export const SEND_EMAIL_COMMAND_TYPE = '[Compose] Send Email';

export class SendEmailCommand extends Command<EmailEntity> {
    readonly type = SEND_EMAIL_COMMAND_TYPE;

    constructor(public readonly payload: DomainCreateEmailRequest) {
        super();
    }
}
