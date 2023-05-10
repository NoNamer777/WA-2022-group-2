import { createRouter, createWebHistory } from 'vue-router'
import { ChallengeProgressView, HomeView, LoginView, RegisterView } from './views'

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
      component: ChallengeProgressView,
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

router.beforeEach((to, from) => {
  window.scrollTo(0, 0)
  const topElement = document.getElementById('top')
  if (to.meta.title !== from.meta.title) {
    topElement.focus()
  }
})

router.afterEach((to) => {
  const title = to.meta.title
  if (title) {
    document.title = title
  }
})
