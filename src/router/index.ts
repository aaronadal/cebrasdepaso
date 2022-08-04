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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior () {
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
