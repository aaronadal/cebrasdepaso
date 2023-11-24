import type {MaybeRef, Ref} from "vue";
import {isRef, ref} from "vue";

export function useRef<T>(value: MaybeRef<T>): Ref<T> {
    return (isRef(value) ? value : ref(value)) as Ref<T>;
}
