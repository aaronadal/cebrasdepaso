import {nextTick, ref, computed} from "vue";
import type {Track} from "~/composables/media";
import {useAudio} from "~/composables/audio";

const player = ref();
const audioRef = computed(() => player.value?.audioRef || null);
const audio = useAudio(audioRef);

const isCollapsed = ref(true);

const playlist = ref<Track[]>([]);
const currentTrack = ref<Track | null>(null);

const progress = computed(() => audio.currentTime.value);
const duration = computed(() => audio.duration.value);

function start() {
    if (progress.value >= audio.duration.value) {
        audio.setCurrentTime(0);
    }

    audio.play();
}

function pause() {
    audio.pause();
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
    if(currentTrackIndex.value < 0 || currentTrackIndex.value >= playlist.value.length - 1) {
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

function play(track: Track, playImmediately = true) {
    isCollapsed.value = false;
    currentTrack.value = track;
    if(playImmediately) {
        nextTick(() => {
            start();
        });
    }
}

const mainPlayer = {
    component: player,
    isCollapsed: computed(() => isCollapsed.value),
    toggleCollapsed: () => isCollapsed.value = !isCollapsed.value,
    playlist,
    currentTrack,
    // Follows the audio element, so pauses from media keys or the OS are reflected too.
    isPlaying: computed(() => !audio.paused.value),
    progress,
    duration,
    play,
    pause,
    stop: () => {
        stop();
        isCollapsed.value = true;
        currentTrack.value = null;
    },
    goToPosition,
    hasNext: computed(() => nextTrack.value !== null),
    hasPrev: computed(() => previousTrack.value !== null),
    playNext: () => {
        if(nextTrack.value) {
            play(nextTrack.value);
        }
    },
    playPrev: () => {
        if(previousTrack.value) {
            play(previousTrack.value);
        }
    },
};

export function useMainPlayer() {
    return mainPlayer;
}
