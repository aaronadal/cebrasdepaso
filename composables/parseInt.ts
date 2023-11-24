import type {ComputedRef, MaybeRef} from "vue";
import {useRef} from "~/composables/ref";
import {computed} from "@vue/runtime-core";

export function useParseInt(string: MaybeRef<string|null>): ComputedRef<number|null> {
    const stringRef = useRef(string);

    return computed(() => stringRef.value === null ? null : parseInt(stringRef.value));
}
