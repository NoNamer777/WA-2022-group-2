<template>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-2">
    <template v-if="props.earnedBadges && props.earnedBadges.length">
      <div
        class="col-xl-3 align-items-center d-flex flex-column justify-content-center"
        v-for="(earnedBadge, key) in props.earnedBadges"
        :key="key"
      >
        <img
          class="mb-4"
          :src="inject('serverBaseUrl') + earnedBadge.badge.imagePath"
          :alt="earnedBadge.badge.name"
        />
        <div class="fw-bold text-center">
          <p class="h3 text-primary">{{ earnedBadge.badge.name }}</p>
          <p>{{ earnedBadge.date }}</p>
        </div>
      </div>
    </template>
    <template v-else>
      <EmptyState
        class="m-0 w-100"
        :empty-state="'Je hebt helaas nog geen badges behaald. Start een nieuwe challenge!'"
      />
    </template>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import EmptyState from '../../../shared/components/EmptyState.vue';

const props = defineProps({
  earnedBadges: Array
});
</script>
