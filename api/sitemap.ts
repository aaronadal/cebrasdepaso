export const config = {
    runtime: 'edge',
};

function slugByType(type: string) {
    if(!type) {
        return '';
    }

    if (type === 'bonus') {
        return 'extra'
    }

    if (type === 'trailer') {
        return 'avance'
    }

    return 'episodio'
}

function createSitemap(json: any) {
    const baseUrl = json.link;

    const episodes = json.episodes.reduce((xml: string, episode: any) => {
        return xml + '\n' + `  <url>
    <loc>${baseUrl}/podcast/${slugByType(episode.type)}/${episode.number}</loc>
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
