import { computed, EnvironmentProviders, inject, Injectable, provideAppInitializer, signal } from '@angular/core';
import { catchError, finalize, from, map, Observable, of, shareReplay, switchMap, tap, throwError } from 'rxjs';
import { AuthVm, mapAuthResponseToVm, mapAuthTokenToVm } from '../model/auth.vm';
import { AUTH_STORAGE_TOKEN } from './auth-storage.service';
import { AuthResponse } from '@calm-mail/contract';
import { PermanentStorageService } from '@calm-mail/permanent-storage';
import { AuthGateway, LoggerPort } from '@calm-mail/frontend-core-ports';

// ==================== STORAGE ABSTRACTION ====================
export abstract class AuthPersistencePort {
    abstract load(): Promise<AuthVm | null>;

    abstract save(state: AuthVm): Promise<void>;

    abstract clear(): Promise<void>;
}

@Injectable({ providedIn: 'root' })
export class SecureAuthStorage implements AuthPersistencePort {
    private readonly storage = inject<PermanentStorageService<AuthVm>>(AUTH_STORAGE_TOKEN);
    private readonly encryptionKey = 'AUTH_SECURE_KEY'; // Should come from config

    async load(): Promise<AuthVm | null> {
        const encrypted = await this.storage.getItem();
        return encrypted ? this.decrypt(encrypted) : null;
    }

    async save(state: AuthVm): Promise<void> {
        await this.storage.setItem(this.encrypt(state));
    }

    async clear(): Promise<void> {
        await this.storage.removeItem();
    }

    private encrypt(data: AuthVm): AuthVm {
        // Implement AES encryption using crypto-js or Web Crypto API
        return data; // Placeholder
    }

    private decrypt(data: AuthVm): AuthVm {
        // Implement decryption
        return data; // Placeholder
    }
}

// ==================== STATE MANAGEMENT ====================
@Injectable({ providedIn: 'root' })
export class AuthStore {
    private readonly _state = signal<AuthVm>({
        isAuthenticated: false,
        user: null,
        tokens: null,
    });

    readonly isAuthenticated = computed(() => this._state().isAuthenticated);
    readonly currentUser = computed(() => this._state().user);
    readonly authToken = computed(() => this._state().tokens);

    currentState(): AuthVm {
        return this._state();
    }

    setState(state: AuthVm): void {
        this._state.set(state);
    }

    updateTokens(tokens: AuthVm['tokens']): void {
        this._state.update((current) => ({ ...current, tokens }));
    }

    reset(): void {
        this._state.set({ isAuthenticated: false, user: null, tokens: null });
    }
}

// ==================== MAIN AUTH SERVICE ====================
@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly logger = inject(LoggerPort);
    private readonly gateway = inject(AuthGateway);
    private readonly store = inject(AuthStore);
    private readonly storage = inject(AuthPersistencePort);
    private refreshInProgress$: Observable<void> | null = null;
    private readonly TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes

    /**
     * Initialize auth state from storage
     * Should be used with APP_INITIALIZER
     */
    initialize(): Observable<void> {
        return from(this.storage.load()).pipe(
            switchMap((storedState) => {
                if (storedState) {
                    this.store.setState(storedState);
                    return this.checkTokenRefreshNeeded();
                }
                return of(undefined);
            }),
            catchError((error) => {
                this.logger.error('Auth initialization failed', error);
                return of(undefined);
            }),
        );
    }

    login(email: string, password: string): Observable<void> {
        return this.authenticate(this.gateway.login({ email, password }), 'Login failed. Check credentials');
    }

    register(email: string, password: string, name?: string): Observable<void> {
        return this.authenticate(this.gateway.register({ email, password, name }), 'Registration failed');
    }

    logout(): Observable<void> {
        this.store.reset();
        return from(this.storage.clear()).pipe(
            tap(() => this.logger.info('User logged out')),
            map(() => void 0),
            catchError((error) => {
                this.logger.error('Failed to clear storage', error);
                return of(undefined);
            }),
        );
    }

    refreshToken(): Observable<void> {
        if (this.refreshInProgress$) return this.refreshInProgress$;

        const authToken = this.store.authToken();
        if (!authToken) return throwError(() => new Error('No refresh token available'));

        this.refreshInProgress$ = this.gateway.refreshToken({ refreshToken: authToken.refreshToken }).pipe(
            map((response) => mapAuthTokenToVm(response.tokens)),
            tap((newTokens) => {
                this.store.updateTokens(newTokens);
                this.persistState();
            }),
            map(() => void 0),
            catchError((error) => {
                this.logger.error('Token refresh failed', error);
                return this.logout().pipe(switchMap(() => throwError(() => new Error('Session expired'))));
            }),
            finalize(() => (this.refreshInProgress$ = null)),
            shareReplay({ bufferSize: 1, refCount: true }),
        );

        return this.refreshInProgress$;
    }

    getAccessToken(): string | undefined {
        return this.store.authToken()?.accessToken;
    }

    private authenticate(operation$: Observable<AuthResponse>, errorMessage: string): Observable<void> {
        return operation$.pipe(
            map(mapAuthResponseToVm),
            tap((authVm) => {
                this.store.setState({ ...authVm, isAuthenticated: true });
                this.persistState();
            }),
            map(() => void 0),
            catchError((error) => {
                this.logger.error(errorMessage, error);
                return throwError(() => new Error(errorMessage));
            }),
        );
    }

    private checkTokenRefreshNeeded(): Observable<void> {
        const tokens = this.store.authToken();
        if (!tokens) return of(undefined);

        const expiresAt = new Date(tokens.expiresAt).getTime();
        const now = Date.now();
        const shouldRefresh = expiresAt < now + this.TOKEN_REFRESH_THRESHOLD;

        return shouldRefresh ? this.refreshToken() : of(undefined);
    }

    private persistState(): void {
        const state = this.store.isAuthenticated() ? this.store.currentState() : null;

        if (state) {
            this.storage.save(state).catch((error) => this.logger.error('State persistence failed', error));
        } else {
            this.storage.clear().catch((error) => this.logger.error('Storage clearance failed', error));
        }
    }
}

export function setupAuthService(): () => void {
    return () => {
        const authService = inject(AuthService);
        return authService.initialize();
    };
}

// ==================== APP INITIALIZATION ====================
export function provideAuthServiceInitializer(): EnvironmentProviders[] {
    return [provideAppInitializer(setupAuthService())];
}
