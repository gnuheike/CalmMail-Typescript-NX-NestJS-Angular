import { z } from 'zod';

/**
 * Error Response Schema
 *
 * Generic schema for API error responses.
 * Used for 400, 404, and 500 status codes.
 *
 * Properties:
 * - message: Human-readable error message
 * - code: Optional error code for client-side error handling
 * - details: Optional additional error details
 */
export const ErrorResponseSchema = z.object({
  message: z.string(),
  code: z.string().optional(),
  details: z.record(z.unknown()).optional(),
});
