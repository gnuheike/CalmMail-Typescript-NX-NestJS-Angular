import { z } from 'zod';
import {
  LoginRequestSchema,
  RegisterRequestSchema,
  AuthTokenSchema,
  AuthResponseSchema,
  RefreshTokenRequestSchema,
  RefreshTokenResponseSchema
} from './auth.schema';

/**
 * TypeScript types for authentication operations.
 * These types are inferred from the corresponding Zod schemas.
 */

export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
export type AuthToken = z.infer<typeof AuthTokenSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>;
export type RefreshTokenResponse = z.infer<typeof RefreshTokenResponseSchema>;
