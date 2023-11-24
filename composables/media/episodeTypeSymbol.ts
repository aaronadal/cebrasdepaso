import type {EpisodeType} from "~/composables/media";

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
