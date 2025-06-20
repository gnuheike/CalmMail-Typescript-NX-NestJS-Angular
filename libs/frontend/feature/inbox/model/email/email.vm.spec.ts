import { EmailId, mapToEmailVm, mapToEmailVms } from './email.vm';
import { Email } from '@calm-mail/contract';

describe('EmailId', () => {
  it('should create an EmailId from a string', () => {
    const id = 'test-id';
    const emailId = EmailId.fromString(id);

    expect(emailId).toBeDefined();
    expect(emailId.toString()).toBe(id);
  });
});

describe('mapToEmailVm', () => {
  it('should map an Email to an EmailVm', () => {
    const now = new Date();
    const email: Email = {
      id: 'test-id',
      subject: 'Test Subject',
      from: 'sender@example.com',
      to: ['recipient@example.com'],
      cc: [],
      bcc: [],
      body: 'This is a test email body',
      processedAt: now,
      read: false,
      isDraft: false,
      folderId: 'folder-id',
    };

    const emailVm = mapToEmailVm(email);

    expect(emailVm).toBeDefined();
    expect(emailVm.id.toString()).toBe(email.id);
    expect(emailVm.subject).toBe(email.subject);
    expect(emailVm.from).toBe(email.from);
    expect(emailVm.processedAt).toBe(email.processedAt);
    expect(emailVm.read).toBe(email.read);
    expect(emailVm.body).toBe(email.body);
    expect(emailVm.preview).toBe(email.body);
  });

  it('should handle empty body', () => {
    const email: Email = {
      id: 'test-id',
      subject: 'Test Subject',
      from: 'sender@example.com',
      to: ['recipient@example.com'],
      cc: [],
      bcc: [],
      body: '',
      processedAt: new Date(),
      read: false,
      isDraft: false,
      folderId: 'folder-id',
    };

    const emailVm = mapToEmailVm(email);

    expect(emailVm.body).toBe('');
    expect(emailVm.preview).toBe('');
  });

  it('should handle undefined body', () => {
    const email: Email = {
      id: 'test-id',
      subject: 'Test Subject',
      from: 'sender@example.com',
      to: ['recipient@example.com'],
      cc: [],
      bcc: [],
      body: undefined as unknown as string,
      processedAt: new Date(),
      read: false,
      isDraft: false,
      folderId: 'folder-id',
    };

    const emailVm = mapToEmailVm(email);

    expect(emailVm.body).toBe('');
    expect(emailVm.preview).toBe('');
  });

  it('should truncate long body for preview', () => {
    const longBody = 'a'.repeat(150);
    const email: Email = {
      id: 'test-id',
      subject: 'Test Subject',
      from: 'sender@example.com',
      to: ['recipient@example.com'],
      cc: [],
      bcc: [],
      body: longBody,
      processedAt: new Date(),
      read: false,
      isDraft: false,
      folderId: 'folder-id',
    };

    const emailVm = mapToEmailVm(email);

    expect(emailVm.body).toBe(longBody);
    expect(emailVm.preview).toBe('a'.repeat(100) + '...');
  });
});

describe('mapToEmailVms', () => {
  it('should map an array of Emails to an array of EmailVms', () => {
    const emails: Email[] = [
      {
        id: 'test-id-1',
        subject: 'Test Subject 1',
        from: 'sender1@example.com',
        to: ['recipient1@example.com'],
        cc: [],
        bcc: [],
        body: 'Body 1',
        processedAt: new Date(),
        read: false,
        isDraft: false,
        folderId: 'folder-id',
      },
      {
        id: 'test-id-2',
        subject: 'Test Subject 2',
        from: 'sender2@example.com',
        to: ['recipient2@example.com'],
        cc: [],
        bcc: [],
        body: 'Body 2',
        processedAt: new Date(),
        read: true,
        isDraft: false,
        folderId: 'folder-id',
      },
    ];

    const emailVms = mapToEmailVms(emails);

    expect(emailVms).toHaveLength(2);
    expect(emailVms.length).toBeGreaterThanOrEqual(2);
    expect(emailVms[0]?.id.toString()).toBe('test-id-1');
    expect(emailVms[1]?.id.toString()).toBe('test-id-2');
  });

  it('should return an empty array when given an empty array', () => {
    const emailVms = mapToEmailVms([]);
    expect(emailVms).toEqual([]);
  });
});
