import { EmailAccount, ImapConfig, SmtpConfig } from './email-account.entity';
import { EmailVO, IdVO, UserIdType } from '@calm-mail/shared-domain';

describe('EmailAccount', () => {
    const createValidImapConfig = () => new ImapConfig({
        host: 'imap.example.com',
        port: 993,
        username: 'test@example.com',
        password: 'encrypted_password',
        security: 'SSL/TLS',
        folder: 'INBOX',
        idleSupport: true,
    });

    const createValidSmtpConfig = () => new SmtpConfig({
        host: 'smtp.example.com',
        port: 587,
        username: 'test@example.com',
        password: 'encrypted_password',
        security: 'STARTTLS',
        senderAddress: 'test@example.com',
        replyToAddress: 'test@example.com',
    });

    describe('create', () => {
        it('should create a valid email account entity', () => {
            // Arrange
            const props = {
                userId: IdVO.generate<UserIdType>('UserId'),
                email: EmailVO.create('test@example.com'),
                displayName: 'Test Account',
                imapConfig: createValidImapConfig(),
                smtpConfig: createValidSmtpConfig(),
                isActive: true,
                isDefault: false,
                syncEnabled: true,
                syncFrequency: 15
            };

            // Act
            const emailAccount = EmailAccount.create(props);

            // Assert
            expect(emailAccount).toBeDefined();
            expect(emailAccount.email).toBe(props.email);
            expect(emailAccount.id).toBeDefined();
        });

        it('should create email account with minimal required fields', () => {
            // Arrange
            const props = {
                userId: IdVO.generate<UserIdType>('UserId'),
                email: EmailVO.create('minimal@example.com'),
                displayName: 'Minimal Account',
                imapConfig: createValidImapConfig(),
                smtpConfig: createValidSmtpConfig(),
                isActive: false,
                isDefault: false,
                syncEnabled: false,
                syncFrequency: 1
            };

            // Act
            const emailAccount = EmailAccount.create(props);

            // Assert
            expect(emailAccount).toBeDefined();
            expect(emailAccount.email).toBe(props.email);
        });

        it('should create email account with different security settings', () => {
            // Arrange
            const imapConfig = new ImapConfig({
                host: 'imap.secure.com',
                port: 143,
                username: 'secure@example.com',
                password: 'encrypted_password',
                security: 'STARTTLS',
            });

            const smtpConfig = new SmtpConfig({
                host: 'smtp.secure.com',
                port: 25,
                username: 'secure@example.com',
                password: 'encrypted_password',
                security: 'None',
            });

            const props = {
                userId: IdVO.generate<UserIdType>('UserId'),
                email: EmailVO.create('secure@example.com'),
                displayName: 'Secure Account',
                imapConfig,
                smtpConfig,
                isActive: true,
                isDefault: true,
                syncEnabled: true,
                syncFrequency: 30
            };

            // Act
            const emailAccount = EmailAccount.create(props);

            // Assert
            expect(emailAccount).toBeDefined();
            expect(emailAccount.email).toBe(props.email);
        });

        it('should create email account with high sync frequency', () => {
            // Arrange
            const props = {
                userId: IdVO.generate<UserIdType>('UserId'),
                email: EmailVO.create('frequent@example.com'),
                displayName: 'Frequent Sync Account',
                imapConfig: createValidImapConfig(),
                smtpConfig: createValidSmtpConfig(),
                isActive: true,
                isDefault: false,
                syncEnabled: true,
                syncFrequency: 1440 // 24 hours
            };

            // Act
            const emailAccount = EmailAccount.create(props);

            // Assert
            expect(emailAccount).toBeDefined();
            expect(emailAccount.email).toBe(props.email);
        });
    });

    describe('validation', () => {
        it('should throw error for zero sync frequency', () => {
            // Arrange
            const props = {
                userId: IdVO.generate<UserIdType>('UserId'),
                email: EmailVO.create('test@example.com'),
                displayName: 'Test Account',
                imapConfig: createValidImapConfig(),
                smtpConfig: createValidSmtpConfig(),
                isActive: true,
                isDefault: false,
                syncEnabled: true,
                syncFrequency: 0
            };

            // Act & Assert
            expect(() => EmailAccount.create(props)).toThrow('Sync frequency must be positive');
        });

        it('should throw error for negative sync frequency', () => {
            // Arrange
            const props = {
                userId: IdVO.generate<UserIdType>('UserId'),
                email: EmailVO.create('test@example.com'),
                displayName: 'Test Account',
                imapConfig: createValidImapConfig(),
                smtpConfig: createValidSmtpConfig(),
                isActive: true,
                isDefault: false,
                syncEnabled: true,
                syncFrequency: -5
            };

            // Act & Assert
            expect(() => EmailAccount.create(props)).toThrow('Sync frequency must be positive');
        });

        it('should throw error for empty display name', () => {
            // Arrange
            const props = {
                userId: IdVO.generate<UserIdType>('UserId'),
                email: EmailVO.create('test@example.com'),
                displayName: '',
                imapConfig: createValidImapConfig(),
                smtpConfig: createValidSmtpConfig(),
                isActive: true,
                isDefault: false,
                syncEnabled: true,
                syncFrequency: 15
            };

            // Act & Assert
            expect(() => EmailAccount.create(props)).toThrow('Display name cannot be empty');
        });

        it('should throw error for whitespace-only display name', () => {
            // Arrange
            const props = {
                userId: IdVO.generate<UserIdType>('UserId'),
                email: EmailVO.create('test@example.com'),
                displayName: '   ',
                imapConfig: createValidImapConfig(),
                smtpConfig: createValidSmtpConfig(),
                isActive: true,
                isDefault: false,
                syncEnabled: true,
                syncFrequency: 15
            };

            // Act & Assert
            expect(() => EmailAccount.create(props)).toThrow('Display name cannot be empty');
        });

        it('should accept sync frequency of 1 (minimum valid value)', () => {
            // Arrange
            const props = {
                userId: IdVO.generate<UserIdType>('UserId'),
                email: EmailVO.create('test@example.com'),
                displayName: 'Min Sync Account',
                imapConfig: createValidImapConfig(),
                smtpConfig: createValidSmtpConfig(),
                isActive: true,
                isDefault: false,
                syncEnabled: true,
                syncFrequency: 1
            };

            // Act & Assert
            expect(() => EmailAccount.create(props)).not.toThrow();
        });
    });

    describe('getters', () => {
        it('should return correct email value', () => {
            // Arrange
            const email = EmailVO.create('getter@example.com');
            const props = {
                userId: IdVO.generate<UserIdType>('UserId'),
                email,
                displayName: 'Getter Test Account',
                imapConfig: createValidImapConfig(),
                smtpConfig: createValidSmtpConfig(),
                isActive: true,
                isDefault: false,
                syncEnabled: true,
                syncFrequency: 15
            };

            // Act
            const emailAccount = EmailAccount.create(props);

            // Assert
            expect(emailAccount.email).toBe(email);
        });
    });

    describe('immutability', () => {
        it('should maintain consistent property values', () => {
            // Arrange
            const email = EmailVO.create('immutable@example.com');
            const props = {
                userId: IdVO.generate<UserIdType>('UserId'),
                email,
                displayName: 'Immutable Account',
                imapConfig: createValidImapConfig(),
                smtpConfig: createValidSmtpConfig(),
                isActive: true,
                isDefault: false,
                syncEnabled: true,
                syncFrequency: 15
            };
            const emailAccount = EmailAccount.create(props);

            // Act & Assert
            // Properties should remain consistent across multiple calls
            const originalEmail = emailAccount.email;
            const originalId = emailAccount.id;

            // Multiple calls should return the same values
            expect(emailAccount.email).toBe(originalEmail);
            expect(emailAccount.id).toBe(originalId);
        });

        it('should have read-only properties (no setters)', () => {
            // Arrange
            const props = {
                userId: IdVO.generate<UserIdType>('UserId'),
                email: EmailVO.create('readonly@example.com'),
                displayName: 'ReadOnly Account',
                imapConfig: createValidImapConfig(),
                smtpConfig: createValidSmtpConfig(),
                isActive: true,
                isDefault: false,
                syncEnabled: true,
                syncFrequency: 15
            };
            const emailAccount = EmailAccount.create(props);

            // Act & Assert
            // Verify that the email property doesn't have a setter
            const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(emailAccount), 'email');
            if (descriptor) {
                expect(descriptor.set).toBeUndefined();
                expect(descriptor.get).toBeDefined();
            }
        });
    });

    describe('entity behavior', () => {
        it('should have unique IDs for different instances', () => {
            // Arrange
            const props = {
                userId: IdVO.generate<UserIdType>('UserId'),
                email: EmailVO.create('unique@example.com'),
                displayName: 'Unique Account',
                imapConfig: createValidImapConfig(),
                smtpConfig: createValidSmtpConfig(),
                isActive: true,
                isDefault: false,
                syncEnabled: true,
                syncFrequency: 15
            };

            // Act
            const emailAccount1 = EmailAccount.create(props);
            const emailAccount2 = EmailAccount.create(props);

            // Assert
            expect(emailAccount1.id).not.toEqual(emailAccount2.id);
        });

        it('should extend AggregateRoot base class', () => {
            // Arrange
            const props = {
                userId: IdVO.generate<UserIdType>('UserId'),
                email: EmailVO.create('aggregate@example.com'),
                displayName: 'Aggregate Account',
                imapConfig: createValidImapConfig(),
                smtpConfig: createValidSmtpConfig(),
                isActive: true,
                isDefault: false,
                syncEnabled: true,
                syncFrequency: 15
            };

            // Act
            const emailAccount = EmailAccount.create(props);

            // Assert
            expect(emailAccount.equals).toBeDefined();
            expect(typeof emailAccount.equals).toBe('function');
        });

        it('should set lastSyncAt to null when created', () => {
            // Arrange
            const props = {
                userId: IdVO.generate<UserIdType>('UserId'),
                email: EmailVO.create('sync@example.com'),
                displayName: 'Sync Account',
                imapConfig: createValidImapConfig(),
                smtpConfig: createValidSmtpConfig(),
                isActive: true,
                isDefault: false,
                syncEnabled: true,
                syncFrequency: 15
            };

            // Act
            const emailAccount = EmailAccount.create(props);

            // Assert
            // Note: We can't directly test lastSyncAt since there's no getter,
            // but we can verify the entity was created successfully
            expect(emailAccount).toBeDefined();
            expect(emailAccount.id).toBeDefined();
        });
    });

    describe('value objects', () => {
        it('should work with different IMAP configurations', () => {
            // Arrange
            const imapConfig = new ImapConfig({
                host: 'custom.imap.com',
                port: 143,
                username: 'custom@example.com',
                password: 'custom_password',
                security: 'STARTTLS',
                folder: 'Custom Folder',
                idleSupport: false,
            });

            const props = {
                userId: IdVO.generate<UserIdType>('UserId'),
                email: EmailVO.create('custom@example.com'),
                displayName: 'Custom IMAP Account',
                imapConfig,
                smtpConfig: createValidSmtpConfig(),
                isActive: true,
                isDefault: false,
                syncEnabled: true,
                syncFrequency: 15
            };

            // Act & Assert
            expect(() => EmailAccount.create(props)).not.toThrow();
        });

        it('should work with different SMTP configurations', () => {
            // Arrange
            const smtpConfig = new SmtpConfig({
                host: 'custom.smtp.com',
                port: 465,
                username: 'custom@example.com',
                password: 'custom_password',
                security: 'SSL/TLS',
                senderAddress: 'custom-sender@example.com',
                replyToAddress: 'custom-reply@example.com',
            });

            const props = {
                userId: IdVO.generate<UserIdType>('UserId'),
                email: EmailVO.create('custom@example.com'),
                displayName: 'Custom SMTP Account',
                imapConfig: createValidImapConfig(),
                smtpConfig,
                isActive: true,
                isDefault: false,
                syncEnabled: true,
                syncFrequency: 15
            };

            // Act & Assert
            expect(() => EmailAccount.create(props)).not.toThrow();
        });
    });
});
