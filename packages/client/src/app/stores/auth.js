import { defineStore } from 'pinia'
import { router } from '../app-router'
import axios from '../axios'

export const useAuthorStore = defineStore({
  id: 'auth',
  state: () => ({
    user: null
  }),
  getters: {
    isAuthenticated: (state) => state.user !== null
  },
  actions: {
    async register(data) {
      await axios
        .post('/user', data)
        .then(() => {
          router.push({ name: 'login' })
        })
        .catch((error) => {
          console.error(error)
        })
    },
    async login(data) {
      await axios
        .post('/user/auth', data)
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
        .post('/user/logout')
        .then(() => {
          router.push({ name: 'home' })
        })
        .catch((error) => {
          console.error(error)
        })
    },
    async getLoggedInUser() {
      await axios
        .get('/user/logged_in')
        .then((res) => {
          this.user = res.data.user
        })
        .catch(() => (this.user = null))
    }
  }
})
