import { InjectionToken, Provider } from '@angular/core';
import { AuthVm } from '../model/auth.vm';
import { IonicPermanentStorageService, PermanentStorageService } from '@calm-mail/frontend/permanent-storage';

/**
 * Token for injecting the auth storage service
 */
export const AUTH_STORAGE_KEY = 'auth_state';
export const AUTH_STORAGE_TOKEN = new InjectionToken<PermanentStorageService<AuthVm>>(AUTH_STORAGE_KEY);

/**
 * Provider for the auth storage service
 *
 * @returns Provider configuration for the auth storage service
 */
export function provideAuthStorage(): Provider[] {
    return [
        {
            provide: AUTH_STORAGE_TOKEN,
            useFactory: () => new IonicPermanentStorageService<AuthVm>(AUTH_STORAGE_KEY),
        },
    ];
}
