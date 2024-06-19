import process from 'node:process'
import {fileURLToPath} from 'node:url'
import path from 'node:path'
import alias from '@rollup/plugin-alias'
import { env, nodeless } from 'unenv'
import resolve from '@rollup/plugin-node-resolve'
import nodePolyfill from 'rollup-plugin-polyfill-node'

const { alias: unenvAlias } = env(nodeless)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    // preset: "firebase",
    minify: false,
  },
  modules: [
  //   '@vue-macros/nuxt',
  //   '@vueuse/nuxt',
    "nuxt-vuefire",
  //   "stale-dep/nuxt"
  ],
  vuefire: {
      // auth: true,
  //     admin: {
  //         // serviceAccount: 'XX_SOMETHING_XX',
  //     },
      config: {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID,
      },
  },
  alias: {
    ...unenvAlias,
    // util: 'rollup-plugin-node-polyfills/polyfills/util',
    // sys: 'util',
    // events: 'rollup-plugin-node-polyfills/polyfills/events',
    // stream: 'rollup-plugin-node-polyfills/polyfills/stream',
    // path: 'rollup-plugin-node-polyfills/polyfills/path',
    // querystring: 'rollup-plugin-node-polyfills/polyfills/qs',
    // punycode: 'rollup-plugin-node-polyfills/polyfills/punycode',
    // url: 'rollup-plugin-node-polyfills/polyfills/url',
    // string_decoder: 'rollup-plugin-node-polyfills/polyfills/string-decoder',
    // http: 'rollup-plugin-node-polyfills/polyfills/http',
    // https: 'rollup-plugin-node-polyfills/polyfills/http',
    // os: 'rollup-plugin-node-polyfills/polyfills/os',
    // assert: 'rollup-plugin-node-polyfills/polyfills/assert',
    // constants: 'rollup-plugin-node-polyfills/polyfills/constants',
    // _stream_duplex: 'rollup-plugin-node-polyfills/polyfills/readable-stream/duplex',
    // _stream_passthrough: 'rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough',
    // _stream_readable: 'rollup-plugin-node-polyfills/polyfills/readable-stream/readable',
    // _stream_writable: 'rollup-plugin-node-polyfills/polyfills/readable-stream/writable',
    // _stream_transform: 'rollup-plugin-node-polyfills/polyfills/readable-stream/transform',
    // timers: 'rollup-plugin-node-polyfills/polyfills/timers',
    // console: 'rollup-plugin-node-polyfills/polyfills/console',
    // vm: 'rollup-plugin-node-polyfills/polyfills/vm',
    // zlib: 'rollup-plugin-node-polyfills/polyfills/zlib',
    // tty: 'rollup-plugin-node-polyfills/polyfills/tty',
    // domain: 'rollup-plugin-node-polyfills/polyfills/domain',
    os: fileURLToPath(new URL('./replacements/os.cjs', import.meta.url)),
    http2: fileURLToPath(new URL('./replacements/http2.cjs', import.meta.url)),
  },
  sourcemap: true,
  vite: {
    optimizeDeps: {
      include: [],
    },
    build: {
      target: 'esnext',
      minify: false,
      sourcemap: true,
    },
    // resolve: {
    //   alias: {
    //     // os: path.resolve(__dirname, './os.cjs'),
    //     ...unenvAlias,
    //     // 'os': fileURLToPath(new URL('./os.cjs', import.meta.url)),
    //   },
    // }
    // plugins: [
    //   {
    //   ...nodePolyfill({
    //     exclude: ['util'],
    //   }),
    //   enforce: 'pre',
    // },
  //     {
  //     ...alias({
  //       // entries: unenvAlias,
  //       entries: {
  //         ...unenvAlias,
  //         os: './os.js',
  //       },
  //     }),
  //     enforce: 'pre',
  //   },
    // {
    //   ...resolve({
    //     preferBuiltins: false,
    //     browser: false,
    //   }),
    //   enforce: 'pre',
    // },
    // ],
  },
  // staleDep: {
  //   packageManager: 'pnpm',
  // },
})
