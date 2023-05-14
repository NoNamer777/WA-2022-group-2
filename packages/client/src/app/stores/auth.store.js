import { defineStore } from 'pinia'
import { router } from '../app-router'
import axios from '../axios'
import { AuthService } from '../services/auth.service'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: null,
    loading: true
  }),
  getters: {
    isAuthenticated: (state) => state.user !== null
  },
  actions: {
    async register(userData) {
      try {
        await AuthService.instance().register(userData)

        router.push({ name: 'login' })
      } catch (error) {
        console.error(error)
      }
    },
    async login(userData) {
      try {
        this.user = await AuthService.instance().login(userData)

        router.push({ name: 'home' })
      } catch (error) {
        console.error(error)
      }
    },
    async logout() {
      try {
        await AuthService.instance().logout()

        this.user = null
      } catch (error) {
        console.error(error)
      }
    },
    async getAuthenticatedUser() {
      await axios
        .get('/auth')
        .then((res) => {
          this.user = res.data.user
        })
        .catch(() => (this.user = null))
        .finally(() => (this.loading = false))
    }
  }
})
