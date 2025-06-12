import {
  ApplicationConfig,
  importProvidersFrom,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { provideIonicAngular } from '@ionic/angular/standalone';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(appRoutes),
    provideIonicAngular({
      rippleEffect: true,
      useSetInputAPI: true,
    }),
    provideHttpClient(),
    importProvidersFrom(IonicModule.forRoot()),
  ],
};
