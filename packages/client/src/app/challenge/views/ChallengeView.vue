<script setup>
import { Tabs, Tab } from 'vue3-tabs-component';
import { CardList } from '../../shared/components/index.js';
import { useChallengeStore } from '../stores/challenge.store.js';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useAuthStore } from '../../auth/index.js';

const { loading, challenges } = storeToRefs(useChallengeStore());
const { getChallenges } = useChallengeStore();

onMounted(async () => {
  const { user } = storeToRefs(useAuthStore());
  await getChallenges(user.value.id);
});

const toChallengeProgressRoute = (id) => {
  return { name: 'challenge_progress', params: { challengeId: id } };
};
</script>

<template>
  <main>
    <section class="d-flex align-items-center justify-content-between">
      <h1 class="mb-4">Uitdagingen</h1>
      <router-link class="btn btn-primary" :to="{ name: 'challenge_create' }">
        Aanmaken
      </router-link>
    </section>
    <section>
      <div>
        <Tabs
          v-if="!loading"
          nav-class="nav nav-tabs"
          nav-item-class="nav-item"
          nav-item-link-class="nav-link"
          nav-item-link-active-class="active"
          panels-wrapper-class="my-4"
        >
          <Tab name="Huidige">
            <CardList
              :to-route="toChallengeProgressRoute"
              empty-state="Je hebt geen uitdagingen momenteel open staan"
              :items="challenges.currentChallenges"
            />
          </Tab>
          <Tab name="Afgerond">
            <CardList
              :to-route="toChallengeProgressRoute"
              empty-state="Je hebt geen uitdagingen momenteel open staan"
              :items="challenges.pastChallenges"
            />
          </Tab>
        </Tabs>
      </div>
    </section>
  </main>
</template>
