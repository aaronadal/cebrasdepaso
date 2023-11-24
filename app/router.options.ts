import type { RouterConfig } from "@nuxt/schema";
import {nextTick} from "vue";

export default <RouterConfig>{
    scrollBehavior (to, from, savedPosition) {
        if (to.hash) {
            if (from.name !== 'home') {
                return new Promise((resolve) => {
                    setTimeout(() => {

                        resolve({ el: to.hash, behavior: 'smooth' })
                    }, 300)
                })
            }

            return new Promise((resolve) => {
                window.scrollTo({ top: 0 })

                setTimeout(() => {
                    const id = to.hash.substring(1)
                    const element = document.getElementById(id)

                    nextTick(() => {
                        resolve({ top: element?.offsetTop || 0, behavior: 'smooth' })
                    })
                }, 700)
            })
        }

        if (savedPosition) {
            return savedPosition
        }

        return { top: 0, behavior: 'smooth' }
    }
};
