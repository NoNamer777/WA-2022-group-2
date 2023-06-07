<template>
  <CardList empty-state="Je hebt geen groepen" :items="props.groups" />
</template>

<script setup>
import CardList from '../../shared/components/card/CardList.vue';

const props = defineProps({
  groups: Array
});
</script>

<style scoped></style>
