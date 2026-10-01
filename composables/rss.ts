import type {Episode, Podcast, EpisodeType} from "@/composables/media"
import {useAsyncData} from "#app/composables/asyncData";
import {XMLParser} from "fast-xml-parser";
import {sanitizeHtml} from "~/composables/sanitizeHtml";
import {useConfig} from "~/composables/config";

type XmlNode = Record<string, unknown>;

const xmlParser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    parseTagValue: false,
    parseAttributeValue: false,
    trimValues: false,
    isArray: (name) => name === 'item',
});

function first(value: unknown): unknown {
    return Array.isArray(value) ? value[0] : value;
}

function text(value: unknown): string {
    value = first(value);
    if (typeof value === 'string') {
        return value;
    }

    if (value && typeof value === 'object' && '#text' in value) {
        return String((value as XmlNode)['#text']);
    }

    return '';
}

function attribute(value: unknown, name: string): string {
    value = first(value);
    if (value && typeof value === 'object') {
        return String((value as XmlNode)[`@_${name}`] ?? '');
    }

    return '';
}

function parseEpisodes(items: XmlNode[]): Episode[] {
    const episodes: Episode[] = []

    const counts = {
        full: 0,
        bonus: 0,
        trailer: 0,
    }

    for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i]

        const episodeType = (text(item['itunes:episodeType']) || 'full') as EpisodeType
        const relatedUrl = text(item['link'])
        const media = item['enclosure']
        const artworkSrc = attribute(item['itunes:image'], 'href')
        const artworkExt = artworkSrc.split('.').slice(-1)[0]?.toLowerCase() || ''

        counts[episodeType]++
        let number = counts[episodeType];
        let title = text(item['title']);
        if (/\[[*#»][0-9]+]\s/.test(title.substring(0, 6))) {
            number = parseInt(title.substring(2, 5));
            title = title.substring(6);
        }

        let guest = '';
        if (/\s\(con .*?\)$/.test(title)) {
            const match = title.match(/\s\(con (.*?)\)$/);

            guest = match && match.length >= 2 ? match[1] : '';
            title = title.replace(/\s\(con (.*?)\)$/, '');
        }

        let fullSummary = sanitizeHtml(text(item['description']));
        fullSummary = fullSummary.replace(/<p><br><\/p>/g, '');
        fullSummary = fullSummary.replace(/<p>---<\/p>/g, '<hr>');
        fullSummary = fullSummary.replace(/<br>---<br>/g, '<hr>');

        let summary = fullSummary;
        if (summary.includes('<hr>')) {
            summary = summary.split('<hr>')[0];
        }

        episodes[i] = {
            guid: text(item['guid']),
            date: text(item['pubDate']),
            title,
            guest,
            summary,
            fullSummary,
            episodeType,
            number,
            season: parseInt(text(item['itunes:season']) || '0'),
            numberInSeason: parseInt(text(item['itunes:episode']) || '0'),
            duration: parseInt(text(item['itunes:duration']) || '0'),
            mediaUrl: attribute(media, 'url'),
            mediaType: attribute(media, 'type'),
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

export function usePodcast() {
    const {podcastRssUrl} = useConfig();

    return useAsyncData<Podcast>('podcast', () => $fetch<string>(podcastRssUrl, {responseType: 'text'}).then(parsePodcast));
}

export async function fetchPodcast(rssUrl: string): Promise<Podcast|null> {
    return $fetch<string>(rssUrl, {responseType: 'text'})
        .then(parsePodcast)
        .catch((error) => {
            console.error(error);

            return null;
        });
}

export function parsePodcast(xml: string): Podcast {
    const channel = (first((xmlParser.parse(xml) as XmlNode)?.rss) as XmlNode)?.channel as XmlNode || {};

    return {
        lastBuildDate: text(channel['lastBuildDate']),
        title: text(channel['title']),
        author: text(channel['author']),
        summary: text(channel['description']),
        episodes: parseEpisodes((channel['item'] as XmlNode[]) || []),
    }
}
