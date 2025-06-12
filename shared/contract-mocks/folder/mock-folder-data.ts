import { Folder } from '@calm-mail/contract';

/**
 * Static, initial state data for folders.
 * This array serves as the single source of truth for mock folder data.
 */
export const MOCK_FOLDERS_INITIAL_STATE: Folder[] = [
  // Default system folders
  {
    id: 'clq1234567890inbox000000001',
    name: 'inbox',
    displayName: 'Inbox',
    unreadCount: 12,
    totalCount: 45,
    icon: 'mail',
    isDefault: true,
  },
  {
    id: 'clq1234567890sent0000000001',
    name: 'sent',
    displayName: 'Sent',
    unreadCount: 0,
    totalCount: 23,
    icon: 'send',
    isDefault: true,
  },
  {
    id: 'clq1234567890drafts00000001',
    name: 'drafts',
    displayName: 'Drafts',
    unreadCount: 0,
    totalCount: 7,
    icon: 'create',
    isDefault: true,
  },
  {
    id: 'clq1234567890trash000000001',
    name: 'trash',
    displayName: 'Trash',
    unreadCount: 0,
    totalCount: 15,
    icon: 'trash',
    isDefault: true,
  },

  // Custom folders
  {
    id: 'clq1234567890work0000000001',
    name: 'custom',
    displayName: 'Work',
    unreadCount: 3,
    totalCount: 28,
    icon: 'briefcase',
    isDefault: false,
  },
  {
    id: 'clq1234567890family00000001',
    name: 'custom',
    displayName: 'Family',
    unreadCount: 1,
    totalCount: 12,
    icon: 'people',
    isDefault: false,
  },
  {
    id: 'clq1234567890finance0000001',
    name: 'custom',
    displayName: 'Finance',
    unreadCount: 0,
    totalCount: 18,
    icon: 'cash',
    isDefault: false,
  },
  {
    id: 'clq1234567890travel00000001',
    name: 'custom',
    displayName: 'Travel',
    unreadCount: 2,
    totalCount: 9,
    icon: 'airplane',
    isDefault: false,
  },
  {
    id: 'clq1234567890archive0000001',
    name: 'custom',
    displayName: 'Archive',
    unreadCount: 0,
    totalCount: 56,
    icon: 'archive',
    isDefault: false,
    parentId: 'clq1234567890work0000000001', // Nested under Work folder
  },
];
