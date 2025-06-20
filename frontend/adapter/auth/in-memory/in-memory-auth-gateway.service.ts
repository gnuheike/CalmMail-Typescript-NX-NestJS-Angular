import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    AuthResponse,
    LoginRequest,
    RefreshTokenRequest,
    RefreshTokenResponse,
    RegisterRequest
} from '@calm-mail/contract';
import { AuthGateway } from '@calm-mail/frontend/core-ports';
import { simulateNetworkRequestObservable } from '../../util/simulation.util';

/**
 * Mock implementation of AuthGateway
 *
 * Provides mock implementations of authentication-related gateway methods
 * for development and testing purposes.
 */
@Injectable()
export class InMemoryAuthGateway extends AuthGateway {
    /**
     * Mock user data
     * @private
     */
    private readonly mockUser = {
        id: 'clq1234567890user00000001',
        email: 'user@example.com',
        name: 'Test User',
        password: 'password123', // In a real app, passwords would be hashed and not stored in plain text
    };

    /**
     * Authenticate a user with email and password
     *
     * @param input Request with login credentials
     * @returns Observable with the authentication response
     */
    login(input: LoginRequest): Observable<AuthResponse> {
        return simulateNetworkRequestObservable(() => {
            // Simulate authentication logic
            if (input.email === this.mockUser.email && input.password === this.mockUser.password) {
                return {
                    tokens: this.generateTokens(this.mockUser.id),
                    user: {
                        id: this.mockUser.id,
                        email: this.mockUser.email,
                        name: this.mockUser.name,
                    },
                };
            }

            // Simulate authentication failure
            throw new Error('Invalid email or password');
        });
    }

    /**
     * Register a new user
     *
     * @param input Request with registration details
     * @returns Observable with the authentication response
     */
    register(input: RegisterRequest): Observable<AuthResponse> {
        return simulateNetworkRequestObservable(() => {
            // Simulate registration logic
            // In a real implementation, we would check if the email is already in use

            // For mock purposes, we'll just return a successful registration
            const userId = `clq${Date.now().toString(36)}${Math.random().toString(36).substring(2, 7)}`;

            return {
                tokens: this.generateTokens(userId),
                user: {
                    id: userId,
                    email: input.email,
                    name: input.name || null,
                },
            };
        });
    }

    /**
     * Refresh an expired access token
     *
     * @param input Request with refresh token
     * @returns Observable with the refresh token response
     */
    refreshToken(input: RefreshTokenRequest): Observable<RefreshTokenResponse> {
        return simulateNetworkRequestObservable(() => {
            // Simulate token refresh logic
            // In a real implementation, we would validate the refresh token

            // For mock purposes, we'll just return new tokens
            // Check if the refresh token starts with our mock prefix
            if (input.refreshToken.startsWith('mock-refresh-token-')) {
                return {
                    tokens: this.generateTokens(this.mockUser.id),
                };
            }

            // Simulate token refresh failure
            throw new Error('Invalid refresh token');
        });
    }

    /**
     * Mock tokens
     * @private
     */
    private generateTokens(userId: string): {
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    } {
        return {
            accessToken: `mock-access-token-${userId}-${Date.now()}`,
            refreshToken: `mock-refresh-token-${userId}-${Date.now()}`,
            expiresIn: 3600, // 1 hour in seconds
        };
    }
}
