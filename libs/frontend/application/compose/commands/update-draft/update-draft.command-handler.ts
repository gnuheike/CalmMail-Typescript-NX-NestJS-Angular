import { CommandHandler } from '@calm-mail/shared-domain';
import { UPDATE_DRAFT_COMMAND_TYPE, UpdateDraftCommand } from './update-draft.command';
import { EmailRepositoryPort } from '@calm-mail/frontend-domain';
import { inject, Injectable } from '@angular/core';
import { LoggerPort } from '@calm-mail/frontend-shared';
import { EmailContractMapper } from '@calm-mail/frontend-adapter';

@Injectable({
    providedIn: 'root',
})
export class UpdateDraftCommandHandler implements CommandHandler<UpdateDraftCommand> {
    readonly commandType = UPDATE_DRAFT_COMMAND_TYPE;
    private readonly logger = inject(LoggerPort);
    private readonly emailRepository = inject(EmailRepositoryPort);

    async execute(command: UpdateDraftCommand): Promise<void> {
        try {
            const updateEmailRequest = EmailContractMapper.toDomainUpdate(command.payload);
            await this.emailRepository.updateEmail(command.id, updateEmailRequest);
        } catch (error) {
            await this.logger.error('Failed to update draft:', error);
            throw new Error('Failed to update draft. Please try again.');
        }
    }
}
