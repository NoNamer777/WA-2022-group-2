import { defineStore } from 'pinia';
import { ref } from 'vue';
import { cardResource } from '../resources/card.resource.js';
import { ChallengeService } from '../services/index.js';

export const useChallengeStore = defineStore('challenge', () => {
  /** @type {Object} */
  let challenges = ref({});

  /** @type {import('vue').Ref<boolean>} */
  const loading = ref(true);

  /**
   * @param userId {number}
   * @return {void}
   */
  async function getChallenges(userId) {
    try {
      await ChallengeService.instance()
        .getChallenges(userId)
        .then((data) => {
          challenges.value = {
            currentChallenges: cardResource(data.currentChallenges),
            pastChallenges: cardResource(data.pastChallenges)
          };
        });
    } catch (error) {
      console.error(error);
      challenges.value = null;
    } finally {
      loading.value = false;
    }
  }

  return { challenges, loading, getChallenges };
});
