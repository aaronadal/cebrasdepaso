<script setup lang="ts">
import type {Track, Episode} from "~/composables/media";

import '~/assets/styles/app.scss';
import {fetchPodcast, useMainPlayer, useRoute} from "#imports";
import {useConfig} from '~/composables/config';
import {computed} from "@vue/runtime-core";
import {provide, watch} from "vue";

const { podcastRssUrl } = useConfig();
const route = useRoute();
const {currentTrack, playlist} = useMainPlayer()
const layoutCollapsed = computed(() => {
  return route.path !== '/';
});

const podcast = await fetchPodcast(podcastRssUrl);
const allEpisodes = computed<Episode[]>(() => {
  return podcast?.episodes || [];
});

provide('layoutCollapsed', layoutCollapsed);
provide('podcast', podcast);
provide('allEpisodes', allEpisodes);

watch(currentTrack, (newTrack: Track|Episode|null) => {
  if(newTrack && 'number' in newTrack && allEpisodes.value.includes(newTrack)) {
    playlist.value = allEpisodes.value;
  }
  else {
    playlist.value = [];
  }
});
</script>

<template>
  <Head>
    <Meta charset="utf-8" />
    <Meta http-equiv="x-ua-compatible" content="IE=edge" />
    <Meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <Link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <Link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <Link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <Link rel="manifest" href="/site.webmanifest" />
    <Link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ff9a57" />
    <Meta name="theme-color" content="#ffffff" />

    <Link type="application/rss+xml" rel="alternate" title="Cebras de Paso" :href="`${podcastRssUrl}`" />
  </Head>

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
