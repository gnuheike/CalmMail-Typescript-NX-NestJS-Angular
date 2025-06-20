import { GetEmailsRequestQuerySchema } from './index';

describe('GetEmailsRequestQuerySchema - Valid Cases', () => {
    it('should validate a valid request query', () => {
        const validQuery = {
            page: 1,
            limit: 25,
            folderId: 'clq0987654321abcdefghijklm',
        };

        const result = GetEmailsRequestQuerySchema.safeParse(validQuery);
        expect(result.success).toBe(true);
    });

    it('should apply default values for missing pagination parameters', () => {
        const partialQuery = {
            folderId: 'clq0987654321abcdefghijklm',
        };

        const result = GetEmailsRequestQuerySchema.safeParse(partialQuery);
        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.page).toBe(1); // Default page
            expect(result.data.limit).toBe(25); // Default limit
        }
    });
});
