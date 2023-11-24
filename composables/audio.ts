import type {MaybeRef} from "vue";
import {useRef} from "~/composables/ref";
import {ref} from "@vue/reactivity";
import {watch} from "vue";
import {computed} from "@vue/runtime-core";

export type OnEndReachedListener = () => void;

export function useAudio(audio: MaybeRef<HTMLAudioElement | null>) {
    const audioRef = useRef(audio);
    const listeners = ref<OnEndReachedListener[]>([]);

    const duration = ref(0);
    const currentTime = ref(0);

    function play() {
        const audio = audioRef.value;
        if (!audio) {
            return;
        }

        audio.play();
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
        const audio = audioRef.value;
        if (!audio) {
            return;
        }

        currentTime.value = audio.currentTime || 0;
        notifyListenersIfEndReached();
    }

    function updateDurationRef() {
        const audio = audioRef.value;
        if (!audio) {
            return;
        }

        duration.value = audio.duration || 0;
        notifyListenersIfEndReached();
    }

    function onEndReached(listener: OnEndReachedListener) {
        listeners.value = [...listeners.value, listener];
    }

    function notifyListenersIfEndReached() {
        if(duration.value <= currentTime.value) {
            listeners.value.forEach((listener) => listener());
        }
    }

    watch(audioRef, () => {
        const audio = audioRef.value;

        if(audio) {
            updateDurationRef();
            updateCurrentTimeRef();

            audio.addEventListener('durationchange', () => updateDurationRef());
            audio.addEventListener('timeupdate', () => updateCurrentTimeRef());
        }
    });

    return {
        duration: computed(() => duration.value),
        currentTime: computed(() => currentTime.value),
        setCurrentTime: setAudioCurrentTime,
        onEndReached,
        play,
        pause,
    };
}
