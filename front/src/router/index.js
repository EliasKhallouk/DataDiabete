import Vue from 'vue'
import VueRouter from 'vue-router'
import usersService from "@/services/users.service";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: false, requiresAdmin: false}
  },
  {
    path: '/homeAdmin',
    name: 'homeAdmin',
    component: () => import('../views/HomeAdminView.vue'),
    meta: { requiresAuth: true, requiresAdmin: false}
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
    component: () => import('../views/ConnexionView.vue'),
    meta: { requiresAuth: false, requiresAdmin: false}
  },
  {
    path: '/inscription',
    name: 'inscription',
    component: () => import('../views/InscriptionView.vue'),
    meta: { requiresAuth: false, requiresAdmin: false}
  },
  {
    path: '/mort',
    name: 'mort',
    component: () => import('../views/MortView.vue'),
    meta: { requiresAuth: false, requiresAdmin: false}
  },
  {
    path: '/rapport',
    name: 'rapport',
    component: () => import('../views/RapportView.vue'),
    meta: { requiresAuth: false, requiresAdmin: false}
  },
  {
    path: '/diabetique',
    name: 'diabetique',
    component: () => import('../views/ToucheView.vue'),
    meta: { requiresAuth: false, requiresAdmin: false}
  },
  {
    path: '/info-perso',
    name: 'info-perso',
    component: () => import('../views/InfoPersoView.vue'),
    meta: { requiresAuth: true, requiresAdmin: false}
  },
  {
    path: '/gestion-utilisateur',
    name: 'gestion-utilisateur',
    component: () => import('../views/GestionUtilisateurView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true}
  },
  {
    path: '/validation-donnee',
    name: 'validation-donnee',
    component: () => import('../views/ValidationDonneeView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true}
  },
  {
    path: '/APropos',
    name: 'APropos',
    component: () => import('../views/AProposView.vue'),
    meta: { requiresAuth: false, requiresAdmin: false}
  },
  {
    path: '/ajoute-donnee',
    name: 'ajoute-donnee',
    component: () => import('../views/AjoutDonneeView.vue'),
    meta: { requiresAuth: true, requiresAdmin: false}
  },
  {
    path: '*',
    name: 'error',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: true, requiresAdmin: false}
  },
  {
    path: '/modif',
    name: 'modif',
    component: () => import('../views/ModifView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true}
  },
    {
    path: '/histogramme',
    name: 'histogramme',
    component: () => import('../views/HistogrammeView.vue'),
    meta: { requiresAuth: false, requiresAdmin: false}
    }
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

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  // Vérifiez si la route nécessite une authentification
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (to.matched.some(route => route.meta.requiresAdmin)) {
      // Vérifiez si l'utilisateur est admin
      if (!usersService.isAdmin()) {
        // Redirigez vers la page de homeAdmin si l'utilisateur n'est pas admin
        next('/homeAdmin');
      } else {
        // Continuez la navigation si l'utilisateur est connecté
        next();
      }
    }else{
      // Vérifiez si l'utilisateur est connecté
      if (!usersService.isAuthenticated()) {
        // Redirigez vers la page de connexion si l'utilisateur n'est pas connecté
        next('/connexion');
      } else {
        // Continuez la navigation si l'utilisateur est connecté
        next();
      }
    }
  } else {
    // Continuez la navigation pour les routes qui n'ont pas besoin d'authentification
    next();
  }
});

export default router