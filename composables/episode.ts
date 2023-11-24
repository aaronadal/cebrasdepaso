import type {Track, Episode} from "~/composables/media";
import {useEpisodeBackground} from "~/composables/media/episodeBackground";
import {useEpisodeTypeLabel} from "~/composables/media/episodeTypeLabel";
import {useEpisodeTypeSymbol} from "~/composables/media/episodeTypeSymbol";
import {useEpisodeTypeSlug} from "~/composables/media/episodeTypeSlug";
import {isEpisode} from "~/composables/media";

export function useEpisode(episode: MaybeRef<Track|Episode|null>) {
    const episodeRef = useRef(episode);
    const track = useTrack(episode);

    const type = computed(() => {
        if(episodeRef.value === null) {
            return null;
        }

        if(!isEpisode(episodeRef.value)) {
            return null;
        }

        return episodeRef.value.episodeType;
    });
    const number = computed(() => {
        if(episodeRef.value === null) {
            return null;
        }

        if(!isEpisode(episodeRef.value)) {
            return null;
        }

        return episodeRef.value.number;
    });



    return {
        ...track,
        background: useEpisodeBackground(type, number),
        typeLabel: useEpisodeTypeLabel(type),
        typeSymbol: useEpisodeTypeSymbol(type),
        typeSlug: useEpisodeTypeSlug(type),
    };
}
