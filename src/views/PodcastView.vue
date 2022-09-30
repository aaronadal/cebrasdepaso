<script setup lang="ts">
import PlatformLinks from '@/components/PlatformLinks.vue'
import EpisodeCard from '@/components/EpisodeCard.vue'
import Paginator from '@/components/Paginator.vue'
import { PUBLISHED, PODCAST_RSS_URL } from '@/config'
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

const episodesSectionRef = ref<HTMLElement>()
function onPaginate (page: number, items: unknown[]) {
  const episodesSection = episodesSectionRef.value;
  const scrollTop = episodesSection ? episodesSection.offsetTop : 0;

  setEpisodes(items as Episode[])

  nextTick(() => {
    window.scrollTo({ top: scrollTop, behavior: 'smooth' })
  })
}
</script>

<template>
  <div class="page">
    <template v-if="!PUBLISHED">
      <section class="container">
        <h1>¡Escucha CEBRAS DE PASO!</h1>
        <p>En esta página puedes acceder a todos nuestros episodios. Sin embargo, como sabemos que tener que acceder
          aquí cada vez que quieras escucharnos es un rollazo, quizá prefieras suscribirte en
          cualquiera de estas plataformas:</p>
        <PlatformLinks />
      </section>
      <section v-if="podcast !== null" ref="episodesSectionRef">
        <EpisodeCard v-for="episode in episodes" :key="episode.guid" :podcast="podcast" :episode="episode" />
        <Paginator :items="allEpisodes" :items-per-page="10" @init="onInit" @paginate="onPaginate" />
      </section>
      <section v-else class="container">
        Cargando lista de episodios<span class="loading-ellipsis"><span>.</span><span>.</span><span>.</span></span>
      </section>
    </template>
    <template v-else>
      <section class="container">
        <h1>Próximamente... ¡Esto será CEBRAS DE PASO!</h1>
        <p>Todavía estamos preparándolo todo para que puedas escucharnos en tu plataforma favorita.</p>
        <p>¡En breve podrás consultar aquí todos los episodios que vayamos publicando!</p>
        <p>Muchas gracias por la paciencia.</p>
      </section>
    </template>
  </div>
</template>
