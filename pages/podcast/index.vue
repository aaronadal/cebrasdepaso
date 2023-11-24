<script setup lang="ts">
import type {Episode, Podcast} from "~/composables/media";

const { published } = useAppConfig();

const podcast = inject<Ref<Podcast|null>>('podcast', ref(null));
const allEpisodes = inject<ComputedRef<Episode[]>>('allEpisodes', computed(() => []));

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

definePageMeta({
  pageKey: 'podcast',
});

useCustomMeta({
  title: 'Todos los episodios del pódcast · Cebras de paso',
  description: 'Aquí tienes disponibles todos los episodios del pódcast Cebras de paso. Puedes escucharlos ' +
      'directamente en este página o, si lo prefieres, puedes suscribirte en una de las diversas plataformas de ' +
      'pódcasts en las que tenemos publicados nuestros episodios: Spotify, Apple Podcasts, Google Podcasts, ' +
      'Amazon Music, PocketCasts, etc.',
})
</script>

<template>
  <div class="page" data-page="podcast">
    <template v-if="published">
      <section class="container">
        <h1>¡Escucha CEBRAS DE PASO!</h1>
        <p>Lo bueno de un pódcast es que se puede escuchar en cualquier momento y desde cualquier lugar. Nos hemos
          colado en diversas plataformas para que te sea muy sencillo encontrarnos, suscribirte y enterarte antes
          que nadie de la publicación los nuevos episodios. Además, te vamos a confesar que <b>si nos buscas en
            Spotify o YouTube ¡también podrás vernos en vídeo!</b></p>
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
