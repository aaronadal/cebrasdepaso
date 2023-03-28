import {getEpisodeTypeSlug} from "../src/media-types";

export const config = {
    runtime: 'edge',
};

function createSitemap(json) {
    const baseUrl = json.link;

    const episodes = json.episodes.reduce((xml, episode) => {
        return xml + '\n' + `  <url>
    <loc>${baseUrl}/podcast/${getEpisodeTypeSlug(episode.type)}/${episode.number}</loc>
    <lastmod>${episode.date}</lastmod>
  </url>`;
    }, '');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${json.date}</lastmod>
  </url>
  <url>
    <loc>${baseUrl}/contacto</loc>
    <lastmod>${json.date}</lastmod>
  </url>
  <url>
    <loc>${baseUrl}/podcast</loc>
    <lastmod>${json.date}</lastmod>
  </url>${episodes}
</urlset>`;
}

export default async (request: Request) => {
    const sitemap = await fetch(process.env.JSON_EPISODES_URL || '')
        .then((r) => r.json())
        .then((json) => createSitemap(json));

    return new Response(sitemap, {
        status: 200,
        headers: {
            'Content-Type': 'text/xml',
            'Cache-Control': 'stale-while-revalidate, s-maxage=86400',
        }
    });
}
