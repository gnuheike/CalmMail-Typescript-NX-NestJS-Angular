import { CommandHandler } from '@calm-mail/shared-domain';
import { SAVE_DRAFT_COMMAND_TYPE, SaveDraftCommand } from './save-draft.command';
import { EmailEntity, EmailRepositoryPort, LoggerPort } from '@calm-mail/frontend-domain';
import { inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SaveDraftCommandHandler implements CommandHandler<SaveDraftCommand> {
    readonly commandType = SAVE_DRAFT_COMMAND_TYPE;
    private readonly logger = inject(LoggerPort);
    private readonly emailRepository = inject(EmailRepositoryPort);

    async execute(command: SaveDraftCommand): Promise<void> {
        try {
            const email = EmailEntity.createFromContract(command.payload);

            try {
                await this.emailRepository.createEmail(email);
            } catch (error) {
                await this.logger.error('Failed to save draft:', error);
                throw new Error('Failed to save draft. Please try again.');
            }
        } catch (error) {
            await this.logger.error('Failed to create draft entity:', error);
            throw new Error('Failed to create draft. Please check your input and try again.');
        }
    }
}
