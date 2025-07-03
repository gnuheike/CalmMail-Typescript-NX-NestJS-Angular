import { z } from 'zod';
import { createPaginatedResponseSchema, PaginationRequestQuerySchema } from '../pagination';

/**
 * Zod schema for a valid email address string.
 * Ensures email strings conform to a standard email format.
 */
export const emailString = z.string().email({ message: 'Invalid email address format.' });

/**
 * Email Attachment Schema
 *
 * Defines the structure and validation rules for an email attachment.
 *
 * Properties:
 * - id: Unique identifier for the attachment
 * - filename: Original filename of the attachment
 * - contentType: MIME type of the attachment
 * - size: Size of the attachment in bytes
 * - contentId: Optional Content-ID for inline attachments
 * - content: Base64 encoded content or reference to stored content
 */
export const EmailAttachmentSchema = z.object({
    id: z.string().cuid2(),
    filename: z.string().min(1, 'Filename is required.').max(255, 'Filename cannot exceed 255 characters.'),
    contentType: z.string().min(1, 'Content type is required.'),
    size: z
        .number()
        .int()
        .positive('Size must be a positive integer.')
        .max(25 * 1024 * 1024, 'Attachment size cannot exceed 25MB.'),
    contentId: z.string().optional(),
    content: z.string().or(
        z.object({
            storageReference: z.string(),
        }),
    ),
});

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
 * - attachments: Array of email attachments (optional)
 * - receivedAt: When email was received (null for sent or draft emails)
 * - sentAt: When email was sent (null for received or draft emails)
 * - savedAt: When email was last modified (used for all email states)
 * - read: Whether email has been read
 * - isDraft: Whether email is a draft
 * - folderId: Location of email (inbox, sent, etc.)
 * - threadId: Optional conversation thread identifier
 * - accountId: ID of the email account this email belongs to
 */
export const EmailSchema = z.object({
    id: z.string().cuid2(),
    subject: z.string().min(1, 'Subject is required.').max(255, 'Subject cannot exceed 255 characters.'),
    from: emailString,
    to: z.array(emailString).min(1, 'At least one recipient in "To" is required.'),
    cc: z.array(emailString).optional().default([]),
    bcc: z.array(emailString).optional().default([]),
    body: z.string().max(1024 * 1024, 'Body cannot exceed 1MB.'),
    attachments: z.array(EmailAttachmentSchema).optional().default([]),
    receivedAt: z.coerce.date().nullable(), // For incoming mail
    sentAt: z.coerce.date().nullable(),     // For outgoing mail
    savedAt: z.coerce.date(),               // For all states, indicates last modification
    read: z.boolean().default(false),
    isDraft: z.boolean().default(false),
    folderId: z.string().cuid2({ message: 'Folder ID must be a valid CUID2.' }),
    threadId: z.string().cuid2().optional(),
    accountId: z.string().cuid2(),
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
    accountId: z.string().cuid2().optional(),
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
 * Create Email Attachment Request Schema
 *
 * Schema for attachment data when creating a new email.
 * This is a simplified version of EmailAttachmentSchema for the request.
 *
 * Properties:
 * - filename: Original filename of the attachment
 * - contentType: MIME type of the attachment
 * - size: Size of the attachment in bytes
 * - contentId: Optional Content-ID for inline attachments
 * - content: Base64 encoded content or reference to stored content
 */
export const CreateEmailAttachmentRequestSchema = z.object({
    filename: z.string().min(1, 'Filename is required.').max(255, 'Filename cannot exceed 255 characters.'),
    contentType: z.string().min(1, 'Content type is required.'),
    size: z
        .number()
        .int()
        .positive('Size must be a positive integer.')
        .max(25 * 1024 * 1024, 'Attachment size cannot exceed 25MB.'),
    contentId: z.string().optional(),
    content: z.string().or(
        z.object({
            storageReference: z.string(),
        }),
    ),
});

/**
 * Create Email Request Body Schema
 *
 * Schema for the request body when creating a new email.
 * Defines all fields required to create or send an email.
 *
 * Properties:
 * - accountId: ID of the email account to send from (ensures emails are sent from authenticated accounts)
 * - to: Recipients (min 1 required)
 * - cc: Carbon copy recipients (optional)
 * - bcc: Blind carbon copy recipients (optional)
 * - subject: Email subject line (required, max 255 chars)
 * - body: Email content (max 1MB)
 * - attachments: Array of email attachments (optional)
 * - folderId: Target folder for the email (optional)
 * - saveAsDraft: Whether to save as draft instead of sending
 * - threadId: Conversation thread this email belongs to (optional)
 */
export const CreateEmailRequestBodySchema = z.object({
    accountId: z.string().cuid2({ message: 'A valid Email Account ID is required.' }),
    from: emailString,
    to: z.array(emailString).min(1, { message: "At least one recipient in 'To' is required." }),
    cc: z.array(emailString).optional().default([]),
    bcc: z.array(emailString).optional().default([]),
    subject: z.string().min(1, { message: 'Subject is required.' }).max(255),
    body: z.string().max(1024 * 1024, 'Body cannot exceed 1MB.'),
    attachments: z.array(CreateEmailAttachmentRequestSchema).optional().default([]),
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

/**
 * Email ID Path Schema
 *
 * Schema for path parameters to identify an email by its ID.
 * Used in endpoints that operate on a specific email.
 *
 * Properties:
 * - id: Unique identifier (CUID2) of the email
 */
export const EmailIdPathSchema = z.object({
    id: z.string().cuid2({ message: 'Email ID must be a valid CUID2.' }),
});

/**
 * Email Attachment ID Path Schema
 *
 * Schema for path parameters to identify an email attachment by its ID.
 * Used in endpoints that operate on a specific attachment.
 *
 * Properties:
 * - emailId: Unique identifier (CUID2) of the email
 * - attachmentId: Unique identifier (CUID2) of the attachment
 */
export const EmailAttachmentIdPathSchema = z.object({
    emailId: z.string().cuid2({ message: 'Email ID must be a valid CUID2.' }),
    attachmentId: z.string().cuid2({ message: 'Attachment ID must be a valid CUID2.' }),
});

/**
 * Update Email Body Schema
 *
 * Schema for the request body when updating an email's properties.
 * Defines fields that can be modified on an existing email.
 *
 * Properties:
 * - read: Whether the email has been read (optional)
 * - folderId: Target folder for the email (optional)
 * - to: Recipients (optional, only for drafts)
 * - cc: Carbon copy recipients (optional, only for drafts)
 * - bcc: Blind carbon copy recipients (optional, only for drafts)
 * - subject: Email subject line (optional, only for drafts)
 * - body: Email content (optional, only for drafts)
 */
export const UpdateEmailBodySchema = z
    .object({
        read: z.boolean().optional(),
        folderId: z.string().cuid2({ message: 'Folder ID must be a valid CUID2.' }).optional(),
        // Draft-specific fields
        to: z.array(emailString).min(1, 'At least one recipient in "To" is required.').optional(),
        cc: z.array(emailString).optional(),
        bcc: z.array(emailString).optional(),
        subject: z.string().min(1, 'Subject is required.').max(255).optional(),
        body: z.string().max(1024 * 1024, 'Body cannot exceed 1MB.').optional(),
    })
    .strict(); // Use .strict() to prevent unknown properties
