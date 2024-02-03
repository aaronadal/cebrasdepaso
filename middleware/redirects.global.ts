import {defineNuxtRouteMiddleware, navigateTo, useConfig} from "#imports";

const { redirects } = useConfig();

export default defineNuxtRouteMiddleware(({ path  }) => {
    const redirect = redirects[path]
    console.log(redirect);
    if(redirect) {
        return navigateTo(
            redirect.url,
            {
                external: redirect.external,
            }
        )
    }
})
