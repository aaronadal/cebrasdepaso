import type {EpisodeType, EpisodeTypeSlug} from "~/composables/media";
import type {ComputedRef, MaybeRef} from "vue";
import {useRef} from "~/composables/ref";
import {computed} from "@vue/runtime-core";

export function useEpisodeTypeSlug(type: MaybeRef<EpisodeType|null>): ComputedRef<EpisodeTypeSlug|''> {
    const typeRef = useRef(type);

    return computed(() => {
        const type = typeRef.value;

        if(!type) {
            return '';
        }

        if (type === 'bonus') {
            return 'extra'
        }

        if (type === 'trailer') {
            return 'avance'
        }

        return 'episodio'
    });
}
