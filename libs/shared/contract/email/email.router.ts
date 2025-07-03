/**
 * Email Router Contract
 *
 * Defines the API contract for email-related endpoints using ts-rest.
 * This contract specifies the routes, request parameters, and response types
 * for all email operations in the application.
 */
import { initContract } from '@ts-rest/core';
import {
    CreateEmailAttachmentRequestSchema,
    CreateEmailRequestBodySchema,
    CreateEmailResponseSchema,
    EmailAttachmentIdPathSchema,
    EmailAttachmentSchema,
    EmailIdPathSchema,
    EmailSchema,
    emailString,
    GetEmailsRequestQuerySchema,
    GetEmailsResponseSchema,
    UpdateEmailBodySchema,
} from './email.schema';
import { ErrorResponseSchema } from '../error-response';
import { AuthHeadersSchema } from '../auth';
import { z } from 'zod';

const c = initContract();

/**
 * Email Contract Router
 *
 * Defines the API endpoints for email operations using ts-rest.
 * This router includes endpoints for retrieving and creating emails.
 */
export const emailRouterContract = c.router(
    {
        /**
         * Get Emails Endpoint
         *
         * Retrieves a paginated list of emails with optional filtering.
         *
         * Method: GET
         * Path: /emails
         * Query Parameters: Pagination parameters and optional filters (folder, account)
         * Responses:
         * - 200 OK: Successfully retrieved emails
         * - 400 Bad Request: Invalid query parameters
         * - 404 Not Found: Requested resource not found
         * - 500 Internal Server Error: Server-side error
         */
        getEmails: {
            method: 'GET',
            path: '/emails',
            query: GetEmailsRequestQuerySchema,
            responses: {
                200: GetEmailsResponseSchema,
                400: ErrorResponseSchema,
                404: ErrorResponseSchema,
                500: ErrorResponseSchema,
            },
        },
        /**
         * Create Email Endpoint
         *
         * Creates a new email, either as a draft or by sending it immediately.
         *
         * Method: POST
         * Path: /emails
         * Body: Email creation parameters (accountId, recipients, subject, body, etc.)
         * Responses:
         * - 201 Created: Successfully created email
         * - 400 Bad Request: Invalid request body
         * - 404 Not Found: Referenced resource not found (e.g., folder, account)
         * - 500 Internal Server Error: Server-side error
         */
        createEmail: {
            method: 'POST',
            path: '/emails',
            body: CreateEmailRequestBodySchema,
            responses: {
                201: CreateEmailResponseSchema,
                400: ErrorResponseSchema,
                404: ErrorResponseSchema,
                500: ErrorResponseSchema,
            },
        },
        /**
         * Get Email By ID Endpoint
         *
         * Retrieves a single email by its unique identifier.
         *
         * Method: GET
         * Path: /emails/:id
         * Path Parameters: Email ID
         * Responses:
         * - 200 OK: Successfully retrieved email
         * - 404 Not Found: Email not found
         * - 500 Internal Server Error: Server-side error
         */
        getEmailById: {
            method: 'GET',
            path: '/emails/:id',
            pathParams: EmailIdPathSchema,
            responses: {
                200: EmailSchema,
                404: ErrorResponseSchema,
                500: ErrorResponseSchema,
            },
        },
        /**
         * Update Email Endpoint
         *
         * Updates properties of an existing email (e.g., read status, folder).
         *
         * Method: PATCH
         * Path: /emails/:id
         * Path Parameters: Email ID
         * Body: Properties to update (read status, folder ID)
         * Responses:
         * - 200 OK: Successfully updated email
         * - 400 Bad Request: Invalid request body
         * - 404 Not Found: Email not found
         * - 500 Internal Server Error: Server-side error
         */
        updateEmail: {
            method: 'PATCH',
            path: '/emails/:id',
            pathParams: EmailIdPathSchema,
            body: UpdateEmailBodySchema,
            responses: {
                200: EmailSchema,
                400: ErrorResponseSchema,
                404: ErrorResponseSchema,
                500: ErrorResponseSchema,
            },
        },
        /**
         * Delete Email Endpoint
         *
         * Permanently deletes an email.
         *
         * Method: DELETE
         * Path: /emails/:id
         * Path Parameters: Email ID
         * Body: Empty object
         * Responses:
         * - 204 No Content: Successfully deleted email
         * - 404 Not Found: Email not found
         * - 500 Internal Server Error: Server-side error
         */
        deleteEmail: {
            method: 'DELETE',
            path: '/emails/:id',
            pathParams: EmailIdPathSchema,
            body: z.object({}),
            responses: {
                204: z.void(),
                404: ErrorResponseSchema,
                500: ErrorResponseSchema,
            },
        },
        /**
         * Reply To Email Endpoint
         *
         * Creates a reply to an existing email.
         *
         * Method: POST
         * Path: /emails/:id/reply
         * Path Parameters: Email ID
         * Body: Reply content, whether to include original message, and optional attachments
         * Responses:
         * - 201 Created: Successfully created reply email
         * - 400 Bad Request: Invalid request body
         * - 404 Not Found: Original email not found
         * - 413 Payload Too Large: Attachment size exceeds limit
         * - 500 Internal Server Error: Server-side error
         */
        replyToEmail: {
            method: 'POST',
            path: '/emails/:id/reply',
            pathParams: EmailIdPathSchema,
            body: z.object({
                body: z.string(),
                includeOriginal: z.boolean().default(true),
                attachments: z.array(CreateEmailAttachmentRequestSchema).optional().default([]),
            }),
            responses: {
                201: CreateEmailResponseSchema,
                400: ErrorResponseSchema,
                404: ErrorResponseSchema,
                413: ErrorResponseSchema,
                500: ErrorResponseSchema,
            },
        },
        /**
         * Forward Email Endpoint
         *
         * Forwards an existing email to new recipients.
         *
         * Method: POST
         * Path: /emails/:id/forward
         * Path Parameters: Email ID
         * Body: Recipients, optional additional message, and optional new attachments
         * Responses:
         * - 201 Created: Successfully forwarded email
         * - 400 Bad Request: Invalid request body
         * - 404 Not Found: Original email not found
         * - 413 Payload Too Large: Attachment size exceeds limit
         * - 500 Internal Server Error: Server-side error
         */
        forwardEmail: {
            method: 'POST',
            path: '/emails/:id/forward',
            pathParams: EmailIdPathSchema,
            body: z.object({
                to: z.array(emailString),
                body: z.string().optional(),
                includeOriginalAttachments: z.boolean().default(true),
                newAttachments: z.array(CreateEmailAttachmentRequestSchema).optional().default([]),
            }),
            responses: {
                201: CreateEmailResponseSchema,
                400: ErrorResponseSchema,
                404: ErrorResponseSchema,
                413: ErrorResponseSchema,
                500: ErrorResponseSchema,
            },
        },

        /**
         * Get Email Attachments Endpoint
         *
         * Retrieves all attachments for a specific email.
         *
         * Method: GET
         * Path: /emails/:id/attachments
         * Path Parameters: Email ID
         * Responses:
         * - 200 OK: Successfully retrieved attachments
         * - 404 Not Found: Email not found
         * - 500 Internal Server Error: Server-side error
         */
        getEmailAttachments: {
            method: 'GET',
            path: '/emails/:id/attachments',
            pathParams: EmailIdPathSchema,
            responses: {
                200: z.object({
                    attachments: z.array(EmailAttachmentSchema),
                }),
                404: ErrorResponseSchema,
                500: ErrorResponseSchema,
            },
        },

        /**
         * Get Email Attachment Endpoint
         *
         * Retrieves a specific attachment from an email.
         *
         * Method: GET
         * Path: /emails/:emailId/attachments/:attachmentId
         * Path Parameters: Email ID and Attachment ID
         * Responses:
         * - 200 OK: Successfully retrieved attachment
         * - 404 Not Found: Email or attachment not found
         * - 500 Internal Server Error: Server-side error
         */
        getEmailAttachment: {
            method: 'GET',
            path: '/emails/:emailId/attachments/:attachmentId',
            pathParams: EmailAttachmentIdPathSchema,
            responses: {
                200: EmailAttachmentSchema,
                404: ErrorResponseSchema,
                500: ErrorResponseSchema,
            },
        },

        /**
         * Upload Email Attachment Endpoint
         *
         * Uploads a new attachment for an email.
         *
         * Method: POST
         * Path: /emails/:id/attachments
         * Path Parameters: Email ID
         * Body: Attachment data
         * Responses:
         * - 201 Created: Successfully uploaded attachment
         * - 400 Bad Request: Invalid request body
         * - 404 Not Found: Email not found
         * - 413 Payload Too Large: Attachment size exceeds limit
         * - 500 Internal Server Error: Server-side error
         */
        uploadEmailAttachment: {
            method: 'POST',
            path: '/emails/:id/attachments',
            pathParams: EmailIdPathSchema,
            body: CreateEmailAttachmentRequestSchema,
            responses: {
                201: EmailAttachmentSchema,
                400: ErrorResponseSchema,
                404: ErrorResponseSchema,
                413: ErrorResponseSchema,
                500: ErrorResponseSchema,
            },
        },

        /**
         * Delete Email Attachment Endpoint
         *
         * Deletes a specific attachment from an email.
         *
         * Method: DELETE
         * Path: /emails/:emailId/attachments/:attachmentId
         * Path Parameters: Email ID and Attachment ID
         * Responses:
         * - 204 No Content: Successfully deleted attachment
         * - 404 Not Found: Email or attachment not found
         * - 500 Internal Server Error: Server-side error
         */
        deleteEmailAttachment: {
            method: 'DELETE',
            path: '/emails/:emailId/attachments/:attachmentId',
            pathParams: EmailAttachmentIdPathSchema,
            body: z.object({}),
            responses: {
                204: z.void(),
                404: ErrorResponseSchema,
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
