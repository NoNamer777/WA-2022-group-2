const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['packages/server/src/main.js'],
  bundle: true,
  color: true,
  external: ['pg-hstore'],
  format: 'cjs',
  outdir: 'dist/server',
  platform: 'node',
  publicPath: '/',
  target: 'ES2022',
  treeShaking: true,
  sourcemap: true,
  write: true
});
