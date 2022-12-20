import { nextTick } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {updateMeta} from "@/router/meta";

declare module 'vue-router' {
  interface RouteMeta {
    title: string,
    description?: string,
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Cebras de paso · El pódcast donde hablamos de las cosas de la vida',
      description: '¡Esto es Cebras de paso! El pódcast donde hablamos —con poco criterio, pero mucha voluntad— ' +
          'de las cosas de la vida. Somos Aarón Nadal y Laia López, dos cebras muy cebras que conversan sobre temas ' +
          'que van desde lo absurdo a lo existencial. ¡Únete a la manada y acompáñanos en nuestras rayadas!',
    }
  },
  {
    path: '/podcast',
    name: 'podcast',
    component: () => import(/* webpackChunkName: "podcast" */ '../views/PodcastView.vue'),
    meta: {
      title: 'Todos los episodios · Cebras de paso',
      description: 'Aquí tienes disponibles todos los episodios del pódcast Cebras de paso. Puedes escucharlos ' +
          'directamente en este página o, si lo prefieres, puedes suscribirte en una de las diversas plataformas de ' +
          'pódcasts en las que tenemos publicados nuestros episodios: Spotify, Apple Podcasts, Google Podcasts, ' +
          'Amazon Music, PocketCasts, etc.',
    }
  },
  {
    path: '/podcast/:type(episodio|avance|extra)/:number(\\d+)',
    name: 'episode',
    component: () => import(/* webpackChunkName: "episode" */ '../views/EpisodeView.vue'),
    props: route => ({ type: route.params.type, number: parseInt(route.params.number as string) }),
    meta: {
      title: 'Detalles de episodio · Cebras de paso',
      description: '',
    }
  },
  {
    path: '/contacto',
    name: 'contact',
    component: () => import(/* webpackChunkName: "contact" */ '../views/ContactView.vue'),
    meta: {
      title: 'Contacto · Cebras de paso',
      description: '¿Quieres contarnos algo? ¿Decirnos que nos quieres? ¿Que nos odias, tal vez? ' +
          '¿Que te gusta el pódcast? ¿Quieres hacernos saber que te caemos bien? ¿Que te gustaría ser nuestro amigo? ' +
          '¿Quieres proponer algún tema? ¿Puntualizar alguna cosa que hayamos dicho? ¿Darnos tu opinión? ' +
          'En esta página podrás encontrar las vías más adecuadas para contactar con Cebras de paso.',
    }
  },
  {
    path: '/generador-de-caratulas',
    name: 'thumbnail-generator',
    component: () => import(/* webpackChunkName: "thumbnail-generator" */ '../views/ThumbnailGeneratorView.vue'),
    meta: {
      title: 'Generador de carátulas · Cebras de paso',
    }
  },
  {
    path: '/generador-de-logotipos',
    name: 'logo-generator',
    component: () => import(/* webpackChunkName: "logo-generator" */ '../views/LogoGeneratorView.vue'),
    meta: {
      title: 'Generador de logotipos · Cebras de paso',
    }
  },
  {
    path: '/generador-de-degradados',
    name: 'gradient-generator',
    component: () => import(/* webpackChunkName: "gradient-generator" */ '../views/GradientGeneratorView.vue'),
    meta: {
      title: 'Generador de degradados · Cebras de paso',
    }
  },
  {
    path: '/aviso-legal',
    name: 'legal',
    component: () => import(/* webpackChunkName: "legal" */ '../views/LegalView.vue'),
    meta: {
      title: 'Aviso legal · Cebras de paso',
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import(/* webpackChunkName: "notfound" */ '../views/NotFoundView.vue'),
    meta: {
      title: '[404] Página no encontrada · Cebras de paso',
    }
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

router.beforeEach((to, from, next) => {
  updateMeta(to.meta.title, to.meta.description);
  next();
});

export default router
