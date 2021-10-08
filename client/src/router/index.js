import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import About from '../views/About'
import Register from '../views/Register'
import Confirm from '../views/Confirm'
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
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/confirm/:id/key/:confkey?',
    name: 'Confirm',
    component: Confirm,
    props: true
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