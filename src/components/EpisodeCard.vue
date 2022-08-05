<script setup lang="ts">
import AudioPlayer from '@/components/AudioPlayer.vue'
import Card from '@/components/Card.vue'
import EpisodeThumbnail from '@/components/EpisodeThumbnail.vue'
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

const background = computed(() => `var(--gradient-${episode.value.number === 0 ? 'gray' : ((episode.value.number - 1) % 8) + 1})`)
</script>

<template>
    <Card class="episode-card" :title="episode.title">
      <template #thumbnail>
        <EpisodeThumbnail
          :background="background"
          :type="episode.type"
          :title="episode.title"
          :number="episode.number"
          :season="episode.season"
          :numberInSeason="episode.numberInSeason"
        />
      </template>

      <template #default>
        <div class="summary" v-html="episode.summary" />

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
