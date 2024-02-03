import {defineNuxtRouteMiddleware, fetchPodcast, navigateTo, useConfig} from "#imports";
import {useEpisodeTypeSlug} from "~/composables/media/episodeTypeSlug";

export default defineNuxtRouteMiddleware(({path}) => {
    const {lastEpisodePath, podcastRssUrl} = useConfig();

    if(path === lastEpisodePath) {
        return fetchPodcast(podcastRssUrl)
            .then((podcast) => {
                if(podcast === null) {
                    return navigateTo('/') as Promise<void>;
                }

                const last = podcast.episodes[0];
                const typeSlug = useEpisodeTypeSlug(last.episodeType);
                if(typeSlug.value === '') {
                    return navigateTo('/') as Promise<void>;
                }

                return navigateTo(`/podcast/${typeSlug.value}/${last.number}`) as Promise<void>;
            })
            .catch(() => {
                return navigateTo('/') as Promise<void>;
            })
    }
})
