import { Email } from '@calm-mail/contract';
import { ValueObject } from '@calm-mail/shared-domain';

export class EmailId extends ValueObject<string> {
    protected _type!: void;

    static fromString(id: string): EmailId {
        return new EmailId(id);
    }
}

/**
 * EmailVm (View Model)
 *
 * A thin view-model representation of an Email entity for UI components.
 * This decouples the UI from the domain model, allowing each to evolve independently.
 *
 * Properties:
 * - id: Unique identifier (EmailId value object)
 * - subject: Email subject line
 * - from: Sender's email address
 * - processedAt: When email was received or sent
 * - read: Whether email has been read
 * - body: Email content
 * - preview: A short preview of the email body (first 100 characters)
 */
export interface EmailVm {
    id: EmailId;
    subject: string;
    from: string;
    processedAt: Date;
    read: boolean;
    body: string;
    preview: string;
}

/**
 * Maps a domain Email model to an EmailVm view-model.
 * This function should be used in facades or selectors to convert domain models to view-models.
 *
 * @param email The domain Email model
 * @returns An EmailVm view-model
 */
export function mapToEmailVm(email: Email): EmailVm {
    const body = email.body || '';
    return {
        id: EmailId.fromString(email.id),
        subject: email.subject,
        from: email.from,
        processedAt: email.processedAt,
        read: email.read,
        body: email.body || '',
        preview: body.substring(0, 100) + (body.length > 100 ? '...' : ''),
    };
}

/**
 * Maps an array of domain Email models to an array of EmailVm view-models.
 *
 * @param emails An array of domain Email models
 * @returns An array of EmailVm view-models
 */
export function mapToEmailVms(emails: Email[]): EmailVm[] {
    return emails.map(mapToEmailVm);
}
