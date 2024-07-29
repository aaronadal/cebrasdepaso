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
        '/contacto': { prerender: true },
        '/aviso-legal': { prerender: true },
        '/generador-de-caratulas': { ssr: false },
        '/generador-de-logotipos': { ssr: false },
        '/generador-de-degradados': { ssr: false },
        '/podcast': { ssr: false },
    }
})
