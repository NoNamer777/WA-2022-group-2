<template>
  <main class="d-flex flex-column flex-md-row gap-5 align-items-center">
    <section>
      <h1 class="mb-4">Wat is Wasted?</h1>
      <p class="mb-4 lead">
        Welkom op de website!<br /><br />
        Misschien heb je er nooit bij stilgestaan, maar de aarde is al 4,6 miljard jaar oud! Op dit
        moment worden er veel plastic flessen weggegooid. Wil jij ons meehelpen de wereld een dagje
        langer mee te laten draaien? <br /><br /><span aria-hidden="true">📝✍️🌐 + 🤝🎮🕹️📲</span>
      </p>
      <router-link v-if="!isAuthenticated" class="btn btn-primary me-3" :to="{ name: 'register' }">
        Registreer
      </router-link>
    </section>
    <img class="w-50 h-50" src="/assets/images/mascot/mascotte_happy.png" alt="Rimuru" />
  </main>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../../auth/index.js';

const { isAuthenticated } = storeToRefs(useAuthStore());
</script>
