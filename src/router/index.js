import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // },
  {
    path: '/connexion',
    name: 'connexion',
    component: () => import('../views/ConnexionView.vue')
  },
  {
    path: '/carte',
    name: 'carte',
    component: () => import('../views/CarteView.vue')
  },
  {
    path: '/diagramme',
    name: 'diagramme',
    component: () => import('../views/DiagrammeBarreView.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
