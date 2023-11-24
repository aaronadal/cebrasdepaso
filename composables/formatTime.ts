export function useFormatTime(seconds: MaybeRef<number|undefined>): ComputedRef<string> {
    const secondsRef = useRef(seconds);

    return computed(() => {
        const rawSeconds = secondsRef.value;

        if (rawSeconds === undefined) {
            return '00:00';
        }

        const minutes = `${Math.floor(rawSeconds / 60)}`.padStart(2, '0')
        const seconds = `${Math.floor(rawSeconds % 60)}`.padStart(2, '0')

        return `${minutes}:${seconds}`
    });
}
