import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.xipec.library',
  appName: 'library-app',
  webDir: 'dist',

  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;
