import type { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'com.calm-mail.web',
  appName: 'calm-mail-web',
  webDir: '../../dist/apps/web',
  plugins: {
    Keyboard: {
      resize: KeyboardResize.Ionic,
      resizeOnFullScreen: false,
    },
  },
};

export default config;
