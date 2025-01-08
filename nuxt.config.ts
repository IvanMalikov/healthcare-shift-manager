import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    ssr: {
      noExternal: ['vuetify'],
    },
    plugins: [vuetify()],
  },
  css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.css'],
  modules: ['@pinia/nuxt'],
})