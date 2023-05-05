<script setup>
import { RouterView } from 'vue-router'
import { NavigationBar } from './components'
</script>

<template>
  <div class="container h-100 d-flex flex-column g-0">
    <ul class="visually-hidden-focusable">
      <li>
        <a href="#main"> Ga direct naar de inhoud </a>
      </li>
    </ul>
    <NavigationBar />

    <RouterView id="main" class="box mt-5" />
  </div>
</template>

<style scoped>
.box {
  padding: 2rem;
  flex: 1 1 auto;
  background: rgba(255, 255, 255, 0.9);
}

@media screen and (min-width: 580px) {
  .box {
    padding: 5rem;
  }
}
</style>
