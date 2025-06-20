import { z } from 'zod';
import { ErrorResponseSchema } from './error-response.schema';

/**
 * TypeScript type representing an API error response.
 * This type is inferred from {@link ErrorResponseSchema}.
 */
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
