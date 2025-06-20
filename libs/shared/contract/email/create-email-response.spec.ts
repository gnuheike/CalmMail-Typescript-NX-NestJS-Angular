import { CreateEmailResponseSchema } from './index';
import { expectErrorToContainPath } from '../test-utils';

describe('CreateEmailResponseSchema', () => {
    it('should validate a valid response', () => {
        const validResponse = {
            email: {
                id: 'clq1234567890abcdefghijklm',
                subject: 'Test Subject',
                from: 'sender@example.com',
                to: ['recipient@example.com'],
                cc: [],
                bcc: [],
                body: 'This is a test email body',
                processedAt: new Date(),
                read: false,
                isDraft: true,
                folderId: 'clq0987654321abcdefghijklm',
                threadId: 'clq5678901234abcdefghijklm',
            },
        };

        const result = CreateEmailResponseSchema.safeParse(validResponse);
        expect(result.success).toBe(true);
    });

    it('should reject a response with invalid email data', () => {
        const invalidResponse = {
            email: {
                id: 'invalid-id', // Invalid ID format
                subject: 'Test Subject',
                from: 'sender@example.com',
                to: ['recipient@example.com'],
                cc: [],
                bcc: [],
                body: 'This is a test email body',
                processedAt: new Date(),
                read: false,
                isDraft: true,
                folderId: 'clq0987654321abcdefghijklm',
            },
        };

        const result = CreateEmailResponseSchema.safeParse(invalidResponse);
        expect(result.success).toBe(false);
        if (!result.success) {
            expectErrorToContainPath(result, 'email');
        }
    });
});
