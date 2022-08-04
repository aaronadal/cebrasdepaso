<script setup lang="ts">
import { toRefs } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'

declare interface Props {
    background: string;
    type: 'full'|'bonus'|'trailer';
    title: string,
    number: number,
    season: number,
    numberInSeason: number,
    isTitleHtml?: boolean
}

// eslint-disable-next-line no-undef
const props = withDefaults(defineProps<Props>(), {
  isTitleHtml: false
})

const { background, type } = toRefs(props)

const episodeType = computed(() => {
  if (type.value === 'bonus') {
    return 'Extra'
  }

  if (type.value === 'trailer') {
    return 'Avance'
  }

  return 'Episodio'
})

const episodeSymbol = computed(() => {
  if (type.value === 'bonus') {
    return '*'
  }

  if (type.value === 'trailer') {
    return '»'
  }

  return '#'
})
</script>

<template>
  <div class="episode-thumbnail" :style="{background}">
      <span class="season">{{ episodeType }} {{ season }}x{{ `${numberInSeason}`.padStart(2, '0') }}</span>
      <span class="number">{{ episodeSymbol }}{{ `${number}`.padStart(2, '0') }}</span>
      <span v-if="isTitleHtml" class="text" v-html="title"></span>
      <span v-else class="text">{{ title }}</span>
  </div>
</template>
