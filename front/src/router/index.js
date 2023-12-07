import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/homeAdmin',
    name: 'homeAdmin',
    component: () => import('../views/HomeAdminView.vue')
  },
  {
    path: '/connexion',
    name: 'connexion',
    component: () => import('../views/ConnexionView.vue')
  },
  {
    path: '/inscription',
    name: 'inscription',
    component: () => import('../views/InscriptionView.vue')
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
  },
  {
    path: '/info-perso',
    name: 'info-perso',
    component: () => import('../views/InfoPersoView.vue')
  },
  {
    path: '/gestion-utilisateur',
    name: 'gestion-utilisateur',
    component: () => import('../views/GestionUtilisateurView.vue')
  },
  {
    path: '/validation-donnee',
    name: 'validation-donnee',
    component: () => import('../views/ValidationDonneeView.vue')
  },
  {
    path: '/APropos',
    name: 'APropos',
    component: () => import('../views/AProposView.vue')
  },
  {
    path: '/ajoute-donnee',
    name: 'ajoute-donnee',
    component: () => import('../views/AjoutDonneeView.vue')
  },
  /*{
    path: '/deconnexion',
    name: 'deconnexion',
    component: () => import('../views/DeconnexionView.vue')
  }*/

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
