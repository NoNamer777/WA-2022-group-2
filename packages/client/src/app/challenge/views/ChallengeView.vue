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
              empty-state="Je hebt geen uitdagingen momenteel open staan"
              :items="challenges.activeChallenges"
            />
          </Tab>
          <Tab name="Afgerond">
            <CardList
              empty-state="Je hebt geen uitdagingen momenteel open staan"
              :items="challenges.concludedChallenges"
            />
          </Tab>
        </Tabs>
      </div>
    </section>
  </main>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { Tabs, Tab } from 'vue3-tabs-component';
import { useChallengeStore } from '../stores/challenge.store.js';
import { useAuthStore } from '../../auth';
import { CardList } from '../../shared/components';

const { loading, challenges } = storeToRefs(useChallengeStore());
const { getChallenges } = useChallengeStore();

onMounted(async () => {
  const { user } = storeToRefs(useAuthStore());

  await getChallenges(user.value.id);
});
</script>
