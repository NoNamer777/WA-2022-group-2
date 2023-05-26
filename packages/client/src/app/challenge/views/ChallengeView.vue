<script setup>
import { Tabs, Tab } from 'vue3-tabs-component';
import { CardList } from '../../shared/components/index.js';

const currentPersonalChallenges = [
  {
    title: 'Ahmed',
    text: '1 beker per dag'
  },
  {
    title: 'Ahmed',
    text: '1 beker per dag'
  },
  {
    title: 'Ahmed',
    text: '1 beker per dag'
  },
  {
    title: 'Ahmed',
    text: '1 beker per dag'
  }
];
const pastPersonalChallenges = [
  {
    title: 'Ahmed',
    text: '1 beker per dag'
  }
];
</script>

<template>
  <main>
    <section class="d-flex align-items-center justify-content-between">
      <h1 class="mb-4">Uitdagingen</h1>
      <router-link class="btn btn-primary" :to="{ name: 'challenge_create' }">
        Aanmaken
      </router-link>
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
          <Tab name="Huidige">
            <CardList
              empty-state="Je hebt geen uitdagingen momenteel open staan"
              :items="currentPersonalChallenges"
            />
          </Tab>
          <Tab name="Afgerond">
            <CardList
              empty-state="Je hebt geen uitdagingen momenteel open staan"
              :items="pastPersonalChallenges"
            />
          </Tab>
        </Tabs>
      </div>
    </section>
  </main>
</template>
