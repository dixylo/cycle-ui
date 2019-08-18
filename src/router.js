import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/brands',
      name: 'brands',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Brands.vue')
    },
    {
      path: '/brand/:id',
      name: 'brand',
      component: () => import('./views/Brand.vue')
    },
    {
      path: '/types',
      name: 'types',
      component: () => import('./views/Types.vue')
    },
    {
      path: '/type/:id',
      name: 'type',
      component: () => import('./views/Type.vue')
    },
    {
      path: '/model/:id',
      name: 'model',
      component: () => import('./views/Model.vue')
    },
    {
      path: '/rentals',
      name: 'rentals',
      component: () => import('./views/Rentals.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('./views/Contact.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./views/Signup.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/Profile.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('./views/Admin.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(item => item.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router