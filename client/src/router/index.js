import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import About from '../views/About'
import Register from '../views/Register'
import Confirm from '../views/Confirm'
import LogIn from '../views/LogIn'
import ForgotPassword from '../views/ForgotPassword'
import Decider from '../views/Decider'

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
  {
    path: '/forgotpassword',
    name: 'ForgotPassword',
    component: ForgotPassword,
  },
  {
    path: '/decider',
    name: 'Decider',
    component: Decider,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router