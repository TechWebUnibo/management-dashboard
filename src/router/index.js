import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Customers from '../views/Customers.vue'
import Rentals from '../views/Rentals.vue'
import NotFound from '../views/NotFound.vue'
import Dashboard from '../views/Dashboard.vue'
import { isLogged } from  '../utility/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/management-dashboard',
    name: 'Home',
    component: Home
  },
  {
    path: '/management-dashboard/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/management-dashboard/customers',
    name: 'Customers',
    component: Customers,
    meta: { requiresAuth: true }
  },
  {
    path: '/management-dashboard/rentals',
    name: 'Rentals',
    component: Rentals,
    meta: { requiresAuth: true }
  },
  {
    path: '/management-dashboard/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach(async (to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth))
    if(await isLogged())
      next()
    else
      next({name: 'Home'})
  else
    next()
})

export default router
