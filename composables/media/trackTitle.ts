import type {Track} from "~/composables/media";
import type {ComputedRef, MaybeRef} from "vue";
import {useRef} from "~/composables/ref";
import {computed} from "@vue/runtime-core";

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Values are trusted HTML.
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
            return escapeHtml(title);
        }

        let formatedTitle = '';
        let lastChunk: string|null = null;
        let firstLineEnded = false;

        title.split(' ').forEach((chunk: string) => {
            const currentLength = formatedTitle.length;
            const forwardLength = currentLength + chunk.length + 1;

            if(lastChunk === null || firstLineEnded || currentLength < 10) {
                formatedTitle += ' ' + chunk;
            }
            else if(forwardLength <= 20 && chunk.length > 3) {
                formatedTitle += ' ' + chunk;
            }
            else {
                formatedTitle += '\n' + chunk;
                firstLineEnded = true;
            }

            lastChunk = chunk
        });

        return escapeHtml(formatedTitle).replace(/\n/g, '<br/>');
    });
}
