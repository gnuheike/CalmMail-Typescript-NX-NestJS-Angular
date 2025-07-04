import { ValueObject } from '@calm-mail/shared-domain';

export class AttachmentId extends ValueObject<string> {
    protected _type!: void;

    static fromString(id: string): AttachmentId {
        return new AttachmentId(id);
    }
}

/**
 * AttachmentEntity
 *
 * Domain entity representing an email attachment.
 * This decouples the UI from the contract model, allowing each to evolve independently.
 *
 * Properties:
 * - id: Unique identifier (AttachmentId value object)
 * - filename: Original filename of the attachment
 * - contentType: MIME type of the attachment
 * - size: Size of the attachment in bytes
 * - contentId: Optional Content-ID for inline attachments
 * - content: Base64 encoded content or storage reference
 */
export class AttachmentEntity {
    constructor(
        public readonly id: AttachmentId,
        public readonly filename: string,
        public readonly contentType: string,
        public readonly size: number,
        public readonly contentId?: string,
        public readonly content?: string | { storageReference: string },
    ) {}
}

export const mockAttachment = new AttachmentEntity(
    AttachmentId.fromString('att_1'),
    'document.pdf',
    'application/pdf',
    1024000,
    undefined,
    'base64encodedcontent...',
);
