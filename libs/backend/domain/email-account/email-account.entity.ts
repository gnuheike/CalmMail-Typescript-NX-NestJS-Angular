import { AggregateRoot, EmailAccountIdType, EmailVO, IdVO, UserIdType, ValueObject } from '@calm-mail/shared-domain';

interface EmailConfigPropsBase {
    host: string;
    port: number;
    username: string;
    password: string; // Should be encrypted in production
    security: 'SSL/TLS' | 'STARTTLS' | 'None';
}

interface IMAPConfigProps extends EmailConfigPropsBase {
    folder?: string;
    idleSupport?: boolean;
}

interface SMTPConfigProps extends EmailConfigPropsBase {
    senderAddress?: string;
    replyToAddress?: string;
}

export class ImapConfig extends ValueObject<IMAPConfigProps> {
    protected _type!: void;
}

export class SmtpConfig extends ValueObject<SMTPConfigProps> {
    protected _type!: void;
}

export interface EmailAccountProps {
    readonly id: IdVO<EmailAccountIdType>;
    readonly userId: IdVO<UserIdType>;
    readonly email: EmailVO;
    readonly displayName: string;
    readonly imapConfig: ImapConfig;
    readonly smtpConfig: SmtpConfig;
    readonly isActive: boolean;
    readonly isDefault: boolean;
    readonly lastSyncAt: Date | null;
    readonly syncEnabled: boolean;
    readonly syncFrequency: number; // minutes
    readonly createdAt: Date;
    readonly updatedAt: Date;
}

export type CreateEmailAccountProps = Omit<EmailAccountProps, 'id' | 'createdAt' | 'updatedAt' | 'lastSyncAt'>;

export class EmailAccount extends AggregateRoot<IdVO<EmailAccountIdType>> {
    private readonly props: EmailAccountProps;

    constructor(props: EmailAccountProps) {
        super(props.id);
        this.validateProps(props);
        this.props = Object.freeze(props); // Ensure immutability
    }

    get email(): EmailVO {
        return this.props.email;
    }

    static create(props: CreateEmailAccountProps): EmailAccount {
        try {
            const accountId = IdVO.generate<EmailAccountIdType>('EmailAccountId');
            const now = new Date();
            return new EmailAccount({
                ...props,
                id: accountId,
                createdAt: now,
                updatedAt: now,
                lastSyncAt: null,
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`Failed to create EmailAccount: ${message}`);
        }
    }

    private validateProps(props: EmailAccountProps): void {
        if (props.syncFrequency <= 0) throw new Error('Sync frequency must be positive');
        if (!props.displayName.trim()) throw new Error('Display name cannot be empty');
    }
}
