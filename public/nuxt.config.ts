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
    "nuxt-primevue",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-icon",
  ],
  primevue: {
    options: {
      unstyled: true,
      pt: {
        inputtext: {
          root: {
            style: {
              width: "100%",
              fontSize: "13px",
              padding: "14px",
              color: "#000",
              borderRadius: "4px",
              lineHeight: "14.52px",
              border: "1.5px solid #E0E0DB",
              backgroundColor: "#F8F8F7",
            },
          },
        },
        textarea: {
          root: {
            style: {
              width: "100%",
              fontSize: "13px",
              padding: "14px",
              borderRadius: "4px",
              outlineStyle: "none",
              color: "#000000",
              border: "1.5px solid #E0E0DB",
              backgroundColor: "#F8F8F7",
            },
          },
        },
        dropdown: {
          root: {
            style: {
              width: "100%",
              fontSize: "13px",
              padding: "6px",
              borderRadius: "4px",
              border: "1.5px solid #E0E0DB",
              backgroundColor: "#F8F8F7",
            },
          },
          input: {
            style: {
              width: "100%",
              fontSize: "13px",
              color: "#666666",
            },
          },
        },
        calendar: {
          root: {
            style: {
              width: "100%",
            },
          },
          input: {
            style: {
              width: "100%",
              fontSize: "13px",
              padding: "14px",
              color: "#000",
              borderRadius: "4px",
              lineHeight: "14.52px",
              border: "1.5px solid #E0E0DB",
              backgroundColor: "#F8F8F7",
            },
          },
        },
      },
    },
  },
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