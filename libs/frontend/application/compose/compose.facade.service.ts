import { inject, Injectable } from '@angular/core';
import { SendEmailCommandHandler } from './commands/send-email/send-email.command-handler';
import { SendEmailCommand } from './commands/send-email/send-email.command';
import { SaveDraftCommandHandler } from './commands/save-draft/save-draft.command-handler';
import { SaveDraftCommand } from './commands/save-draft/save-draft.command';

@Injectable()
export class ComposeFacade {
    private readonly sendEmailCommandHandler = inject(SendEmailCommandHandler);
    private readonly saveDraftCommandHandler = inject(SaveDraftCommandHandler);

    /**
     * Send a new email
     *
     * @param from Sender's email address
     * @param to Recipients
     * @param subject Email subject
     * @param body Email content
     * @param cc Carbon copy recipients (optional)
     * @param bcc Blind carbon copy recipients (optional)
     * @returns Promise that resolves when the email is sent
     */
    async sendEmail(from: string, to: string[], subject: string, body: string, cc: string[] = [], bcc: string[] = []): Promise<void> {
        const command = new SendEmailCommand({
            id: '',
            subject,
            from,
            to,
            cc,
            bcc,
            body,
            processedAt: new Date(),
            read: true,
            isDraft: false,
            folderId: '', // Will be determined by the server
        });
        await this.sendEmailCommandHandler.execute(command);
    }

    /**
     * Save email as draft
     *
     * @param from Sender's email address
     * @param to Recipients
     * @param subject Email subject
     * @param body Email content
     * @param cc Carbon copy recipients (optional)
     * @param bcc Blind carbon copy recipients (optional)
     * @returns Promise that resolves when the draft is saved
     */
    saveDraft(from: string, to: string[], subject: string, body: string, cc: string[] = [], bcc: string[] = []): Promise<void> {
        const command = new SaveDraftCommand({
            id: '',
            subject,
            from,
            to,
            cc,
            bcc,
            body,
            processedAt: new Date(),
            read: true,
            isDraft: true,
            folderId: '', // Will be determined by the server
        });
        return this.saveDraftCommandHandler.execute(command);
    }
}
