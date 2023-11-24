<script setup lang="ts">
import type {Episode, EpisodeTypeSlug, Podcast} from "~/composables/media";
import {useEpisodeTypeLabel} from "~/composables/media/episodeTypeLabel";

definePageMeta({
  pageKey: 'episode',
});

const route = useRoute();

const number = useParseInt(useSingleRouteParam(route, 'number'));
const typeSlug = useSingleRouteParam<EpisodeTypeSlug>(route, 'type');

const podcast = inject('podcast') as Ref<Podcast>;
const episodes = inject('allEpisodes') as ComputedRef<Episode[]>;

const type = useEpisodeTypeBySlug(typeSlug);
const typeLabel = useEpisodeTypeLabel(type);
const episode = computed(() => (episodes.value.filter((ep) => ep.episodeType === type.value && ep.number === number.value)[0]) || null);
const {typeSymbol, background} = useEpisode(episode);

watch(
    episode,
    () => {
      useNotFoundState().value = episode.value === null;
    },
    {immediate: true});

useCustomMeta((defaults) => ({
  title: () => {
    if (!episode.value) {
      return `[404] El ${typeLabel.value.toLowerCase()} número ${number.value} no se ha encontrado.`;
    }

    return `[${typeSymbol.value}${`${number.value}`.padStart(2, '0')}] ${episode.value.title}`;
  },
  description: () => episode.value?.summary || '',
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
    <NotFound v-else/>
  </div>
</template>