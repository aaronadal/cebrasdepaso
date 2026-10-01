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
      // Pages that show episodes are rendered on the server and refreshed hourly.
      '/': { isr: 3600 },
      '/podcast': { isr: 3600 },
      '/podcast/**': { isr: 3600 },
      '/aviso-legal': { prerender: true },
      '/contacto': { prerender: true },
      '/links': { prerender: true },
      // html2canvas tools only work in the browser.
      '/generador-de-caratulas': { ssr: false, prerender: true },
      '/generador-de-logotipos': { ssr: false, prerender: true },
      '/generador-de-degradados': { ssr: false, prerender: true },
      '/ultimo': { ssr: false },
  },

  compatibilityDate: '2024-07-30'
})