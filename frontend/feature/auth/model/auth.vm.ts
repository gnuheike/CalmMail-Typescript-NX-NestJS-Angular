import { AuthResponse, AuthToken } from '@calm-mail/contract';

/**
 * User view model for the presentation layer
 */
export interface UserVm {
    id: string;
    email: string;
    name: string | null;
}

/**
 * Auth tokens view model for the presentation layer
 */
export interface AuthTokenVm {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    expiresAt: Date; // Additional field to track when the token expires
}

/**
 * Auth state view model for the presentation layer
 */
export interface AuthVm {
    isAuthenticated: boolean;
    user: UserVm | null;
    tokens: AuthTokenVm | null;
}

/**
 * Maps an AuthResponse from the contract to the presentation layer view models
 * 
 * @param response The auth response from the API
 * @returns The mapped user and token view models
 */
export function mapAuthResponseToVm(response: AuthResponse): { user: UserVm; tokens: AuthTokenVm } {
    return {
        user: {
            id: response.user.id,
            email: response.user.email,
            name: response.user.name
        },
        tokens: mapAuthTokenToVm(response.tokens)
    };
}

/**
 * Maps AuthToken from the contract to the presentation layer view model
 * 
 * @param token The auth token from the API
 * @returns The mapped token view model with expiration date
 */
export function mapAuthTokenToVm(token: AuthToken): AuthTokenVm {
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + token.expiresIn);
    
    return {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        expiresIn: token.expiresIn,
        expiresAt
    };
}
