import type {Track} from "~/composables/media";
import {useTrackTitle} from "~/composables/media/trackTitle";
import type {MaybeRef} from "vue";
import {useRef} from "~/composables/ref";

export function useTrack(track: MaybeRef<Track|null>) {
    const trackRef = useRef(track);

    return {
        trackTitle: useTrackTitle(trackRef),
    };
}
