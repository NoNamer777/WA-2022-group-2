<template>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-2">
    <div
      class="col-xl-3 align-items-center d-flex flex-column justify-content-center"
      v-for="(earnedBadge, key) in props.earnedBadges"
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
</template>

<script setup>
import { inject } from 'vue';

const props = defineProps({
  earnedBadges: Array
});
</script>

<style scoped></style>
