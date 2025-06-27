import { AuthResponse, AuthToken } from '@calm-mail/contract';
import { UserEmail, UserEntity, UserId, UserName } from '../../user/entity/user.entity';

/**
 * Auth tokens view model for the presentation layer
 */
export class AuthTokenModel {
    private readonly TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes
    constructor(
        public readonly accessToken: string,
        public readonly refreshToken: string,
        public readonly expiresIn: number,
        public readonly expiresAt: Date, // Additional field to track when the token expires
    ) {}

    public isTokenExpired(): boolean {
        const now = new Date();
        const expiresAt = this.expiresAt;

        if (!expiresAt) {
            return false;
        }
        return now.getTime() > expiresAt.getTime();
    }
}

/**
 * Auth state view model for the presentation layer
 */
export class AuthModel {
    constructor(
        public readonly isAuthenticated: boolean,
        public readonly user: UserEntity | null,
        public readonly tokens: AuthTokenModel | null,
    ) {}

    static createUnauthenticated(): AuthModel {
        return new AuthModel(false, null, null);
    }

    public isTokenExpired(): boolean {
        if (!this.tokens) {
            return true;
        }
        return this.tokens.isTokenExpired();
    }

    addTokens(tokens: AuthTokenModel): AuthModel {
        return new AuthModel(true, this.user, tokens);
    }
}

/**
 * Maps an AuthResponse from the contract to the presentation layer view models
 *
 * @param response The auth response from the API
 * @returns The mapped user and token view models
 */
export function mapAuthResponseToVm(response: AuthResponse): { user: UserEntity; tokens: AuthTokenModel } {
    return {
        user: new UserEntity(new UserId(response.user.id), new UserEmail(response.user.email), new UserName(response.user.name || '')),
        tokens: mapAuthTokenToVm(response.tokens),
    };
}

/**
 * Maps AuthToken from the contract to the presentation layer view model
 *
 * @param token The auth token from the API
 * @returns The mapped token view model with expiration date
 */
export function mapAuthTokenToVm(token: AuthToken): AuthTokenModel {
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + token.expiresIn);

    return new AuthTokenModel(token.accessToken, token.refreshToken, token.expiresIn, expiresAt);
}
