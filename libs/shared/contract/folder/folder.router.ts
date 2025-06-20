/**
 * Folder Router Contract
 *
 * Defines the API contract for folder-related endpoints using ts-rest.
 * This contract specifies the routes, request parameters, and response types
 * for all folder operations in the application.
 */
import { initContract } from '@ts-rest/core';
import {
  CreateFolderRequestSchema,
  CreateFolderResponseSchema,
  GetFoldersRequestSchema,
  GetFoldersResponseSchema,
  GetFolderStatsRequestSchema,
  GetFolderStatsResponseSchema,
} from './folder.schema';
import { ErrorResponseSchema } from '../error-response';

const c = initContract();

/**
 * Folder Contract Router
 *
 * Defines the API endpoints for folder operations using ts-rest.
 * This router includes endpoints for retrieving folder lists, folder statistics,
 * and creating new folders.
 */
export const folderContract = c.router({
  /**
   * Get Folders Endpoint
   *
   * Retrieves a list of folders with optional filtering.
   *
   * Method: GET
   * Path: /folders
   * Query Parameters: Optional filters for empty and custom folders
   * Responses:
   * - 200 OK: Successfully retrieved folders
   * - 400 Bad Request: Invalid query parameters
   * - 500 Internal Server Error: Server-side error
   */
  getFolders: {
    method: 'GET',
    path: '/folders',
    query: GetFoldersRequestSchema.optional(),
    responses: {
      200: GetFoldersResponseSchema,
      400: ErrorResponseSchema,
      500: ErrorResponseSchema,
    },
  },

  /**
   * Get Folder Stats Endpoint
   *
   * Retrieves statistics for a specific folder.
   *
   * Method: GET
   * Path: /folders/:folderId/stats
   * Path Parameters: Folder ID
   * Responses:
   * - 200 OK: Successfully retrieved folder statistics
   * - 400 Bad Request: Invalid folder ID
   * - 404 Not Found: Folder not found
   * - 500 Internal Server Error: Server-side error
   */
  getFolderStats: {
    method: 'GET',
    path: '/folders/:folderId/stats',
    pathParams: GetFolderStatsRequestSchema,
    responses: {
      200: GetFolderStatsResponseSchema,
      400: ErrorResponseSchema,
      404: ErrorResponseSchema,
      500: ErrorResponseSchema,
    },
  },

  /**
   * Create Folder Endpoint
   *
   * Creates a new custom folder.
   *
   * Method: POST
   * Path: /folders
   * Body: Folder creation parameters (name, displayName, etc.)
   * Responses:
   * - 201 Created: Successfully created folder
   * - 400 Bad Request: Invalid request body
   * - 500 Internal Server Error: Server-side error
   */
  createFolder: {
    method: 'POST',
    path: '/folders',
    body: CreateFolderRequestSchema,
    responses: {
      201: CreateFolderResponseSchema,
      400: ErrorResponseSchema,
      500: ErrorResponseSchema,
    },
  },
});
