import {fileURLToPath} from "node:url";
import {defineConfig} from "vitest/config";

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
    resolve: {
        alias: {
            '~': root,
            '@': root,
            // Unit tests only cover plain functions; Nuxt runtime composables are stubbed.
            '#app/composables/asyncData': fileURLToPath(new URL('./tests/unit/stubs/nuxt.ts', import.meta.url)),
        },
    },
    test: {
        include: ['tests/unit/**/*.test.ts'],
    },
});
