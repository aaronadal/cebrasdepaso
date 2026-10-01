import type {MaybeRef} from "vue";
import {watch, ref, computed} from "vue";
import {useRef} from "~/composables/ref";

export type OnEndReachedListener = () => void;

export function useAudio(audio: MaybeRef<HTMLAudioElement | null>) {
    const audioRef = useRef(audio);
    const listeners = ref<OnEndReachedListener[]>([]);

    const duration = ref(0);
    const currentTime = ref(0);
    const paused = ref(true);

    function play() {
        const audio = audioRef.value;
        if (!audio) {
            return;
        }

        // The play() promise rejects when playback is interrupted; the pause event already keeps the state right.
        audio.play()?.catch(() => {});
    }

    function pause() {
        const audio = audioRef.value;
        if (!audio) {
            return;
        }

        audio.pause();
    }

    function setAudioCurrentTime(currentTime: number) {
        const audio = audioRef.value;
        if (!audio) {
            return;
        }

        audio.currentTime = currentTime;
    }

    function updateCurrentTimeRef() {
        currentTime.value = audioRef.value?.currentTime || 0;
    }

    function updateDurationRef() {
        duration.value = audioRef.value?.duration || 0;
    }

    function updatePausedRef() {
        paused.value = audioRef.value?.paused ?? true;
    }

    function onEndReached(listener: OnEndReachedListener) {
        listeners.value = [...listeners.value, listener];
    }

    function notifyEndReached() {
        listeners.value.forEach((listener) => listener());
    }

    watch(audioRef, (audio, _, onCleanup) => {
        updateDurationRef();
        updateCurrentTimeRef();
        updatePausedRef();

        if(!audio) {
            return;
        }

        const events: [string, () => void][] = [
            ['durationchange', updateDurationRef],
            ['timeupdate', updateCurrentTimeRef],
            ['play', updatePausedRef],
            ['pause', updatePausedRef],
            ['ended', updatePausedRef],
            ['ended', notifyEndReached],
        ];
        events.forEach(([name, listener]) => audio.addEventListener(name, listener));
        onCleanup(() => events.forEach(([name, listener]) => audio.removeEventListener(name, listener)));
    });

    return {
        duration: computed(() => duration.value),
        currentTime: computed(() => currentTime.value),
        paused: computed(() => paused.value),
        setCurrentTime: setAudioCurrentTime,
        onEndReached,
        play,
        pause,
    };
}
