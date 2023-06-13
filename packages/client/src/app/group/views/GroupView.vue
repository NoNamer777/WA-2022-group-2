<template>
  <main>
    <section
      class="d-flex d-md-block flex-column flex-lg-row align-items-center justify-content-between mb-md-0 mb-3"
    >
      <div class="d-flex flex-column flex-md-row align-items-center justify-content-between">
        <h1>Groepen</h1>
        <div class="d-flex justify-content-end gap-2 align-items-center">
          <CreateGroupModal />
          <JoinGroupModal />
        </div>
      </div>
      <hr class="w-100" />
    </section>
    <GroupList v-show="!loading" :groups="groups" />
  </main>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useAuthStore } from '../../auth/index.js';
import { useGroupStore } from '../stores/group.store.js';
import GroupList from '../components/GroupList.vue';
import CreateGroupModal from '../components/CreateGroupModal.vue';
import JoinGroupModal from '../components/JoinGroupModal.vue';

const { loading, groups } = storeToRefs(useGroupStore());
const { getGroups } = useGroupStore();

onMounted(async () => {
  const { user } = storeToRefs(useAuthStore());
  await getGroups(user.value.id);
});
</script>
