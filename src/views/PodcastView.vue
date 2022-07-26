<script setup lang="ts">
import PlatformLinks from '@/components/PlatformLinks.vue'
import EpisodeCard from '@/components/EpisodeCard.vue'
import Paginator from '@/components/Paginator.vue'
import Hourglass from '@/components/Hourglass.vue'
import {PUBLISHED} from '@/config'
import {Episode, Podcast} from '@/media'
import {ref} from '@vue/reactivity'
import {nextTick} from '@vue/runtime-core'
import {ComputedRef, inject, Ref} from "vue";

const podcast = inject('podcast') as Ref<Podcast>
const allEpisodes = inject('allEpisodes') as ComputedRef<Episode[]>

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
    <template v-if="PUBLISHED">
      <section class="container">
        <h1>¡Escucha CEBRAS DE PASO!</h1>
        <p>Como sabemos que tener que acceder a esta página cada vez que quieras escucharnos es un rollazo,
          quizá prefieras suscribirte en cualquiera de estas plataformas:</p>
        <PlatformLinks />
        <p>Y si no te mola eso de suscribirte o simplemente quieres saber a qué sonamos antes de hacerlo, a continuación
          te dejamos la lista de episodios. ¡Buen provecho!
        </p>
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
      <section class="container" style="text-align: center;">
        <h1>Próximamente... ¡Esto será CEBRAS DE PASO!</h1>
        <p>En esta página podrás acceder a todos nuestros episodios. Sin embargo, todavía estamos preparándolo todo
          para que puedas escucharnos tanto aquí como en tu plataforma favorita.</p>
        <p>Muchas gracias por la paciencia.</p>
        <p style="text-align:center;"><Hourglass /></p>
      </section>
    </template>
  </div>
</template>
