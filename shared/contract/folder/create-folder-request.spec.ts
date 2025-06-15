import { CreateFolderRequestSchema } from './index';
import { expectErrorToContainPath } from '@calm-mail/tests-utils';

describe('CreateFolderRequestSchema - Valid Cases', () => {
    it('should validate a valid request with all fields', () => {
        const validRequest = {
            name: 'work',
            displayName: 'Work Emails',
            parentId: 'clq1234567890abcdefghijklm',
        };

        const result = CreateFolderRequestSchema.safeParse(validRequest);
        expect(result.success).toBe(true);
    });

    it('should validate a valid request without optional fields', () => {
        const validRequest = {
            name: 'personal',
            displayName: 'Personal Emails',
        };

        const result = CreateFolderRequestSchema.safeParse(validRequest);
        expect(result.success).toBe(true);
    });
});

describe('CreateFolderRequestSchema - Invalid Cases', () => {
    it('should reject a request with missing name', () => {
        const invalidRequest = {
            displayName: 'Work Emails',
        };

        const result = CreateFolderRequestSchema.safeParse(invalidRequest);
        expect(result.success).toBe(false);
        if (!result.success) {
            expectErrorToContainPath(result, 'name');
        }
    });

    it('should reject a request with missing displayName', () => {
        const invalidRequest = {
            name: 'work',
        };

        const result = CreateFolderRequestSchema.safeParse(invalidRequest);
        expect(result.success).toBe(false);
        if (!result.success) {
            expectErrorToContainPath(result, 'displayName');
        }
    });

    it('should reject a request with empty name', () => {
        const invalidRequest = {
            name: '',
            displayName: 'Work Emails',
        };

        const result = CreateFolderRequestSchema.safeParse(invalidRequest);
        expect(result.success).toBe(false);
        if (!result.success) {
            expectErrorToContainPath(result, 'name');
        }
    });

    it('should reject a request with empty displayName', () => {
        const invalidRequest = {
            name: 'work',
            displayName: '',
        };

        const result = CreateFolderRequestSchema.safeParse(invalidRequest);
        expect(result.success).toBe(false);
        if (!result.success) {
            expectErrorToContainPath(result, 'displayName');
        }
    });

    it('should reject a request with invalid parentId format', () => {
        const invalidRequest = {
            name: 'work',
            displayName: 'Work Emails',
            parentId: 'invalid-parent-id',
        };

        const result = CreateFolderRequestSchema.safeParse(invalidRequest);
        expect(result.success).toBe(false);
        if (!result.success) {
            expectErrorToContainPath(result, 'parentId');
        }
    });
});
