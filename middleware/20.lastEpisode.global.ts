import {defineNuxtRouteMiddleware, fetchPodcast, navigateTo, useConfig} from "#imports";
import {useEpisodeTypeSlug} from "~/composables/media/episodeTypeSlug";

// Uses await rather than .then() so Nuxt keeps its context for navigateTo() when running on the server.
export default defineNuxtRouteMiddleware(async ({path}) => {
    const {lastEpisodePath, podcastRssUrl} = useConfig();

    if(path !== lastEpisodePath) {
        return;
    }

    const podcast = await fetchPodcast(podcastRssUrl);
    const last = podcast?.episodes[0];
    if(!last) {
        return navigateTo('/');
    }

    const typeSlug = useEpisodeTypeSlug(last.episodeType);
    if(typeSlug.value === '') {
        return navigateTo('/');
    }

    return navigateTo(`/podcast/${typeSlug.value}/${last.number}`);
})
