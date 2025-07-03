import { z } from 'zod';

/**
 * Folder Role Enum
 * 
 * Defines the possible roles for system folders.
 * Custom folders will have a null role.
 */
export const FolderRoleEnum = z.enum(['inbox', 'sent', 'drafts', 'trash', 'spam', 'archive']);

/**
 * Folder Schema
 *
 * Defines the core structure and validation rules for a Folder entity.
 * This schema represents a stored folder with all its properties.
 *
 * Properties:
 * - id: Unique identifier
 * - name: User-facing display name for the folder
 * - role: System role of the folder (inbox, sent, etc.) or null for custom folders
 * - unreadCount: Number of unread emails in the folder
 * - totalCount: Total number of emails in the folder
 * - icon: Optional icon identifier for the folder
 * - parentId: Optional parent folder ID for nested folders
 */
export const FolderSchema = z.object({
    id: z.string().cuid2(),
    name: z.string(),
    role: FolderRoleEnum.nullable(),
    unreadCount: z.number().min(0),
    totalCount: z.number().min(0),
    sizeInBytes: z.number().min(0).optional(), // Added for folder size statistics
    lastSyncAt: z.date().nullable().optional(), // Added for sync status
    icon: z.string().optional(),
    parentId: z.string().cuid2().optional(),
});

/**
 * Default system folders that are always present
 */
export const DEFAULT_FOLDERS = [
    { id: 'inbox', name: 'Inbox', role: 'inbox' },
    { id: 'sent', name: 'Sent', role: 'sent' },
    { id: 'drafts', name: 'Drafts', role: 'drafts' },
    { id: 'trash', name: 'Trash', role: 'trash' },
    { id: 'spam', name: 'Spam', role: 'spam' },
    { id: 'archive', name: 'Archive', role: 'archive' },
] as const;

/**
 * Get Folders Request Schema
 *
 * Schema for query parameters when fetching a list of folders.
 * Allows filtering of empty folders and custom folders.
 *
 * Properties:
 * - includeEmpty: Whether to include folders with no emails
 * - includeCustom: Whether to include custom folders (folders with null role)
 */
export const GetFoldersRequestSchema = z.object({
    includeEmpty: z.boolean().optional(),
    includeCustom: z.boolean().optional(),
});

/**
 * Get Folders Response Schema
 *
 * Schema for the response when fetching a list of folders.
 * Returns an array of folder objects.
 *
 * Properties:
 * - folders: Array of folder objects
 */
export const GetFoldersResponseSchema = z.object({
    folders: z.array(FolderSchema),
});


/**
 * Create Folder Request Schema
 *
 * Schema for the request body when creating a new folder.
 * Defines all fields required to create a custom folder.
 * The role will be set to null by the backend for user-created folders.
 *
 * Properties:
 * - name: User-facing display name for the folder (must be non-empty)
 * - parentId: Optional parent folder ID for nested folders
 */
export const CreateFolderRequestSchema = z.object({
    name: z.string().min(1, 'Folder name is required.'),
    parentId: z.string().cuid2().optional(),
});

/**
 * Create Folder Response Schema
 *
 * Schema for the response after successfully creating a folder.
 * Returns the complete created folder object.
 *
 * Properties:
 * - folder: The newly created folder object
 */
export const CreateFolderResponseSchema = z.object({
    folder: FolderSchema,
});
