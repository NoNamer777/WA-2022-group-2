import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useAuthStore } from '../../auth/index.js';
import { GroupService } from '../../group/services/group.service.js';
import { cardResource } from '../resources/card.resource.js';
import { BadgeService } from '../services/index.js';

export const usePersonalPageStore = defineStore('personal_page', () => {
  /** @type {Array} */
  let earnedBadges = ref({});

  /** @type {Array} */
  let groups = ref({});

  /** @type {import('vue').Ref<boolean>} */
  const loadingBadges = ref(true);

  /** @type {import('vue').Ref<boolean>} */
  const loadingGroups = ref(true);

  /**
   * @param userId {number}
   * @return {void}
   */
  async function getEarnedBadges(userId) {
    try {
      earnedBadges.value = await BadgeService.instance().getBadges(userId);
        .getBadges(userId)
        .then((data) => {
          earnedBadges.value = data;
        });
    } catch (error) {
      console.error(error);
      earnedBadges.value = null;
    } finally {
      loadingBadges.value = false;
    }
  }

  /**
   * @param userId {number}
   * @return {void}
   */
  async function getGroups(userId) {
    try {
      groups.value = cardResource(await GroupService.instance().getAllForUser(userId));
        .getAllForUser(userId)
        .then((data) => {
          groups.value = cardResource(data);
        });
    } catch (error) {
      console.error(error);
      earnedBadges.value = null;
    } finally {
      loadingGroups.value = false;
    }
  }

  /**
   * @param name {String}
   * @return {Object}
   */
  async function createGroup(name) {
    const { user } = storeToRefs(useAuthStore());
    let group = null;

    try {
      group = await GroupService.instance().createForUser(user.value.id, name);
      
      loadingGroups.value = true;
      getGroups(user.value.id);
        .createForUser(user.value.id, name)
        .then((data) => {
          group = data;
          loadingGroups.value = true;
          getGroups(user.value.id);
        });
    } catch (error) {
      console.error(error);
    }

    return group;
  }

  async function joinGroup(code) {
    const { user } = storeToRefs(useAuthStore());
    let group = null;

    try {
      group = await GroupService.instance().join(user.value.id, code);

      loadingGroups.value = true;
      getGroups(user.value.id);
        .join(user.value.id, code)
        .then((data) => {
          group = data;
          loadingGroups.value = true;
          getGroups(user.value.id);
        });
    } catch (error) {
      console.error(error);
    }

    return group;
  }

  return {
    earnedBadges,
    groups,
    loadingBadges,
    loadingGroups,
    getEarnedBadges,
    getGroups,
    createGroup,
    joinGroup
  };
});
