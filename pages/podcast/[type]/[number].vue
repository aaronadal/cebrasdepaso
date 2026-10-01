<script setup lang="ts">
import type {Episode, EpisodeTypeSlug} from "~/composables/media";
import {useParseInt} from "~/composables/parseInt";
import {useSingleRouteParam} from "~/composables/routeParamSingle";
import {useEpisodeTypeLabel} from "~/composables/media/episodeTypeLabel";
import {useEpisodeTypeBySlug} from "~/composables/episodeTypeBySlug";
import {useEpisode} from "~/composables/episode";
import {useNotFoundState} from "~/composables/notFoundState";
import {useRoute} from "vue-router";
import {watch, computed} from "vue";
import {AudioPlayer, EpisodeThumbnail, NotFound} from "#components";
import {definePageMeta, setResponseStatus, useCustomMeta, usePodcast, useRequestEvent} from "#imports";

definePageMeta({
  pageKey: 'episode',
  name: 'episode',
});

const route = useRoute();

const number = useParseInt(useSingleRouteParam(route, 'number'));
const typeSlug = useSingleRouteParam<EpisodeTypeSlug>(route, 'type');

const {data: podcast, error: podcastError} = await usePodcast();
const episodes = computed<Episode[]>(() => podcast.value?.episodes || []);

const type = useEpisodeTypeBySlug(typeSlug);
const typeLabel = useEpisodeTypeLabel(type);
const episode = computed(() => (episodes.value.filter((ep) => ep.episodeType === type.value && ep.number === number.value)[0]) || null);
const {typeSymbol, background} = useEpisode(episode);

watch(
    episode,
    () => {
      if(route.name === 'episode') {
        useNotFoundState().value = episode.value === null && !podcastError.value;
      }
    },
    {immediate: true});

if (import.meta.server && !episode.value) {
  setResponseStatus(useRequestEvent()!, podcastError.value ? 503 : 404);
}

useCustomMeta((defaults) => ({
  title: () => {
    if (!episode.value && podcastError.value) {
      return defaults.title;
    }

    if (!episode.value) {
      return `[404] El ${typeLabel.value.toLowerCase()} número ${number.value} no se ha encontrado.`;
    }

    return `[${typeSymbol.value}${`${number.value}`.padStart(2, '0')}] ${episode.value.title} · Cebras de paso`;
  },
  description: () => episode.value?.summary?.replace(/(<([^>]+)>)/gi, "") || '',
  type: () => episode.value ? 'article' : 'website',
  image: () => `${episode.value?.artworkSrc || defaults.image}`,
  imageWidth: () => episode.value?.artworkWidth || defaults.imageWidth,
  imageHeight: () => episode.value?.artworkHeight || defaults.imageHeight,
  imageType: () => episode.value?.artworkType || defaults.imageType,
  imageAlt: () => episode.value ? 'Portada del episodio' : defaults.imageAlt,
  robots: () => episode.value ? 'index, follow' : 'noindex, nofollow',
}));
</script>

<template>
  <div class="page episode-page">
    <template v-if="episode">
      <header :style="{background}">
        <div class="container">
          <EpisodeThumbnail
              :episode="episode"
              no-background
          />
          <AudioPlayer :track="episode"/>
        </div>
      </header>
      <section class="container" v-html="episode.fullSummary"/>
    </template>
    <section v-else-if="podcastError" class="container">
      <p>Vaya, no hemos podido cargar este episodio. Vuelve a intentarlo en un rato o escúchanos en tu plataforma
        de pódcasts favorita.</p>
    </section>
    <NotFound v-else/>
  </div>
</template>
