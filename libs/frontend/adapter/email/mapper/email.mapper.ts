import { Email } from '@calm-mail/contract';
import { EmailEntity, EmailId, AttachmentEntity, AttachmentId } from '@calm-mail/frontend-domain';

/**
 * Maps a domain Email model to an EmailVm view-model.
 * This function should be used in facades or selectors to convert domain models to view-models.
 *
 * @param email The domain Email model
 * @returns An EmailVm view-model
 */
export function mapToEmailContractToEntity(email: Email): EmailEntity {
    const body = email.body || '';
    const attachments = (email.attachments || []).map(attachment => 
        new AttachmentEntity(
            AttachmentId.fromString(attachment.id),
            attachment.filename,
            attachment.contentType,
            attachment.size,
            attachment.contentId,
            attachment.content
        )
    );

    return new EmailEntity(
        EmailId.fromString(email.id),
        email.subject,
        email.from,
        email.to,
        email.cc,
        email.bcc,
        email.receivedAt,
        email.sentAt,
        email.savedAt,
        email.read,
        body,
        body.substring(0, 100) + (body.length > 100 ? '...' : ''),
        email.folderId,
        attachments,
    );
}

/**
 * Maps an array of domain Email models to an array of EmailVm view-models.
 *
 * @param emails An array of domain Email models
 * @returns An array of EmailVm view-models
 */
export function mapToEmailContractsToEntities(emails: Email[]): EmailEntity[] {
    return emails.map(mapToEmailContractToEntity);
}
