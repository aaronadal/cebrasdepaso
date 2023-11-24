import type {EpisodeType} from "~/composables/media";

export function useEpisodeTypeLabel(type: MaybeRef<EpisodeType|null>): ComputedRef<string> {
    const typeRef = useRef(type);

    return computed(() => {
        const type = typeRef.value;

        if(!type) {
            return '';
        }

        if (type === 'bonus') {
            return 'Extra'
        }

        if (type === 'trailer') {
            return 'Avance'
        }

        return 'Episodio'
    });
}
