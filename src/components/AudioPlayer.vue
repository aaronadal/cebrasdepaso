<script setup lang="ts">
import Icon from '@/components/Icon.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import { ref, toRefs } from '@vue/reactivity'
import { computed, onMounted, onUnmounted } from '@vue/runtime-core'

declare interface Props {
    url: string,
    type: string
    title: string,
    artist: string,
    album: string,
    artworks: {src: string, sizes: string, type: string}[]
    isMediaSessionDisabled?: boolean,
}

// eslint-disable-next-line no-undef
const props = withDefaults(defineProps<Props>(), {
  isMediaSessionDisabled: false
})

const { title, artist, album, artworks, isMediaSessionDisabled } = toRefs(props)

const audioRef = ref<HTMLAudioElement|null>()

function formatTime (seconds: number|undefined): string {
  if (seconds === undefined) {
    return '00:00'
  }

  const mins = `${Math.floor(seconds / 60)}`.padStart(2, '0')
  const secs = `${Math.floor(seconds % 60)}`.padStart(2, '0')

  return `${mins}:${secs}`
}

const playing = ref(false)
const wasPlayingBeforeDragStart = ref(false)
const duration = ref<number>(0)
const totalTime = computed(() => formatTime(duration.value))
const progress = ref(0)
const currentTime = computed(() => formatTime(progress.value))

function updateDuration () {
  duration.value = Math.floor(audioRef.value?.duration || 0)
}

function updateProgress () {
  if (progress.value >= duration.value || (audioRef.value?.currentTime || 0) >= duration.value) {
    stop()
  } else {
    progress.value = audioRef.value?.currentTime || 0
  }
  updateMediaPositionState()
}

function updateCurrentTime () {
  const audio = audioRef.value
  if (!audio) {
    return
  }

  audio.currentTime = progress.value
}

function play () {
  document.dispatchEvent(new CustomEvent('pause'))

  if (progress.value >= duration.value) {
    const audio = audioRef.value
    if (!audio) {
      return
    }

    audio.currentTime = 0
  }

  audioRef.value?.play()
  updateMediaPositionState()
  playing.value = true
}

function pause () {
  audioRef.value?.pause()
  playing.value = false
}

function stop () {
  pause()
  progress.value = 0
  updateCurrentTime()
}

function updateMediaPositionState () {
  if (isMediaSessionDisabled.value) {
    return
  }

  navigator.mediaSession.setPositionState({
    duration: duration.value,
    playbackRate: 1.0,
    position: progress.value
  })
}

function updateMediaSession () {
  if (isMediaSessionDisabled.value) {
    return
  }

  if ('mediaSession' in navigator && playing.value === true) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: title.value,
      artist: artist.value,
      album: album.value,
      artwork: artworks.value
    })

    // eslint-disable-next-line no-undef
    const actions: Record<MediaSessionAction, (details: MediaSessionActionDetails) => void> = {
      play: () => play(),
      pause: () => pause(),
      stop: () => stop(),
      previoustrack: () => pause(),
      nexttrack: () => pause(),
      seekbackward: (details) => {
        progress.value = progress.value - (details.seekOffset || 10)
      },
      seekforward: (details) => {
        progress.value = progress.value + (details.seekOffset || 10)
      },
      seekto: (details) => {
        progress.value = details.seekTime || 0
      },
      skipad: () => { /* do nothing */ },
      hangup: () => { /* do nothing */ },
      togglecamera: () => { /* do nothing */ },
      togglemicrophone: () => { /* do nothing */ }
    }

    Object.keys(actions).forEach((key) => {
    // eslint-disable-next-line no-undef
      const action = key as MediaSessionAction
      const handler = actions[action]

      try {
        navigator.mediaSession.setActionHandler(action, handler)
      } catch (error) {
      }
    })
  }
}

function onClickPlay () {
  playing.value ? pause() : play()
  updateMediaSession()
}

function onDragStart () {
  wasPlayingBeforeDragStart.value = playing.value
  if (playing.value) {
    pause()
  }
}

function onDrag (value: number) {
  progress.value = value
}

function onDragEnd () {
  updateCurrentTime()
  updateProgress()

  if (wasPlayingBeforeDragStart.value) {
    play()
    wasPlayingBeforeDragStart.value = false
  }
}

onMounted(() => {
  document.addEventListener('pause', () => pause())

  audioRef.value?.addEventListener('loadedmetadata', updateDuration)
  audioRef.value?.addEventListener('timeupdate', updateProgress)

  if (audioRef.value?.readyState && audioRef.value?.readyState > 0) {
    updateDuration()
  }
})

onUnmounted(() => {
  audioRef.value?.removeEventListener('loadedmetadata', updateDuration)
  audioRef.value?.removeEventListener('timeupdate', updateProgress)
})
</script>

<template>
    <aside class="audio-player">
        <audio ref="audioRef" :src="url" :type="type" preload="metadata" />
        <button class="play" @click="onClickPlay"><Icon :icon="playing ? 'pause' : 'play'" weight="fill" /></button>
        <div class="time current-time">{{ currentTime }}</div>
        <div class="time total-time">{{ totalTime }}</div>
        <ProgressBar v-model="progress" :max="duration" @dragstart="onDragStart" @drag="onDrag" @dragend="onDragEnd" />
    </aside>
</template>
