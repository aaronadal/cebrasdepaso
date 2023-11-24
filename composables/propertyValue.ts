import type {ComputedRef, MaybeRef} from "vue";
import {useRef} from "~/composables/ref";
import {computed} from "@vue/runtime-core";

export function usePropertyValue(element: MaybeRef<Element|null|(() => Element|null)>, property: MaybeRef<string>, valueIfElementNull: MaybeRef<string> = ''): ComputedRef<string> {
    const elementRef = useRef(element);
    const propertyRef = useRef(property);
    const valueIfElementNullRef = useRef(valueIfElementNull);

    return computed(() => {
        let element = elementRef.value;
        if(typeof element === 'function') {
            element = element();
        }

        if(process.browser && element) {
            return window.getComputedStyle(element).getPropertyValue(propertyRef.value);
        }

        return valueIfElementNullRef.value;
    });
}
