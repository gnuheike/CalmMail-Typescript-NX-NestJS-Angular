/**
 * Authentication Router Contract
 *
 * Defines the API contract for authentication-related endpoints using ts-rest.
 * This contract specifies the routes, request parameters, and response types
 * for all authentication operations in the application.
 */
import { initContract } from '@ts-rest/core';
import {
  LoginRequestSchema,
  RegisterRequestSchema,
  AuthResponseSchema,
  RefreshTokenRequestSchema,
  RefreshTokenResponseSchema
} from './auth.schema';
import { ErrorResponseSchema } from '../error-response';

const c = initContract();

/**
 * Authentication Contract Router
 *
 * Defines the API endpoints for authentication operations using ts-rest.
 * This router includes endpoints for login, registration, and token refresh.
 */
export const authContract = c.router({
  /**
   * Login Endpoint
   *
   * Authenticates a user and returns tokens and user information.
   *
   * Method: POST
   * Path: /auth/login
   * Body: Email and password
   * Responses:
   * - 200 OK: Successfully authenticated
   * - 400 Bad Request: Invalid credentials format
   * - 401 Unauthorized: Invalid credentials
   * - 500 Internal Server Error: Server-side error
   */
  login: {
    method: 'POST',
    path: '/auth/login',
    body: LoginRequestSchema,
    responses: {
      200: AuthResponseSchema,
      400: ErrorResponseSchema,
      401: ErrorResponseSchema,
      500: ErrorResponseSchema,
    },
  },
  
  /**
   * Register Endpoint
   *
   * Registers a new user and returns tokens and user information.
   *
   * Method: POST
   * Path: /auth/register
   * Body: Email, password, and optional name
   * Responses:
   * - 201 Created: Successfully registered
   * - 400 Bad Request: Invalid registration data or email already exists
   * - 500 Internal Server Error: Server-side error
   */
  register: {
    method: 'POST',
    path: '/auth/register',
    body: RegisterRequestSchema,
    responses: {
      201: AuthResponseSchema,
      400: ErrorResponseSchema,
      500: ErrorResponseSchema,
    },
  },
  
  /**
   * Refresh Token Endpoint
   *
   * Refreshes an expired access token using a refresh token.
   *
   * Method: POST
   * Path: /auth/refresh
   * Body: Refresh token
   * Responses:
   * - 200 OK: Successfully refreshed tokens
   * - 400 Bad Request: Invalid refresh token format
   * - 401 Unauthorized: Invalid or expired refresh token
   * - 500 Internal Server Error: Server-side error
   */
  refreshToken: {
    method: 'POST',
    path: '/auth/refresh',
    body: RefreshTokenRequestSchema,
    responses: {
      200: RefreshTokenResponseSchema,
      400: ErrorResponseSchema,
      401: ErrorResponseSchema,
      500: ErrorResponseSchema,
    },
  },
});
