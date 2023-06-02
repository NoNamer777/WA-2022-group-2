import { notify } from '@kyvg/vue3-notification';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { router } from '../../app-router.js';
import { UserService } from '../../user/index.js';
import { AuthService, JwtService } from '../services/index.js';

export const useAuthStore = defineStore('auth', () => {
  /** @type {import('vue').Ref<User | null>} */
  const user = ref(null);

  /** @type {import('vue').Ref<boolean>} */
  const loading = ref(true);

  /** @type {import('vue').ComputedRef<boolean>} */
  const isAuthenticated = computed(() => user.value !== null);

  /** @return {Promise<void>} */
  async function initialize() {
    await populateAuthenticatedUser();
  }

  /**
   * @param userData {User}
   * @return {Promise<void>}
   */
  async function register(userData) {
    try {
      await AuthService.instance().register(userData);

      notify({
        type: 'success',
        title: 'Gelukt',
        text: 'Je hebt successvol een account geregistreerd!'
      });

      await router.push({ name: 'login' });
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @param userData {User}
   * @return {Promise<void>}
   */
  async function login(userData) {
    try {
      await AuthService.instance().login(userData.username, userData.password);

      await populateAuthenticatedUser();

      notify({
        type: 'success',
        title: 'Welkom terug',
        text: 'Je bent successvol ingelogt!'
      });

      await router.push({ name: 'home' });
    } catch (error) {
      console.error(error);
    }
  }

  /** @return {Promise<void>} */
  async function logout() {
    AuthService.instance().logout();

    user.value = null;

    await router.push({ name: 'home' });
  }

  /**
   * @private
   * @return {Promise<void>}
   */
  async function populateAuthenticatedUser() {
    try {
      const token = localStorage.getItem('jwt-token');

      if (!token) {
        user.value = null;
        return;
      }
      const decodedToken = JwtService.instance().decodeToken(token);

      user.value = await UserService.instance().getById(parseInt(decodedToken.sub));
    } catch (error) {
      console.error(error);
      user.value = null;
    } finally {
      loading.value = false;
    }
  }

  return { user, loading, isAuthenticated, initialize, register, login, logout };
});
