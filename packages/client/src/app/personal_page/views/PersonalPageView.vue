<script setup>
import { Tab, Tabs } from 'vue3-tabs-component';
import { storeToRefs } from 'pinia';
import { inject, onMounted } from 'vue';
import { useAuthStore } from '../../auth/index.js';
import { useBadgeStore } from '../stores/personal_page.store.js';

const { loading, earnedBadges } = storeToRefs(useBadgeStore());
const { getEarnedBadges } = useBadgeStore();

onMounted(async () => {
  const { user } = storeToRefs(useAuthStore());
  await getEarnedBadges(user.value.id);
});
</script>

<template>
  <main>
    <section class="d-flex align-items-center justify-content-between">
      <h1 class="mb-4">Mijn wasted</h1>
      <router-link class="btn btn-primary" :to="{ name: 'home' }"> Aanmaken </router-link>
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
          <Tab name="Badges">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-2">
              <div
                class="col-xl-3 align-items-center d-flex flex-column justify-content-center"
                v-for="(earnedBadge, key) in earnedBadges"
                :key="key"
              >
                <img
                  class="mb-4"
                  :src="inject('serverBaseUrl') + earnedBadge.badge.image_path"
                  :alt="earnedBadge.badge.name"
                />
                <div class="fw-bold text-center">
                  <p class="h3 text-primary">{{ earnedBadge.badge.name }}</p>
                  <p>{{ earnedBadge.date }}</p>
                </div>
              </div>
            </div>
          </Tab>
          <Tab name="Groepen"> </Tab>
        </Tabs>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
