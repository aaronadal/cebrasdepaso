<script setup lang="ts">
import AudioPlayer from "@/components/AudioPlayer.vue";
import Icon from "@/components/Icon.vue";
import { currentTrack, currentPlaylist, nextTrack, previousTrack, stop, getEpisodeTypeLabel, getEpisodeTypeSymbol } from "@/media";
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";

const element = ref();
const audioPlayer = ref();

const typeLabel = computed(() => currentTrack.value && 'number' in currentTrack.value ? getEpisodeTypeLabel(currentTrack.value.episodeType) : null)
const typeSymbol = computed(() => currentTrack.value && 'number' in currentTrack.value ? getEpisodeTypeSymbol(currentTrack.value.episodeType) : null)

const isCollapsed = ref(false);

defineExpose({
  element,
  audioPlayer,
  isCollapsed,
});
</script>

<template>
  <aside ref="element" v-show="currentTrack !== null" id="main-player" :class="{collapsed: isCollapsed}">
    <div class="toggle">
      <Icon class="icon hidden" icon="music-note-simple" @click="isCollapsed = !isCollapsed" />
      <Icon class="icon visible" icon="caret-down" @click="isCollapsed = !isCollapsed" />
    </div>
    <div class="inner" v-if="currentTrack !== null">
      <Icon class="close" icon="x" weight="bold" @click="stop()" />
      <div class="track-info" :class="currentTrack.artworkSrc ? 'has-thumbnail' : ''">
        <img v-if="currentTrack.artworkSrc"
             class="thumbnail"
             :src="currentTrack.artworkSrc"
             alt="Imagen de portada" />
        <div class="season" v-if="'number' in currentTrack">
          {{ typeLabel }} {{ currentTrack.season }}x{{ currentTrack.numberInSeason.toString().padStart(2, '0') }}
        </div>
        <div class="title">
          <template v-if="'number' in currentTrack">
            [{{ typeSymbol }}{{ currentTrack.number.toString().padStart(2, '0') }}]
          </template>
          {{ currentTrack.title.replace('<br />', ' ') }}
        </div>
      </div>
      <AudioPlayer class="main-audio-player" ref="audioPlayer" :track="currentTrack" :is-playlist="currentPlaylist.length > 0" :next="nextTrack" :prev="previousTrack" />
    </div>
  </aside>
</template>
