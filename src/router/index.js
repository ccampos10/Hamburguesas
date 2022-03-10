import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Burgers from '../views/Burgers.vue'
import BurgerData from '../views/BurgerData.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/hamburguesas',
    name: 'hamburguesas',
    component: Burgers
  },
  {
    // Detalles de una hamburguesa
    path: '/hamburguesas/:id',
    name: 'data',
    component: BurgerData
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
