import { CreateEmailRequestBodySchema } from './index';

describe('CreateEmailRequestBodySchema - Valid Cases', () => {
    it('should validate a valid request body', () => {
        const validBody = {
            from: 'sender@example.com',
            to: ['recipient@example.com'],
            cc: [],
            bcc: [],
            subject: 'Test Subject',
            body: 'This is a test email body',
            folderId: 'clq0987654321abcdefghijklm',
            saveAsDraft: true,
            threadId: 'clq5678901234abcdefghijklm',
        };

        const result = CreateEmailRequestBodySchema.safeParse(validBody);
        expect(result.success).toBe(true);
    });

    it('should validate a minimal valid request body', () => {
        const minimalBody = {
            from: 'sender@example.com',
            to: ['recipient@example.com'],
            subject: 'Test Subject',
            body: 'This is a test email body',
        };

        const result = CreateEmailRequestBodySchema.safeParse(minimalBody);
        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.cc).toEqual([]); // Default empty array
            expect(result.data.bcc).toEqual([]); // Default empty array
        }
    });
});
