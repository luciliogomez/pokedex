import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import SiteHome from '../pages/SiteHome.vue'
import PokemonDetails from "../pages/PokemonDetails.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: SiteHome
  },

  {
    path: '/pokemon',
    name: 'pokemon',
    component: PokemonDetails
  },
  { 
    path: '/character/:id', 
    name: 'character',
    component: PokemonDetails 
  }
  ,

  {
    path: '/search',
    component: SiteHome,
    props: route => ({ query: route.query.q })
  }
  ,
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
