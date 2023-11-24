export function useNotFoundState(): Ref<boolean> {
    return useState('not-found', () => false);
}
