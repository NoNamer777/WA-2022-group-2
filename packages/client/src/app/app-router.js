import { createRouter, createWebHistory } from 'vue-router'
import { HomeView, LoginView, RegisterView } from './views'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/info',
      name: 'info',
      component: LoginView
    }
  ]
})
