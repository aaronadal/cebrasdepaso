<script setup lang="ts">
import AudioPlayer from '@/components/AudioPlayer.vue'
import Card from '@/components/Card.vue'
import EpisodeThumbnail from '@/components/EpisodeThumbnail.vue'
import {Episode, Podcast} from '@/rss'
import {ref} from '@vue/reactivity'

interface Props {
    podcast?: Podcast|null;
    episode: Episode;
    fullBackground?: boolean;
}

withDefaults(defineProps<Props>(), {
  podcast: null,
  fullBackground: false,
})

const episodeRef = ref()
</script>

<template>
    <Card class="episode-card" :class="{'full-background': fullBackground}" :title="episode.title.replace('<br/>', ' ')">
      <template #thumbnail>
        <EpisodeThumbnail
          ref="episodeRef"
          :type="episode.type"
          :title="episode.title"
          :number="episode.number"
          :season="episode.season"
          :numberInSeason="episode.numberInSeason"
          is-title-html
          :full-background="fullBackground"
        />
      </template>

      <template #default>
        <div class="summary" v-html="episode.summary" />

        <AudioPlayer
          :style="{backgroundImage: episodeRef?.background}"
          :url="episode.mediaUrl"
          :type="episode.mediaType"
          :title="episode.title"
          :is-media-session-disabled="podcast === null"
          :artist="podcast === null ? 'Cebras de paso' : podcast.author"
          :album="podcast === null ? 'Cebras de paso' : podcast.title"
          :artworks="episode.imageSrc ? [{
            src: episode.imageSrc,
            sizes: `${episode.imageWidth}x${episode.imageHeight}`,
            type: episode?.imageType || 'image/jpg',
          }] : []" />
      </template>
    </Card>
</template>
