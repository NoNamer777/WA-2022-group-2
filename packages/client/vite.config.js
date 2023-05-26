import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

/** @type {import('vite').UserConfig} */
const sharedConfig = {
  base: '/',
  build: {
    emptyOutDir: true,
    outDir: '../../../dist/client'
  },
  cacheDir: '../../../.vite',
  envDir: fileURLToPath(new URL('../../environment', import.meta.url)),
  plugins: [vue()],
  root: 'packages/client/src'
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === 'production') {
    return {
      ...sharedConfig,
      build: {
        ...sharedConfig.build,
        manifest: true,
        sourcemap: false
      },
      mode: mode
    };
  }
  return {
    ...sharedConfig,
    build: {
      ...sharedConfig.build,
      sourcemap: true
    },
    css: {
      devSourcemap: true
    },
    mode: mode
  };
});
