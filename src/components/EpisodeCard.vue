<script setup lang="ts">
import AudioPlayer from '@/components/AudioPlayer.vue'
import Card from '@/components/Card.vue'
import EpisodeThumbnail from '@/components/EpisodeThumbnail.vue'
import {Episode, Podcast} from '@/media'
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
          :type="episode.episodeType"
          :title="episode.title"
          :number="episode.number"
          :season="episode.season"
          :numberInSeason="episode.numberInSeason"
          :full-background="fullBackground"
        />
      </template>

      <template #default>
        <div class="summary" v-html="episode.summary" />

        <AudioPlayer
          :style="{backgroundImage: episodeRef?.background}"
          :track="episode" />
      </template>
    </Card>
</template>
