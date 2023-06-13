<template>
  <main>
    <h1 class="mb-4">Mijn wasted</h1>
    <hr />
    <BadgeList v-show="!loadingBadges" :earned-badges="earnedBadges" />
  </main>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useAuthStore } from '../../auth/index.js';
import { usePersonalPageStore } from '../stores/personal_page.store.js';
import BadgeList from '../components/BadgeList.vue';

const { loadingBadges, earnedBadges } = storeToRefs(usePersonalPageStore());
const { getEarnedBadges } = usePersonalPageStore();

onMounted(async () => {
  const { user } = storeToRefs(useAuthStore());
  await getEarnedBadges(user.value.id);
});
</script>
