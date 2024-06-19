import alias from '@rollup/plugin-alias'
import { env, nodeless } from 'unenv'
import resolve from '@rollup/plugin-node-resolve'
import typescrpit from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
// import nodePolyfills from 'rollup-plugin-node-polyfills'

const { alias: unenvAlias } = env(nodeless)

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'esm',
  },
  plugins: [
    // nodePolyfills(),
    typescrpit(),
    commonjs(),
    alias({
      entries: unenvAlias,
    }),
    resolve({
      preferBuiltins: false,
      browser: false,
    }),
  ],
}
