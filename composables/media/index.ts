export type EpisodeType = 'full' | 'bonus' | 'trailer';
export type EpisodeTypeSlug = 'episodio' | 'avance' | 'extra';

export interface Track {
    mediaUrl: string;
    mediaType: string;
    title: string;
    artist: string;
    album: string;
    artworkSrc?: string;
    artworkType?: 'image/png'|'image/jpeg';
    artworkWidth?: number;
    artworkHeight?: number;
}

export interface Episode extends Track {
    guid?: string;
    date?: string;
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
    lastBuildDate: string;
    episodes: Episode[];
}


export function isEpisode(track: Ref<Track>): track is Ref<Episode>;
export function isEpisode(track: Track): track is Episode;
export function isEpisode(track: MaybeRef<Track>): track is MaybeRef<Episode> {
    const trackRef = useRef(track);

    return 'episodeType' in trackRef.value;
}
