import { EmailEntity } from './email.entity';
import { EmailVO } from '@calm-mail/shared-domain';

describe('EmailEntity', () => {
    describe('create', () => {
        it('should create a valid email entity', () => {
            // Arrange
            const props = {
                subject: 'Test Subject',
                from: EmailVO.create('sender@test.com'),
                to: [EmailVO.create('recipient@test.com')],
                cc: [EmailVO.create('cc@test.com')],
                bcc: [EmailVO.create('bcc@test.com')],
                receivedAt: new Date(),
                sentAt: null,
                savedAt: new Date(),
                read: false,
                body: 'This is a test email body',
                preview: 'This is a test email body',
                folderId: 'inbox',
                attachments: []
            };

            // Act
            const email = EmailEntity.create(props);

            // Assert
            expect(email).toBeDefined();
            expect(email.subject).toBe(props.subject);
            expect(email.from).toBe(props.from);
            expect(email.to).toEqual(props.to);
            expect(email.cc).toEqual(props.cc);
            expect(email.bcc).toEqual(props.bcc);
            expect(email.receivedAt).toBe(props.receivedAt);
            expect(email.sentAt).toBe(props.sentAt);
            expect(email.savedAt).toBe(props.savedAt);
            expect(email.read).toBe(props.read);
            expect(email.body).toBe(props.body);
            expect(email.preview).toBe(props.preview);
            expect(email.folderId).toBe(props.folderId);
            expect(email.attachments).toEqual(props.attachments);
            expect(email.createdAt).toBeInstanceOf(Date);
            expect(email.updatedAt).toBeInstanceOf(Date);
            expect(email.id).toBeDefined();
        });

        it('should create email with only to recipients', () => {
            // Arrange
            const props = {
                subject: 'Simple Email',
                from: EmailVO.create('sender@test.com'),
                to: [EmailVO.create('recipient@test.com')],
                cc: [],
                bcc: [],
                receivedAt: null,
                sentAt: new Date(),
                savedAt: new Date(),
                read: true,
                body: 'Simple email body',
                preview: 'Simple email body',
                folderId: 'sent',
                attachments: []
            };

            // Act
            const email = EmailEntity.create(props);

            // Assert
            expect(email).toBeDefined();
            expect(email.to.length).toBe(1);
            expect(email.cc.length).toBe(0);
            expect(email.bcc.length).toBe(0);
            expect(email.folderId).toBe('sent');
        });

        it('should create email with only cc recipients', () => {
            // Arrange
            const props = {
                subject: 'CC Only Email',
                from: EmailVO.create('sender@test.com'),
                to: [],
                cc: [EmailVO.create('cc1@test.com'), EmailVO.create('cc2@test.com')],
                bcc: [],
                receivedAt: null,
                sentAt: new Date(),
                savedAt: new Date(),
                read: false,
                body: 'Email with CC only',
                preview: 'Email with CC only',
                folderId: 'drafts',
                attachments: []
            };

            // Act
            const email = EmailEntity.create(props);

            // Assert
            expect(email).toBeDefined();
            expect(email.to.length).toBe(0);
            expect(email.cc.length).toBe(2);
            expect(email.bcc.length).toBe(0);
        });

        it('should create email with only bcc recipients', () => {
            // Arrange
            const props = {
                subject: 'BCC Only Email',
                from: EmailVO.create('sender@test.com'),
                to: [],
                cc: [],
                bcc: [EmailVO.create('bcc@test.com')],
                receivedAt: null,
                sentAt: new Date(),
                savedAt: new Date(),
                read: false,
                body: 'Email with BCC only',
                preview: 'Email with BCC only',
                folderId: 'drafts',
                attachments: []
            };

            // Act
            const email = EmailEntity.create(props);

            // Assert
            expect(email).toBeDefined();
            expect(email.to.length).toBe(0);
            expect(email.cc.length).toBe(0);
            expect(email.bcc.length).toBe(1);
        });
    });

    describe('validation', () => {
        it('should throw error for empty subject', () => {
            // Arrange
            const props = {
                subject: '',
                from: EmailVO.create('sender@test.com'),
                to: [EmailVO.create('recipient@test.com')],
                cc: [],
                bcc: [],
                receivedAt: new Date(),
                sentAt: null,
                savedAt: new Date(),
                read: false,
                body: 'Test body',
                preview: 'Test body',
                folderId: 'inbox',
                attachments: []
            };

            // Act & Assert
            expect(() => EmailEntity.create(props)).toThrow('Subject cannot be empty');
        });

        it('should throw error for whitespace-only subject', () => {
            // Arrange
            const props = {
                subject: '   ',
                from: EmailVO.create('sender@test.com'),
                to: [EmailVO.create('recipient@test.com')],
                cc: [],
                bcc: [],
                receivedAt: new Date(),
                sentAt: null,
                savedAt: new Date(),
                read: false,
                body: 'Test body',
                preview: 'Test body',
                folderId: 'inbox',
                attachments: []
            };

            // Act & Assert
            expect(() => EmailEntity.create(props)).toThrow('Subject cannot be empty');
        });

        it('should throw error for empty body', () => {
            // Arrange
            const props = {
                subject: 'Test Subject',
                from: EmailVO.create('sender@test.com'),
                to: [EmailVO.create('recipient@test.com')],
                cc: [],
                bcc: [],
                receivedAt: new Date(),
                sentAt: null,
                savedAt: new Date(),
                read: false,
                body: '',
                preview: '',
                folderId: 'inbox',
                attachments: []
            };

            // Act & Assert
            expect(() => EmailEntity.create(props)).toThrow('Body cannot be empty');
        });

        it('should throw error for whitespace-only body', () => {
            // Arrange
            const props = {
                subject: 'Test Subject',
                from: EmailVO.create('sender@test.com'),
                to: [EmailVO.create('recipient@test.com')],
                cc: [],
                bcc: [],
                receivedAt: new Date(),
                sentAt: null,
                savedAt: new Date(),
                read: false,
                body: '   ',
                preview: '   ',
                folderId: 'inbox',
                attachments: []
            };

            // Act & Assert
            expect(() => EmailEntity.create(props)).toThrow('Body cannot be empty');
        });

        it('should throw error for empty folder ID', () => {
            // Arrange
            const props = {
                subject: 'Test Subject',
                from: EmailVO.create('sender@test.com'),
                to: [EmailVO.create('recipient@test.com')],
                cc: [],
                bcc: [],
                receivedAt: new Date(),
                sentAt: null,
                savedAt: new Date(),
                read: false,
                body: 'Test body',
                preview: 'Test body',
                folderId: '',
                attachments: []
            };

            // Act & Assert
            expect(() => EmailEntity.create(props)).toThrow('Folder ID cannot be empty');
        });

        it('should throw error for whitespace-only folder ID', () => {
            // Arrange
            const props = {
                subject: 'Test Subject',
                from: EmailVO.create('sender@test.com'),
                to: [EmailVO.create('recipient@test.com')],
                cc: [],
                bcc: [],
                receivedAt: new Date(),
                sentAt: null,
                savedAt: new Date(),
                read: false,
                body: 'Test body',
                preview: 'Test body',
                folderId: '   ',
                attachments: []
            };

            // Act & Assert
            expect(() => EmailEntity.create(props)).toThrow('Folder ID cannot be empty');
        });

        it('should throw error when no recipients are provided', () => {
            // Arrange
            const props = {
                subject: 'Test Subject',
                from: EmailVO.create('sender@test.com'),
                to: [],
                cc: [],
                bcc: [],
                receivedAt: new Date(),
                sentAt: null,
                savedAt: new Date(),
                read: false,
                body: 'Test body',
                preview: 'Test body',
                folderId: 'inbox',
                attachments: []
            };

            // Act & Assert
            expect(() => EmailEntity.create(props)).toThrow('Email must have at least one recipient');
        });
    });

    describe('getters', () => {
        it('should return correct property values', () => {
            // Arrange
            const props = {
                subject: 'Test Subject',
                from: EmailVO.create('sender@test.com'),
                to: [EmailVO.create('to@test.com')],
                cc: [EmailVO.create('cc@test.com')],
                bcc: [EmailVO.create('bcc@test.com')],
                receivedAt: new Date('2023-01-01'),
                sentAt: new Date('2023-01-02'),
                savedAt: new Date('2023-01-03'),
                read: true,
                body: 'Test email body content',
                preview: 'Test email body content',
                folderId: 'inbox',
                attachments: []
            };

            // Act
            const email = EmailEntity.create(props);

            // Assert
            expect(email.subject).toBe('Test Subject');
            expect(email.from).toBe(props.from);
            expect(email.to).toEqual(props.to);
            expect(email.cc).toEqual(props.cc);
            expect(email.bcc).toEqual(props.bcc);
            expect(email.receivedAt).toBe(props.receivedAt);
            expect(email.sentAt).toBe(props.sentAt);
            expect(email.savedAt).toBe(props.savedAt);
            expect(email.read).toBe(true);
            expect(email.body).toBe('Test email body content');
            expect(email.preview).toBe('Test email body content');
            expect(email.folderId).toBe('inbox');
            expect(email.attachments).toEqual([]);
        });
    });

    describe('immutability', () => {
        it('should maintain consistent property values', () => {
            // Arrange
            const props = {
                subject: 'Test Subject',
                from: EmailVO.create('sender@test.com'),
                to: [EmailVO.create('to@test.com')],
                cc: [EmailVO.create('cc@test.com')],
                bcc: [EmailVO.create('bcc@test.com')],
                receivedAt: new Date(),
                sentAt: null,
                savedAt: new Date(),
                read: false,
                body: 'Test body',
                preview: 'Test body',
                folderId: 'inbox',
                attachments: []
            };
            const email = EmailEntity.create(props);

            // Act & Assert
            // Properties should remain consistent across multiple calls
            const originalSubject = email.subject;
            const originalFrom = email.from;
            const originalTo = email.to;
            const originalCc = email.cc;
            const originalBcc = email.bcc;
            const originalReceivedAt = email.receivedAt;
            const originalSentAt = email.sentAt;
            const originalSavedAt = email.savedAt;
            const originalRead = email.read;
            const originalBody = email.body;
            const originalPreview = email.preview;
            const originalFolderId = email.folderId;
            const originalAttachments = email.attachments;
            const originalCreatedAt = email.createdAt;
            const originalUpdatedAt = email.updatedAt;
            const originalId = email.id;

            // Multiple calls should return the same values
            expect(email.subject).toBe(originalSubject);
            expect(email.from).toBe(originalFrom);
            expect(email.to).toBe(originalTo);
            expect(email.cc).toBe(originalCc);
            expect(email.bcc).toBe(originalBcc);
            expect(email.receivedAt).toBe(originalReceivedAt);
            expect(email.sentAt).toBe(originalSentAt);
            expect(email.savedAt).toBe(originalSavedAt);
            expect(email.read).toBe(originalRead);
            expect(email.body).toBe(originalBody);
            expect(email.preview).toBe(originalPreview);
            expect(email.folderId).toBe(originalFolderId);
            expect(email.attachments).toBe(originalAttachments);
            expect(email.createdAt).toBe(originalCreatedAt);
            expect(email.updatedAt).toBe(originalUpdatedAt);
            expect(email.id).toBe(originalId);
        });

        it('should have read-only properties (no setters)', () => {
            // Arrange
            const props = {
                subject: 'Test Subject',
                from: EmailVO.create('sender@test.com'),
                to: [EmailVO.create('to@test.com')],
                cc: [],
                bcc: [],
                receivedAt: new Date(),
                sentAt: null,
                savedAt: new Date(),
                read: false,
                body: 'Test body',
                preview: 'Test body',
                folderId: 'inbox',
                attachments: []
            };
            const email = EmailEntity.create(props);

            // Act & Assert
            // Verify that properties don't have setters by checking property descriptors
            const propertyNames = [
                'subject', 'from', 'to', 'cc', 'bcc', 'receivedAt', 'sentAt', 
                'savedAt', 'read', 'body', 'preview', 'folderId', 'attachments',
                'createdAt', 'updatedAt'
            ];

            propertyNames.forEach(propName => {
                const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(email), propName);
                if (descriptor) {
                    expect(descriptor.set).toBeUndefined();
                    expect(descriptor.get).toBeDefined();
                }
            });
        });
    });

    describe('entity behavior', () => {
        it('should have unique IDs for different instances', () => {
            // Arrange
            const props = {
                subject: 'Test Subject',
                from: EmailVO.create('sender@test.com'),
                to: [EmailVO.create('to@test.com')],
                cc: [],
                bcc: [],
                receivedAt: new Date(),
                sentAt: null,
                savedAt: new Date(),
                read: false,
                body: 'Test body',
                preview: 'Test body',
                folderId: 'inbox',
                attachments: []
            };

            // Act
            const email1 = EmailEntity.create(props);
            const email2 = EmailEntity.create(props);

            // Assert
            expect(email1.id).not.toEqual(email2.id);
        });

        it('should extend AggregateRoot base class', () => {
            // Arrange
            const props = {
                subject: 'Test Subject',
                from: EmailVO.create('sender@test.com'),
                to: [EmailVO.create('to@test.com')],
                cc: [],
                bcc: [],
                receivedAt: new Date(),
                sentAt: null,
                savedAt: new Date(),
                read: false,
                body: 'Test body',
                preview: 'Test body',
                folderId: 'inbox',
                attachments: []
            };

            // Act
            const email = EmailEntity.create(props);

            // Assert
            expect(email.equals).toBeDefined();
            expect(typeof email.equals).toBe('function');
        });
    });
});
