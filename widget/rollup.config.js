import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const packageJson = require('./package.json');
const productionEnvReplacement = JSON.stringify('production');

// Host pages the widget is embedded into (e.g. Shopify's Dawn theme) often
// set a non-default root <html> font-size (commonly 10px, via the classic
// "62.5%" trick). `rem` units always resolve against the *document's* root
// font-size regardless of shadow DOM boundaries, so without this, every
// Tailwind rem-based size silently scales with whatever the host page set
// instead of the 16px Tailwind assumed when generating these values. This
// plugin bakes that assumption in at build time, converting every `Nrem` to
// a fixed `N*16px`, making the widget's layout immune to the host's root
// font-size.
function remToPxPlugin() {
  return {
    postcssPlugin: 'rem-to-px',
    Declaration(decl) {
      if (!decl.value.includes('rem')) return
      decl.value = decl.value.replace(/(-?\d*\.?\d+)rem/g, (match, num) => {
        const px = parseFloat(num) * 16
        return `${Number(px.toFixed(4))}px`
      })
    },
  }
}
remToPxPlugin.postcss = true

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
        plugins: [remToPxPlugin()],
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
