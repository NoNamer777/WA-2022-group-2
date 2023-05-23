<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth.store.js';
import { CustomFormKit } from '../../shared/components/index.js';

const { register } = useAuthStore();
const user = ref({
  email: '',
  username: '',
  password: '',
  passwordConfirm: ''
});
</script>

<template>
  <main class="container">
    <section class="row h-100 d-flex align-items-center">
      <div class="col-xl-6 col-sm-12 mb-5">
        <h1 class="mb-5">Registreer</h1>
        <FormKit type="form" @submit="register(user)" :actions="false" :incomplete-message="false">
          <CustomFormKit
            v-model:modelValue="user.email"
            type="email"
            label="Email"
            name="email"
            placeholder="email@example.com"
            validation="required|email|length:5,80"
          />
          <CustomFormKit
            v-model:modelValue="user.username"
            label="Gebruikersnaam"
            name="username"
            placeholder="johndoe"
            validation="required|length:3,80"
          />
          <CustomFormKit
            v-model:modelValue="user.password"
            type="password"
            label="Wachtwoord"
            name="password"
            placeholder="Combinatie van hoofdletters, kleine letters, cijfers en speciale tekens."
            validation="required|password|length:8,40"
          />
          <CustomFormKit
            v-model:modelValue="user.passwordConfirm"
            type="password"
            label="Herhaal wachtwoord"
            name="password_confirm"
            placeholder="Herhaal het wachtwoord"
            validation="required|confirm"
          />
          <CustomFormKit type="submit" label="Registreer" input-class="form-btn-primary" />
        </FormKit>
      </div>
      <div class="col-xl-6 col-sm-12 d-flex justify-content-center">
        <img class="float-end w-100" src="/assets/images/mascot/happy_bin_login.png" alt="mascot" />
      </div>
    </section>
  </main>
</template>
