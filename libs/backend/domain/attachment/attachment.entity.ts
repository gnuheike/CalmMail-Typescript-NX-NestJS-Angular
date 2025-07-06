import { AttachmentIdType, IdVO, Entity } from '@calm-mail/shared-domain';

export interface AttachmentProps {
    readonly id: IdVO<AttachmentIdType>;
    readonly filename: string;
    readonly contentType: string;
    readonly size: number;
    readonly contentId?: string;
    readonly content?: string | { storageReference: string };
    readonly createdAt: Date;
    readonly updatedAt: Date;
}

export type CreateAttachmentProps = Omit<AttachmentProps, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Attachment Entity
 *
 * Domain entity representing an email attachment.
 * This follows Clean Architecture principles with proper encapsulation and immutability.
 *
 * Properties:
 * - id: Unique identifier (AttachmentId value object)
 * - filename: Original filename of the attachment
 * - contentType: MIME type of the attachment
 * - size: Size of the attachment in bytes
 * - contentId: Optional Content-ID for inline attachments
 * - content: Base64 encoded content or storage reference
 * - createdAt: When attachment was created
 * - updatedAt: When attachment was last updated
 */
export class AttachmentEntity extends Entity<IdVO<AttachmentIdType>> {
    private readonly props: AttachmentProps;

    constructor(props: AttachmentProps) {
        super(props.id);
        this.validateProps(props);
        this.props = Object.freeze(props); // Ensure immutability
    }

    get filename(): string {
        return this.props.filename;
    }

    get contentType(): string {
        return this.props.contentType;
    }

    get size(): number {
        return this.props.size;
    }

    get contentId(): string | undefined {
        return this.props.contentId;
    }

    get content(): string | { storageReference: string } | undefined {
        return this.props.content;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    get updatedAt(): Date {
        return this.props.updatedAt;
    }

    static create(props: CreateAttachmentProps): AttachmentEntity {
        try {
            const attachmentId = IdVO.generate<AttachmentIdType>('AttachmentId');
            const now = new Date();
            return new AttachmentEntity({
                ...props,
                id: attachmentId,
                createdAt: now,
                updatedAt: now,
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`Failed to create AttachmentEntity: ${message}`);
        }
    }

    private validateProps(props: AttachmentProps): void {
        if (!props.filename.trim()) throw new Error('Filename cannot be empty');
        if (!props.contentType.trim()) throw new Error('Content type cannot be empty');
        if (props.size < 0) throw new Error('Size cannot be negative');
        if (props.size > 25 * 1024 * 1024) throw new Error('Attachment size cannot exceed 25MB');
    }
}

