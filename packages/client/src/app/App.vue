<template>
  <div v-if="!loading" class="container h-100 d-flex flex-column g-0">
    <notifications position="bottom left" :duration="5000" />
    <div id="top" tabindex="-1" aria-labelledby="skip-link">
      <div class="visually-hidden-focusable">
        <a href="#main" id="skip-link"> Ga direct naar de inhoud </a>
      </div>
    </div>
    <NavigationBar />

    <RouterView id="main" class="box mt-5" />
  </div>
</template>

<style scoped>
.box {
  padding: 2rem;
  flex: 1 1 auto;
  background: rgba(255, 255, 255, 0.8);
}

@media screen and (min-width: 580px) {
  .box {
    padding: 5rem;
  }
}
</style>

<script setup>
import { RouterView } from 'vue-router';
import { NavigationBar } from './shared/index.js';
import { storeToRefs } from 'pinia';
import { useAuthStore } from './auth/index.js';

const { loading } = storeToRefs(useAuthStore());
</script>
