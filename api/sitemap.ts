import {getEpisodeTypeSlug, Podcast} from "../src/media-types";
import {PODCAST_RSS_URL} from "../src/config";
import {parsePodcastFromFeed} from "../src/rss";

export const config = {
    runtime: 'edge',
};

function formatDate(date: Date | undefined): string {
    if (!date) {
        return '';
    }

    const YYYY = date.getFullYear();
    const MM = (date.getMonth() + 1).toString().padStart(2, '0');
    const DD = date.getDate().toString().padStart(2, '0');

    return `${YYYY}-${MM}-${DD}`;
}

function createSitemap(podcast: Podcast) {

    const last = formatDate(podcast.episodes[0].date);

    const episodes = podcast.episodes.reduce((xml, episode) => {
        return xml + '\n' + `  <url>
    <loc>https://cebrasdepaso.es/podcast/${getEpisodeTypeSlug(episode.episodeType)}/${episode.number}</loc>
    <lastmod>${formatDate(episode.date)}</lastmod>
  </url>`;
    }, '');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://cebrasdepaso.es</loc>
    <lastmod>2023-03-27</lastmod>
  </url>
  <url>
    <loc>https://cebrasdepaso.es/contacto</loc>
    <lastmod>2023-03-27</lastmod>
  </url>
  <url>
    <loc>https://cebrasdepaso.es/podcast</loc>
    <lastmod>${last}</lastmod>
  </url>${episodes}
</urlset>`;
}

export default async (request: Request) => {
    const podcast = await parsePodcastFromFeed(PODCAST_RSS_URL);

    return new Response(createSitemap(podcast), {
        status: 200,
        headers: {
            'Content-Type': 'text/xml',
            'Cache-Control': 'stale-while-revalidate, s-maxage=86400',
        }
    });
}
