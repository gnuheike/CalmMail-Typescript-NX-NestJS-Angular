import { initContract } from '@ts-rest/core';
import z from 'zod';
import { ErrorResponseSchema } from '../error-response';
import {
    CreateEmailAccountSchema,
    EmailAccountSchema,
    SetDefaultEmailAccountSchema,
    TestConnectionResponseSchema,
    TestConnectionSchema,
    UpdateEmailAccountSchema,
} from './email-account.schema';

const c = initContract();

export const emailAccountRouter = c.router({
    listAccounts: {
        method: 'GET',
        path: '/email-accounts',
        responses: {
            200: z.object({ accounts: z.array(EmailAccountSchema) }),
            401: ErrorResponseSchema,
        },
    },

    getAccount: {
        method: 'GET',
        path: '/email-accounts/:id',
        responses: {
            200: EmailAccountSchema,
            401: ErrorResponseSchema,
            404: ErrorResponseSchema,
        },
    },

    createAccount: {
        method: 'POST',
        path: '/email-accounts',
        body: CreateEmailAccountSchema,
        responses: {
            201: EmailAccountSchema,
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
            200: EmailAccountSchema,
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
        responses: {
            200: TestConnectionResponseSchema,
            400: ErrorResponseSchema,
            401: ErrorResponseSchema,
        },
    },

    setDefaultAccount: {
        method: 'PUT',
        path: '/email-accounts/set-default',
        body: SetDefaultEmailAccountSchema,
        responses: {
            200: EmailAccountSchema,
            401: ErrorResponseSchema,
            404: ErrorResponseSchema,
        },
    },
});
