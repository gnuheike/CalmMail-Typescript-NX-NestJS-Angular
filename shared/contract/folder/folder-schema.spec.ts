import { FolderSchema } from './index';
import { expectErrorToContainPath } from '@calm-mail/tests-utils';

describe('FolderSchema - Valid Cases', () => {
    it('should validate a valid folder object', () => {
        const validFolder = {
            id: 'clq1234567890abcdefghijklm',
            name: 'inbox',
            displayName: 'Inbox',
            unreadCount: 5,
            totalCount: 10,
            icon: 'inbox-icon',
            isDefault: true,
            parentId: 'clq0987654321abcdefghijklm',
        };

        const result = FolderSchema.safeParse(validFolder);
        expect(result.success).toBe(true);
    });

    it('should validate a valid folder without optional fields', () => {
        const validFolder = {
            id: 'clq1234567890abcdefghijklm',
            name: 'custom',
            displayName: 'My Custom Folder',
            unreadCount: 0,
            totalCount: 0,
            isDefault: false,
        };

        const result = FolderSchema.safeParse(validFolder);
        expect(result.success).toBe(true);
    });
});

describe('FolderSchema - Invalid Cases', () => {
    it('should reject a folder with invalid id format', () => {
        const invalidFolder = {
            id: 'invalid-id',
            name: 'inbox',
            displayName: 'Inbox',
            unreadCount: 5,
            totalCount: 10,
            isDefault: true,
        };

        const result = FolderSchema.safeParse(invalidFolder);
        expect(result.success).toBe(false);
        if (!result.success) {
            expectErrorToContainPath(result, 'id');
        }
    });

    it('should reject a folder with invalid name', () => {
        const invalidFolder = {
            id: 'clq1234567890abcdefghijklm',
            name: 'invalid-name',
            displayName: 'Invalid Folder',
            unreadCount: 5,
            totalCount: 10,
            isDefault: true,
        };

        const result = FolderSchema.safeParse(invalidFolder);
        expect(result.success).toBe(false);
        if (!result.success) {
            expectErrorToContainPath(result, 'name');
        }
    });

    it('should reject a folder with negative unreadCount', () => {
        const invalidFolder = {
            id: 'clq1234567890abcdefghijklm',
            name: 'inbox',
            displayName: 'Inbox',
            unreadCount: -1,
            totalCount: 10,
            isDefault: true,
        };

        const result = FolderSchema.safeParse(invalidFolder);
        expect(result.success).toBe(false);
        if (!result.success) {
            expectErrorToContainPath(result, 'unreadCount');
        }
    });

    it('should reject a folder with negative totalCount', () => {
        const invalidFolder = {
            id: 'clq1234567890abcdefghijklm',
            name: 'inbox',
            displayName: 'Inbox',
            unreadCount: 5,
            totalCount: -1,
            isDefault: true,
        };

        const result = FolderSchema.safeParse(invalidFolder);
        expect(result.success).toBe(false);
        if (!result.success) {
            expectErrorToContainPath(result, 'totalCount');
        }
    });

    it('should reject a folder with invalid parentId format', () => {
        const invalidFolder = {
            id: 'clq1234567890abcdefghijklm',
            name: 'inbox',
            displayName: 'Inbox',
            unreadCount: 5,
            totalCount: 10,
            isDefault: true,
            parentId: 'invalid-parent-id',
        };

        const result = FolderSchema.safeParse(invalidFolder);
        expect(result.success).toBe(false);
        if (!result.success) {
            expectErrorToContainPath(result, 'parentId');
        }
    });
});
