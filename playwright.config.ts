import {defineConfig} from "@playwright/test";

// Runs against a production build: `docker compose --profile test run --rm e2e`.
export default defineConfig({
    testDir: 'tests/e2e',
    timeout: 60_000,
    retries: 1,
    workers: 2,
    reporter: [['list']],
    outputDir: process.env.PLAYWRIGHT_OUTPUT_DIR || 'test-results',
    use: {
        baseURL: process.env.BASE_URL || 'http://localhost:3001',
    },
});
