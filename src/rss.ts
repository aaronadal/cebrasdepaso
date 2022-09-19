export declare interface Episode {
    guid?: string;
    date?: Date;
    title: string;
    summary: string;
    type: 'full'|'bonus'|'trailer';
    number: number;
    season: number;
    numberInSeason: number;
    duration?: number;
    url?: string;
    mediaUrl: string;
    mediaType: string;
    embedUrl?: string;
    imageSrc?: string;
    imageType?: string;
    imageWidth?: number;
    imageHeight?: number;
}

export declare interface Podcast {
    title: string,
    author: string;
    summary: string;
    lastBuildDate: Date;
    episodes: Episode[];
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

    const type = (item.getElementsByTagNameNS(itunesNS, 'episodeType')?.[0]?.textContent || 'full') as 'full'|'bonus'|'trailer'
    const url = item.querySelector('link')?.textContent || ''
    const media = item.querySelector('enclosure')
    const imageSrc = item.getElementsByTagNameNS(itunesNS, 'image')?.[0]?.getAttribute('href') || ''
    const imageExt = imageSrc.split('.').slice(-1)[0]?.toLowerCase() || ''

    counts[type]++

    episodes[i] = {
      guid: item.querySelector('guid')?.textContent || '',
      date: parseDate(item.querySelector('pubDate')?.textContent || ''),
      title: item.querySelector('title')?.textContent || '',
      summary: item.querySelector('description')?.textContent || '',
      type,
      number: counts[type],
      season: parseInt(item.getElementsByTagNameNS(itunesNS, 'season')?.[0]?.textContent || '0'),
      numberInSeason: parseInt(item.getElementsByTagNameNS(itunesNS, 'episode')?.[0]?.textContent || '0'),
      duration: parseInt(item.getElementsByTagNameNS(itunesNS, 'duration')?.[0]?.textContent || '0'),
      url,
      mediaUrl: media?.getAttribute('url') || '',
      mediaType: media?.getAttribute('type') || '',
      embedUrl: url.split('/episodes/').join('/embed/episodes/'),
      imageSrc,
      imageType: imageExt === 'png' ? 'image/png' : 'image/jpeg',
      imageWidth: 400,
      imageHeight: 400
    }
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
