import { z } from 'zod';

/**
 * User Authentication Schemas
 *
 * Defines the validation schemas for authentication-related operations.
 */

/**
 * Password Schema
 *
 * Reusable schema for password validation.
 * Enforces minimum and maximum length requirements.
 *
 * Constraints:
 * - Minimum 8 characters
 * - Maximum 100 characters
 */
export const PasswordSchema = z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' })
    .max(100, { message: 'Password cannot exceed 100 characters.' });

/**
 * Login Request Schema
 *
 * Schema for the request body when logging in a user.
 *
 * Properties:
 * - email: User's email address (must be valid email format)
 * - password: User's password (min 8 chars, max 100 chars)
 */
export const LoginRequestSchema = z.object({
    email: z.string().email({ message: 'Invalid email address format.' }),
    password: PasswordSchema,
});

/**
 * Registration Request Schema
 *
 * Schema for the request body when registering a new user.
 *
 * Properties:
 * - email: User's email address (must be valid email format)
 * - password: User's password (min 8 chars, max 100 chars)
 * - name: User's display name (optional)
 */
export const RegisterRequestSchema = z.object({
    email: z.string().email({ message: 'Invalid email address format.' }),
    password: PasswordSchema,
    name: z.string().min(1).max(100).optional(),
});

/**
 * Auth Token Schema
 *
 * Schema for authentication tokens returned by the API.
 *
 * Properties:
 * - accessToken: JWT token for API access
 * - refreshToken: Token used to obtain new access tokens
 * - expiresIn: Expiration time in seconds
 */
export const AuthTokenSchema = z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    expiresIn: z.number().int().positive(),
    tokenType: z.literal('Bearer'),
    refreshExpiresIn: z.number().int().positive(),
});

/**
 * Auth Response Schema
 *
 * Schema for the response after successful authentication.
 *
 * Properties:
 * - tokens: Authentication tokens
 * - user: Basic user information
 */
export const AuthResponseSchema = z.object({
    tokens: AuthTokenSchema,
    user: z.object({
        id: z.string().cuid2(),
        email: z.string().email(),
        name: z.string().nullable(),
    }),
});

/**
 * Refresh Token Request Schema
 *
 * Schema for the request body when refreshing an access token.
 *
 * Properties:
 * - refreshToken: The refresh token obtained during login
 */
export const RefreshTokenRequestSchema = z.object({
    refreshToken: z.string(),
});

/**
 * Refresh Token Response Schema
 *
 * Schema for the response after successfully refreshing tokens.
 *
 * Properties:
 * - tokens: New authentication tokens
 */
export const RefreshTokenResponseSchema = z.object({
    tokens: AuthTokenSchema,
});

export const LogoutRequestSchema = z.object({
    refreshToken: z.string(),
});

export const LogoutResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
});
