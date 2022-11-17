import { nextTick } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      title: 'Todos los episodios · Cebras de paso · El pódcast donde hablamos de las cosas de la vida',
      description: 'Aquí tienes disponibles todos los episodios del pódcast Cebras de paso. Puedes escucharlos ' +
          'directamente en este página o, si lo prefieres, puedes suscribirte en una de las diversas plataformas de ' +
          'pódcasts en las que tenemos publicados nuestros episodios: Spotify, Apple Podcasts, Google Podcasts, ' +
          'Amazon Music, PocketCasts, etc.',
    }
  },
  {
    path: '/contacto',
    name: 'contact',
    component: () => import(/* webpackChunkName: "contact" */ '../views/ContactView.vue'),
    meta: {
      title: 'Contacto · Cebras de paso · El pódcast donde hablamos de las cosas de la vida',
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
      title: 'Generador de carátulas · Cebras de paso · El pódcast donde hablamos de las cosas de la vida',
    }
  },
  {
    path: '/generador-de-logotipos',
    name: 'logo-generator',
    component: () => import(/* webpackChunkName: "logo-generator" */ '../views/LogoGeneratorView.vue'),
    meta: {
      title: 'Generador de logotipos · Cebras de paso · El pódcast donde hablamos de las cosas de la vida',
    }
  },
  {
    path: '/generador-de-degradados',
    name: 'gradient-generator',
    component: () => import(/* webpackChunkName: "gradient-generator" */ '../views/GradientGeneratorView.vue'),
    meta: {
      title: 'Generador de degradados · Cebras de paso · El pódcast donde hablamos de las cosas de la vida',
    }
  },
  {
    path: '/aviso-legal',
    name: 'legal',
    component: () => import(/* webpackChunkName: "legal" */ '../views/LegalView.vue'),
    meta: {
      title: 'Aviso legal · Cebras de paso · El pódcast donde hablamos de las cosas de la vida',
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import(/* webpackChunkName: "notfound" */ '../views/NotFoundView.vue'),
    meta: {
      title: '[404] Página no encontrada · Cebras de paso · El pódcast donde hablamos de las cosas de la vida',
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

// Meta attributes
function addMeta(atts: {[key: string]: string}) {
  const tag = document.createElement('meta');
  Object.keys(atts).forEach((key) => tag.setAttribute(key, atts[key]));
  tag.setAttribute('data-vue-router-meta', '');

  document.head.append(tag);
}

router.beforeEach((to, from, next) => {
  Array.from(document.querySelectorAll('[data-vue-router-meta]')).map(el => el.remove());

  document.title = to.meta.title;
  addMeta({
    property: 'og:title',
    content: to.meta.title,
  });
  addMeta({
    name: 'twitter:title',
    content: to.meta.title,
  });

  if(to.meta.description) {
    addMeta({
      name: 'description',
      content: to.meta.description,
    });

    addMeta({
      property: 'og:description',
      content: to.meta.description,
    });

    addMeta({
      name: 'twitter:description',
      content: to.meta.description,
    });
  }

  next();
});

// router.afterEach((to) => {
//   if (to.name !== 'home') {
//     document.getElementById('page-header')?.classList.add('collapsed')
//   } else {
//     document.getElementById('page-header')?.classList.remove('collapsed')
//   }
// })

export default router
