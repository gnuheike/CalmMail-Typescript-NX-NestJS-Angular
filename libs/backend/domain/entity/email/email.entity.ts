import { ValueObject } from '@calm-mail/shared-domain';
import { AttachmentEntity } from '../attachment/attachment.entity';

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
 * - to: Array of recipient email addresses
 * - cc: Carbon copy recipients
 * - bcc: Blind carbon copy recipients
 * - receivedAt: When email was received (null for sent or draft emails)
 * - sentAt: When email was sent (null for received or draft emails)
 * - savedAt: When email was last modified (used for all email states)
 * - read: Whether email has been read
 * - body: Email content
 * - preview: A short preview of the email body (first 100 characters)
 * - folderId: Location of email (inbox, sent, etc.)
 * - attachments: Array of email attachments
 */
export class EmailEntity {
    constructor(
        public readonly id: EmailId,
        public readonly subject: string,
        public readonly from: string,
        public readonly to: string[],
        public readonly cc: string[],
        public readonly bcc: string[],
        public readonly receivedAt: Date | null,
        public readonly sentAt: Date | null,
        public readonly savedAt: Date,
        public readonly read: boolean,
        public readonly body: string,
        public readonly preview: string,
        public readonly folderId: string,
        public readonly attachments: AttachmentEntity[],
    ) {}
}

export const mockEmail = new EmailEntity(
    EmailId.fromString('1'),
    'mockSubject',
    'from@test.com',
    ['to@test.com'],
    ['cc@test.com'],
    ['bcc@test.com'],
    new Date(), // receivedAt
    null, // sentAt
    new Date(), // savedAt
    true,
    'mockBody',
    'mockPreview',
    '1',
    [], // attachments
);
