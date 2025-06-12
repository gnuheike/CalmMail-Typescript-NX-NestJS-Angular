/**
 * Email Router Contract
 *
 * Defines the API contract for email-related endpoints using ts-rest.
 * This contract specifies the routes, request parameters, and response types
 * for all email operations in the application.
 */
import { initContract } from '@ts-rest/core';
import {
  CreateEmailRequestBodySchema,
  CreateEmailResponseSchema,
  GetEmailsRequestQuerySchema,
  GetEmailsResponseSchema
} from './email.schema';
import { ErrorResponseSchema } from '../error-response';

const c = initContract();

/**
 * Email Contract Router
 *
 * Defines the API endpoints for email operations using ts-rest.
 * This router includes endpoints for retrieving and creating emails.
 */
export const emailContract = c.router({
  /**
   * Get Emails Endpoint
   *
   * Retrieves a paginated list of emails with optional filtering.
   *
   * Method: GET
   * Path: /emails
   * Query Parameters: Pagination parameters and optional folder filter
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
   * Body: Email creation parameters (recipients, subject, body, etc.)
   * Responses:
   * - 201 Created: Successfully created email
   * - 400 Bad Request: Invalid request body
   * - 404 Not Found: Referenced resource not found (e.g., folder)
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
});
