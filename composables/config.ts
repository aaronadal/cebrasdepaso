const instagramUrl = 'https://instagram.com/cebrasdepaso';
const podcastRssUrl = 'https://anchor.fm/s/c0099e38/podcast/rss';
const podcastSpotifyUrl = 'https://open.spotify.com/show/2PzTJfAK2kIXXrVaBAqhTp';
const podcastYoutubeUrl = 'https://youtube.com/@cebrasdepaso';
const podcastApplePodcastsUrl = 'https://podcasts.apple.com/us/podcast/cebras-de-paso/id1655554658';
const podcastAmazonMusicUrl = 'https://music.amazon.es/podcasts/730b541d-44a7-415d-b91a-f3db5d12929a/cebras-de-paso';
const podcastGooglePodcastsUrl = 'https://podcasts.google.com/feed/aHR0cHM6Ly9hbmNob3IuZm0vcy9jMDA5OWUzOC9wb2RjYXN0L3Jzcw';
const podcastIvooxUrl = 'https://go.ivoox.com/sq/1740244';
const podcastPocketcastsUrl = 'https://pca.st/106f084z';
const podcastOvercastUrl = null; //'https://overcast.fm/itunes1655554658;

export function useConfig() {
    return {
        published: true,
        contactEmail: 'somos@cebrasdepaso.es',
        instagramUrl: instagramUrl,
        podcastRssUrl: podcastRssUrl,
        podcastSpotifyUrl: podcastSpotifyUrl,
        podcastYoutubeUrl: podcastYoutubeUrl,
        podcastApplePodcastsUrl: podcastApplePodcastsUrl,
        podcastAmazonMusicUrl: podcastAmazonMusicUrl,
        podcastGooglePodcastsUrl: podcastGooglePodcastsUrl,
        podcastIvooxUrl: podcastIvooxUrl,
        podcastPocketcastsUrl: podcastPocketcastsUrl,
        podcastOvercastUrl: podcastOvercastUrl,

        lastEpisodePath: '/ultimo',

        redirects: {
            '/avance': {
                url: '/podcast/avance/0',
                external: false,
            },
            '/instagram': {
                url: instagramUrl,
                external: true,
            },
            '/spotify': {
                url: podcastSpotifyUrl,
                external: true,
            },
            '/youtube': {
                url: podcastYoutubeUrl,
                external: true,
            },
        } as {[path: string]: {url: string, external: boolean}},
    };
}
