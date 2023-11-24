import type {Track} from "~/composables/media";
import {useTrackTitle} from "~/composables/media/trackTitle";

export function useTrack(track: MaybeRef<Track|null>) {
    const trackRef = useRef(track);

    return {
        trackTitle: useTrackTitle(trackRef),
    };
}
