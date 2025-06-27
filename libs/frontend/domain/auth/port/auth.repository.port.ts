import { AuthResponse, LoginRequest, RefreshTokenRequest, RefreshTokenResponse, RegisterRequest } from '@calm-mail/contract';
import { Observable } from 'rxjs';

export abstract class AuthRepositoryPort {
    /**
     * Authenticate a user with email and password
     *
     * @param input Request with login credentials
     * @returns Observable with the authentication response
     */
    abstract login(input: LoginRequest): Observable<AuthResponse>;

    /**
     * Register a new user
     *
     * @param input Request with registration details
     * @returns Observable with the authentication response
     */
    abstract register(input: RegisterRequest): Observable<AuthResponse>;

    /**
     * Refresh an expired access token
     *
     * @param input Request with refresh token
     * @returns Observable with the refresh token response
     */
    abstract refreshToken(input: RefreshTokenRequest): Observable<RefreshTokenResponse>;
}
