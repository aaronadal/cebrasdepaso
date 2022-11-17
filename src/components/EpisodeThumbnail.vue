<script setup lang="ts">
import { toRefs } from '@vue/reactivity'
import {computed, ref} from '@vue/runtime-core'
import EpisodeNumber from '@/components/EpisodeNumber.vue'
import { EpisodeType, getEpisodeTypeLabel, newLineEpisodeTitle } from '@/media'

interface Props {
    type: EpisodeType;
    title: string,
    number: number,
    season: number,
    numberInSeason: number,
    isTitleHtml?: boolean
    disableAnimations?: boolean;
    fullBackground?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isTitleHtml: false,
  disableAnimations: false,
  fullBackground: false,
})

const { type, number, fullBackground } = toRefs(props)

const episodeType = computed(() => getEpisodeTypeLabel(type.value))

const background = computed(() => {
  if(fullBackground.value) {
    return 'var(--full-gradient)';
  }

  if(type.value === 'trailer') {
    return 'var(--gradient-gray)';
  }

  if(type.value === 'bonus') {
    return 'var(--full-gradient)';
  }

  if(number.value === 0) {
    return 'var(--gradient-gray)';
  }

  return `var(--gradient-${((number.value - 1) % 8) + 1})`
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
  </div>
</template>
