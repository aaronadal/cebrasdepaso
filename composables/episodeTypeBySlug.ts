import type {EpisodeType, EpisodeTypeSlug} from "~/composables/media";

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
