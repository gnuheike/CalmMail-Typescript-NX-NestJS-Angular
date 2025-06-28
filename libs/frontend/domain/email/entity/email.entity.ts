import { ValueObject } from '@calm-mail/shared-domain';
import { Email } from '@calm-mail/contract';

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
export class EmailEntity {
    constructor(
        public readonly id: EmailId,
        public readonly subject: string,
        public readonly from: string,
        public readonly to: string[],
        public readonly cc: string[],
        public readonly bcc: string[],
        public readonly processedAt: Date,
        public readonly read: boolean,
        public readonly body: string,
        public readonly preview: string,
        public readonly folderId: string,
    ) {}

    static createFromContract(email: Email): EmailEntity {
        return new EmailEntity(
            EmailId.fromString(email.id),
            email.subject,
            email.from,
            email.to,
            email.cc || [],
            email.bcc || [],
            email.processedAt,
            email.read,
            email.body,
            email.body.substring(0, 100), // preview is first 100 chars of body
            email.folderId,
        );
    }
}

export const mockEmail = new EmailEntity(
    EmailId.fromString('1'),
    'mockSubject',
    'from@test.com',
    ['to@test.com'],
    ['cc@test.com'],
    ['bcc@test.com'],
    new Date(),
    true,
    'mockBody',
    'mockPreview',
    '1',
);
