import { Folder, GetFoldersResponse, GetFolderStatsResponse, CreateFolderResponse } from '../../folder';

/**
 * Mock Folder Data
 *
 * This file provides mock data for testing folder-related functionality.
 * These mocks can be used across tests to ensure consistent test data.
 */

/**
 * Creates a mock folder with the given properties
 */
export function createMockFolder(overrides: Partial<Folder> = {}): Folder {
  return {
    id: 'clq1234567890abcdefghijklm',
    name: 'inbox',
    displayName: 'Inbox',
    unreadCount: 5,
    totalCount: 10,
    isDefault: true,
    ...overrides,
  };
}

/**
 * Creates a set of default system folders
 */
export function createDefaultFolders(): Folder[] {
  return [
    createMockFolder({ id: 'clq1234567890abcdefghijklm', name: 'inbox', displayName: 'Inbox' }),
    createMockFolder({ id: 'clq2345678901abcdefghijklm', name: 'sent', displayName: 'Sent' }),
    createMockFolder({ id: 'clq3456789012abcdefghijklm', name: 'drafts', displayName: 'Drafts' }),
    createMockFolder({ id: 'clq4567890123abcdefghijklm', name: 'trash', displayName: 'Trash' }),
  ];
}

/**
 * Creates a mock custom folder
 */
export function createMockCustomFolder(overrides: Partial<Folder> = {}): Folder {
  return createMockFolder({
    id: 'clq5678901234abcdefghijklm',
    name: 'custom',
    displayName: 'Custom Folder',
    isDefault: false,
    ...overrides,
  });
}

/**
 * Creates a mock GetFoldersResponse
 */
export function createMockGetFoldersResponse(overrides: Partial<GetFoldersResponse> = {}): GetFoldersResponse {
  return {
    folders: createDefaultFolders(),
    ...overrides,
  };
}

/**
 * Creates a mock GetFolderStatsResponse
 */
export function createMockGetFolderStatsResponse(overrides: Partial<GetFolderStatsResponse> = {}): GetFolderStatsResponse {
  return {
    stats: {
      folderId: 'clq1234567890abcdefghijklm',
      unreadCount: 5,
      totalCount: 10,
      lastUpdated: new Date(),
      sizeInBytes: 1024,
    },
    ...overrides,
  };
}

/**
 * Creates a mock CreateFolderResponse
 */
export function createMockCreateFolderResponse(overrides: Partial<CreateFolderResponse> = {}): CreateFolderResponse {
  return {
    folder: createMockCustomFolder(),
    ...overrides,
  };
}

/**
 * Creates a nested folder structure for testing
 */
export function createNestedFolderStructure(): Folder[] {
  const parent = createMockCustomFolder({
    id: 'clq5678901234abcdefghijklm',
    displayName: 'Parent Folder',
  });

  const child1 = createMockCustomFolder({
    id: 'clq6789012345abcdefghijklm',
    displayName: 'Child Folder 1',
    parentId: parent.id,
  });

  const child2 = createMockCustomFolder({
    id: 'clq7890123456abcdefghijklm',
    displayName: 'Child Folder 2',
    parentId: parent.id,
  });

  const grandchild = createMockCustomFolder({
    id: 'clq8901234567abcdefghijklm',
    displayName: 'Grandchild Folder',
    parentId: child1.id,
  });

  return [parent, child1, child2, grandchild];
}
