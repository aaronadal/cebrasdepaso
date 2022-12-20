<script setup lang="ts">
import AudioPlayer from '@/components/AudioPlayer.vue'
import Card from '@/components/Card.vue'
import EpisodeThumbnail from '@/components/EpisodeThumbnail.vue'
import {Episode, getEpisodeTypeLabel, Podcast} from '@/media'
import {ref, toRefs} from '@vue/reactivity'
import {computed} from "@vue/runtime-core";
import {getEpisodeTypeSlug} from "@/media.js";

interface Props {
    podcast?: Podcast|null;
    episode: Episode;
    fullBackground?: boolean;
    noLink?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  podcast: null,
  fullBackground: false,
  noLink: false,
})
const { episode } = toRefs(props);

const episodeRef = ref()

const episodeType = computed(() => getEpisodeTypeLabel(episode.value.episodeType))
</script>

<template>
    <Card class="episode-card" :class="{'full-background': fullBackground}">
      <template #title>
        <small>
          {{ episodeType }}
          <template v-if="episode.episodeType !== 'trailer'">
            {{ episode.season }}x{{ `${episode.numberInSeason}`.padStart(2, '0') }}
          </template>
        </small>
        <template v-if="noLink">{{ episode.title }}</template>
        <router-link v-else :to="{name: 'episode', params: {number: episode.number, type: getEpisodeTypeSlug(episode.episodeType)}}">{{ episode.title }}</router-link>
      </template>

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
