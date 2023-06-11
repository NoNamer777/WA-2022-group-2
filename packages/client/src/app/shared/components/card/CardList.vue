<template>
  <section class="mb-4">
    <h3 class="fw-bold">{{ props.title }}</h3>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-2">
      <template v-if="toRoute">
        <router-link
          v-for="(item, index) in props.items"
          class="col-xl-4 text-black text-decoration-none"
          :key="index"
          :to="toRoute(item.id)"
        >
          <CardItem :title="item.title" :text="item.text" :clickable="true" />
        </router-link>
      </template>
      <template v-else>
        <div
          v-for="(item, index) in props.items"
          class="col-xl-4 text-black text-decoration-none"
          :key="index"
        >
          <CardItem :title="item.title" :text="item.text" :clickable="true" />
        </div>
      </template>
    </div>
    <small v-if="!items.length">{{ props.emptyState }}</small>
  </section>
</template>

<script setup>
import CardItem from './CardItem.vue';

const props = defineProps({
  title: String,
  emptyState: String,
  items: Array,
  toRoute: Function
});
</script>
