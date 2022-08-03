<script setup lang="ts">
import AudioPlayer from '@/components/AudioPlayer.vue'
import Card from '@/components/Card.vue'
import { Episode, Podcast } from '@/rss'
import { toRefs } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'

declare interface Props {
    podcast: Podcast;
    episode: Episode;
}

// eslint-disable-next-line no-undef
const props = defineProps<Props>()

const { episode } = toRefs(props)

const episodeType = computed(() => {
  if (episode.value.type === 'bonus') {
    return 'Extra'
  }

  if (episode.value.type === 'trailer') {
    return 'Avance'
  }

  return 'Episodio'
})

const episodeSymbol = computed(() => {
  if (episode.value.type === 'bonus') {
    return '*'
  }

  if (episode.value.type === 'trailer') {
    return '»'
  }

  return '#'
})

const background = computed(() => `var(--gradient-${episode.value.number === 0 ? 'gray' : ((episode.value.number - 1) % 8) + 1})`)
</script>

<template>
    <Card class="episode-card" :title="episode.title">
      <template #thumbnail>
        <div class="episode-thumbnail" :style="{background}">
            <span class="season">{{ episodeType }} {{ episode.season }}x{{ `${episode.numberInSeason}`.padStart(2, '0') }}</span>
            <span class="number">{{ episodeSymbol }}{{ `${episode.number}`.padStart(2, '0') }}</span>
            <span class="text">{{ episode.title }}</span>
        </div>
      </template>

      <template #default>
        <div v-html="episode.summary" />

        <AudioPlayer
          :style="{background}"
          :url="episode.mediaUrl"
          :type="episode.mediaType"
          :title="episode.title"
          :artist="podcast.author"
          :album="podcast.title"
          :artworks="[{
            src: episode.imageSrc,
            sizes: `${episode.imageWidth}x${episode.imageHeight}`,
            type: episode.imageType
          }]" />
      </template>
    </Card>
</template>
