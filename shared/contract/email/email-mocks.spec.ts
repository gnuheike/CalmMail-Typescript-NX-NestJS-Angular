import { 
  createMockEmail, 
  createMockInboxEmail, 
  createMockSentEmail, 
  createMockDraftEmail, 
  createMockGetEmailsResponse, 
  createMockCreateEmailResponse, 
  createMockEmailsForFolder 
} from './email-mocks';
import { createDefaultFolders } from '../folder/folder-mocks';
import { Email } from './email.type';

describe('email-mocks', () => {
  describe('createMockEmail', () => {
    it('should create a default mock email', () => {
      const email = createMockEmail();
      const defaultFolders = createDefaultFolders();
      const inboxFolder = defaultFolders[0];

      // Ensure inboxFolder exists before testing
      expect(inboxFolder).toBeDefined();
      if (inboxFolder) {
        expect(email).toEqual({
          id: 'clq1234567890abcdefghijklm',
          subject: 'Test Email Subject',
          from: 'sender@example.com',
          to: ['recipient@example.com'],
          cc: [],
          bcc: [],
          body: 'This is a test email body.',
          processedAt: expect.any(Date),
          read: false,
          isDraft: false,
          folderId: inboxFolder.id,
        });
      }
    });

    it('should override default properties with provided values', () => {
      const email = createMockEmail({
        id: 'custom-id',
        subject: 'Custom Subject',
        from: 'custom@example.com',
        to: ['custom-recipient@example.com'],
        cc: ['cc@example.com'],
        bcc: ['bcc@example.com'],
        body: 'Custom body',
        read: true,
        isDraft: true,
      });

      expect(email).toEqual({
        id: 'custom-id',
        subject: 'Custom Subject',
        from: 'custom@example.com',
        to: ['custom-recipient@example.com'],
        cc: ['cc@example.com'],
        bcc: ['bcc@example.com'],
        body: 'Custom body',
        processedAt: expect.any(Date),
        read: true,
        isDraft: true,
        folderId: expect.any(String),
      });
    });

    it('should merge partial overrides with default values', () => {
      const email = createMockEmail({
        subject: 'Only Override Subject',
      });

      expect(email.subject).toBe('Only Override Subject');
      expect(email.from).toBe('sender@example.com');
    });
  });

  describe('createMockInboxEmail', () => {
    it('should create an email in the inbox folder', () => {
      const email = createMockInboxEmail();
      const defaultFolders = createDefaultFolders();
      const inboxFolder = defaultFolders[0];

      // Ensure inboxFolder exists before testing
      expect(inboxFolder).toBeDefined();
      if (inboxFolder) {
        expect(email.folderId).toBe(inboxFolder.id);
      }
    });

    it('should override properties while keeping it in the inbox folder', () => {
      const email = createMockInboxEmail({
        subject: 'Custom Inbox Email',
      });

      const defaultFolders = createDefaultFolders();
      const inboxFolder = defaultFolders[0];

      expect(email.subject).toBe('Custom Inbox Email');
      // Ensure inboxFolder exists before testing
      expect(inboxFolder).toBeDefined();
      if (inboxFolder) {
        expect(email.folderId).toBe(inboxFolder.id);
      }
    });
  });

  describe('createMockSentEmail', () => {
    it('should create an email in the sent folder', () => {
      const email = createMockSentEmail();
      const defaultFolders = createDefaultFolders();
      const sentFolder = defaultFolders[1];

      // Ensure sentFolder exists before testing
      expect(sentFolder).toBeDefined();
      if (sentFolder) {
        expect(email.folderId).toBe(sentFolder.id);
      }
      expect(email.from).toBe('user@example.com');
      expect(email.read).toBe(true);
    });

    it('should override properties while keeping it in the sent folder', () => {
      const email = createMockSentEmail({
        subject: 'Custom Sent Email',
      });

      const defaultFolders = createDefaultFolders();
      const sentFolder = defaultFolders[1];

      expect(email.subject).toBe('Custom Sent Email');
      // Ensure sentFolder exists before testing
      expect(sentFolder).toBeDefined();
      if (sentFolder) {
        expect(email.folderId).toBe(sentFolder.id);
      }
    });
  });

  describe('createMockDraftEmail', () => {
    it('should create an email in the drafts folder', () => {
      const email = createMockDraftEmail();
      const defaultFolders = createDefaultFolders();
      const draftsFolder = defaultFolders[2];

      // Ensure draftsFolder exists before testing
      expect(draftsFolder).toBeDefined();
      if (draftsFolder) {
        expect(email.folderId).toBe(draftsFolder.id);
      }
      expect(email.from).toBe('user@example.com');
      expect(email.isDraft).toBe(true);
    });

    it('should override properties while keeping it in the drafts folder', () => {
      const email = createMockDraftEmail({
        subject: 'Custom Draft Email',
      });

      const defaultFolders = createDefaultFolders();
      const draftsFolder = defaultFolders[2];

      expect(email.subject).toBe('Custom Draft Email');
      // Ensure draftsFolder exists before testing
      expect(draftsFolder).toBeDefined();
      if (draftsFolder) {
        expect(email.folderId).toBe(draftsFolder.id);
      }
      expect(email.isDraft).toBe(true);
    });
  });

  describe('createMockGetEmailsResponse', () => {
    it('should create a default GetEmailsResponse', () => {
      const response = createMockGetEmailsResponse();

      expect(response).toHaveProperty('emails');
      expect(response.emails).toHaveLength(2);
      expect(response).toHaveProperty('pagination');
      expect(response.pagination).toEqual({
        page: 1,
        limit: 20,
        totalItems: 2,
        totalPages: 1,
      });
    });

    it('should override default properties with provided values', () => {
      const customEmails: Email[] = [createMockEmail({ id: 'custom-id' })];
      const response = createMockGetEmailsResponse({
        emails: customEmails,
        pagination: {
          page: 2,
          limit: 10,
          totalItems: 15,
          totalPages: 2,
        },
      });

      expect(response.emails).toBe(customEmails);
      expect(response.pagination).toEqual({
        page: 2,
        limit: 10,
        totalItems: 15,
        totalPages: 2,
      });
    });
  });

  describe('createMockCreateEmailResponse', () => {
    it('should create a default CreateEmailResponse', () => {
      const response = createMockCreateEmailResponse();

      expect(response).toHaveProperty('email');
      expect(response.email).toEqual(expect.objectContaining({
        id: 'clq1234567890abcdefghijklm',
        subject: 'Test Email Subject',
      }));
    });

    it('should override default properties with provided values', () => {
      const customEmail = createMockEmail({ id: 'custom-id' });
      const response = createMockCreateEmailResponse({
        email: customEmail,
      });

      expect(response.email).toBe(customEmail);
    });
  });

  describe('createMockEmailsForFolder', () => {
    it('should create a specified number of emails for a folder', () => {
      const folderId = 'test-folder-id';
      const emails = createMockEmailsForFolder(folderId, 3);

      expect(emails).toHaveLength(3);
      emails.forEach((email, index) => {
        expect(email.folderId).toBe(folderId);
        expect(email.subject).toBe(`Email ${index + 1} in folder`);
        expect(email.id).toMatch(/^clq/); // ID should start with 'clq'
      });
    });

    it('should create emails with unique IDs', () => {
      const folderId = 'test-folder-id';
      const emails = createMockEmailsForFolder(folderId, 5);
      const ids = emails.map(email => email.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(emails.length);
    });
  });
});
