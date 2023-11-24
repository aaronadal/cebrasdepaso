export function useParseInt(string: MaybeRef<string|null>): ComputedRef<number|null> {
    const stringRef = useRef(string);

    return computed(() => stringRef.value === null ? null : parseInt(stringRef.value));
}
