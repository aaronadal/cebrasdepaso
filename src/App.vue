<script setup lang="ts">
import PageLayout from '@/components/layout/PageLayout.vue'
import { useRoute } from 'vue-router'
import {computed, watch} from "@vue/runtime-core";
import {ref} from "@vue/reactivity";
import {currentPlaylist, currentTrack} from "@/media";
import {Episode, Podcast, Track} from "@/media-types";
import {PODCAST_RSS_URL, PUBLISHED} from "@/config";
import {parsePodcastFromFeed} from "@/rss";
import {provide} from "vue";

const route = useRoute()

const layoutCollapsed = computed(() => {
  return route.name !== 'home';
})

const podcast = ref<Podcast|null>(null)
if(PUBLISHED) {
  parsePodcastFromFeed(PODCAST_RSS_URL)
      .then((p) => {
        podcast.value = p
      })
}

const allEpisodes = computed<Episode[]>(() => {
  return podcast.value?.episodes || [];
})

provide('podcast', podcast);
provide('allEpisodes', allEpisodes);

watch(currentTrack, (newTrack: Track|Episode|null) => {
  if(newTrack && 'number' in newTrack && allEpisodes.value.includes(newTrack)) {
    currentPlaylist.value = allEpisodes.value;
  }
  else {
    currentPlaylist.value = [];
  }
});
</script>

<template>
  <PageLayout :collapsed="layoutCollapsed" :data-page="route.name || 'none'">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <div class="inner" :key="route.path">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </div>
      </transition>
    </router-view>
  </PageLayout>
</template>
