import { computed, nextTick, ref, watch } from "vue"
import {Episode, Track} from "@/media-types";

export const mainPlayer = ref();
const audioRef = computed(() => mainPlayer.value?.audioPlayer?.audioRef || null);

export function formatTime (seconds: number|undefined): string {
  if (seconds === undefined) {
    return '00:00'
  }

  const mins = `${Math.floor(seconds / 60)}`.padStart(2, '0')
  const secs = `${Math.floor(seconds % 60)}`.padStart(2, '0')

  return `${mins}:${secs}`
}

const mainTrack = ref<Track|Episode|null>(null)
export const currentTrack = computed(() => mainTrack.value);
export const currentPlaylist = ref<Track[]>([]);

const currentIndex = computed(() => {
  const track = mainTrack.value;
  if(!track) {
    return -1;
  }

  return currentPlaylist.value.indexOf(track);
});

export const nextTrackIndex = computed(() => {
  if(currentIndex.value >= currentPlaylist.value.length) {
    return null;
  }

  return currentIndex.value + 1;
});

export const previousTrackIndex = computed(() => {
  if(currentIndex.value <= 0) {
    return null;
  }

  return currentIndex.value - 1;
});

export const nextTrack = computed(() => {
  if(nextTrackIndex.value === null) {
    return null;
  }

  return currentPlaylist.value[nextTrackIndex.value];
});

export const previousTrack = computed(() => {
  if(previousTrackIndex.value === null) {
    return null;
  }

  return currentPlaylist.value[previousTrackIndex.value];
});

export const currentPlaying = ref(false);
export const currentDuration = computed(() => mainPlayer.value?.audioPlayer?.duration || 0);
export const currentProgress = ref(0);

function updateProgress () {
    if (currentProgress.value >= currentDuration.value || (audioRef.value?.currentTime || 0) >= currentDuration.value) {
      stopPlaying();
    }
    else {
      currentProgress.value = audioRef.value?.currentTime || 0
    }

    //updateMediaPositionState()
}

function updateCurrentTime () {
  const audio = audioRef.value
  if (!audio) {
    return
  }

  audio.currentTime = currentProgress.value
}

export function goToPosition(position: number) {
  currentProgress.value = position;
  updateCurrentTime();
  updateProgress();
}

watch(audioRef, () => {
  const audio = audioRef.value;
  if(audio) {
    audioRef.value?.addEventListener('timeupdate', updateProgress);
  }
  else {
    audioRef.value?.removeEventListener('timeupdate', updateProgress);
  }
});

function startPlaying() {
    if (currentProgress.value >= currentDuration.value) {
      const audio = audioRef.value
      if (!audio) {
        return
      }

      audio.currentTime = 0
    }

    audioRef.value?.play();
    //updateMediaPositionState();
    currentPlaying.value = true;
}

function pausePlaying() {
  audioRef.value?.pause();
  currentPlaying.value = false;
}

function stopPlaying() {
  pause();
  currentProgress.value = 0;
  updateCurrentTime();
}

export function stop() {
  stopPlaying();
  mainTrack.value = null;
}

export function pause() {
    pausePlaying();
}

export function play(track: Track, start = true) {
    mainTrack.value = track;
    if(start) {
      nextTick(() => {
        startPlaying();
      });
    }
}

const forceNewLineMap = {
  'Esto es... CEBRAS DE PASO': 'Esto es...<br />CEBRAS DE PASO',
} as {[key: string]: string};

export function newLineEpisodeTitle(title: string): string {
  if(title in forceNewLineMap) {
    return forceNewLineMap[title];
  }

  const length = title.length;
  if(length < 22) {
    return title;
  }

  let formatedTitle = '';
  let lastChunk: string|null = null;
  let firstLineEnded = false;

  title.split(' ').forEach((chunk) => {
    const currentLength = formatedTitle.length;
    const forwardLength = currentLength + chunk.length + 1;

    if(lastChunk === null || firstLineEnded || currentLength < 10) {
      formatedTitle += ' ' + chunk;
    }
    else if(forwardLength <= 20 && chunk.length > 3) {
      formatedTitle += ' ' + chunk;
    }
    else {
      formatedTitle += '<br/>' + chunk;
      firstLineEnded = true;
    }

    lastChunk = chunk
  });

  return formatedTitle;
}
