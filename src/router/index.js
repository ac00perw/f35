import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Snap from '../views/Snap.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "scroller" */ '../components/Scroller.vue')
  },
  {
    path: "/snap",
    name: "Snap",
    component: () => import(/* webpackChunkName: "snap" */ '../views/Snap.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/sources',
    name: 'Sources',
    component: () => import(/* webpackChunkName: "sources" */ '../views/Sources.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
