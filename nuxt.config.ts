// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://example.com',
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
})
