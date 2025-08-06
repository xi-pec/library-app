import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.xipec.library',
  appName: 'CBZRC Library',
  webDir: 'dist',

  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;
