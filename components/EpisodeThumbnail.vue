<script setup lang="ts">
import type {Episode} from "~/composables/media";
import {useEpisodeTypeLabel} from "~/composables/media/episodeTypeLabel";
import {useEpisodeBackground} from "~/composables/media/episodeBackground";
import {useTrackTitle} from "~/composables/media/trackTitle";

interface Props {
  episode: Episode;
  isTitleHtml?: boolean
  disableAnimations?: boolean;
  fullBackground?: boolean;
  noBackground?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isTitleHtml: false,
  disableAnimations: false,
  fullBackground: false,
  noBackground: false,
})

const {episode, isTitleHtml, fullBackground, noBackground} = toRefs(props)
const type = computed(() => episode.value.episodeType);
const title = computed(() => {
  if(isTitleHtml.value) {
    return useTrackTitle(episode.value).value;
  }

  return episode.value.title;
});
const guest = computed(() => episode.value.guest);
const number = computed(() => episode.value.number);
const season = computed(() => episode.value.season);
const numberInSeason = computed(() => episode.value.numberInSeason);

const episodeType = useEpisodeTypeLabel(type);

const background = computed(() => {
  if (noBackground.value) {
    return 'transparent';
  }

  if (fullBackground.value) {
    return 'var(--full-gradient)';
  }

  return useEpisodeBackground(type, number).value;
})

const element = ref();

defineExpose({
  element,
  background,
})
</script>

<template>
  <div ref="element" class="episode-thumbnail" :style="`background-image: ${background}`">
      <span class="season">
        {{ episodeType }}
        <template v-if="type !== 'trailer'">
          {{ season }}x{{ `${numberInSeason}`.padStart(2, '0') }}
        </template>
      </span>
    <span class="guest" v-if="guest">Con {{ guest }}</span>

    <EpisodeNumber :number="number" :type="type" :disable-animations="disableAnimations"/>
    <span class="text" v-html="title"></span>
  </div>
</template>
