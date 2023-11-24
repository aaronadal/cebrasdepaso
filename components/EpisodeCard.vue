<script setup lang="ts">
import type {Episode, Podcast} from "~/composables/media";

interface Props {
  podcast?: Podcast | null;
  episode: Episode;
  fullBackground?: boolean;
  noLink?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  podcast: null,
  fullBackground: false,
  noLink: false,
})
const {episode} = toRefs(props);

const episodeRef = ref()

const {typeLabel, typeSlug} = useEpisode(episode.value);
</script>

<template>
  <Card class="episode-card" :class="{'full-background': fullBackground}">
    <template #title>
      <small>
        {{ typeLabel }}
        <template v-if="episode.episodeType !== 'trailer'">
          {{ episode.season }}x{{ `${episode.numberInSeason}`.padStart(2, '0') }}
        </template>
      </small>
      <template v-if="noLink">{{ episode.title }}</template>
      <NuxtLink v-else :to="`/podcast/${typeSlug}/${episode.number}`">
        {{ episode.title }}
      </NuxtLink>
      <span v-if="episode.guest" class="guest">{{ episode.guest }}</span>
    </template>

    <template #thumbnail>
      <EpisodeThumbnail
          ref="episodeRef"
          :episode="episode"
          :full-background="fullBackground"
      />
    </template>

    <template #default>
      <div class="summary" v-html="episode.summary"/>

      <AudioPlayer
          :style="{backgroundImage: episodeRef?.background}"
          :track="episode"/>
    </template>
  </Card>
</template>
