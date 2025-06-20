import { EmailSchema } from './index';

describe('EmailSchema - Valid Cases', () => {
    it('should validate a valid email object', () => {
        const validEmail = {
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
            threadId: 'clq5678901234abcdefghijklm',
        };

        const result = EmailSchema.safeParse(validEmail);
        expect(result.success).toBe(true);
    });
});
