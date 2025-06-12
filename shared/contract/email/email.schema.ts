import { z } from 'zod';
import { createPaginatedResponseSchema, PaginationRequestQuerySchema } from '../pagination';

/**
 * Zod schema for a valid email address string.
 * Ensures email strings conform to a standard email format.
 */
const emailString = z.string().email({ message: 'Invalid email address format.' });

/**
 * Email Schema
 *
 * Defines the core structure and validation rules for an Email entity.
 * This schema represents a stored email with all its properties.
 *
 * Properties:
 * - id: Unique identifier (CUID2)
 * - subject: Email subject line (1-255 chars)
 * - from: Sender's email address
 * - to: Array of recipient email addresses (min 1)
 * - cc: Carbon copy recipients (optional)
 * - bcc: Blind carbon copy recipients (optional)
 * - body: Email content (max 1MB)
 * - processedAt: When email was received or sent
 * - read: Whether email has been read
 * - isDraft: Whether email is a draft
 * - folderId: Location of email (inbox, sent, etc.)
 * - threadId: Optional conversation thread identifier
 */
export const EmailSchema = z.object({
  id: z.string().cuid2(),
  subject: z.string().min(1, 'Subject is required.').max(255, 'Subject cannot exceed 255 characters.'),
  from: emailString,
  to: z.array(emailString).min(1, 'At least one recipient in "To" is required.'),
  cc: z.array(emailString).optional().default([]),
  bcc: z.array(emailString).optional().default([]),
  body: z.string().max(1024 * 1024, 'Body cannot exceed 1MB.'),
  processedAt: z.coerce.date(),
  read: z.boolean().default(false),
  isDraft: z.boolean().default(false),
  folderId: z.string().cuid2({ message: 'Folder ID must be a valid CUID2.' }),
  threadId: z.string().cuid2().optional(),
});

/**
 * Get Emails Request Query Schema
 *
 * Schema for query parameters when fetching a list of emails.
 * Extends the common pagination parameters and adds email-specific filters.
 *
 * Properties:
 * - All pagination parameters (page, limit)
 * - folderId: Optional filter for emails in a specific folder
 */
export const GetEmailsRequestQuerySchema = PaginationRequestQuerySchema.extend({
  folderId: z.string().cuid2({ message: 'Folder ID filter must be a valid CUID2.' }).optional(),
});

/**
 * Get Emails Response Schema
 *
 * Schema for the response when fetching a list of emails.
 * Uses the generic paginated response creator with EmailSchema.
 * Returns a list of emails with pagination metadata.
 */
export const GetEmailsResponseSchema = createPaginatedResponseSchema(EmailSchema, 'emails');

/**
 * Create Email Request Body Schema
 *
 * Schema for the request body when creating a new email.
 * Defines all fields required to create or send an email.
 *
 * Properties:
 * - from: Sender's email address (may be overridden by server)
 * - to: Recipients (min 1 required)
 * - cc: Carbon copy recipients (optional)
 * - bcc: Blind carbon copy recipients (optional)
 * - subject: Email subject line (required, max 255 chars)
 * - body: Email content (max 1MB)
 * - folderId: Target folder for the email (optional)
 * - saveAsDraft: Whether to save as draft instead of sending
 * - threadId: Conversation thread this email belongs to (optional)
 */
export const CreateEmailRequestBodySchema = z.object({
  from: emailString,
  to: z.array(emailString).min(1, { message: "At least one recipient in 'To' is required." }),
  cc: z.array(emailString).optional().default([]),
  bcc: z.array(emailString).optional().default([]),
  subject: z.string().min(1, { message: 'Subject is required.' }).max(255),
  body: z.string().max(1024 * 1024, 'Body cannot exceed 1MB.'),
  folderId: z.string().cuid2({ message: 'Target Folder ID must be a valid CUID2.' }).optional(),
  saveAsDraft: z.boolean().optional(),
  threadId: z.string().cuid2().optional(),
});

/**
 * Create Email Response Schema
 *
 * Schema for the response after successfully creating an email.
 * Returns the complete created email object with all its properties.
 *
 * Properties:
 * - email: The newly created email object (EmailSchema)
 */
export const CreateEmailResponseSchema = z.object({
  email: EmailSchema,
});
