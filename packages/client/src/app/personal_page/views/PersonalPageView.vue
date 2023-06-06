<script setup>
import { Tab, Tabs } from 'vue3-tabs-component';
</script>

<template>
  <main>
    <section class="d-flex align-items-center justify-content-between">
      <h1 class="mb-4">Mijn wasted</h1>
      <router-link class="btn btn-primary" :to="{ name: 'home' }"> Aanmaken </router-link>
    </section>
    <section>
      <div>
        <Tabs
          nav-class="nav nav-tabs"
          nav-item-class="nav-item"
          nav-item-link-class="nav-link"
          nav-item-link-active-class="active"
          panels-wrapper-class="my-4"
        >
          <Tab name="Badges"> </Tab>
          <Tab name="Groepen"> </Tab>
        </Tabs>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
