<script setup>
import { Tab, Tabs } from 'vue3-tabs-component';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useAuthStore } from '../../auth/index.js';
import { usePersonalPageStore } from '../stores/personal_page.store.js';
import CreateGroupModal from '../components/CreateGroupModal.vue';
import BadgeList from '../components/BadgeList.vue';
import GroupList from '../components/GroupList.vue';

const { loadingBadges, loadingGroups, earnedBadges, groups } = storeToRefs(usePersonalPageStore());
const { getEarnedBadges, getGroups } = usePersonalPageStore();

onMounted(async () => {
  const { user } = storeToRefs(useAuthStore());
  await getEarnedBadges(user.value.id);
  await getGroups(user.value.id);
});
</script>

<template>
  <main>
    <section class="d-flex align-items-center justify-content-between">
      <h1 class="mb-4">Mijn wasted</h1>
      <CreateGroupModal />
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

<style scoped></style>
