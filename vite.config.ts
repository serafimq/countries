import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr({ exportAsDefault: true }), react()],
  resolve: {
      alias: [{ find: '@', replacement: '/src' }],
  },
  css: {
  
    preprocessorOptions: {
      scss: {
        additionalData: `$injectedColor: orange;`,
      },
    }
  }
})
