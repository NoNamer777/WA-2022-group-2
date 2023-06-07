import { defineStore } from 'pinia';
import { ref } from 'vue';
import { BadgeService } from '../services/index.js';

export const useBadgeStore = defineStore('badges', () => {
  /** @type {Object} */
  let earnedBadges = ref({});

  /** @type {import('vue').Ref<boolean>} */
  const loading = ref(true);

  /**
   * @param userId {number}
   * @return {void}
   */
  async function getEarnedBadges(userId) {
    try {
      await BadgeService.instance()
        .getBadges(userId)
        .then((data) => {
          earnedBadges.value = data;
        });
    } catch (error) {
      console.error(error);
      earnedBadges.value = null;
    } finally {
      loading.value = false;
    }
  }

  return { earnedBadges, loading, getEarnedBadges };
});
