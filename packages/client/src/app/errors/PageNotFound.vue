<template>
  <main class="container d-flex align-items-center justify-content-center">
    <div class="row justify-content-center align-items-center">
      <div class="col text-center">
        <h1 class="display-1 text-primary">Oeps!</h1>
        <img class="w-25" src="/assets/images/mascot/mascotte_disappointed.png" alt="Rimuru" />
        <p class="lead my-4">Oei! Het lijkt erop dat de pagina die je zoekt, niet bestaat.</p>

        <router-link
          v-if="isAuthenticated"
          class="btn btn-primary btn-lg"
          :to="{ name: 'my-wasted' }"
        >
          Ga naar mijn wasted
        </router-link>
        <router-link v-else class="btn btn-primary btn-lg" :to="{ name: 'login' }">
          Ga naar inloggen
        </router-link>
      </div>
    </div>
  </main>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../auth/index.js';

const { isAuthenticated } = storeToRefs(useAuthStore());
</script>
