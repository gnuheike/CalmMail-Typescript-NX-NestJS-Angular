import { GetFoldersRequestSchema } from './index';

describe('GetFoldersRequestSchema - Valid Cases', () => {
    it('should validate a valid request with all fields', () => {
        const validRequest = {
            includeEmpty: true,
            includeCustom: true,
        };

        const result = GetFoldersRequestSchema.safeParse(validRequest);
        expect(result.success).toBe(true);
    });

    it('should validate a valid request with only includeEmpty', () => {
        const validRequest = {
            includeEmpty: false,
        };

        const result = GetFoldersRequestSchema.safeParse(validRequest);
        expect(result.success).toBe(true);
    });

    it('should validate a valid request with only includeCustom', () => {
        const validRequest = {
            includeCustom: false,
        };

        const result = GetFoldersRequestSchema.safeParse(validRequest);
        expect(result.success).toBe(true);
    });

    it('should validate an empty request object', () => {
        const validRequest = {};

        const result = GetFoldersRequestSchema.safeParse(validRequest);
        expect(result.success).toBe(true);
    });
});

describe('GetFoldersRequestSchema - Invalid Cases', () => {
    it('should reject a request with non-boolean includeEmpty', () => {
        const invalidRequest = {
            includeEmpty: 'true', // String instead of boolean
        };

        const result = GetFoldersRequestSchema.safeParse(invalidRequest);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues.some((issue) => issue.path.includes('includeEmpty'))).toBe(true);
        }
    });

    it('should reject a request with non-boolean includeCustom', () => {
        const invalidRequest = {
            includeCustom: 'true', // String instead of boolean
        };

        const result = GetFoldersRequestSchema.safeParse(invalidRequest);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues.some((issue) => issue.path.includes('includeCustom'))).toBe(true);
        }
    });
});
