import { notify } from '@kyvg/vue3-notification'
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
        .then((res) => {
          notify({
            title: res.data.message,
            type: 'success'
          })

          router.push({ name: 'login' })
        })
        .catch((error) => {
          notify({
            title: error,
            type: 'error'
          })
        })
    },
    async login(data) {
      await axios
        .post('/user/auth', data)
        .then((res) => {
          notify({
            title: res.data.message,
            type: 'success'
          })

          this.user = res.data.user

          router.push({ name: 'home' })
        })
        .catch((error) => {
          notify({
            title: error,
            type: 'error'
          })
        })
    },
    async logout() {
      this.user = null

      await axios
        .post('/user/logout')
        .then((res) => {
          notify({
            title: res.data.message,
            type: 'success'
          })

          router.push({ name: 'home' })
        })
        .catch((error) => {
          notify({
            title: error,
            type: 'error'
          })
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
