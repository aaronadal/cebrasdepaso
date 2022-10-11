<script setup lang="ts">
import Icon from '@/components/Icon.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import { ref, toRefs } from '@vue/reactivity'
import { computed, nextTick, onMounted, onUnmounted, watch } from '@vue/runtime-core'
import { Track, currentTrack, currentPlaying, currentProgress, formatTime, play, pause, goToPosition } from '@/media';

interface Props {
  track: Track;
  isPlaylist?: boolean;
  next?: Track|null;
  prev?: Track|null;
}

const props = withDefaults(defineProps<Props>(), {
  isPlaylist: false,
  next: null,
  prev: null,
})

const { track, next, prev } = toRefs(props)

const audioRef = ref<HTMLAudioElement|null>()

const isCurrentTrack = computed(() => currentTrack.value?.mediaUrl === track.value.mediaUrl);
const isPlaying = computed(() => isCurrentTrack.value ? currentPlaying.value : false);
const progressTime = computed(() => formatTime(isCurrentTrack.value ? progress.value : 0));

const duration = ref(0);
const totalTime = computed(() => formatTime(duration.value));

const progress = ref(0);
watch(currentProgress, () => {
  if(isCurrentTrack.value) {
    progress.value = currentProgress.value;
  }
});
watch(isCurrentTrack, () => {
  if(!isCurrentTrack.value) {
    progress.value = 0;
  } 
})

function updateDuration () {
  duration.value = Math.floor(audioRef.value?.duration || 0)
}
 
// function updateMediaPositionState () {
//   if (isMediaSessionDisabled.value) {
//     return
//   }
// 
//   navigator.mediaSession.setPositionState({
//     duration: duration.value,
//     playbackRate: 1.0,
//     position: progress.value
//   })
// }
// 
// function updateMediaSession () {
//   if (isMediaSessionDisabled.value) {
//     return
//   }
// 
//   if ('mediaSession' in navigator && playing.value === true) {
//     navigator.mediaSession.metadata = new MediaMetadata({
//       title: title.value,
//       artist: artist.value,
//       album: album.value,
//       artwork: artworks.value
//     })
// 
//     // eslint-disable-next-line no-undef
//     const actions: Record<MediaSessionAction, (details: MediaSessionActionDetails) => void> = {
//       play: () => play(),
//       pause: () => pause(),
//       stop: () => stop(),
//       previoustrack: () => pause(),
//       nexttrack: () => pause(),
//       seekbackward: (details) => {
//         progress.value = progress.value - (details.seekOffset || 10)
//       },
//       seekforward: (details) => {
//         progress.value = progress.value + (details.seekOffset || 10)
//       },
//       seekto: (details) => {
//         progress.value = details.seekTime || 0
//       },
//       skipad: () => { /* do nothing */ },
//       hangup: () => { /* do nothing */ },
//       togglecamera: () => { /* do nothing */ },
//       togglemicrophone: () => { /* do nothing */ }
//     }
// 
//     Object.keys(actions).forEach((key) => {
//     // eslint-disable-next-line no-undef
//       const action = key as MediaSessionAction
//       const handler = actions[action]
// 
//       try {
//         navigator.mediaSession.setActionHandler(action, handler)
//       } catch (error) {
//       }
//     })
//   }
// }
//

function onClickPlay () {
  isPlaying.value ? pause() : play(track.value);
}

function onClickNext () {
  if(next.value) {
    play(next.value);
  }
}

function onClickPrev () {
  if(prev.value) {
    play(prev.value);
  }
}

function onDragStart () {
  play(track.value, false);
}

function onDrag (value: number) {
  progress.value = value;
  goToPosition(progress.value);
}

function onDragEnd () {
  play(track.value);
  setTimeout(() => {
  goToPosition(progress.value);
  }, 100);
}

onMounted(() => {
  audioRef.value?.addEventListener('loadedmetadata', updateDuration);
  if (audioRef.value?.readyState && audioRef.value?.readyState > 0) {
    updateDuration()
  }
})

onUnmounted(() => {
  audioRef.value?.removeEventListener('loadedmetadata', updateDuration)
})

defineExpose({
  audioRef,
  duration,
});
</script>

<template>
    <aside class="audio-player">
        <audio ref="audioRef" :src="track.mediaUrl" :type="track.mediaType" preload="metadata" />
        <div class="play">
          <button v-if="isPlaylist" :class="{disabled: !prev}" @click="onClickPrev"><Icon icon="skip-back" weight="regular" /></button>
          <button @click="onClickPlay"><Icon :icon="isPlaying ? 'pause' : 'play'" weight="fill" /></button>
          <button v-if="isPlaylist" :class="{disabled: !next}" @click="onClickNext"><Icon icon="skip-forward" weight="regular" /></button>
        </div>
        <div class="time current-time">{{ progressTime }}</div>
        <div class="time total-time">{{ totalTime }}</div>
        <ProgressBar v-model="progress" :max="duration" @dragstart="onDragStart" @drag="onDrag" @dragend="onDragEnd" />
    </aside>
</template>
