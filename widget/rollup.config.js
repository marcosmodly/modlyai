import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const packageJson = require('./package.json');
const productionEnvReplacement = JSON.stringify('production');

function replaceBrowserProductionEnv() {
  const replaceNodeEnv = (code) =>
    code.includes('process.env.NODE_ENV')
      ? code.split('process.env.NODE_ENV').join(productionEnvReplacement)
      : null;

  return {
    name: 'replace-browser-production-env',
    transform(code) {
      const updatedCode = replaceNodeEnv(code);
      return updatedCode ? { code: updatedCode, map: null } : null;
    },
    renderChunk(code) {
      const updatedCode = replaceNodeEnv(code);
      return updatedCode ? { code: updatedCode, map: null } : null;
    },
  };
}

export default [
  // Library builds (existing)
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve({
        browser: true,
      }),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss({
        extract: true,
        minimize: true,
      }),
    ],
    external: ['react', 'react-dom'],
  },
  // NEW: UMD build for script tag
  {
    input: 'src/widget-loader.ts',
    output: {
      file: 'dist/widget.umd.js',
      format: 'umd',
      name: 'ModlyWidget',
      sourcemap: true,
    },
    plugins: [
      replaceBrowserProductionEnv(),
      resolve({
        browser: true,
      }),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss({
        extract: false,
        inject: false,
        minimize: false,
      }),
    ],
  },
  // Type definitions
  {
    input: 'dist/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
