import type {Track} from "~/composables/media";
import {ref} from "@vue/reactivity";
import {computed} from "@vue/runtime-core";
import {useAudio} from "~/composables/audio";
import {nextTick} from "vue";

const player = ref();
const audioRef = computed(() => player.value?.audioRef || null);
const audio = useAudio(audioRef);

const isCollapsed = ref(false);

const playlist = ref<Track[]>([]);
const currentTrack = ref<Track | null>(null);

const isPlaying = ref(false);
const progress = computed(() => audio.currentTime.value);
const duration = computed(() => audio.duration.value);

function start() {
    if (progress.value >= audio.duration.value) {
        audio.setCurrentTime(0);
    }

    audio.play();
    isPlaying.value = true;
}

function pause() {
    audio.pause();
    isPlaying.value = false;
}

function stop() {
    pause();
    audio.setCurrentTime(0);
}

function goToPosition(position: number) {
    audio.setCurrentTime(position);
}

audio.onEndReached(stop);

const currentTrackIndex = computed(() => {
    const track = currentTrack.value;
    if(!track) {
        return -1;
    }

    return playlist.value.indexOf(track);
});

const nextTrackIndex = computed(() => {
    if(currentTrackIndex.value >= playlist.value.length) {
        return null;
    }

    return currentTrackIndex.value + 1;
});

const previousTrackIndex = computed(() => {
    if(currentTrackIndex.value <= 0) {
        return null;
    }

    return currentTrackIndex.value - 1;
});

const nextTrack = computed(() => {
    if(nextTrackIndex.value === null) {
        return null;
    }

    return playlist.value[nextTrackIndex.value];
});

const previousTrack = computed(() => {
    if(previousTrackIndex.value === null) {
        return null;
    }

    return playlist.value[previousTrackIndex.value];
});

const mainPlayer = {
    component: player,
    isCollapsed: computed(() => isCollapsed.value),
    toggleCollapsed: () => isCollapsed.value = !isCollapsed.value,
    playlist,
    currentTrack,
    isPlaying,
    progress,
    duration,
    play: (track: Track, playImmediately = true) => {
        currentTrack.value = track;
        if(playImmediately) {
            nextTick(() => {
                start();
            });
        }
    },
    pause,
    stop: () => {
        stop();
        currentTrack.value = null;
    },
    goToPosition,
    hasNext: computed(() => nextTrack.value !== null),
    hasPrev: computed(() => previousTrack.value !== null),
    playNext: () => {
        if(nextTrack.value) {
            currentTrack.value = nextTrack.value;
        }
    },
    playPrev: () => {
        if(previousTrack.value) {
            currentTrack.value = previousTrack.value;
        }
    },
};

export function useMainPlayer() {
    return mainPlayer;
}
