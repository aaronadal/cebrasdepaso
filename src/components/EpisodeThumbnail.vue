<script setup lang="ts">
import { toRefs } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import EpisodeNumber from '@/components/EpisodeNumber.vue'

interface Props {
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

const { type, number } = toRefs(props)

const episodeType = computed(() => {
  if (type.value === 'bonus') {
    return 'Extra'
  }

  if (type.value === 'trailer') {
    return 'Avance'
  }

  return 'Episodio'
})

const background = computed(() => {
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

defineExpose({
  background,
})
</script>

<template>
  <div class="episode-thumbnail" :style="{background}">
      <span class="season">
        {{ episodeType }}
        <template v-if="type !== 'trailer'">
          {{ season }}x{{ `${numberInSeason}`.padStart(2, '0') }}
        </template>
      </span>
      <EpisodeNumber :number="number" :type="type" />
      <span v-if="isTitleHtml" class="text" v-html="title"></span>
      <span v-else class="text">{{ title }}</span>
  </div>
</template>
