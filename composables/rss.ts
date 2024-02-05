import type {Episode, Podcast, EpisodeType} from "@/composables/media"
import {useAsyncData} from "#app/composables/asyncData";
import {watch} from "vue";

const replaceDomParserPromise = new Promise(async (resolve) => {
    if(!process.browser) {
        const { JSDOM } = await import("jsdom");
        global.DOMParser = new JSDOM().window.DOMParser;
    }

    resolve(undefined);
});

const itunesNS = 'http://www.itunes.com/dtds/podcast-1.0.dtd'

function parseEpisodes(data: Document): Episode[] {
    const episodes: Episode[] = []

    const counts = {
        full: 0,
        bonus: 0,
        trailer: 0,
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

        let fullSummary = item.querySelector('description')?.textContent || '';
        fullSummary = fullSummary.replace(/<p><br><\/p>/g, '');
        fullSummary = fullSummary.replace(/<p>---<\/p>/g, '<hr>');
        fullSummary = fullSummary.replace(/<br>---<br>/g, '<hr>');

        let summary = fullSummary;
        if (summary.includes('<hr>')) {
            summary = summary.split('<hr>')[0];
        }

        episodes[i] = {
            guid: item.querySelector('guid')?.textContent || '',
            date: item.querySelector('pubDate')?.textContent || '',
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

export async function fetchPodcast(rssUrl: string): Promise<Podcast|null> {
    return await useAsyncData<string>('rss', () => $fetch<Blob>(rssUrl).then((value) => value.text()))
        .then(({ data, error, pending }) => {
            return new Promise<string>((resolve, reject) => {
                watch(pending, () => {
                    if(!pending.value) {
                        if (error.value) {
                            return reject(error.value);
                        }

                        if (!data.value) {
                            return reject('Data es null');
                        }

                        return resolve(data.value);
                    }
                }, {immediate: true});
            });
        })
        .then((xml) => parsePodcast(xml))
        .catch((error) => {
            console.error(error);

            return null
        });
}

async function parsePodcast(xml: string): Promise<Podcast> {
    await replaceDomParserPromise;

    const data = new DOMParser().parseFromString(xml, 'text/xml');

    return {
        lastBuildDate: data.querySelector('lastBuildDate')?.textContent || '',
        title: data.querySelector('channel > title')?.textContent || '',
        author: data.querySelector('channel > author')?.textContent || '',
        summary: data.querySelector('channel > description')?.textContent || '',
        episodes: parseEpisodes(data)
    }
}
