import { EmailAccount, ImapConfig, SmtpConfig } from './email-account.entity';
import { EmailVO, IdVO, EmailAccountIdType, UserIdType } from '@calm-mail/shared-domain';

const mockImapConfig = new ImapConfig({
    host: 'imap.example.com',
    port: 993,
    username: 'test@example.com',
    password: 'encrypted_password',
    security: 'SSL/TLS',
    folder: 'INBOX',
    idleSupport: true,
});

const mockSmtpConfig = new SmtpConfig({
    host: 'smtp.example.com',
    port: 587,
    username: 'test@example.com',
    password: 'encrypted_password',
    security: 'STARTTLS',
    senderAddress: 'test@example.com',
    replyToAddress: 'test@example.com',
});

export const mockEmailAccount = new EmailAccount({
    id: IdVO.generate<EmailAccountIdType>('EmailAccountId'),
    userId: IdVO.generate<UserIdType>('UserId'),
    email: EmailVO.create('test@example.com'),
    displayName: 'Test Account',
    imapConfig: mockImapConfig,
    smtpConfig: mockSmtpConfig,
    isActive: true,
    isDefault: true,
    lastSyncAt: new Date(),
    syncEnabled: true,
    syncFrequency: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
});
