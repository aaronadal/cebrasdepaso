import type {Track} from "~/composables/media";

const customTitlesMap: {[key: string]: string} = {
    'Esto es... CEBRAS DE PASO': 'Esto es...<br />CEBRAS DE PASO',
};

export function useTrackTitle(track: MaybeRef<Track|null>): ComputedRef<string> {
    const trackRef = useRef(track);

    return computed(() => {
        const track = trackRef.value;
        if(track === null) {
            return '';
        }

        const title = track.title;

        // If it is an exception, returns the exception.
        if(title in customTitlesMap) {
            return customTitlesMap[title];
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
    });
}
