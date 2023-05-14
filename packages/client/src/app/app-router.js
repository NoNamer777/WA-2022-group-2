import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from './stores'
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

router.beforeEach(async (to, from) => {
  window.scrollTo(0, 0)
  const topElement = document.getElementById('top')
  if (topElement && to.meta.title !== from.meta.title) {
    topElement.focus()
  }

  // when user is logged in they shouldn't be able to view the register and login page
  const store = useAuthStore()
  await store.getAuthenticatedUser()

  if (store.isAuthenticated && (to.name === 'login' || to.name === 'register')) {
    // redirect the user to the home page
    return { name: 'home' }
  }
})

router.afterEach((to) => {
  const title = to.meta.title
  if (title) {
    document.title = title
  }
})
