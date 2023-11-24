import type {Ref} from "vue";
import {useState} from "#app/composables/state";

export function useNotFoundState(): Ref<boolean> {
    return useState('not-found', () => false);
}
