import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts'],
  tsconfig: 'tsconfig.build.json',
  outDir: 'dist/',
  format: 'esm',
  platform: 'node',
  shims: true, // shims import.meta and require
  exports: true, // rewrite entrypoint in package.json
  treeshake: true,
  dts: true,
  sourcemap: false, // result in a bigger bundle size than minified+sourcemap for small packages
  minify: false, // result in a bigger bundle size if used with sourcemap for small packages
  unbundle: false, // use true and minify false to debug,
  attw: true
})
