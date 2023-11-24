import type {EpisodeType} from "~/composables/media";
import type {ComputedRef, MaybeRef} from "vue";
import {useRef} from "~/composables/ref";
import {computed} from "@vue/runtime-core";

export function useEpisodeTypeSymbol(type: MaybeRef<EpisodeType|null>): ComputedRef<string> {
    const typeRef = useRef(type);

    return computed(() => {
        const type = typeRef.value;

        if(!type) {
            return '';
        }

        if (type === 'bonus') {
            return '*'
        }

        if (type === 'trailer') {
            return '»'
        }

        return '#'
    });
}
