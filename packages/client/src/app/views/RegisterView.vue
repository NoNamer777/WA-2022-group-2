<script setup>
import InputLabel from '../components/form/InputLabel.vue'

import { ref } from 'vue'
import { useAuthStore } from '../stores'
const { register } = useAuthStore()

const user = ref({
  email: '',
  username: '',
  password: '',
  password_confirm: ''
})
</script>

<template>
  <main class="container">
    <section class="row h-100 d-flex align-items-center">
      <div class="col-xl-6 col-sm-12 mb-5">
        <h1 class="mb-5">Registreer</h1>
        <FormKit type="form" @submit="register(user)" :actions="false" :incomplete-message="false">
          <InputLabel
            v-model:modelValue="user.email"
            type="email"
            label="Email"
            name="email"
            placeholder="email@example.com"
            validation="required|email|length:5,80"
          />
          <InputLabel
            v-model:modelValue="user.username"
            label="Gebruikersnaam"
            name="username"
            placeholder="johndoe"
            validation="required|length:3,80"
          />
          <InputLabel
            v-model:modelValue="user.password"
            type="password"
            label="Wachtwoord"
            name="password"
            placeholder="Combinatie van hoofdletters, kleine letters, cijfers en speciale tekens."
            validation="required|password|length:8,40"
          />
          <InputLabel
            v-model:modelValue="user.password_confirm"
            type="password"
            label="Herhaal wachtwoord"
            name="password_confirm"
            placeholder="Herhaal het wachtwoord"
            validation="required|confirm"
          />
          <InputLabel type="submit" label="Registreer" />
        </FormKit>
      </div>
      <div class="col-xl-6 col-sm-12 d-flex justify-content-center">
        <img class="float-end w-100" src="/assets/images/mascot/happy_bin_login.png" alt="mascot" />
      </div>
    </section>
  </main>
</template>
