<template>
  <main class="container d-flex justify-content-center">
    <section class="col-12 col-sm-10 col-lg-7">
      <template v-if="done">
        <h1>Gelukt</h1>
        <p>
          Jou account is nog volledig geregistreed en je bent klaar om de uitdaging aan te gaan.
        </p>
      </template>
      <template v-else>
        <div class="spinner-border"></div>
      </template>
    </section>
  </main>
</template>

<style scoped></style>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AuthService } from '../services/index.js';

/** @type {import('vue-router').Router} */
const router = useRouter();

/** @type {import('vue-router').RouteLocationNormalizedLoaded} */
const route = useRoute();

/** @type {AuthService} */
const authService = AuthService.instance();

/** @type {import('vue').Ref<boolean>} */
const done = ref(false);

onMounted(async () => {
  const token = retrieveTokenFromURL();

  await router.replace({ query: {} });

  storeTokenInLocalStorage(token);

  try {
    await authService.confirmRegistration();

    localStorage.removeItem('jwt-token');
  } catch (error) {}
});

function retrieveTokenFromURL() {
  return route.query['token'];
}

function storeTokenInLocalStorage(token) {
  if (token) return;

  localStorage.setItem('jwt-token', token);
}
</script>
