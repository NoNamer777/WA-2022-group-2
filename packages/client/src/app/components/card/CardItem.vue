<script setup>
const props = defineProps({
  clickable: Boolean,
  title: String,
  text: String
});
</script>

<template>
  <div class="card" :class="{ 'card-clickable': props.clickable }">
    <div class="card-body">
      <h5 class="card-title fw-bold">{{ props.title }}</h5>
      <p class="card-text">{{ props.text }}</p>
    </div>
  </div>
</template>

<style>
.card-clickable:hover {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  cursor: pointer;
}
</style>
