/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          300: 'var(--primary-300)',
          500: 'var(--primary-500)',
          950: 'var(--primary-950)',
        },
        tgrey: {
          400: 'var(--tgrey-400)',
          500: 'var(--tgrey-500)',
        },
        tsuccess: {
          500: 'var(--tsuccess-500)',
        },
        tdanger: {
          400: 'var(--tdanger-400)',
          500: 'var(--tdanger-500)',
        },
      },
    },
  },
  plugins: [],
}

