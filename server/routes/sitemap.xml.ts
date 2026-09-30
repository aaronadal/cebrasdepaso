import {defineEventHandler, setResponseHeader} from "h3";

const rssUrl = 'https://anchor.fm/s/c0099e38/podcast/rss';
const baseUrl = 'https://cebrasdepaso.es';
const staticPaths = ['', '/podcast', '/contacto', '/links'];

type EpisodeType = 'full' | 'bonus' | 'trailer';

type SitemapUrl = {
    loc: string,
    lastmod: string,
};

function slugByType(type: EpisodeType) {
    if (type === 'bonus') {
        return 'extra';
    }

    if (type === 'trailer') {
        return 'avance';
    }

    return 'episodio';
}

function escapeXml(value: string) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function toDate(value: string) {
    const date = new Date(value);

    return isNaN(date.getTime()) ? '' : date.toISOString().substring(0, 10);
}

function tagContent(xml: string, tag: string) {
    const match = xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`));
    if (!match) {
        return '';
    }

    return match[1].replace(/^\s*<!\[CDATA\[([\s\S]*?)]]>\s*$/, '$1').trim();
}

// Mirrors the numbering rules of parseEpisodes() in composables/rss.ts, so the
// URLs listed here are the same ones the app resolves.
function parseEpisodeUrls(xml: string): SitemapUrl[] {
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
    const counts: Record<EpisodeType, number> = {full: 0, bonus: 0, trailer: 0};

    const urls: SitemapUrl[] = [];
    for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];

        const episodeType = (tagContent(item, 'itunes:episodeType') || 'full') as EpisodeType;
        if (!(episodeType in counts)) {
            continue;
        }

        counts[episodeType]++;
        let number = counts[episodeType];

        const title = tagContent(item, 'title');
        if (/\[[*#»][0-9]+]\s/.test(title.substring(0, 6))) {
            number = parseInt(title.substring(2, 5));
        }

        urls.unshift({
            loc: `${baseUrl}/podcast/${slugByType(episodeType)}/${number}`,
            lastmod: toDate(tagContent(item, 'pubDate')),
        });
    }

    return urls;
}

function createSitemap(urls: SitemapUrl[]) {
    const entries = urls.map(({loc, lastmod}) => [
        '  <url>',
        `    <loc>${escapeXml(loc)}</loc>`,
        ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
        '  </url>',
    ].join('\n'));

    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...entries,
        '</urlset>',
    ].join('\n');
}

export default defineEventHandler(async (event) => {
    let lastmod = '';
    let episodeUrls: SitemapUrl[] = [];
    let cacheControl = 'public, max-age=0, s-maxage=86400, stale-while-revalidate=3600';

    try {
        const xml = await $fetch<string>(rssUrl, {responseType: 'text', timeout: 10000});

        lastmod = toDate(tagContent(xml, 'lastBuildDate'));
        episodeUrls = parseEpisodeUrls(xml);
    } catch (error) {
        console.error('Could not build the episodes sitemap', error);

        // Serve the static pages anyway, but retry soon.
        cacheControl = 'public, max-age=0, s-maxage=300';
    }

    const staticUrls = staticPaths.map((path) => ({loc: `${baseUrl}${path}`, lastmod}));

    setResponseHeader(event, 'Content-Type', 'application/xml; charset=utf-8');
    setResponseHeader(event, 'Cache-Control', cacheControl);

    return createSitemap([...staticUrls, ...episodeUrls]);
});
