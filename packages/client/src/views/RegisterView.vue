<script setup>
import mascot from '../assets/images/mascot/happy_bin_login.png'
import { ref } from 'vue'
import InputLabel from '../components/form/InputLabel.vue'

const user = ref({
  email: '',
  username: '',
  password: '',
  passwordRepeat: ''
})

function register() {
  console.log(user)
}
</script>

<template>
  <main class="container">
    <section class="row h-100 d-flex align-items-center">
      <div class="col-xl-6 col-sm-12 mb-5">
        <h1 class="mb-5">Registreer</h1>
        <form @submit.prevent="register">
          <InputLabel
            v-model:modelValue="user.email"
            :label="'Email'"
            :type="'email'"
            :placeholder="'Email'"
          />
          <InputLabel
            v-model:modelValue="user.username"
            :label="'Gebruikersnaam'"
            :placeholder="'Gebruikersnaam'"
          />
          <InputLabel
            v-model:modelValue="user.password"
            :label="'Wachtwoord'"
            :type="'password'"
            :placeholder="'Wachtwoord'"
          />
          <InputLabel
            v-model:modelValue="user.passwordRepeat"
            :label="'Herhaal wachtwoord'"
            :type="'password'"
            :placeholder="'Herhaal wachtwoord'"
          />
          <button class="btn btn-custom-primary w-100 text-white mt-4">Registreer</button>
        </form>
      </div>
      <div class="col-xl-6 col-sm-12 d-flex justify-content-center">
        <img class="float-end w-100" :src="mascot" alt="mascot" />
      </div>
    </section>
  </main>
</template>
