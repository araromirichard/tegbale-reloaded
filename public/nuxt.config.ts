import * as path from 'path';

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseUrl: "",
      reCaptcha: "",
    },
  },
  devtools: { enabled: true },
  css: ["~/assets/css/base.css"],
  imports: {
    dirs: ["stores"],
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-icon",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styling/main.scss" as *;',
        },
      },
    },
  }
});