import {expect, test} from "./fixtures";

test.describe('server-rendered html', () => {
    test('pages ship their meta tags', async ({request}) => {
        for (const [path, title] of [
            ['/', /^Cebras de paso · /],
            ['/podcast', /^Todos los episodios/],
            ['/podcast/episodio/1', /^\[#01] .+ · Cebras de paso$/],
            ['/contacto', /^Contacta con nosotras/],
        ] as const) {
            const html = await (await request.get(path)).text();
            expect(html.match(/<title>([^<]*)<\/title>/)?.[1], path).toMatch(title);
            expect(html, path).toMatch(/<meta property="og:title" content="[^"]+"/);
            expect(html, path).toMatch(/<meta property="og:image" content="https:\/\/[^"]+"/);
        }
    });

    test('episode pages include the episode content and artwork', async ({request}) => {
        const html = await (await request.get('/podcast/episodio/1')).text();
        expect(html).toMatch(/<meta property="og:image" content="https:\/\/[^"]*cloudfront\.net\//);
        expect(html).toMatch(/<meta name="description" content="[^"]{20,}"/);
        expect(html).toContain('rel="noopener noreferrer"');
    });

    test('the episode list is part of the html', async ({request}) => {
        const html = await (await request.get('/podcast')).text();
        expect(html.match(/class="card episode-card/g)?.length).toBe(10);
    });

    test('unknown pages and episodes return 404', async ({request}) => {
        expect((await request.get('/no-existe')).status()).toBe(404);
        expect((await request.get('/podcast/episodio/999')).status()).toBe(404);
    });

    test('pages stay small', async ({request}) => {
        for (const path of ['/', '/podcast', '/podcast/episodio/1', '/no-existe']) {
            const body = await (await request.get(path)).body();
            expect(body.length, path).toBeLessThan(150_000);
        }
    });

    test('pages carry a strict script policy', async ({request}) => {
        const html = await (await request.get('/contacto')).text();
        expect(html).toMatch(/<meta http-equiv="Content-Security-Policy" content="script-src 'self' 'sha256-[^']+'">/);
    });
});

test.describe('redirects', () => {
    test('/ultimo redirects to the latest episode on the server', async ({request}) => {
        const response = await request.get('/ultimo', {maxRedirects: 0});
        expect(response.status()).toBe(302);
        expect(response.headers()['location']).toMatch(/^\/podcast\/(episodio|extra|avance)\/\d+$/);
    });

    test('the /links button reaches the latest episode', async ({page, problems}) => {
        await page.goto('/links');
        await page.click('a[href="/ultimo"]');
        await expect(page).toHaveURL(/\/podcast\/(episodio|extra|avance)\/\d+$/);
        await expect(page.locator('.episode-page .episode-thumbnail')).toBeVisible();
    });

    test('short links redirect', async ({request}) => {
        expect((await request.get('/avance', {maxRedirects: 0})).headers()['location']).toBe('/podcast/avance/0');
        expect((await request.get('/ig', {maxRedirects: 0})).headers()['location']).toBe('https://instagram.com/cebrasdepaso');
    });
});

test.describe('sitemap', () => {
    test('lists the static pages and every episode', async ({request}) => {
        const response = await request.get('/sitemap.xml');
        expect(response.headers()['content-type']).toContain('application/xml');
        const xml = await response.text();
        const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
        expect(urls).toContain('https://cebrasdepaso.es/podcast');
        expect(urls).toContain('https://cebrasdepaso.es/podcast/avance/0');
        expect(urls.length).toBeGreaterThanOrEqual(49);
        expect(new Set(urls).size).toBe(urls.length);
    });
});

test.describe('pages in the browser', () => {
    for (const path of ['/', '/podcast', '/podcast/episodio/1', '/podcast/avance/0', '/podcast/extra/1', '/contacto', '/links', '/aviso-legal']) {
        test(`${path} renders without errors`, async ({page, problems}) => {
            await page.goto(path);
            await page.waitForLoadState('load');
            await page.waitForTimeout(1500);
        });
    }

    test('the 404 illustration renders in the browser', async ({page, problems}) => {
        // Chromium logs the 404 status of the page itself.
        problems.ignore(/status of 404/);
        await page.goto('/no-existe');
        await expect(page.locator('.svg-wrapper svg')).toBeVisible();
        await expect(page.getByText('No parece que haya ninguna CEBRA')).toBeVisible();
    });

    test('fonts and the zebra pattern load', async ({page, problems}) => {
        const pattern = page.waitForResponse((r) => r.url().endsWith('/zebra-pattern.svg') && r.ok());
        await page.goto('/');
        await pattern;
        await page.evaluate(() => document.fonts.ready);
        expect(await page.evaluate(() => [...document.fonts].some((f) => f.family.includes('Jost') && f.status === 'loaded'))).toBe(true);
    });

    test('episode links open safely in a new tab', async ({page, problems}) => {
        await page.goto('/podcast/episodio/1');
        const links = page.locator('.episode-page section a[href^="http"]');
        expect(await links.count()).toBeGreaterThan(0);
        for (const link of await links.all()) {
            await expect(link).toHaveAttribute('target', '_blank');
            await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        }
    });

    test('episode audio is not downloaded before playing', async ({page, problems}) => {
        const media: string[] = [];
        page.on('request', (r) => /anchor\.fm\/.*\/play\/|cloudfront\.net\/.*\.mp3/.test(r.url()) && media.push(r.url()));
        await page.goto('/podcast');
        await page.waitForTimeout(3000);
        expect(media).toEqual([]);
        await expect(page.locator('.episode-card .total-time').first()).not.toHaveText('00:00');
    });

    for (const path of ['/generador-de-caratulas', '/generador-de-logotipos', '/generador-de-degradados']) {
        test(`${path} generates an image`, async ({page, problems}) => {
            await page.goto(path);
            const textarea = page.locator('textarea');
            if (await textarea.count()) {
                await textarea.first().fill('Título de prueba');
            }
            await page.getByText('Descargar').click();
            await expect(page.locator('img[src^="data:image/png"]')).toBeVisible({timeout: 30_000});
        });
    }
});

test('injected inline scripts and handlers are blocked', async ({page, baseURL}) => {
    await page.route(`${baseURL}/contacto`, async (route) => {
        const response = await route.fetch();
        const html = (await response.text()).replace('</body>',
            '<img src="/x.png" onerror="window.__xss=\'handler\'"><script>window.__xss=\'script\'</script></body>');
        await route.fulfill({response, body: html});
    });

    await page.goto('/contacto');
    await page.waitForTimeout(1000);
    expect(await page.evaluate(() => (window as any).__xss ?? null)).toBeNull();
    const violations: string[] = await page.evaluate(() => (window as any).__violations);
    expect(violations.filter((v) => v.startsWith('script-src')).length).toBeGreaterThanOrEqual(2);
});
