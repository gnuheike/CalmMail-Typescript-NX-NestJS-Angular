import { z } from 'zod';
import {
    CreateFolderRequestSchema,
    CreateFolderResponseSchema,
    FolderSchema,
    GetFoldersRequestSchema,
    GetFoldersResponseSchema,
    GetFolderStatsRequestSchema,
    GetFolderStatsResponseSchema
} from './folder.schema';

/**
 * TypeScript type definitions inferred from Zod schemas
 * These types are used throughout the application for type safety
 */

// Legacy types using plain string IDs
export type Folder = z.infer<typeof FolderSchema>;
export type GetFoldersRequest = z.infer<typeof GetFoldersRequestSchema>;
export type GetFoldersResponse = z.infer<typeof GetFoldersResponseSchema>;
export type GetFolderStatsRequest = z.infer<typeof GetFolderStatsRequestSchema>;
export type GetFolderStatsResponse = z.infer<typeof GetFolderStatsResponseSchema>;
export type CreateFolderRequest = z.infer<typeof CreateFolderRequestSchema>;
export type CreateFolderResponse = z.infer<typeof CreateFolderResponseSchema>;
