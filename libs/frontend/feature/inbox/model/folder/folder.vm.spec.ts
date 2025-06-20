import { FolderId, mapToFolderVm, mapToFolderVms } from './folder.vm';
import { Folder } from '@calm-mail/contract';

describe('FolderId', () => {
  it('should create a FolderId from a string', () => {
    const id = 'test-id';
    const folderId = FolderId.fromString(id);

    expect(folderId).toBeDefined();
    expect(folderId.toString()).toBe(id);
  });
});

describe('mapToFolderVm', () => {
  it('should map a Folder to a FolderVm', () => {
    const folder: Folder = {
      id: 'test-id',
      name: 'inbox',
      displayName: 'Inbox',
      unreadCount: 5,
      totalCount: 10,
      isDefault: true,
      icon: 'mail-outline',
    };

    const folderVm = mapToFolderVm(folder);

    expect(folderVm).toBeDefined();
    expect(folderVm.id.toString()).toBe(folder.id);
    expect(folderVm.name).toBe(folder.name);
    expect(folderVm.displayName).toBe(folder.displayName);
    expect(folderVm.unreadCount).toBe(folder.unreadCount);
    expect(folderVm.totalCount).toBe(folder.totalCount);
    expect(folderVm.isDefault).toBe(folder.isDefault);
    expect(folderVm.icon).toBe(folder.icon);
  });

  it('should handle undefined icon', () => {
    const folder: Folder = {
      id: 'test-id',
      name: 'inbox',
      displayName: 'Inbox',
      unreadCount: 5,
      totalCount: 10,
      isDefault: true,
    };

    const folderVm = mapToFolderVm(folder);

    expect(folderVm.icon).toBeUndefined();
  });
});

describe('mapToFolderVms', () => {
  it('should map an array of Folders to an array of FolderVms', () => {
    const folders: Folder[] = [
      {
        id: 'test-id-1',
        name: 'inbox',
        displayName: 'Inbox',
        unreadCount: 5,
        totalCount: 10,
        isDefault: true,
      },
      {
        id: 'test-id-2',
        name: 'sent',
        displayName: 'Sent',
        unreadCount: 0,
        totalCount: 20,
        isDefault: true,
        icon: 'paper-plane-outline',
      },
    ];

    const folderVms = mapToFolderVms(folders);

    expect(folderVms).toHaveLength(2);
    expect(folderVms.length).toBeGreaterThanOrEqual(2);
    expect(folderVms[0]?.id.toString()).toBe('test-id-1');
    expect(folderVms[1]?.id.toString()).toBe('test-id-2');
    expect(folderVms[0]?.icon).toBeUndefined();
    expect(folderVms[1]?.icon).toBe('paper-plane-outline');
  });

  it('should return an empty array when given an empty array', () => {
    const folderVms = mapToFolderVms([]);
    expect(folderVms).toEqual([]);
  });
});
