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
} from './folder.schema';
import { ErrorResponseSchema } from '../error-response';
import { AuthHeadersSchema } from '../auth';

const c = initContract();

/**
 * Folder Contract Router
 *
 * Defines the API endpoints for folder operations using ts-rest.
 * This router includes endpoints for retrieving folder lists, folder statistics,
 * and creating new folders.
 */
export const folderContract = c.router(
    {
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
    },
    {
        commonResponses: {
            401: ErrorResponseSchema,
        },
        baseHeaders: AuthHeadersSchema,
    },
);
