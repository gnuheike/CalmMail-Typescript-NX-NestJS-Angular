import { GetFoldersResponseSchema } from '../../folder';
import { expectErrorToContainPath } from '@calm-mail/tests-utils';

describe('GetFoldersResponseSchema - Valid Cases', () => {
  it('should validate a valid response with multiple folders', () => {
    const validResponse = {
      folders: [
        {
          id: 'clq1234567890abcdefghijklm',
          name: 'inbox',
          displayName: 'Inbox',
          unreadCount: 5,
          totalCount: 10,
          isDefault: true,
        },
        {
          id: 'clq0987654321abcdefghijklm',
          name: 'sent',
          displayName: 'Sent',
          unreadCount: 0,
          totalCount: 15,
          isDefault: true,
        },
        {
          id: 'clq5678901234abcdefghijklm',
          name: 'custom',
          displayName: 'My Custom Folder',
          unreadCount: 2,
          totalCount: 7,
          icon: 'custom-icon',
          isDefault: false,
          parentId: 'clq1234567890abcdefghijklm',
        },
      ],
    };

    const result = GetFoldersResponseSchema.safeParse(validResponse);
    expect(result.success).toBe(true);
  });

  it('should validate a valid response with an empty folders array', () => {
    const validResponse = {
      folders: [],
    };

    const result = GetFoldersResponseSchema.safeParse(validResponse);
    expect(result.success).toBe(true);
  });
});

describe('GetFoldersResponseSchema - Invalid Cases', () => {
  it('should reject a response without folders array', () => {
    const invalidResponse = {};

    const result = GetFoldersResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
    if (!result.success) {
      expectErrorToContainPath(result, 'folders');
    }
  });

  it('should reject a response with invalid folder objects', () => {
    const invalidResponse = {
      folders: [
        {
          id: 'clq1234567890abcdefghijklm',
          name: 'inbox',
          displayName: 'Inbox',
          // Missing required fields: unreadCount, totalCount, isDefault
        },
      ],
    };

    const result = GetFoldersResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
    if (!result.success) {
      // Check for specific missing fields
      const errorPaths = result.error.issues.map((issue) => issue.path.join('.'));
      expect(errorPaths.some((path) => path.includes('folders.0.unreadCount'))).toBe(true);
      expect(errorPaths.some((path) => path.includes('folders.0.totalCount'))).toBe(true);
      expect(errorPaths.some((path) => path.includes('folders.0.isDefault'))).toBe(true);
    }
  });

  it('should reject a response with non-array folders', () => {
    const invalidResponse = {
      folders: 'not an array',
    };

    const result = GetFoldersResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
    if (!result.success) {
      expectErrorToContainPath(result, 'folders');
    }
  });
});
