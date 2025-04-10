// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "DomConnect – Дом в подключен",
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon.svg",
        },
      ],
    },
  },
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

  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "",
  },

  css: ["~/assets/css/main.css"],

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2024-11-27",
});
