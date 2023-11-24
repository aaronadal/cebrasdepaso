export default defineNuxtRouteMiddleware(() => {
    useNotFoundState().value = false;
})
