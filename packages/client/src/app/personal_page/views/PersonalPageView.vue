<template>
  <main>
    <section
      class="d-flex flex-column flex-lg-row align-items-center justify-content-between mb-md-0 mb-3"
    >
      <h1 class="mb-4">Mijn wasted</h1>
      <div class="d-flex justify-content-end gap-2">
        <CreateGroupModal />
        <JoinGroupModal />
      </div>
    </section>
    <section>
      <div>
        <Tabs
          nav-class="nav nav-tabs"
          nav-item-class="nav-item"
          nav-item-link-class="nav-link"
          nav-item-link-active-class="active"
          panels-wrapper-class="my-4"
        >
          <Tab name="Badges">
            <BadgeList v-show="!loadingBadges" :earned-badges="earnedBadges"
          /></Tab>
          <Tab name="Groepen">
            <GroupList v-show="!loadingGroups" :groups="groups" />
          </Tab>
        </Tabs>
      </div>
    </section>
  </main>
</template>

<script setup>
import { Tab, Tabs } from 'vue3-tabs-component';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useAuthStore } from '../../auth/index.js';
import { usePersonalPageStore } from '../stores/personal_page.store.js';
import CreateGroupModal from '../components/groups/CreateGroupModal.vue';
import BadgeList from '../components/badges/BadgeList.vue';
import GroupList from '../components/groups/GroupList.vue';
import JoinGroupModal from '../components/groups/JoinGroupModal.vue';

const { loadingBadges, loadingGroups, earnedBadges, groups } = storeToRefs(usePersonalPageStore());
const { getEarnedBadges, getGroups } = usePersonalPageStore();

onMounted(async () => {
  const { user } = storeToRefs(useAuthStore());
  await getEarnedBadges(user.value.id);
  await getGroups(user.value.id);
});
</script>
