import { AttachmentEntity } from '../attachment/attachment.entity';
import { AggregateRoot, EmailIdType, EmailVO, IdVO } from '@calm-mail/shared-domain';

export interface EmailProps {
    readonly id: IdVO<EmailIdType>;
    readonly subject: string;
    readonly from: EmailVO;
    readonly to: EmailVO[];
    readonly cc: EmailVO[];
    readonly bcc: EmailVO[];
    readonly receivedAt: Date | null;
    readonly sentAt: Date | null;
    readonly savedAt: Date;
    readonly read: boolean;
    readonly body: string;
    readonly preview: string;
    readonly folderId: string;
    readonly attachments: AttachmentEntity[];
    readonly createdAt: Date;
    readonly updatedAt: Date;
}

export type CreateEmailProps = Omit<EmailProps, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Email Entity
 *
 * Domain entity representing an email message.
 * This follows Clean Architecture principles with proper encapsulation and immutability.
 *
 * Properties:
 * - id: Unique identifier (EmailId value object)
 * - subject: Email subject line
 * - from: Sender's email address (EmailVO)
 * - to: Array of recipient email addresses (EmailVO[])
 * - cc: Carbon copy recipients (EmailVO[])
 * - bcc: Blind carbon copy recipients (EmailVO[])
 * - receivedAt: When email was received (null for sent or draft emails)
 * - sentAt: When email was sent (null for received or draft emails)
 * - savedAt: When email was last modified (used for all email states)
 * - read: Whether email has been read
 * - body: Email content
 * - preview: A short preview of the email body (first 100 characters)
 * - folderId: Location of email (inbox, sent, etc.)
 * - attachments: Array of email attachments
 * - createdAt: When email was created
 * - updatedAt: When email was last updated
 */
export class EmailEntity extends AggregateRoot<IdVO<EmailIdType>> {
    private readonly props: EmailProps;

    constructor(props: EmailProps) {
        super(props.id);
        this.validateProps(props);
        this.props = Object.freeze(props); // Ensure immutability
    }

    get subject(): string {
        return this.props.subject;
    }

    get from(): EmailVO {
        return this.props.from;
    }

    get to(): EmailVO[] {
        return this.props.to;
    }

    get cc(): EmailVO[] {
        return this.props.cc;
    }

    get bcc(): EmailVO[] {
        return this.props.bcc;
    }

    get receivedAt(): Date | null {
        return this.props.receivedAt;
    }

    get sentAt(): Date | null {
        return this.props.sentAt;
    }

    get savedAt(): Date {
        return this.props.savedAt;
    }

    get read(): boolean {
        return this.props.read;
    }

    get body(): string {
        return this.props.body;
    }

    get preview(): string {
        return this.props.preview;
    }

    get folderId(): string {
        return this.props.folderId;
    }

    get attachments(): AttachmentEntity[] {
        return this.props.attachments;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    get updatedAt(): Date {
        return this.props.updatedAt;
    }

    static create(props: CreateEmailProps): EmailEntity {
        try {
            const emailId = IdVO.generate<EmailIdType>('EmailId');
            const now = new Date();
            return new EmailEntity({
                ...props,
                id: emailId,
                createdAt: now,
                updatedAt: now,
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`Failed to create EmailEntity: ${message}`);
        }
    }

    private validateProps(props: EmailProps): void {
        if (!props.subject.trim()) throw new Error('Subject cannot be empty');
        if (!props.body.trim()) throw new Error('Body cannot be empty');
        if (!props.folderId.trim()) throw new Error('Folder ID cannot be empty');
        if (props.to.length === 0 && props.cc.length === 0 && props.bcc.length === 0) {
            throw new Error('Email must have at least one recipient');
        }
    }
}

