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
    path: '/contacto',
    name: 'contact',
    component: () => import(/* webpackChunkName: "contact" */ '../views/ContactView.vue')
  },
  {
    path: '/generador-de-caratulas',
    name: 'thumbnail-generator',
    component: () => import(/* webpackChunkName: "thumbnail-generator" */ '../views/ThumbnailGeneratorView.vue')
  },
  {
    path: '/generador-de-logotipos',
    name: 'logo-generator',
    component: () => import(/* webpackChunkName: "logo-generator" */ '../views/LogoGeneratorView.vue')
  },
  {
    path: '/generador-de-degradados',
    name: 'gradient-generator',
    component: () => import(/* webpackChunkName: "gradient-generator" */ '../views/GradientGeneratorView.vue')
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
  history: createWebHistory('/'),
  routes,
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
})

// router.afterEach((to) => {
//   if (to.name !== 'home') {
//     document.getElementById('page-header')?.classList.add('collapsed')
//   } else {
//     document.getElementById('page-header')?.classList.remove('collapsed')
//   }
// })

export default router
