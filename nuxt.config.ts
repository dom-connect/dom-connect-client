// https://nuxt.com/docs/api/configuration/nuxt-config
import { process } from "std-env";

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
  plugins: ["~/plugins/firebase.client.ts"],
  nitro: {
    routeRules: {
      "/endpoint/**": {
        proxy: `${process.env.NUXT_PUBLIC_URL}/**`,
      },
    },
  },
  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "",
  },

  viewport: {
    breakpoints: {
      mobile: 0,
      desktop: 685,
    },
  },

  css: ["~/assets/css/main.css"],

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2024-11-27",
});
