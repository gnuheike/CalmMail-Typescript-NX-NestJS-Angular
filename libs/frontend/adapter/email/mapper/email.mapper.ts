import { Email } from '@calm-mail/contract';
import { EmailEntity, EmailId } from '@calm-mail/frontend-domain';

/**
 * Maps a domain Email model to an EmailVm view-model.
 * This function should be used in facades or selectors to convert domain models to view-models.
 *
 * @param email The domain Email model
 * @returns An EmailVm view-model
 */
export function mapToEmailContractToEntity(email: Email): EmailEntity {
    const body = email.body || '';
    return new EmailEntity(
        EmailId.fromString(email.id),
        email.subject,
        email.from,
        email.to,
        email.cc,
        email.bcc,
        email.processedAt,
        email.read,
        body,
        body.substring(0, 100) + (body.length > 100 ? '...' : ''),
        email.folderId,
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
