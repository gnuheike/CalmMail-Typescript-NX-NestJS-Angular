import { z } from 'zod';
import {
    CreateEmailAccountSchema,
    EmailAccountSchema,
    ImapConfigSchema,
    SmtpConfigSchema,
    TestConnectionResponseSchema,
    TestConnectionSchema,
    UpdateEmailAccountSchema,
} from './email-account.schema';
import { ErrorResponse } from '../error-response';

// Re-export ErrorResponse for convenience
export { ErrorResponse };

// Configuration types
export type ImapConfig = z.infer<typeof ImapConfigSchema>;
export type SmtpConfig = z.infer<typeof SmtpConfigSchema>;

// Main entity type
export type EmailAccount = z.infer<typeof EmailAccountSchema>;

// Request and response types for API operations
export type CreateEmailAccountRequest = z.infer<typeof CreateEmailAccountSchema>;
export type UpdateEmailAccountRequest = z.infer<typeof UpdateEmailAccountSchema>;

// Connection testing types
export type TestConnectionRequest = z.infer<typeof TestConnectionSchema>;
export type TestConnectionResponse = z.infer<typeof TestConnectionResponseSchema>;

// Response types for list accounts
export interface ListAccountsResponse {
    accounts: EmailAccount[];
}
