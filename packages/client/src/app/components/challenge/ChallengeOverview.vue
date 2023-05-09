<script setup>
import CardList from '../card/CardList.vue'

const props = defineProps({
  current: Array,
  past: Array
})
</script>

<template>
  <section>
    <CardList
      title="Huidige uitdagingen"
      empty-state="Je hebt geen uitdagingen momenteel open staan"
      :items="props.current"
    />
    <CardList
      title="Uitdagingen uit het verleden"
      empty-state="Je hebt geen uitdagingen gedaan in het verleden"
      :items="props.past"
    />
  </section>
</template>
