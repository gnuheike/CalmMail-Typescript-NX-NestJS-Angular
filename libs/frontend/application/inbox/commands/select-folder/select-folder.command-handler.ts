import { CommandHandler } from '@calm-mail/shared-domain';
import { SELECT_FOLDER_COMMAND_TYPE, SelectFolderCommand } from './select-folder.command';
import { EmailStateService, LoggerPort } from '@calm-mail/frontend-domain';
import { inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SelectFolderCommandHandler implements CommandHandler<SelectFolderCommand> {
    readonly commandType = SELECT_FOLDER_COMMAND_TYPE;
    private readonly logger = inject(LoggerPort);
    private readonly emailState = inject(EmailStateService);

    async execute(command: SelectFolderCommand): Promise<void> {
        const { folder } = command.payload;

        try {
            this.emailState.selectFolder(folder);

            try {
                await this.emailState.loadEmailsForFolder(folder.id);
            } catch (error) {
                await this.logger.error('Failed to load emails for folder:', error);
                throw new Error(`Failed to load emails for folder "${folder.name}". Please try again.`);
            }
        } catch (error) {
            await this.logger.error('Failed to select folder:', error);
            throw new Error(`Failed to select folder "${folder.name}". Please try again.`);
        }
    }
}
