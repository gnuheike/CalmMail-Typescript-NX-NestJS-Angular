import { CommandHandler } from '@calm-mail/shared-domain';
import { SEND_EMAIL_COMMAND_TYPE, SendEmailCommand } from './send-email.command';
import { EmailEntity, EmailRepositoryPort, LoggerPort } from '@calm-mail/frontend-domain';
import { inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SendEmailCommandHandler implements CommandHandler<SendEmailCommand> {
    readonly commandType = SEND_EMAIL_COMMAND_TYPE;
    private readonly logger = inject(LoggerPort);
    private readonly emailRepository = inject(EmailRepositoryPort);

    async execute(command: SendEmailCommand): Promise<EmailEntity> {
        try {
            const email = EmailEntity.createFromContract(command.payload);

            try {
                return this.emailRepository.createEmail(email);
            } catch (error) {
                await this.logger.error('Failed to send email:', error);
                throw new Error('Failed to send email. Please try again.');
            }
        } catch (error) {
            await this.logger.error('Failed to create email entity:', error);
            throw new Error('Failed to create email. Please check your input and try again.');
        }
    }
}
