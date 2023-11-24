<script setup lang="ts">
import type {Track} from "~/composables/media";
import {PhPause, PhPlay, PhSkipBack, PhSkipForward} from "@phosphor-icons/vue";

const emit = defineEmits<{
  (evt: 'next'): void;
  (evt: 'prev'): void;
}>();

interface Props {
  track: Track;
  isPlaylist?: boolean;
  hasNext?: boolean;
  hasPrev?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isPlaylist: false,
  hasNext: false,
  hasPrev: false,
});

const { track } = toRefs(props);

const {
  currentTrack,
  isPlaying: isCurrentTrackPlaying,
  progress: currentTrackProgress,
  duration: currentTrackDuration,
  play,
  pause,
  stop,
  goToPosition,
} = useMainPlayer();

const audioRef = ref<HTMLAudioElement | null>(null);
const audio = useAudio(audioRef);

const isCurrentTrack = computed(() => currentTrack.value?.mediaUrl === track.value.mediaUrl);
const isPlaying = computed(() => isCurrentTrack.value ? isCurrentTrackPlaying.value : false);
const progress = computed(() => isCurrentTrack.value ? currentTrackProgress.value : 0);
const progressTime = useFormatTime(progress);

const duration = computed(() => isCurrentTrack.value ? currentTrackDuration.value : audio.duration.value);
const totalTime = useFormatTime(duration);

function onClickPlay() {
  isPlaying.value ? pause() : play(track.value);
}

function onClickNext() {
  emit('next');
}

function onClickPrev() {
  emit('prev');
}

function onDragStart() {
  play(track.value, false);
}

function onDrag(value: number) {
  goToPosition(value);
}

function onDragEnd() {
  play(track.value);
  setTimeout(() => {
    goToPosition(progress.value);
  }, 100);
}

defineExpose({
  audioRef,
})
</script>

<template>
  <aside class="audio-player">
    <audio ref="audioRef" :src="track.mediaUrl" :type="track.mediaType" preload="metadata" />
    <div class="play">
      <button v-if="isPlaylist" :class="{disabled: !hasPrev}" @click="onClickPrev">
        <PhSkipBack weight="regular"/>
      </button>
      <button @click="onClickPlay">
        <PhPause v-if="isPlaying" weight="fill"/>
        <PhPlay v-else weight="fill"/>
      </button>
      <button v-if="isPlaylist" :class="{disabled: !hasNext}" @click="onClickNext">
        <PhSkipForward weight="regular"/>
      </button>
    </div>
    <div class="time current-time">{{ progressTime }}</div>
    <div class="time total-time">{{ totalTime }}</div>
    <ProgressBar v-model="progress" :max="duration" @dragstart="onDragStart" @drag="onDrag" @dragend="onDragEnd"/>
  </aside>
</template>