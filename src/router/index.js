import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
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
    path: '/management-dashboard/Dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/management-dashboard/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
