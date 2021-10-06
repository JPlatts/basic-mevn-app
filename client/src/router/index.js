import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import About from '../views/About'
import Register from '../views/Register'
import Confirm from '../views/Confirm'

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
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/confirm/:id',
    name: 'Confirm',
    component: Confirm,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router