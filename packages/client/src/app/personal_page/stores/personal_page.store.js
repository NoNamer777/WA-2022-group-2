import { defineStore } from 'pinia';
import { ref } from 'vue';
import { BadgeService } from '../services/index.js';

export const usePersonalPageStore = defineStore('personal_page', () => {
  /** @type {Array} */
  let earnedBadges = ref({});

  /** @type {import('vue').Ref<boolean>} */
  const loadingBadges = ref(true);

  /**
   * @param userId {number}
   * @return {void}
   */
  async function getEarnedBadges(userId) {
    try {
      earnedBadges.value = await BadgeService.instance().getBadges(userId);
    } catch (error) {
      console.error(error);
      earnedBadges.value = null;
    } finally {
      loadingBadges.value = false;
    }
  }
  return {
    earnedBadges,
    loadingBadges,
    getEarnedBadges
  };
});
