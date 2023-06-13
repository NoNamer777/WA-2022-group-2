<template>
  <nav class="navbar navbar-dark navbar-expand-lg bg-primary mt-xl-5 p-4">
    <div class="container-fluid">
      <a class="navbar-brand text-white fw-bolder pe-5">Wasted</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 gap-xl-4">
          <li class="nav-item">
            <router-link class="nav-link text-white fw-bolder" :to="{ name: 'home' }">
              Hoofdpagina
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white fw-bolder" :to="{ name: 'challenges' }">
              Challenges
            </router-link>
          </li>
        </ul>
        <hr class="d-xl-none" />
        <ul class="navbar-nav mb-2 mb-lg-0 gap-2 gap-xl-4">
          <template v-if="!isAuthenticated">
            <li class="nav-item">
              <router-link class="nav-link text-white fw-bolder" :to="{ name: 'login' }">
                Inloggen
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="btn bg-white text-primary focus-auto fw-bolder"
                :to="{ name: 'register' }"
              >
                Registreer
              </router-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link class="nav-link text-white fw-bolder" :to="{ name: 'my-wasted' }">
                Mijn Wasted
              </router-link>
            </li>
            <li class="nav-item">
              <button class="btn bg-white text-primary focus-auto fw-bolder" @click="logout">
                Uitloggen
              </button>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-brand {
  font-size: 23px;
}

.nav-link {
  font-size: 18px;
}
</style>

<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../../../auth/index.js';

const { logout } = useAuthStore();
const { isAuthenticated } = storeToRefs(useAuthStore());
</script>
