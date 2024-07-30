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
      '/generador-de-caratulas': { prerender: true },
      '/generador-de-logotipos': { prerender: true },
      '/generador-de-degradados': { prerender: true },
      '/podcast': { isr: true },
      '/podcast/**': { isr: true },
      '/ultimo': { ssr: false },
  },

  compatibilityDate: '2024-07-30'
})