import { Folder } from './index';

export const inboxFolder: Folder = {
    id: 'clq1234567890abcdefghijklm',
    name: 'inbox',
    displayName: 'Inbox',
    unreadCount: 3,
    totalCount: 3,
    isDefault: true,
};
export const sentFolder: Folder = {
    id: 'clq2345678901abcdefghijklm',
    name: 'sent',
    displayName: 'sent',
    unreadCount: 0,
    totalCount: 2,
    isDefault: true,
};
export const draftsFolder: Folder = {
    id: 'clq3456789012abcdefghijklm',
    name: 'drafts',
    displayName: 'drafts',
    unreadCount: 0,
    totalCount: 1,
    isDefault: true,
};
export const trashFolder: Folder = {
    id: 'clq4567890123abcdefghijklm',
    name: 'trash',
    displayName: 'trash',
    unreadCount: 0,
    totalCount: 1,
    isDefault: true,
};

export const workFolder: Folder = {
    id: 'clq5678901234abcdefghijklm',
    name: 'custom',
    displayName: 'Work',
    unreadCount: 1,
    totalCount: 2,
    isDefault: false,
};

export const familyFolder: Folder = {
    id: 'clq6789012345abcdefghijklm',
    name: 'custom',
    displayName: 'Family',
    unreadCount: 0,
    totalCount: 1,
    isDefault: false,
};

export const mockFolders: Folder[] = [inboxFolder, sentFolder, draftsFolder, trashFolder, workFolder, familyFolder];
