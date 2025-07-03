import { initContract } from '@ts-rest/core';
import z from 'zod';
import { ErrorResponseSchema } from '../error-response';
import { AuthHeadersSchema } from '../auth';
import {
    CreateEmailAccountSchema,
    EmailAccountIdPathSchema,
    EmailAccountResponseSchema,
    GetEmailAccountSyncStatusResponseSchema,
    SyncEmailAccountResponseSchema,
    TestConnectionResponseSchema,
    TestConnectionSchema,
    UpdateEmailAccountSchema,
} from './email-account.schema';

const c = initContract();

export const emailAccountRouter = c.router(
    {
        listAccounts: {
            method: 'GET',
            path: '/email-accounts',
            responses: {
                200: z.object({ accounts: z.array(EmailAccountResponseSchema) }),
                401: ErrorResponseSchema,
            },
        },

        getAccount: {
            method: 'GET',
            path: '/email-accounts/:id',
            responses: {
                200: EmailAccountResponseSchema,
                401: ErrorResponseSchema,
                404: ErrorResponseSchema,
            },
        },

        createAccount: {
            method: 'POST',
            path: '/email-accounts',
            body: CreateEmailAccountSchema,
            responses: {
                201: EmailAccountResponseSchema,
                400: ErrorResponseSchema,
                401: ErrorResponseSchema,
                409: ErrorResponseSchema, // Email already exists
            },
        },

        updateAccount: {
            method: 'PUT',
            path: '/email-accounts/:id',
            body: UpdateEmailAccountSchema,
            responses: {
                200: EmailAccountResponseSchema,
                400: ErrorResponseSchema,
                401: ErrorResponseSchema,
                404: ErrorResponseSchema,
            },
        },

        deleteAccount: {
            method: 'DELETE',
            path: '/email-accounts/:id',
            responses: {
                204: z.void(),
                401: ErrorResponseSchema,
                404: ErrorResponseSchema,
            },
        },

        testConnection: {
            method: 'POST',
            path: '/email-accounts/test-connection',
            body: TestConnectionSchema,
            headers: z.object({}), // Override common headers to make this endpoint accessible without auth
            responses: {
                200: TestConnectionResponseSchema,
                400: ErrorResponseSchema,
                // 401 response is removed as this endpoint doesn't require authentication
            },
        },

        setDefaultAccount: {
            method: 'PUT',
            path: '/email-accounts/set-default',
            body: EmailAccountIdPathSchema,
            responses: {
                200: EmailAccountResponseSchema,
                401: ErrorResponseSchema,
                404: ErrorResponseSchema,
            },
        },

        startSync: {
            method: 'POST',
            path: '/sync',
            body: EmailAccountIdPathSchema,
            responses: {
                202: SyncEmailAccountResponseSchema,
                401: ErrorResponseSchema,
                404: ErrorResponseSchema,
            },
        },

        getSyncStatus: {
            method: 'GET',
            path: '/sync/:jobId',
            responses: {
                200: GetEmailAccountSyncStatusResponseSchema,
                401: ErrorResponseSchema,
                404: ErrorResponseSchema,
            },
        },
    },
    {
        commonResponses: {
            401: ErrorResponseSchema,
        },
        baseHeaders: AuthHeadersSchema,
    },
);
