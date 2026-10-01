import {readFileSync} from "node:fs";
import {expect, test as base} from "@playwright/test";

// The headers Vercel adds in production (vercel.json); the local server does not send them.
const vercelHeaders: {key: string, value: string}[] = JSON.parse(
    readFileSync(new URL('../../vercel.json', import.meta.url), 'utf8'),
).headers[0].headers;

type Problems = {
    list: string[],
    ignore: (pattern: RegExp) => void,
};

export const test = base.extend<{problems: Problems}>({
    context: async ({context, baseURL}, use) => {
        await context.addInitScript(() => {
            (window as any).__violations = [];
            document.addEventListener('securitypolicyviolation', (e) => {
                (window as any).__violations.push(`${e.violatedDirective} blocked ${e.blockedURI || '(inline)'}`);
            });
        });

        await context.route(`${baseURL}/**`, async (route) => {
            let response;
            try {
                response = await route.fetch({timeout: 15_000});
            } catch {
                return route.abort().catch(() => {}); // the page went away while prefetching
            }

            const headers = {...response.headers()};
            for (const {key, value} of vercelHeaders) {
                headers[key.toLowerCase()] = value;
            }
            await route.fulfill({response, headers}).catch(() => {});
        });

        await use(context);
    },

    // Collects CSP violations, page errors and console errors; tests fail if any are left unexplained.
    problems: async ({page}, use) => {
        const list: string[] = [];
        const ignored: RegExp[] = [];
        page.on('pageerror', (e) => list.push(`pageerror: ${e.message}`));
        page.on('console', (m) => {
            if (m.type() === 'error' || /hydration/i.test(m.text())) {
                list.push(`console.${m.type()}: ${m.text()}`);
            }
        });

        const problems = {list, ignore: (pattern: RegExp) => ignored.push(pattern)};
        await use(problems);

        const violations: string[] = await page.evaluate(() => (window as any).__violations || []).catch(() => []);
        const unexpected = [...violations, ...list].filter((p) => !ignored.some((pattern) => pattern.test(p)));
        expect(unexpected, 'CSP violations, page errors or console errors').toEqual([]);
    },
});

export {expect};
