<script setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores'
const { logout } = useAuthStore()

const { isAuthenticated } = storeToRefs(useAuthStore())
</script>

<template>
  <nav class="navbar navbar-dark navbar-expand-lg bg-primary mt-xl-5 p-4">
    <div class="container-fluid">
      <a class="navbar-brand text-white fw-bolder">Wasted</a>
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
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link text-white" :to="{ name: 'home' }">
              Hoofdpagina
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" :to="{ name: 'home' }">Quiz</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" :to="{ name: 'challenge' }">
              Uitdaging
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" :to="{ name: 'home' }">Info</router-link>
          </li>
        </ul>
        <hr class="d-xl-none" />
        <ul class="navbar-nav mb-2 mb-lg-0">
          <template v-if="!isAuthenticated">
            <li class="nav-item">
              <router-link class="nav-link text-white" :to="{ name: 'login' }">
                Inloggen
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="btn bg-white text-primary focus-auto" :to="{ name: 'register' }">
                Registreer
              </router-link>
            </li>
          </template>
          <li class="nav-item" v-else>
            <button class="btn bg-white" @click="logout">Uitloggen</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
