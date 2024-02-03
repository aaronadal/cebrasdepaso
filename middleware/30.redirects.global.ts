import {defineNuxtRouteMiddleware, navigateTo, useConfig} from "#imports";

export default defineNuxtRouteMiddleware(({ path  }) => {
    const { redirects } = useConfig();

    const redirect = redirects[path]
    if(redirect) {
        return navigateTo(
            redirect.url,
            {
                external: redirect.external,
            }
        )
    }
})
