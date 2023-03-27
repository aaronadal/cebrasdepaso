import type {VercelRequest, VercelResponse} from '@vercel/node';
import {parsePodcastFromFeed} from "../src/rss";
import {PODCAST_RSS_URL} from "../src/config";
import {getEpisodeTypeSlug, Podcast} from "../src/media";

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

export default function handler(
    request: VercelRequest,
    response: VercelResponse,
) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/xml');

    // Instructing the Vercel edge to cache the file
    response.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=86400')

    parsePodcastFromFeed(PODCAST_RSS_URL)
        .then((podcast) => {
            response.end(createSitemap(podcast));
        });
}
