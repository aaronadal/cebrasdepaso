import type {RouteLocationNormalizedLoaded} from "vue-router";
import type {MaybeRef, Ref} from "vue";
import {watch, ref} from "vue";
import {useRef} from "~/composables/ref";

export function useSingleRouteParam<T extends string>(route: RouteLocationNormalizedLoaded, param: MaybeRef<string>): Ref<T|null> {
    const value = ref<string|null>(null);

    const paramRef = useRef(param);

    watch(
        () => route.params[paramRef.value],
        () => {
            let paramValue = route.params[paramRef.value];
            if(Array.isArray(paramValue)) {
                [paramValue,] = paramValue;
            }

            value.value = paramValue;
        },
        { immediate: true },
    )

    return value as Ref<T|null>;
}
