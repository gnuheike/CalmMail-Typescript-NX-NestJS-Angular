import z from 'zod';

// libs/shared/contract/email-account/email-account.schema.ts
export const EmailProviderEnum = z.string();

export const ImapConfigSchema = z.object({
    host: z.string().min(1),
    port: z.number().int().positive(),
    secure: z.boolean(),
    username: z.string().min(1),
    password: z.string().min(1), // Will be encrypted before storage
});

export const SmtpConfigSchema = z.object({
    host: z.string().min(1),
    port: z.number().int().positive(),
    secure: z.boolean(),
    username: z.string().min(1),
    password: z.string().min(1), // Will be encrypted before storage
});

export const EmailAccountSchema = z.object({
    id: z.string().cuid2(),
    userId: z.string().cuid2(),
    email: z.string().email(),
    displayName: z.string().min(1).max(100),
    provider: EmailProviderEnum,
    imapConfig: ImapConfigSchema,
    smtpConfig: SmtpConfigSchema.optional(),
    isActive: z.boolean().default(true),
    isDefault: z.boolean().default(false),
    lastSyncAt: z.date().nullable(),
    syncEnabled: z.boolean().default(true),
    syncFrequency: z.number().int().min(5).max(60).default(15), // minutes
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const CreateEmailAccountSchema = EmailAccountSchema.omit({
    id: true,
    userId: true,
    lastSyncAt: true,
    createdAt: true,
    updatedAt: true,
});

export const UpdateEmailAccountSchema = CreateEmailAccountSchema.partial();
export const SetDefaultEmailAccountSchema = z.object({
    id: z.string().cuid2(),
});

export const TestConnectionSchema = z.object({
    connectionType: EmailProviderEnum,
    config: z.union([ImapConfigSchema, SmtpConfigSchema]),
});

export const TestConnectionResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    details: z
        .object({
            serverInfo: z.string().optional(),
            capabilities: z.array(z.string()).optional(),
        })
        .optional(),
});
