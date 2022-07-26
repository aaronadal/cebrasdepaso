import {Episode, Podcast, EpisodeType} from "@/media";

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

    let summary = item.querySelector('description')?.textContent || '';
    if(summary.includes('<p>---</p>')) {
      summary = summary.split('<p>---</p>')[0];
    }

    episodes[i] = {
      guid: item.querySelector('guid')?.textContent || '',
      date: parseDate(item.querySelector('pubDate')?.textContent || ''),
      title,
      summary,
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
