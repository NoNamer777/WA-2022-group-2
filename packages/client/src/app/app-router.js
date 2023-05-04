import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from './stores'
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
    }
  ]
})

// when user is logged in they shouldn't be able to view the register and login page
router.beforeEach(async (to) => {
  const store = useAuthStore()
  await store.getLoggedInUser()

  if (store.isAuthenticated && (to.name === 'login' || to.name === 'register')) {
    // redirect the user to the home page
    return { name: 'home' }
  }
})
