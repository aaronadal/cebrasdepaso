<script setup lang="ts">
import {fetchPodcast, navigateTo, useConfig} from "#imports";
import {useEpisodeTypeSlug} from "~/composables/media/episodeTypeSlug";
const {podcastRssUrl} = useConfig();

fetchPodcast(podcastRssUrl)
    .then((podcast) => {
      if(podcast === null) {
        return navigateTo('/') as Promise<void>;
      }

      const last = podcast.episodes[0];
      const typeSlug = useEpisodeTypeSlug(last.episodeType);
      if(typeSlug.value === '') {
        return navigateTo('/') as Promise<void>;
      }

      return navigateTo(
          `https://cebrasdepaso.es/podcast/${typeSlug.value}/${last.number}`,
          {
            external: true,
          }
      ) as Promise<void>;
    })
    .catch(() => {
      return navigateTo('/') as Promise<void>;
    })
</script>

<template>
  <div class="page">
    <section class="container">
      <p>En breve el navegador te redirigirá al último episodio&hellip;</p>
    </section>
  </div>
</template>
