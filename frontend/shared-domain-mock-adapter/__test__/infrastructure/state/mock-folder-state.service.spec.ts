import { TestBed } from '@angular/core/testing';
import { MockFolderStateService } from '../../../infrastructure/state/mock-folder-state.service';
import { MOCK_FOLDERS_INITIAL_STATE } from '@calm-mail/shared-contract-mocks';
import { Folder } from '@calm-mail/contract';

describe('MockFolderStateService', () => {
  let service: MockFolderStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockFolderStateService],
    });
    service = TestBed.inject(MockFolderStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with mock folders data', () => {
    expect(service.folders.length).toBe(MOCK_FOLDERS_INITIAL_STATE.length);
    expect(service.folders).toEqual(expect.arrayContaining(MOCK_FOLDERS_INITIAL_STATE));
  });

  describe('getFolderById', () => {
    it('should return the correct folder when ID exists', () => {
      const inboxId = 'clq1234567890inbox000000001';
      const folder = service.getFolderById(inboxId);

      expect(folder).toBeDefined();
      expect(folder?.id).toBe(inboxId);
      expect(folder?.name).toBe('inbox');
    });

    it('should return undefined when ID does not exist', () => {
      const nonExistentId = 'non-existent-id';
      const folder = service.getFolderById(nonExistentId);

      expect(folder).toBeUndefined();
    });
  });

  describe('addCustomFolder', () => {
    it('should add a new folder to the state', () => {
      const initialCount = service.folders.length;

      const newFolder: Folder = {
        id: 'new-folder-id',
        name: 'custom',
        displayName: 'New Test Folder',
        unreadCount: 0,
        totalCount: 0,
        icon: 'star',
        isDefault: false,
      };

      const result = service.addCustomFolder(newFolder);

      expect(service.folders.length).toBe(initialCount + 1);
      expect(service.getFolderById('new-folder-id')).toEqual(newFolder);
      expect(result).toEqual(newFolder);
    });
  });

  describe('getFolders', () => {
    it('should return all folders when no filters are applied', () => {
      const folders = service.getFolders();

      expect(folders.length).toBe(MOCK_FOLDERS_INITIAL_STATE.length);
    });

    it('should filter out empty folders when includeEmpty is false', () => {
      const folders = service.getFolders(false, true);
      const emptyFoldersCount = MOCK_FOLDERS_INITIAL_STATE.filter((f: Folder) => f.totalCount === 0).length;

      expect(folders.length).toBe(MOCK_FOLDERS_INITIAL_STATE.length - emptyFoldersCount);
      folders.forEach((folder) => {
        expect(folder.totalCount).toBeGreaterThan(0);
      });
    });

    it('should filter out custom folders when includeCustom is false', () => {
      const folders = service.getFolders(true, false);
      const customFoldersCount = MOCK_FOLDERS_INITIAL_STATE.filter((f: Folder) => !f.isDefault).length;

      expect(folders.length).toBe(MOCK_FOLDERS_INITIAL_STATE.length - customFoldersCount);
      folders.forEach((folder) => {
        expect(folder.isDefault).toBe(true);
      });
    });

    it('should apply both filters when both are false', () => {
      const folders = service.getFolders(false, false);

      expect(folders.length).toBeLessThan(MOCK_FOLDERS_INITIAL_STATE.length);
      folders.forEach((folder) => {
        expect(folder.isDefault).toBe(true);
        expect(folder.totalCount).toBeGreaterThan(0);
      });
    });
  });
});
