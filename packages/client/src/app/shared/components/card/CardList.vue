<script setup>
import CardItem from './CardItem.vue';

const props = defineProps({
  title: String,
  emptyState: String,
  items: Array
});
</script>

<template>
  <section class="mb-4">
    <h3 class="fw-bold">{{ props.title }}</h3>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-2">
      <router-link
        v-for="(item, index) in props.items"
        class="col-xl-4 text-black text-decoration-none"
        :key="index"
        :to="{ name: 'challenge' }"
      >
        <CardItem :title="item.title" :text="item.text" :clickable="true" />
      </router-link>
    </div>
    <small v-if="!items.length">{{ props.emptyState }}</small>
  </section>
</template>
