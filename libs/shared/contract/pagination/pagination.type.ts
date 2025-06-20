// shared/contract/common/pagination.type.ts (Example path)

import { z } from 'zod';
import { PaginationRequestQuerySchema, PaginationResponseMetaSchema } from './pagination.schema'; // Assuming this is the correct path

/**
 * TypeScript type representing pagination metadata included in API responses.
 * This type is inferred from {@link PaginationResponseMetaSchema}.
 */
export type PaginationMeta = z.infer<typeof PaginationResponseMetaSchema>;
// Changed to PaginationMeta to be slightly more descriptive that it's the metadata part.
// 'Pagination' is also fine, just a small tweak for precision.

/**
 * TypeScript type representing pagination parameters used in API request queries.
 * This type is inferred from {@link PaginationRequestQuerySchema}.
 */
export type PaginationQuery = z.infer<typeof PaginationRequestQuerySchema>;
