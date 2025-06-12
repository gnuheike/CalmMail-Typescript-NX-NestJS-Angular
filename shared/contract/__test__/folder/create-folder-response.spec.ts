import { CreateFolderResponseSchema } from '../../folder';
import { expectErrorToContainPath } from '@calm-mail/tests-utils';

describe('CreateFolderResponseSchema - Valid Cases', () => {
  it('should validate a valid response with all folder fields', () => {
    const validResponse = {
      folder: {
        id: 'clq1234567890abcdefghijklm',
        name: 'custom',
        displayName: 'Work Emails',
        unreadCount: 0,
        totalCount: 0,
        icon: 'work-icon',
        isDefault: false,
        parentId: 'clq0987654321abcdefghijklm',
      },
    };

    const result = CreateFolderResponseSchema.safeParse(validResponse);
    expect(result.success).toBe(true);
  });

  it('should validate a valid response without optional folder fields', () => {
    const validResponse = {
      folder: {
        id: 'clq1234567890abcdefghijklm',
        name: 'custom',
        displayName: 'Personal Emails',
        unreadCount: 0,
        totalCount: 0,
        isDefault: false,
      },
    };

    const result = CreateFolderResponseSchema.safeParse(validResponse);
    expect(result.success).toBe(true);
  });
});

describe('CreateFolderResponseSchema - Invalid Cases', () => {
  it('should reject a response without folder object', () => {
    const invalidResponse = {};

    const result = CreateFolderResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
    if (!result.success) {
      expectErrorToContainPath(result, 'folder');
    }
  });

  it('should reject a response with invalid folder object', () => {
    const invalidResponse = {
      folder: {
        id: 'clq1234567890abcdefghijklm',
        // Missing required fields: name, displayName, unreadCount, totalCount, isDefault
      },
    };

    const result = CreateFolderResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
    if (!result.success) {
      // Check for specific missing fields
      const errorPaths = result.error.issues.map((issue) => issue.path.join('.'));
      expect(errorPaths.some((path) => path.includes('folder.name'))).toBe(true);
      expect(errorPaths.some((path) => path.includes('folder.displayName'))).toBe(true);
      expect(errorPaths.some((path) => path.includes('folder.unreadCount'))).toBe(true);
      expect(errorPaths.some((path) => path.includes('folder.totalCount'))).toBe(true);
      expect(errorPaths.some((path) => path.includes('folder.isDefault'))).toBe(true);
    }
  });

  it('should reject a response with invalid folder id format', () => {
    const invalidResponse = {
      folder: {
        id: 'invalid-id',
        name: 'custom',
        displayName: 'Work Emails',
        unreadCount: 0,
        totalCount: 0,
        isDefault: false,
      },
    };

    const result = CreateFolderResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
    if (!result.success) {
      expectErrorToContainPath(result, 'folder.id');
    }
  });

  it('should reject a response with invalid folder name', () => {
    const invalidResponse = {
      folder: {
        id: 'clq1234567890abcdefghijklm',
        name: 'invalid-name', // Not in the enum
        displayName: 'Work Emails',
        unreadCount: 0,
        totalCount: 0,
        isDefault: false,
      },
    };

    const result = CreateFolderResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
    if (!result.success) {
      expectErrorToContainPath(result, 'folder.name');
    }
  });
});
