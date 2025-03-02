// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxt/image",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "dayjs-nuxt",
    "nuxt-viewport",
    "nuxt-typed-router",
    "@nuxt/fonts",
  ],

  css: ["~/assets/css/main.css"],

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2024-11-27",
});
