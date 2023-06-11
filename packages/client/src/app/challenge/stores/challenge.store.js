import { defineStore } from 'pinia';
import { ref } from 'vue';
import { cardResource } from '../resources/card.resource.js';
import { ChallengeService } from '../services/index.js';

export const useChallengeStore = defineStore('challenge', () => {
  /** @type {import('vue').Ref<{ activeChallenges: Array<{ id: number, title: string, text: string }>, concludedChallenges: Array<{ id: number, title: string, text: string }>}>} */
  let challenges = ref({
    activeChallenges: [],
    concludedChallenges: []
  });

  /** @type {import('vue').Ref<boolean>} */
  const loading = ref(true);

  /**
   * @param userId {number}
   * @return {Promise<void>}
   */
  async function getChallenges(userId) {
    try {
      const data = await ChallengeService.instance().getAllForUser(userId);

      challenges.value = {
        activeChallenges: cardResource(data.activeChallenges),
        concludedChallenges: cardResource(data.concludedChallenges)
      };
    } catch (error) {
      console.error(error);
      challenges.value = {
        activeChallenges: [],
        concludedChallenges: []
      };
    } finally {
      loading.value = false;
    }
  }

  return { challenges, loading, getChallenges };
});
