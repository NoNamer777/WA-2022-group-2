import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ChallengeService } from '../services/index.js';

export const useChallengeStore = defineStore('challenge', () => {
  /** @type {import('vue').Ref<Challenge | null>} */
  const challenges = ref(null);

  /** @type {import('vue').Ref<boolean>} */
  const loading = ref(true);

  /**
   * @private
   * @return {Promise<void>}
   */
  async function getChallenges() {
    try {
      challenges.value = await ChallengeService.instance().getChallenges();
    } catch (error) {
      console.error(error);
      challenges.value = null;
    } finally {
      loading.value = false;
    }
  }

  return { challenges, loading, getChallenges };
});
