import { GetEmailsResponseSchema } from '../../email';

describe('GetEmailsResponseSchema - Valid Cases', () => {
  it('should validate a valid response', () => {
    const validResponse = {
      emails: [
        {
          id: 'clq1234567890abcdefghijklm',
          subject: 'Test Subject',
          from: 'sender@example.com',
          to: ['recipient@example.com'],
          cc: [],
          bcc: [],
          body: 'This is a test email body',
          processedAt: new Date(),
          read: false,
          isDraft: false,
          folderId: 'clq0987654321abcdefghijklm',
        },
      ],
      pagination: {
        page: 1,
        limit: 25,
        totalItems: 1,
        totalPages: 1,
      },
    };

    const result = GetEmailsResponseSchema.safeParse(validResponse);
    expect(result.success).toBe(true);
  });
});
