import { build } from 'esbuild';

(async () =>
  await build({
    entryPoints: ['packages/server/src/main.js'],
    bundle: true,
    color: true,
    external: ['pg-hstore'],
    format: 'cjs',
    minify: true,
    outdir: 'dist/server',
    platform: 'node',
    publicPath: '/',
    target: 'ES2022',
    treeShaking: true,
    sourcemap: process.env.NODE_ENV !== 'production',
    write: true
  }))();
