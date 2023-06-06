import { defineStore } from 'pinia';
import { ref } from 'vue';
import { BadgeService } from '../services/index.js';

export const useBadgeStore = defineStore('badges', () => {
  /** @type {Object} */
  let badges = ref({});

  /** @type {import('vue').Ref<boolean>} */
  const loading = ref(true);

  /**
   * @param userId {number}
   * @return {void}
   */
  async function getBadges(userId) {
    try {
      await BadgeService.instance()
        .getBadges(userId)
        .then((data) => {
          badges.value = data.badges;
        });
    } catch (error) {
      console.error(error);
      badges.value = null;
    } finally {
      loading.value = false;
    }
  }

  return { badges, loading, getBadges };
});
