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
    async register(data) {
      AuthService.instance()
      // await axios
      //   .post('/user', data)
      //   .then(() => {
      //     router.push({ name: 'login' })
      //   })
      //   .catch((error) => {
      //     console.error(error)
      //   })
    },
    async login(data) {
      await axios
        .post('/auth', data)
        .then((res) => {
          this.user = res.data.user
          router.push({ name: 'home' })
        })
        .catch((error) => {
          console.error(error)
        })
    },
    async logout() {
      this.user = null

      await axios
        .post('/auth/logout')
        .then(() => {
          router.push({ name: 'home' })
        })
        .catch((error) => {
          console.error(error)
        })
    },
    async getAuthUser() {
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
