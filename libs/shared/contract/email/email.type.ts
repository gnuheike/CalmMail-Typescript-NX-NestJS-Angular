import { z } from 'zod';
import {
    CreateEmailRequestBodySchema,
    CreateEmailResponseSchema,
    EmailSchema,
    emailString,
    GetEmailsRequestQuerySchema,
    GetEmailsResponseSchema,
} from './email.schema';

export type email = z.infer<typeof emailString>;

// Legacy types using plain string IDs
export type Email = z.infer<typeof EmailSchema>;

export type GetEmailsRequest = z.infer<typeof GetEmailsRequestQuerySchema>;
export type GetEmailsResponse = z.infer<typeof GetEmailsResponseSchema>;
export type CreateEmailRequest = z.infer<typeof CreateEmailRequestBodySchema>;
export type CreateEmailResponse = z.infer<typeof CreateEmailResponseSchema>;
