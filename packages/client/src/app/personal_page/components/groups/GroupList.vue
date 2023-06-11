<template>
  <CardList
    empty-state="Je zit helaas nog niet in een groep. Nodig iemand uit en maak een groep aan!"
    :items="props.groups"
  />
</template>

<script setup>
import CardList from '../../../shared/components/card/CardList.vue';

const props = defineProps({
  groups: Array
});
</script>
