import { EnvironmentProviders, importProvidersFrom, Provider, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from '../app/app.routes';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { provideAuthFeature, provideComposeFeature, provideInboxFeature } from '@calm-mail/frontend-application';
import { provideBus } from '@calm-mail/frontend-adapter';

/**
 * Represents an array of providers used for application-level dependency injection.
 *
 * The array may include instances of `Provider` or `EnvironmentProviders`. These
 * are utilized to configure and initialize services or components required by the application.
 *
 * The array is populated by calling `provideAuthServiceInitializer()`, which typically
 * provides essential authentication-related services or configurations.
 */
export const provideCalmMailApplication = (): Array<Provider | EnvironmentProviders> => {
    return [
        provideZonelessChangeDetection(),
        provideRouter(appRoutes),
        provideIonicAngular({
            rippleEffect: true,
            useSetInputAPI: true,
        }),
        provideHttpClient(),
        importProvidersFrom(IonicModule.forRoot()),
        // App
        ...provideBus(),
        ...provideInboxFeature(),
        ...provideAuthFeature(),
        ...provideComposeFeature(),
    ];
};
