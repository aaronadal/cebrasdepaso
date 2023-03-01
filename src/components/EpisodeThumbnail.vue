<script setup lang="ts">
import { toRefs } from '@vue/reactivity'
import {computed, ref} from '@vue/runtime-core'
import EpisodeNumber from '@/components/EpisodeNumber.vue'
import {EpisodeType, getEpisodeBackground, getEpisodeTypeLabel, newLineEpisodeTitle} from '@/media'

interface Props {
    type: EpisodeType;
    title: string,
    guest: string,
    number: number,
    season: number,
    numberInSeason: number,
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

const { type, number, fullBackground, noBackground } = toRefs(props)

const episodeType = computed(() => getEpisodeTypeLabel(type.value))

const background = computed(() => {
  if(noBackground.value) {
    return 'transparent';
  }

  if(fullBackground.value) {
    return 'var(--full-gradient)';
  }

  return getEpisodeBackground(type.value, number.value);
})

const element = ref();

defineExpose({
  element,
  background,
})
</script>

<template>
  <div ref="element" class="episode-thumbnail" :style="{backgroundImage: background}">
      <span class="season">
        {{ episodeType }}
        <template v-if="type !== 'trailer'">
          {{ season }}x{{ `${numberInSeason}`.padStart(2, '0') }}
        </template>
      </span>

      <EpisodeNumber :number="number" :type="type" :disable-animations="disableAnimations" />
      <span class="text" v-html="isTitleHtml ? title : newLineEpisodeTitle(title)"></span>
      <span class="guest" v-if="guest">Con {{ guest }}</span>
  </div>
</template>
