<script setup>
import { ref } from 'vue'
import { InputLabel } from '../components'

const user = ref({
  username: '',
  password: ''
})

function login() {
  console.log(user)
}
</script>

<template>
  <main class="container">
    <section class="row h-100 d-flex align-items-center">
      <div class="col-xl-6 col-sm-12 mb-5">
        <h1 class="mb-5">Login</h1>
        <FormKit type="form" @submit="login" submit-label="Login">
          <InputLabel
            v-model:modelValue="user.username"
            :label="'Gebruikersnaam'"
            :validation="'required'"
            :placeholder="'Gebruikersnaam'"
          />
          <InputLabel
            v-model:modelValue="user.password"
            :validation="'required'"
            :type="'password'"
            :label="'Wachtwoord'"
            :placeholder="'Wachtwoord'"
          />
        </FormKit>
        <small class="d-flex">
          Heb je geen account?&nbsp;
          <router-link class="nav-link text-info" :to="{ name: 'register' }">
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
