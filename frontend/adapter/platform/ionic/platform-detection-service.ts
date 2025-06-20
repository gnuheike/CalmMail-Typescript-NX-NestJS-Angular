import { inject, Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';

export type PlatformType = 'web' | 'android' | 'ios' | 'electron';

@Injectable({
  providedIn: 'root',
})
export class PlatformDetectionService {
  private readonly platform: Platform = inject(Platform);

  public getCurrentPlatform(): PlatformType {
    // Check Electron first (can run on any OS)
    if (Capacitor.getPlatform() === 'electron') {
      return 'electron';
    }

    // Check native platforms
    if (Capacitor.isNativePlatform()) {
      return this.platform.is('ios') ? 'ios' : 'android';
    }

    // Default to web
    return 'web';
  }

  public isWeb = (): boolean => this.getCurrentPlatform() === 'web';
}
