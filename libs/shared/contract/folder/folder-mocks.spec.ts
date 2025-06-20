import { 
  createMockFolder, 
  createDefaultFolders, 
  createMockCustomFolder, 
  createMockGetFoldersResponse, 
  createMockGetFolderStatsResponse, 
  createMockCreateFolderResponse, 
  createNestedFolderStructure 
} from './folder-mocks';
import { Folder } from './index';

describe('folder-mocks', () => {
  describe('createMockFolder', () => {
    it('should create a default mock folder', () => {
      const folder = createMockFolder();

      expect(folder).toEqual({
        id: 'clq1234567890abcdefghijklm',
        name: 'inbox',
        displayName: 'Inbox',
        unreadCount: 5,
        totalCount: 10,
        isDefault: true,
      });
    });

    it('should override default properties with provided values', () => {
      const folder = createMockFolder({
        id: 'custom-id',
        name: 'custom',
        displayName: 'Custom Folder',
        unreadCount: 10,
        totalCount: 20,
        isDefault: false,
        parentId: 'parent-id',
      });

      expect(folder).toEqual({
        id: 'custom-id',
        name: 'custom',
        displayName: 'Custom Folder',
        unreadCount: 10,
        totalCount: 20,
        isDefault: false,
        parentId: 'parent-id',
      });
    });

    it('should merge partial overrides with default values', () => {
      const folder = createMockFolder({
        displayName: 'Only Override Display Name',
      });

      expect(folder).toEqual({
        id: 'clq1234567890abcdefghijklm',
        name: 'inbox',
        displayName: 'Only Override Display Name',
        unreadCount: 5,
        totalCount: 10,
        isDefault: true,
      });
    });
  });

  describe('createDefaultFolders', () => {
    it('should create an array of default system folders', () => {
      const folders = createDefaultFolders();

      expect(folders).toHaveLength(4);

      // Check if folders array has the expected elements before accessing them
      if (folders.length >= 4) {
        expect(folders[0]?.name).toBe('inbox');
        expect(folders[1]?.name).toBe('sent');
        expect(folders[2]?.name).toBe('drafts');
        expect(folders[3]?.name).toBe('trash');
      }

      // Verify all folders have the isDefault property set to true
      folders.forEach(folder => {
        expect(folder.isDefault).toBe(true);
      });
    });

    it('should create folders with unique IDs', () => {
      const folders = createDefaultFolders();
      const ids = folders.map(folder => folder.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(folders.length);
    });
  });

  describe('createMockCustomFolder', () => {
    it('should create a custom folder with default values', () => {
      const folder = createMockCustomFolder();

      expect(folder).toEqual({
        id: 'clq5678901234abcdefghijklm',
        name: 'custom',
        displayName: 'Custom Folder',
        unreadCount: 5,
        totalCount: 10,
        isDefault: false,
      });
    });

    it('should override default properties with provided values', () => {
      const folder = createMockCustomFolder({
        id: 'custom-id',
        displayName: 'My Special Folder',
        parentId: 'parent-id',
      });

      expect(folder).toEqual({
        id: 'custom-id',
        name: 'custom',
        displayName: 'My Special Folder',
        unreadCount: 5,
        totalCount: 10,
        isDefault: false,
        parentId: 'parent-id',
      });
    });

    it('should allow overriding isDefault property', () => {
      const folder = createMockCustomFolder({
        isDefault: true,
      });

      expect(folder.isDefault).toBe(true);
    });
  });

  describe('createMockGetFoldersResponse', () => {
    it('should create a default GetFoldersResponse', () => {
      const response = createMockGetFoldersResponse();

      expect(response).toHaveProperty('folders');
      expect(response.folders).toHaveLength(4);

      if (response.folders.length > 0) {
        expect(response.folders[0]?.name).toBe('inbox');
      }
    });

    it('should override default properties with provided values', () => {
      const customFolders = [createMockCustomFolder()];
      const response = createMockGetFoldersResponse({
        folders: customFolders,
      });

      expect(response.folders).toBe(customFolders);
    });

    it('should create a response with an empty folders array', () => {
      const response = createMockGetFoldersResponse({
        folders: [],
      });

      expect(response.folders).toEqual([]);
    });
  });

  describe('createMockGetFolderStatsResponse', () => {
    it('should create a default GetFolderStatsResponse', () => {
      const response = createMockGetFolderStatsResponse();

      expect(response).toHaveProperty('stats');
      expect(response.stats).toHaveProperty('folderId', 'clq1234567890abcdefghijklm');
      expect(response.stats).toHaveProperty('unreadCount', 5);
      expect(response.stats).toHaveProperty('totalCount', 10);
      expect(response.stats).toHaveProperty('lastUpdated');
      expect(response.stats.lastUpdated).toBeInstanceOf(Date);
      expect(response.stats).toHaveProperty('sizeInBytes', 1024);
    });

    it('should override default properties with provided values', () => {
      const customStats = {
        stats: {
          folderId: 'custom-id',
          unreadCount: 15,
          totalCount: 30,
          lastUpdated: new Date('2023-01-01'),
          sizeInBytes: 2048,
        }
      };

      const response = createMockGetFolderStatsResponse(customStats);

      expect(response).toEqual(customStats);
    });

    it('should allow overriding individual stats properties', () => {
      const response = createMockGetFolderStatsResponse({
        stats: {
          folderId: 'clq1234567890abcdefghijklm',
          unreadCount: 42,
          totalCount: 10,
          lastUpdated: new Date(),
          sizeInBytes: 1024,
        }
      });

      expect(response.stats.unreadCount).toBe(42);
      expect(response.stats.folderId).toBe('clq1234567890abcdefghijklm');
    });
  });

  describe('createMockCreateFolderResponse', () => {
    it('should create a default CreateFolderResponse', () => {
      const response = createMockCreateFolderResponse();

      expect(response).toHaveProperty('folder');
      expect(response.folder.id).toBe('clq5678901234abcdefghijklm');
      expect(response.folder.name).toBe('custom');
      expect(response.folder.displayName).toBe('Custom Folder');
      expect(response.folder.isDefault).toBe(false);
    });

    it('should override default properties with provided values', () => {
      const customFolder = createMockFolder({
        id: 'custom-id',
        name: 'custom',
        displayName: 'My Special Folder',
      });

      const response = createMockCreateFolderResponse({
        folder: customFolder,
      });

      expect(response.folder).toBe(customFolder);
    });

    it('should create a response with a folder that has specific properties', () => {
      const response = createMockCreateFolderResponse({
        folder: {
          id: 'specific-id',
          name: 'custom', // Must be one of the valid enum values
          displayName: 'Specific Folder',
          unreadCount: 0,
          totalCount: 0,
          isDefault: false,
        }
      });

      expect(response.folder.id).toBe('specific-id');
      expect(response.folder.name).toBe('custom');
      expect(response.folder.displayName).toBe('Specific Folder');
    });
  });

  describe('createNestedFolderStructure', () => {
    it('should create a nested folder structure with parent-child relationships', () => {
      const folders = createNestedFolderStructure();

      expect(folders).toHaveLength(4);

      // Safely access array elements
      if (folders.length >= 4) {
        // Parent folder
        const parent = folders[0];
        const child1 = folders[1];
        const child2 = folders[2];
        const grandchild = folders[3];

        if (parent && child1 && child2 && grandchild) {
          expect(parent.id).toBe('clq5678901234abcdefghijklm');
          expect(parent.displayName).toBe('Parent Folder');
          expect(parent.parentId).toBeUndefined();

          // Child folders
          expect(child1.parentId).toBe(parent.id);
          expect(child2.parentId).toBe(parent.id);
          expect(child1.displayName).toBe('Child Folder 1');
          expect(child2.displayName).toBe('Child Folder 2');

          // Grandchild folder
          expect(grandchild.parentId).toBe(child1.id);
          expect(grandchild.displayName).toBe('Grandchild Folder');
        }
      }
    });

    it('should create folders with the correct hierarchy', () => {
      const folders = createNestedFolderStructure();

      // Map folders by ID for easier lookup
      const folderMap = new Map<string, Folder>();
      folders.forEach(folder => folderMap.set(folder.id, folder));

      // Check parent-child relationships
      folders.forEach(folder => {
        if (folder.parentId) {
          const parent = folderMap.get(folder.parentId);
          expect(parent).toBeDefined();
        }
      });
    });
  });
});
