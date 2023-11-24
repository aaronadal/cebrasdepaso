import {useState} from "#app/composables/state";
import type {Ref} from "vue";

export function useNotFoundState(): Ref<boolean> {
    return useState('not-found', () => false);
}
