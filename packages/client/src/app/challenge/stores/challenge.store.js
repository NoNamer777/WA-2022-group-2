import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ChallengeService } from '../services/index.js';

export const useChallengeStore = defineStore('challenge', () => {
  /** @type {Array} */
  const challenges = ref(null);

  /** @type {import('vue').Ref<boolean>} */
  const loading = ref(true);

  /**
   * @param userId {number}
   * @return {Promise<void>}
   */
  async function getChallenges(userId) {
    try {
      challenges.value = await ChallengeService.instance().getChallenges(userId);
    } catch (error) {
      console.error(error);
      challenges.value = null;
    } finally {
      loading.value = false;
    }
  }

  return { challenges, loading, getChallenges };
});
