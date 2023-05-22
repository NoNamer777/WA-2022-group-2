import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_CLIENT_BASE_URL || '/',
  build: {
    emptyOutDir: true,
    outDir: '../../../dist/client',
    manifest: true,
    sourcemap: process.env.NODE_ENV !== 'production'
  },
  cacheDir: '../../../.vite',
  css: {
    devSourcemap: true
  },
  envDir: fileURLToPath(new URL('../../environment', import.meta.url)),
  mode: process.env.NODE_ENV || 'development',
  plugins: [vue()],
  resolve: {
    alias: {
      '@wasted/client': fileURLToPath(new URL('packages/client/src', import.meta.url))
    }
  },
  root: 'packages/client/src'
});
