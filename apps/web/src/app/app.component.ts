import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { IconsLoaderService } from '@calm-mail/frontend-presentation';
import { PlatformDetectionService } from '@calm-mail/frontend-application';

@Component({
    imports: [RouterModule, IonApp, IonRouterOutlet],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    private readonly platformDetectionService = inject(PlatformDetectionService);
    protected readonly isRouterAnimationsEnabled = computed<boolean>(() => {
        return !this.platformDetectionService.isWeb();
    });
    private readonly iconsLoaderService = inject(IconsLoaderService);

    constructor() {
        this.iconsLoaderService.registerIcons();
    }
}
