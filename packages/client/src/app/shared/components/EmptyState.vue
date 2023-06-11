<script setup>
const props = defineProps({
  emptyState: String
});
</script>

<template>
  <div class="d-flex flex-column gap-3 align-items-center">
    <img
      class="mascotte"
      src="/assets/images/mascot/mascotte_disappointed.png"
      alt="Mascotte boos!"
    />
    <small class="bubble text-white bg-primary p-2">{{ props.emptyState }}</small>
  </div>
</template>

<style scoped>
.bubble {
  border-radius: 10px;
}

.mascotte {
  width: 30%;
}
</style>
