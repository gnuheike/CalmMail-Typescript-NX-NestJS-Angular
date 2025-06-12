import { z } from 'zod';

/**
 * Folder Schema
 *
 * Defines the core structure and validation rules for a Folder entity.
 * This schema represents a stored folder with all its properties.
 *
 * Properties:
 * - id: Unique identifier
 * - name: Folder type (inbox, sent, drafts, trash, or custom)
 * - displayName: User-friendly name for the folder
 * - unreadCount: Number of unread emails in the folder
 * - totalCount: Total number of emails in the folder
 * - icon: Optional icon identifier for the folder
 * - isDefault: Whether this is a system default folder
 * - parentId: Optional parent folder ID for nested folders
 */
export const FolderSchema = z.object({
  id: z.string().cuid2(),
  name: z.enum(['inbox', 'sent', 'drafts', 'trash', 'custom']),
  displayName: z.string(),
  unreadCount: z.number().min(0),
  totalCount: z.number().min(0),
  icon: z.string().optional(),
  isDefault: z.boolean(),
  parentId: z.string().cuid2().optional(),
});

/**
 * Default system folders that are always present
 */
export const DEFAULT_FOLDERS = [
  { id: 'inbox', name: 'inbox', displayName: 'Inbox', isDefault: true },
  { id: 'sent', name: 'sent', displayName: 'Sent', isDefault: true },
  { id: 'drafts', name: 'drafts', displayName: 'Drafts', isDefault: true },
  { id: 'trash', name: 'trash', displayName: 'Trash', isDefault: true },
] as const;

/**
 * Get Folders Request Schema
 *
 * Schema for query parameters when fetching a list of folders.
 * Allows filtering of empty folders and custom folders.
 *
 * Properties:
 * - includeEmpty: Whether to include folders with no emails
 * - includeCustom: Whether to include custom (user-created) folders
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
 * Get Folder Stats Request Schema
 *
 * Schema for request parameters when fetching statistics for a specific folder.
 *
 * Properties:
 * - folderId: ID of the folder to get statistics for
 */
export const GetFolderStatsRequestSchema = z.object({
  folderId: z.string().cuid2(),
});

/**
 * Get Folder Stats Response Schema
 *
 * Schema for the response when fetching statistics for a specific folder.
 * Returns detailed statistics about the folder.
 *
 * Properties:
 * - stats: Object containing folder statistics
 */
export const GetFolderStatsResponseSchema = z.object({
  stats: z.object({
    folderId: z.string().cuid2(),
    unreadCount: z.number().min(0),
    totalCount: z.number().min(0),
    lastUpdated: z.date(),
    sizeInBytes: z.number().optional(),
  }),
});

/**
 * Create Folder Request Schema
 *
 * Schema for the request body when creating a new folder.
 * Defines all fields required to create a custom folder.
 *
 * Properties:
 * - name: Folder name (must be non-empty)
 * - displayName: User-friendly name for the folder
 * - parentId: Optional parent folder ID for nested folders
 */
export const CreateFolderRequestSchema = z.object({
  name: z.string().min(1),
  displayName: z.string().min(1),
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
