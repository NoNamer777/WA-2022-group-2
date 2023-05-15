import { notify } from '@kyvg/vue3-notification'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { router } from '../app-router'
import { AuthService } from '../services/auth.service'
import { JwtService } from '../services/jwt.service'
import { StorageService } from '../services/storage.service'
import { UserService } from '../services/user.service'

export const useAuthStore = defineStore('auth', () => {
  /** @type {import('vue').Ref<User | null>} */
  const user = ref(null)

  /** @type {import('vue').Ref<boolean>} */
  const loading = ref(true)

  /** @type {import('vue').ComputedRef<boolean>} */
  const isAuthenticated = computed(() => user.value !== null)

  /** @return {Promise<void>} */
  async function initialize() {
    await populateAuthenticatedUser()
  }

  /**
   * @param userData {User}
   * @return {Promise<void>}
   */
  async function register(userData) {
    try {
      await AuthService.instance().register(userData)

      notify({
        type: 'success',
        title: 'Gelukt',
        text: 'Je hebt successvol een account geregistreerd!'
      })

      router.push({ name: 'login' })
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * @param userData {User}
   * @return {Promise<void>}
   */
  async function login(userData) {
    try {
      await AuthService.instance().login(userData.username, userData.password)

      await populateAuthenticatedUser()

      notify({
        type: 'success',
        title: 'Welkom terug',
        text: 'Je bent successvol ingelogt!'
      })

      router.push({ name: 'home' })
    } catch (error) {
      console.error(error)
    }
  }

  /** @return {void} */
  function logout() {
    AuthService.instance().logout()

    user.value = null
  }

  /**
   * @private
   * @return {Promise<void>}
   */
  async function populateAuthenticatedUser() {
    try {
      const token = StorageService.instance().getItem('jwt-token')

      if (!token) {
        user.value = null
        return
      }
      const decodedToken = JwtService.instance().decodeToken(token)

      user.value = await UserService.instance().getById(parseInt(decodedToken.sub))
    } catch (error) {
      console.error(error)
      user.value = null
    } finally {
      loading.value = false
    }
  }

  return { user, loading, isAuthenticated, initialize, register, login, logout }
})
