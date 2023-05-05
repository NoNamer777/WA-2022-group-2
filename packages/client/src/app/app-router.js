import { createRouter, createWebHistory } from 'vue-router'
import { ChallengeView, HomeView, LoginView, RegisterView } from './views'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Hoofdpagina'
      }
    },
    {
      path: '/challenge',
      name: 'challenge',
      component: ChallengeView,
      meta: {
        title: 'Uitdaging'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Log in'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        title: 'Registreer'
      }
    }
  ]
})

router.afterEach((to) => {
  const title = to.meta.title
  if (title) {
    document.title = title
  }
})
