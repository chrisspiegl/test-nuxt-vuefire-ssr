import process from 'node:process'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // nitro: {
  //   // preset: "firebase",
  // },
  modules: [
  //   '@vue-macros/nuxt',
  //   '@vueuse/nuxt',
    "nuxt-vuefire",
  //   "stale-dep/nuxt"
  ],
  vuefire: {
      auth: true,
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
  // sourcemap: true,
  // vite: {
  //   optimizeDeps: {
  //     include: [],
  //   },
  //   build: {
  //     target: 'esnext',
  //     minify: false,
  //     sourcemap: true,
  //   },
  // },
  // staleDep: {
  //   packageManager: 'pnpm',
  // },
})
