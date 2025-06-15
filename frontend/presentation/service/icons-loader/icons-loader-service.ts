import { Injectable } from '@angular/core';
import { addIcons } from 'ionicons';
import { APP_ICONS } from './app-icons';

@Injectable({
    providedIn: 'root',
})
export class IconsLoaderService {
    registerIcons(): void {
        addIcons(APP_ICONS);
    }
}
