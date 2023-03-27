<script setup lang="ts">
import {
  Episode,
  EpisodeTypeSlug, getEpisodeBackground,
  getEpisodeTypeBySlug,
  getEpisodeTypeLabel,
  getEpisodeTypeSymbol,
  Podcast
} from "@/media-types";
import {ComputedRef, inject, Ref, watchEffect} from "vue"
import {computed} from "@vue/runtime-core";
import {toRefs} from "@vue/reactivity";
import {updateMeta} from "@/router/meta";
import EpisodeThumbnail from "@/components/EpisodeThumbnail.vue";
import AudioPlayer from "@/components/AudioPlayer.vue";

interface Props {
  number: number;
  type: EpisodeTypeSlug;
}

const props = defineProps<Props>();
const { number, type: slug } = toRefs(props);

const podcast = inject('podcast') as Ref<Podcast>
const episodes = inject('allEpisodes') as ComputedRef<Episode[]>

const type = computed(() => getEpisodeTypeBySlug(slug.value));
const typeLabel = computed(() => getEpisodeTypeLabel(type.value));
const typeSymbol = computed(() => getEpisodeTypeSymbol(type.value));
const episode = computed(() => episodes.value.filter((ep) => ep.episodeType === type.value && ep.number === number.value)[0]);
const background = computed(() => getEpisodeBackground(type.value, number.value));

watchEffect(() => {
  let title = `${typeLabel.value} ${number.value} no encontrado`
  let description = ``;
  if(episode.value) {
    title = `[${typeSymbol.value}${`${number.value}`.padStart(2, '0')}] ${episode.value.title}`;
    description = episode.value.summary || '';
  }

  updateMeta(`${title} · Cebras de paso`, description.replace(/(<([^>]+)>)/gi, ""));
});
</script>

<template>
  <div class="page episode-page">
    <template v-if="episode">
      <header :style="{background}">
        <div class="container">
          <EpisodeThumbnail
              ref="episodeRef"
              :type="episode.episodeType"
              :title="episode.title"
              :guest="episode.guest || ''"
              :number="episode.number"
              :season="episode.season"
              :numberInSeason="episode.numberInSeason"
              no-background
          />
          <AudioPlayer :track="episode" />
        </div>
      </header>
      <section class="container" v-html="episode.fullSummary" />
    </template>
    <section v-else>{{ typeLabel }} número {{ number }} no encontrado.</section>
  </div>
</template>
