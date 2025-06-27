import { ApplicationConfig } from '@angular/core';
import { provideCalmMailEnvironment } from '../provider/environment.provider';
import { provideCalmMailApplication } from '../provider/application.providers';

export const appConfig: ApplicationConfig = {
    providers: [...provideCalmMailApplication(), ...provideCalmMailEnvironment()],
};
