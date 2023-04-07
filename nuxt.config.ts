// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    'nuxt-icons'
  ],
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
