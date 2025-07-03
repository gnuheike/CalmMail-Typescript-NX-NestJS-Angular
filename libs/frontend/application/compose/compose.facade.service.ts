import { inject, Injectable } from '@angular/core';
import { SendEmailCommandHandler } from './commands/send-email/send-email.command-handler';
import { SendEmailCommand } from './commands/send-email/send-email.command';
import { SaveDraftCommandHandler } from './commands/save-draft/save-draft.command-handler';
import { SaveDraftCommand } from './commands/save-draft/save-draft.command';
import { UpdateDraftCommandHandler } from './commands/update-draft/update-draft.command-handler';
import { UpdateDraftCommand } from './commands/update-draft/update-draft.command';
import { DomainCreateEmailRequest, DomainUpdateEmailRequest, CreateAttachmentRequest } from '@calm-mail/frontend-domain';

@Injectable()
export class ComposeFacade {
    private readonly sendEmailCommandHandler = inject(SendEmailCommandHandler);
    private readonly saveDraftCommandHandler = inject(SaveDraftCommandHandler);
    private readonly updateDraftCommandHandler = inject(UpdateDraftCommandHandler);

    /**
     * Send a new email
     *
     * @param accountId ID of the email account to send from
     * @param from Sender's email address
     * @param to Recipients
     * @param subject Email subject
     * @param body Email content
     * @param cc Carbon copy recipients (optional)
     * @param bcc Blind carbon copy recipients (optional)
     * @param attachments Email attachments (optional)
     * @param threadId Conversation thread ID (optional)
     * @returns Promise that resolves when the email is sent
     */
    async sendEmail(
        accountId: string,
        from: string,
        to: string[],
        subject: string,
        body: string,
        cc: string[] = [],
        bcc: string[] = [],
        attachments: CreateAttachmentRequest[] = [],
        threadId?: string,
    ): Promise<void> {
        const domainRequest: DomainCreateEmailRequest = {
            id: '', // Generate ID or let backend handle it
            subject,
            from,
            to,
            cc,
            bcc,
            body,
            attachments,
            receivedAt: null,
            sentAt: new Date(),
            savedAt: new Date(),
            read: true,
            isDraft: false,
            folderId: '',
            accountId,
            ...(threadId && { threadId }),
        };

        const command = new SendEmailCommand(domainRequest);
        await this.sendEmailCommandHandler.execute(command);
    }

    /**
     * Save email as draft
     *
     * @param accountId ID of the email account to save draft for
     * @param from Sender's email address
     * @param to Recipients
     * @param subject Email subject
     * @param body Email content
     * @param cc Carbon copy recipients (optional)
     * @param bcc Blind carbon copy recipients (optional)
     * @param attachments Email attachments (optional)
     * @param threadId Conversation thread ID (optional)
     * @returns Promise that resolves when the draft is saved
     */
    saveDraft(
        accountId: string,
        from: string,
        to: string[],
        subject: string,
        body: string,
        cc: string[] = [],
        bcc: string[] = [],
        attachments: CreateAttachmentRequest[] = [],
        threadId?: string,
    ): Promise<void> {
        const domainRequest: DomainCreateEmailRequest = {
            id: '',
            subject,
            from,
            to,
            cc,
            bcc,
            body,
            attachments,
            receivedAt: null,
            sentAt: null,
            savedAt: new Date(),
            read: true,
            isDraft: true,
            folderId: '', // Will be determined by the server
            accountId,
            ...(threadId && { threadId }),
        };

        const command = new SaveDraftCommand(domainRequest);
        return this.saveDraftCommandHandler.execute(command);
    }

    updateDraft(
        id: string,
        updates: {
            to?: string[];
            cc?: string[];
            bcc?: string[];
            subject?: string;
            body?: string;
            folderId?: string;
            read?: boolean;
        }
    ): Promise<void> {
        const domainRequest: DomainUpdateEmailRequest = updates;
        const command = new UpdateDraftCommand(id, domainRequest);
        return this.updateDraftCommandHandler.execute(command);
    }
}
