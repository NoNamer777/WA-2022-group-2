<script setup>
import { ref } from 'vue'
import { InputLabel } from '../components'
import { useAuthorStore } from '../stores'
const { login } = useAuthorStore()

const user = ref({
  username: '',
  password: ''
})
</script>

<template>
  <main class="container">
    <section class="row h-100 d-flex align-items-center">
      <div class="col-xl-6 col-sm-12 mb-5">
        <h1 class="mb-5">Login</h1>
        <FormKit type="form" @submit="login(user)" :actions="false" :incomplete-message="false">
          <InputLabel
            v-model:modelValue="user.username"
            label="Gebruikersnaam"
            validation="required"
          />
          <InputLabel
            v-model:modelValue="user.password"
            type="password"
            label="Wachtwoord"
            validation="required"
          />
          <InputLabel type="submit" label="Login" />
        </FormKit>
        <small class="d-flex align-items-baseline">
          Heb je geen account?&nbsp;
          <router-link class="btn btn-sm btn-link" :to="{ name: 'register' }">
            Registreer
          </router-link>
        </small>
      </div>
      <div class="col-xl-6 col-sm-12 d-flex justify-content-center">
        <img class="float-end w-100" src="/assets/images/mascot/happy_bin_login.png" alt="mascot" />
      </div>
    </section>
  </main>
</template>
