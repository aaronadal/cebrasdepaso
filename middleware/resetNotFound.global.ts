import {defineNuxtRouteMiddleware, useNotFoundState} from "#imports";

export default defineNuxtRouteMiddleware(() => {
    useNotFoundState().value = false;
})
