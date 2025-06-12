// shared/contract/pagination/pagination.schema.ts
import { z, type ZodArray, type ZodObject, type ZodTypeAny } from 'zod';

/**
 * Pagination Response Meta Schema
 *
 * Schema for pagination metadata included in API responses.
 * Describes the structure of pagination details for paginated data.
 *
 * Properties:
 * - page: Current page number (positive integer)
 * - limit: Number of items per page (positive integer)
 * - totalItems: Total number of items matching the criteria (non-negative)
 * - totalPages: Total number of pages available (non-negative)
 */
export const PaginationResponseMetaSchema = z.object({
  page: z.number().int().positive({ message: 'Page number must be positive.' }),
  limit: z.number().int().positive({ message: 'Limit must be positive.' }),
  totalItems: z.number().int().min(0, { message: 'Total items cannot be negative.' }),
  totalPages: z.number().int().min(0, { message: 'Total pages cannot be negative.' }),
});

/**
 * Pagination Request Query Schema
 *
 * Schema for pagination parameters in API request queries.
 * Defines common parameters for requesting paginated data.
 *
 * Properties:
 * - page: Page number for pagination (positive integer, default: 1)
 * - limit: Number of items per page (min: 1, max: 100, default: 25)
 */
export const PaginationRequestQuerySchema = z.object({
  page: z.coerce.number().int().positive({ message: 'Page number must be positive.' }).default(1),
  limit: z.coerce.number().int().min(1, { message: 'Limit must be at least 1.' }).max(100, { message: 'Limit cannot exceed 100.' }).default(25),
});

/**
 * Paginated Response Schema Creator
 *
 * Creates a generic Zod schema for paginated API responses.
 * This utility function generates a type-safe schema for paginated data with a custom key name.
 *
 * Type Parameters:
 * - TItemSchema: The Zod schema for the individual items in the paginated list
 * - TItemsKey: The key name for the array of items in the response (e.g., "items", "users", "emails")
 *
 * Parameters:
 * - itemSchema: The Zod schema for an individual item
 * - itemsKey: The desired key for the array of items in the response object
 *
 * Returns:
 * A ZodObject schema for a paginated response with the structure:
 * { [itemsKey]: TItemSchema[], pagination: PaginationResponseMetaSchema }
 *
 * Example Usage:
 * ```
 * const GetUsersResponseSchema = createPaginatedResponseSchema(UserSchema, 'users');
 * // Creates a schema for: { users: UserSchema[], pagination: { page, limit, totalItems, totalPages } }
 * ```
 */
export const createPaginatedResponseSchema = <
  TItemSchema extends ZodTypeAny,
  const TItemsKey extends string, // `const` helps TypeScript infer a literal type
>(
  itemSchema: TItemSchema,
  itemsKey: TItemsKey,
): ZodObject<
  Record<TItemsKey, ZodArray<TItemSchema>> & { pagination: typeof PaginationResponseMetaSchema }
> => {
  return z.object({
    [itemsKey]: z.array(itemSchema),
    pagination: PaginationResponseMetaSchema,
  }) as ZodObject<Record<TItemsKey, ZodArray<TItemSchema>> & { pagination: typeof PaginationResponseMetaSchema }>;
};
