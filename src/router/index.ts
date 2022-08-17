import { nextTick } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/podcast',
    name: 'podcast',
    component: () => import(/* webpackChunkName: "podcast" */ '../views/PodcastView.vue')
  },
  {
    path: '/nosotros',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/generador-de-caratulas',
    name: 'generator',
    component: () => import(/* webpackChunkName: "generator" */ '../views/GeneratorView.vue')
  },
  {
    path: '/aviso-legal',
    name: 'legal',
    component: () => import(/* webpackChunkName: "legal" */ '../views/LegalView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import(/* webpackChunkName: "notfound" */ '../views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      if (from.name !== 'home') {
        return { el: to.hash, behavior: 'smooth' }
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
})

router.afterEach((to) => {
  if (to.name !== 'home') {
    document.getElementById('page-header')?.classList.add('collapsed')
  } else {
    document.getElementById('page-header')?.classList.remove('collapsed')
  }
})

export default router
