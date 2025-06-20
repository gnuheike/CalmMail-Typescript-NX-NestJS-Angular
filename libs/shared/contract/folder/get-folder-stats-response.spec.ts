import { GetFolderStatsResponseSchema } from './index';
import { expectErrorToContainPath } from '../test-utils';

describe('GetFolderStatsResponseSchema - Valid Cases', () => {
    it('should validate a valid response with all fields', () => {
        const validResponse = {
            stats: {
                folderId: 'clq1234567890abcdefghijklm',
                unreadCount: 5,
                totalCount: 10,
                lastUpdated: new Date(),
                sizeInBytes: 1024,
            },
        };

        const result = GetFolderStatsResponseSchema.safeParse(validResponse);
        expect(result.success).toBe(true);
    });

    it('should validate a valid response without optional fields', () => {
        const validResponse = {
            stats: {
                folderId: 'clq1234567890abcdefghijklm',
                unreadCount: 0,
                totalCount: 0,
                lastUpdated: new Date(),
            },
        };

        const result = GetFolderStatsResponseSchema.safeParse(validResponse);
        expect(result.success).toBe(true);
    });
});

describe('GetFolderStatsResponseSchema - Invalid Cases', () => {
    it('should reject a response without stats object', () => {
        const invalidResponse = {};

        const result = GetFolderStatsResponseSchema.safeParse(invalidResponse);
        expect(result.success).toBe(false);
        if (!result.success) {
            expectErrorToContainPath(result, 'stats');
        }
    });

    it('should reject a response with missing required fields in stats', () => {
        const invalidResponse = {
            stats: {
                folderId: 'clq1234567890abcdefghijklm',
                // Missing required fields: unreadCount, totalCount, lastUpdated
            },
        };

        const result = GetFolderStatsResponseSchema.safeParse(invalidResponse);
        expect(result.success).toBe(false);
        if (!result.success) {
            // Check for specific missing fields
            const errorPaths = result.error.issues.map((issue) => issue.path.join('.'));
            expect(errorPaths.some((path) => path.includes('stats.unreadCount'))).toBe(true);
            expect(errorPaths.some((path) => path.includes('stats.totalCount'))).toBe(true);
            expect(errorPaths.some((path) => path.includes('stats.lastUpdated'))).toBe(true);
        }
    });

    it('should reject a response with invalid folderId format', () => {
        const invalidResponse = {
            stats: {
                folderId: 'invalid-folder-id',
                unreadCount: 5,
                totalCount: 10,
                lastUpdated: new Date(),
            },
        };

        const result = GetFolderStatsResponseSchema.safeParse(invalidResponse);
        expect(result.success).toBe(false);
        if (!result.success) {
            expectErrorToContainPath(result, 'stats.folderId');
        }
    });

    it('should reject a response with negative counts', () => {
        const invalidResponse = {
            stats: {
                folderId: 'clq1234567890abcdefghijklm',
                unreadCount: -1, // Negative count
                totalCount: 10,
                lastUpdated: new Date(),
            },
        };

        const result = GetFolderStatsResponseSchema.safeParse(invalidResponse);
        expect(result.success).toBe(false);
        if (!result.success) {
            expectErrorToContainPath(result, 'stats.unreadCount');
        }
    });

    it('should reject a response with invalid lastUpdated date', () => {
        const invalidResponse = {
            stats: {
                folderId: 'clq1234567890abcdefghijklm',
                unreadCount: 5,
                totalCount: 10,
                lastUpdated: 'not-a-date', // Invalid date
            },
        };

        const result = GetFolderStatsResponseSchema.safeParse(invalidResponse);
        expect(result.success).toBe(false);
        if (!result.success) {
            expectErrorToContainPath(result, 'stats.lastUpdated');
        }
    });
});
