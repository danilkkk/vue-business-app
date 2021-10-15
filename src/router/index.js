import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'main',
      authRequired: true,
    }
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('../views/Help.vue'),
    meta: {
      layout: 'main',
      authRequired: true,
    }
  },
  {
    path: '/request/:id',
    name: 'Request',
    component: () => import('../views/Request.vue'),
    meta: {
      layout: 'main',
      authRequired: true,
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      layout: 'login',
      authRequired: false,
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
})

router.beforeEach((to, from, next) => {
  const authRequired = to.meta.authRequired;

  if (authRequired && store.getters['auth/isAuthorized']) {
    next()
  } else if (authRequired && !store.getters['auth/isAuthorized']) {
    next('/login?message=authreq')
  } else {
    next();
  }

})

export default router
