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
        <FormKit type="form" @submit="register" submit-label="Register">
          <InputLabel
            v-model:modelValue="user.email"
            :name="'email'"
            :type="'email'"
            :validation="'required|email|length:5,80'"
            :label="'Email'"
            :placeholder="'Email'"
          />
          <InputLabel
            v-model:modelValue="user.username"
            :name="'username'"
            :validation="'required|length:3,80'"
            :label="'Gebruikersnaam'"
            :placeholder="'Gebruikersnaam'"
          />
          <InputLabel
            v-model:modelValue="user.password"
            :name="'password'"
            :type="'password'"
            :validation="'required|password|length:8,40'"
            :label="'Wachtwoord'"
            :placeholder="'Wachtwoord'"
          />
          <InputLabel
            v-model:modelValue="user.passwordRepeat"
            :name="'password_confirm'"
            :type="'password'"
            :validation="'required|confirm'"
            :label="'Herhaal wachtwoord'"
            :placeholder="'Herhaal wachtwoord'"
          />
        </FormKit>
      </div>
      <div class="col-xl-6 col-sm-12 d-flex justify-content-center">
        <img class="float-end w-100" :src="mascot" alt="mascot" />
      </div>
    </section>
  </main>
</template>
