<script setup>
import { ref } from 'vue';
import { CustomFormKit } from '../../components';
import { useAuthStore } from '../../stores';
const { login } = useAuthStore();

const user = ref({
  username: '',
  password: ''
});
</script>

<template>
  <main class="container">
    <section class="row h-100 d-flex align-items-center">
      <div class="col-xl-6 col-sm-12 mb-5">
        <h1 class="mb-5">Login</h1>
        <FormKit type="form" @submit="login(user)" :actions="false" :incomplete-message="false">
          <CustomFormKit
            v-model:modelValue="user.username"
            label="Gebruikersnaam"
            validation="required"
          />
          <CustomFormKit
            v-model:modelValue="user.password"
            type="password"
            label="Wachtwoord"
            validation="required"
          />
          <CustomFormKit type="submit" label="Login" input-class="form-btn-primary" />
        </FormKit>
        <small class="d-flex align-items-baseline">
          Heb je geen account?&nbsp;
          <router-link class="link-primary" :to="{ name: 'register' }"> Registreer </router-link>
        </small>
      </div>
      <div class="col-xl-6 col-sm-12 d-flex justify-content-center">
        <img class="float-end w-100" src="/assets/images/mascot/happy_bin_login.png" alt="mascot" />
      </div>
    </section>
  </main>
</template>
