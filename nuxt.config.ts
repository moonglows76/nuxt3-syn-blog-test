// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    serverUrl: process.env.NUXT_PUBLIC_SITE_URL,
    public: {
      localUrl: 'http://localhost:3000/',
    }
  },
  modules: [
    '@vueuse/nuxt',
    'nuxt-icons',
    'nuxt-simple-sitemap',
    '@nuxtjs/stylelint-module',
  ],
  stylelint: {
    lintOnStart: false,
  },
  css: [
    "normalize.css",
    "@/assets/sass/style.scss",
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
@use "sass:math";
@use "sass:color";
@import "@/assets/sass/variables.scss";
@import "@/assets/sass/mixins.scss";
`,
        },
      },
    },
  },
  nitro: {
    preset: 'netlify',
  },
  routeRules: {
    // SWRとISRの設定
    '/swr': { swr: 600 },
    '/isr': { isr: 600 },
    // '/blog': { redirect: '/info' },
    // ホームはサーバーで生成（SSR）
    // '/': { ssr: true, prerender: false },
    // blogはビルド時にあらかじめ生成（SSG）
    // '/blog': { ssr: false, prerender: true },
    // '/blog/app': { ssr: false, prerender: true },
    // '/blog/faq': { ssr: false, prerender: true },
    // '/blog/price': { ssr: false, prerender: true },
  },
})
