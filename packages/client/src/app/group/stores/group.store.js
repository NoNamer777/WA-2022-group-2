import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useAuthStore } from '../../auth/index.js';
import { cardResource } from '../resources/card.resource.js';
import { GroupService } from '../services/group.service.js';

export const useGroupStore = defineStore('group', () => {
  /** @type {Array} */
  let groups = ref({});

  /** @type {import('vue').Ref<boolean>} */
  const loading = ref(true);

  /**
   * @param userId {number}
   * @return {void}
   */
  async function getGroups(userId) {
    try {
      groups.value = cardResource(await GroupService.instance().getAllForUser(userId));
    } catch (error) {
      console.error(error);
      groups.value = null;
    } finally {
      loading.value = false;
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

      loading.value = true;
      getGroups(user.value.id);
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

      loading.value = true;
      getGroups(user.value.id);
    } catch (error) {
      console.error(error);
    }

    return group;
  }

  return {
    groups,
    loading,
    getGroups,
    createGroup,
    joinGroup
  };
});
