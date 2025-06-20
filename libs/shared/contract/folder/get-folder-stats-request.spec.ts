import { GetFolderStatsRequestSchema } from './index';
import { expectErrorToContainPath } from '../test-utils';

describe('GetFolderStatsRequestSchema - Valid Cases', () => {
    it('should validate a valid request with a valid folderId', () => {
        const validRequest = {
            folderId: 'clq1234567890abcdefghijklm',
        };

        const result = GetFolderStatsRequestSchema.safeParse(validRequest);
        expect(result.success).toBe(true);
    });
});

describe('GetFolderStatsRequestSchema - Invalid Cases', () => {
    it('should reject a request without folderId', () => {
        const invalidRequest = {};

        const result = GetFolderStatsRequestSchema.safeParse(invalidRequest);
        expect(result.success).toBe(false);
        if (!result.success) {
            expectErrorToContainPath(result, 'folderId');
        }
    });

    it('should reject a request with an invalid folderId format', () => {
        const invalidRequest = {
            folderId: 'invalid-folder-id',
        };

        const result = GetFolderStatsRequestSchema.safeParse(invalidRequest);
        expect(result.success).toBe(false);
        if (!result.success) {
            expectErrorToContainPath(result, 'folderId');
        }
    });

    it('should reject a request with a non-string folderId', () => {
        const invalidRequest = {
            folderId: 12345, // Number instead of string
        };

        const result = GetFolderStatsRequestSchema.safeParse(invalidRequest);
        expect(result.success).toBe(false);
        if (!result.success) {
            expectErrorToContainPath(result, 'folderId');
        }
    });
});
