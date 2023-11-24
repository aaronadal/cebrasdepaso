<script setup lang="ts">
import {ref, computed} from "vue";
import {isEpisode} from "~/composables/media";
import {useEpisodeTypeLabel} from "~/composables/media/episodeTypeLabel";
import {useEpisodeTypeSymbol} from "~/composables/media/episodeTypeSymbol";
import {useMainPlayer} from "~/composables/mainPlayer";
import {CaretDown, MusicNoteSimple} from "#components";

const player = useMainPlayer();
const { component, currentTrack } = player;
const currentEpisodeType = computed(() => {
  if(currentTrack.value && isEpisode(currentTrack.value)) {
    return currentTrack.value.episodeType;
  }

  return null;
});

const typeLabel = useEpisodeTypeLabel(currentEpisodeType);
const typeSymbol = useEpisodeTypeSymbol(currentEpisodeType);

const element = ref();
defineExpose({
  element,
})
</script>

<template>
  <aside ref="element" v-show="currentTrack !== null" id="main-player" :class="{collapsed: player.isCollapsed.value}">
    <div class="toggle" @click.stop="player.toggleCollapsed()">
      <music-note-simple class="icon hidden" />
      <caret-down class="icon visible" />
    </div>
    <div class="inner" v-if="currentTrack !== null">
      <x-bold class="close" @click="player.stop()" />
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
      <AudioPlayer
          ref="component"
          class="main-audio-player"
          :track="currentTrack"
          :is-playlist="player.playlist.value.length > 0"
          :has-next="player.hasNext.value"
          :has-prev="player.hasPrev.value"
          @next="player.playNext()"
          @prev="player.playPrev()" />
    </div>
  </aside>
</template>
