import { Folder } from './index';

export const inboxFolder: Folder = {
    id: 'clq1234567890abcdefghijklm',
    name: 'Inbox',
    role: 'inbox',
    unreadCount: 3,
    totalCount: 3,
    sizeInBytes: 1024 * 1024 * 3, // 3 MB
    lastSyncAt: new Date('2023-12-01T12:00:00Z'),
};
export const sentFolder: Folder = {
    id: 'clq2345678901abcdefghijklm',
    name: 'Sent',
    role: 'sent',
    unreadCount: 0,
    totalCount: 2,
    sizeInBytes: 1024 * 1024 * 2, // 2 MB
    lastSyncAt: new Date('2023-12-01T12:00:00Z'),
};
export const draftsFolder: Folder = {
    id: 'clq3456789012abcdefghijklm',
    name: 'Drafts',
    role: 'drafts',
    unreadCount: 0,
    totalCount: 1,
    sizeInBytes: 1024 * 512, // 512 KB
    lastSyncAt: new Date('2023-12-01T12:00:00Z'),
};
export const trashFolder: Folder = {
    id: 'clq4567890123abcdefghijklm',
    name: 'Trash',
    role: 'trash',
    unreadCount: 0,
    totalCount: 1,
};

export const workFolder: Folder = {
    id: 'clq5678901234abcdefghijklm',
    name: 'Work',
    role: null,
    unreadCount: 1,
    totalCount: 2,
};

export const familyFolder: Folder = {
    id: 'clq6789012345abcdefghijklm',
    name: 'Family',
    role: null,
    unreadCount: 0,
    totalCount: 1,
};

export const mockFolders: Folder[] = [inboxFolder, sentFolder, draftsFolder, trashFolder, workFolder, familyFolder];
