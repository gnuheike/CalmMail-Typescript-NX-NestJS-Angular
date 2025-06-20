import { Provider } from '@angular/core';
import { AuthService } from '../data-access/auth.service';
import { provideAuthStorage } from '../data-access/auth-storage.service';

/**
 * Provider for the AuthService
 *
 * Use this provider to make the AuthService available in your application.
 *
 * @example
 * ```typescript
 * // In your app.config.ts
 * import { provideAuth } from '@calm-mail/frontend-presentation';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     // ... other providers
 *     provideAuth(),
 *   ]
 * };
 * ```
 */
export function provideAuth(): Provider[] {
    return [...provideAuthStorage(), AuthService];
}
