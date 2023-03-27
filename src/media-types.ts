export type EpisodeType = 'full'|'bonus'|'trailer'
export type EpisodeTypeSlug = 'episodio'|'avance'|'extra'

export interface Track {
    mediaUrl: string;
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
