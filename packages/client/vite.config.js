import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // TODO: Provide via node environment variable
  base: '/',
  // TODO: Provide via node environment variable
  mode: 'development',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('packages/client/src', import.meta.url))
    }
  },
  // TODO: Provide via node environment variable
  root: 'packages/client'
})
