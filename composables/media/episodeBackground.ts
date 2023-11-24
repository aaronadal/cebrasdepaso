import type {EpisodeType} from "~/composables/media";
import type {ComputedRef, MaybeRef} from "vue";
import {useRef} from "~/composables/ref";
import {computed} from "@vue/runtime-core";

export function useEpisodeBackground(type: MaybeRef<EpisodeType|null>, number: MaybeRef<number|null>): ComputedRef<string> {
    const typeRef = useRef(type);
    const numberRef = useRef(number);

    return computed(() => {
        const type = typeRef.value;
        const number = numberRef.value;

        if(!type || number === null) {
            return '';
        }

        if (type === 'trailer') {
            return 'var(--gradient-gray)';
        }

        if (type === 'bonus') {
            return 'var(--full-gradient)';
        }

        if (number === 0) {
            return 'var(--gradient-gray)';
        }

        if ((number % 10) === 0) {
            return 'var(--four-gradient)';
        }

        return `var(--gradient-${((number - 1) % 10) + 1})`
    });
}
