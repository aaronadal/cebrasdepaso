// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: {
      enabled: false
  },

  imports: {
      autoImport: false
  },

  app: {
      pageTransition: {
          name: 'fade',
          mode: 'out-in'
      }
  },

  components: [
      {
          path: '~/components',
          pathPrefix: false,
      },
  ],

  routeRules: {
      '/': { prerender: true },
      '/aviso-legal': { prerender: true },
      '/contacto': { prerender: true },
      '/generador-de-caratulas': { swr: false },
      '/generador-de-logotipos': { swr: false },
      '/generador-de-degradados': { swr: false },
      '/podcast': { swr: true },
      '/ultimo': { swr: false },
  },

  compatibilityDate: '2024-07-30'
})