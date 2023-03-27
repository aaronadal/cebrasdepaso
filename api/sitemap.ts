import type {VercelRequest, VercelResponse} from '@vercel/node';

export const PODCAST_RSS_URL = 'https://anchor.fm/s/c0099e38/podcast/rss'

export type EpisodeType = 'full'|'bonus'|'trailer'
export type EpisodeTypeSlug = 'episodio'|'avance'|'extra'

export interface Track {    mediaUrl: string;
    mediaType: string;
    title: string;
    artist: string;
    album: string;
    artworkSrc?: string;
    artworkType?: string;
    artworkWidth?: number;
    artworkHeight?: number;
}

export interface Episode extends Track {
    guid?: string;
    date?: Date;
    guest?: string;
    summary?: string;
    fullSummary?: string;
    episodeType: EpisodeType;
    number: number;
    season: number;
    numberInSeason: number;
    duration?: number;
    embedUrl?: string;
    relatedUrl?: string;
}

export interface Podcast {
    title: string,
    author: string;
    summary: string;
    lastBuildDate: Date;
    episodes: Episode[];
}

export function getEpisodeTypeLabel(type: EpisodeType) {
    if (type === 'bonus') {
        return 'Extra'
    }

    if (type === 'trailer') {
        return 'Avance'
    }

    return 'Episodio'
}

export function getEpisodeTypeSymbol(type: EpisodeType) {
    if (type === 'bonus') {
        return '*'
    }

    if (type === 'trailer') {
        return '»'
    }

    return '#'
}

export function getEpisodeBackground(type: EpisodeType, number: number) {
    if(type === 'trailer') {
        return 'var(--gradient-gray)';
    }

    if(type === 'bonus') {
        return 'var(--full-gradient)';
    }

    if(number === 0) {
        return 'var(--gradient-gray)';
    }

    return `var(--gradient-${((number - 1) % 9) + 1})`
}

export function getEpisodeTypeSlug(type: EpisodeType): EpisodeTypeSlug {
    if(type === 'bonus') {
        return 'extra';
    }

    if(type === 'trailer') {
        return 'avance';
    }

    return 'episodio';
}

export function getEpisodeTypeBySlug(type: EpisodeTypeSlug): EpisodeType {
    if(type === 'extra') {
        return 'bonus';
    }

    if(type === 'avance') {
        return 'trailer';
    }

    return 'full';
}


function parseDate (date: string): Date {
    return new Date(date)
}

const itunesNS = 'http://www.itunes.com/dtds/podcast-1.0.dtd'

function parseEpisodes (data: Document): Episode[] {
    const episodes: Episode[] = []

    const counts = {
        full: 0,
        bonus: 0,
        trailer: 0
    }

    const items = data.querySelectorAll('channel > item')
    for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i]

        const episodeType = (item.getElementsByTagNameNS(itunesNS, 'episodeType')?.[0]?.textContent || 'full') as EpisodeType
        const relatedUrl = item.querySelector('link')?.textContent || ''
        const media = item.querySelector('enclosure')
        const artworkSrc = item.getElementsByTagNameNS(itunesNS, 'image')?.[0]?.getAttribute('href') || ''
        const artworkExt = artworkSrc.split('.').slice(-1)[0]?.toLowerCase() || ''

        counts[episodeType]++
        let number = counts[episodeType];
        let title = item.querySelector('title')?.textContent || '';
        if(/\[[*#»][0-9]+]\s/.test(title.substring(0, 6))) {
            number = parseInt(title.substring(2, 5));
            title = title.substring(6);
        }

        let guest = '';
        if(/\s\(Con .*?\)$/.test(title)) {
            const match = title.match(/\s\(Con (.*?)\)$/);

            guest = match && match.length >= 2 ? match[1] : '';
            title = title.replace(/\s\(Con (.*?)\)$/, '');
        }

        const fullSummary = item.querySelector('description')?.textContent || '';
        let summary = fullSummary;
        if(summary.includes('<p>---</p>')) {
            summary = summary.split('<p>---</p>')[0];
        }

        episodes[i] = {
            guid: item.querySelector('guid')?.textContent || '',
            date: parseDate(item.querySelector('pubDate')?.textContent || ''),
            title,
            guest,
            summary,
            fullSummary,
            episodeType,
            number,
            season: parseInt(item.getElementsByTagNameNS(itunesNS, 'season')?.[0]?.textContent || '0'),
            numberInSeason: parseInt(item.getElementsByTagNameNS(itunesNS, 'episode')?.[0]?.textContent || '0'),
            duration: parseInt(item.getElementsByTagNameNS(itunesNS, 'duration')?.[0]?.textContent || '0'),
            mediaUrl: media?.getAttribute('url') || '',
            mediaType: media?.getAttribute('type') || '',
            relatedUrl,
            embedUrl: relatedUrl.split('/episodes/').join('/embed/episodes/'),
            artworkSrc,
            artworkType: artworkExt === 'png' ? 'image/png' : 'image/jpeg',
            artworkWidth: 3000,
            artworkHeight: 3000,
        } as Episode;
    }

    return episodes
}

export function parsePodcastFromFeed (feedUrl: string): Promise<Podcast> {
    return fetch(feedUrl)
        .then(response => response.text())
        .then(rss => new window.DOMParser().parseFromString(rss, 'text/xml'))
        .then(data => {
            return {
                lastBuildDate: parseDate(data.querySelector('lastBuildDate')?.textContent || ''),
                title: data.querySelector('channel > title')?.textContent || '',
                author: data.querySelector('channel > author')?.textContent || '',
                summary: data.querySelector('channel > description')?.textContent || '',
                episodes: parseEpisodes(data)
            }
        })
}

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
