import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // TODO: Provide via a node environment variable
  base: '/',
  build: {
    emptyOutDir: true,
    // TODO: Provide via a node environment variable
    outDir: '../../dist/client'
  },
  cacheDir: '../../.vite',
  css: {
    devSourcemap: true
  },
  // TODO: Provide via a node environment variable
  mode: 'development',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('packages/client/src', import.meta.url))
    }
  },
  // TODO: Provide via a node environment variable
  root: 'packages/client'
})
