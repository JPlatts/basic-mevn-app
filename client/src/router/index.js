import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import About from '../views/About'
import DeIdentifier from '../views/DeIdentifier'
import LogIn from '../views/LogIn'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/deidentifier',
    name: 'DeIdentifier',
    component: DeIdentifier,
  },
  
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router