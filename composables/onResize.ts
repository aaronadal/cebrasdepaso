export function useOnResize(listener: () => void) {
    if(process.browser) {
        window.removeEventListener('resize', listener);
        window.addEventListener('resize', listener);
    }
}
