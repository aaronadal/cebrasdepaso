import type {EpisodeType, EpisodeTypeSlug} from "~/composables/media";
import type {ComputedRef, MaybeRef} from "vue";
import {useRef} from "~/composables/ref";
import {computed} from "@vue/runtime-core";

export function useEpisodeTypeBySlug(slug: MaybeRef<EpisodeTypeSlug|null>): ComputedRef<EpisodeType|null> {
    const slugRef = useRef(slug);

    return computed(() => {
        const slug = slugRef.value;
        if(slug === null) {
            return null;
        }

        if(slug === 'extra') {
            return 'bonus';
        }

        if(slug === 'avance') {
            return 'trailer';
        }

        return 'full';
    });
}
