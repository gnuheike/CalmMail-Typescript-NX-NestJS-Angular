import z from 'zod';

// libs/shared/contract/email-account/email-account.schema.ts
export const ImapConfigSchema = z.object({
    host: z.string().min(1),
    port: z.number().int().positive(),
    secure: z.boolean(),
    username: z.string().min(1),
    password: z.string().min(1).describe('ENCRYPTED'), // Will be encrypted before storage
});

// Create a secure version of the IMAP config schema for responses (without password)
export const SecureImapConfigSchema = ImapConfigSchema.omit({ password: true });

export const SmtpConfigSchema = z.object({
    host: z.string().min(1),
    port: z.number().int().positive(),
    secure: z.boolean(),
    username: z.string().min(1),
    password: z.string().min(1).describe('ENCRYPTED'), // Will be encrypted before storage
});

// Create a secure version of the SMTP config schema for responses (without password)
export const SecureSmtpConfigSchema = SmtpConfigSchema.omit({ password: true });

export const EmailAccountSchema = z.object({
    id: z.string().cuid2(),
    userId: z.string().cuid2(),
    email: z.string().email(),
    displayName: z.string().min(1).max(100),
    imapConfig: ImapConfigSchema,
    smtpConfig: SmtpConfigSchema,
    isActive: z.boolean().default(true),
    isDefault: z.boolean().default(false),
    lastSyncAt: z.date().nullable(),
    syncEnabled: z.boolean().default(true),
    syncFrequency: z.number().int().min(5).max(60).default(15), // minutes
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const EmailAccountIdPathSchema = z.object({
    id: z.string().cuid2(),
});

export const CreateEmailAccountSchema = EmailAccountSchema.omit({
    id: true,
    userId: true,
    lastSyncAt: true,
    createdAt: true,
    updatedAt: true,
});

export const UpdateEmailAccountSchema = CreateEmailAccountSchema.partial();

// Create the response schema that uses the secure config versions (without passwords)
export const EmailAccountResponseSchema = EmailAccountSchema.extend({
    imapConfig: SecureImapConfigSchema,
    smtpConfig: SecureSmtpConfigSchema,
});

export const SyncEmailAccountResponseSchema = z.object({
    jobId: z.string(),
});
export const GetEmailAccountSyncStatusResponseSchema = z.object({
    status: z.enum(['pending', 'completed', 'failed']),
    progress: z.number().int().min(0).max(100).optional(),
    message: z.string().optional(),
});

export const TestConnectionSchema = z.object({
    imapConfig: ImapConfigSchema,
    smtpConfig: SmtpConfigSchema,
});

export const TestConnectionResponseSchema = z.object({
    imap: z.object({
        success: z.boolean(),
        message: z.string(),
        details: z
            .object({
                serverInfo: z.string().optional(),
                capabilities: z.array(z.string()).optional(),
            })
            .optional(),
    }),
    smtp: z.object({
        success: z.boolean(),
        message: z.string(),
        details: z
            .object({
                serverInfo: z.string().optional(),
                capabilities: z.array(z.string()).optional(),
            })
            .optional(),
    }),
});
