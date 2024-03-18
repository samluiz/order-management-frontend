import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import { useAuthStore } from '@/stores/auth.store'

const lazyLoad = (view: string) => {
  return () => import(`../views/${view}.vue`)
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      meta: {
        requiresAuth: true,
        layout: "sidenav"
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
        layout: "sidenav"
      }
    },
    {
      path: '/dashboard/orders',
      name: 'orders',
      component: lazyLoad('Orders'),
      meta: {
        requiresAuth: true,
        layout: "sidenav"
      }
    },
    {
      path: '/dashboard/products',
      name: 'products',
      component: lazyLoad('Products'),
      meta: {
        requiresAuth: true,
        layout: "sidenav"
      }
    },
    {
      path: '/login',
      name: 'login',
      component: lazyLoad('Login'),
      meta: {
        requiresAuth: false,
        layout: "empty"
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const { tokens } = useAuthStore()

  if (to.name === 'login' && tokens) {
    next({
      name: 'dashboard'
    })
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!tokens) {
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
