<script setup lang="ts">
import EpisodeCard from '@/components/EpisodeCard.vue'
import Paginator from '@/components/Paginator.vue'
import { PODCAST_RSS_URL } from '@/config'
import { Episode, parsePodcastFromFeed, Podcast } from '@/rss'
import { ref } from '@vue/reactivity'
import { computed, nextTick } from '@vue/runtime-core'

const podcast = ref<Podcast|null>(null)
parsePodcastFromFeed(PODCAST_RSS_URL)
  .then((p) => {
    podcast.value = p
  })

const allEpisodes = computed(() => {
  return podcast.value?.episodes || []
})

const episodes = ref<Episode[]>([])

function setEpisodes (array: Episode[]) {
  episodes.value = array
}

function onInit (page: number, items: unknown[]) {
  setEpisodes(items as Episode[])
}

function onPaginate (page: number, items: unknown[]) {
  setEpisodes(items as Episode[])

  nextTick(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}
</script>

<template>
  <div class="page">
    <template v-if="podcast !== null">
      <EpisodeCard v-for="episode in episodes" :key="episode.guid" :podcast="podcast" :episode="episode" />

      <Paginator :items="allEpisodes" :items-per-page="10" @init="onInit" @paginate="onPaginate" />
    </template>
  </div>
</template>
