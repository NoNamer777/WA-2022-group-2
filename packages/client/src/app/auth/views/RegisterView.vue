<template>
  <main class="container">
    <section class="row h-100 d-flex align-items-center">
      <div class="col-xl-6 col-sm-12 mb-5">
        <template v-if="success">
          <h1 class="mb-5">Het is gelukt</h1>
          <p>Je hebt met veel success een account geregistreed.</p>
          <p>
            Er is een email gestuurd naar "{{ user.email }}" om je registratie te bevestigen. Nadat
            je dat hebt gedaan ben je helemaal klaar om de uitdaging aan te gaan.
          </p>
        </template>
        <template v-else>
          <h1 class="mb-5">Registreer</h1>
          <FormKit
            type="form"
            :actions="false"
            :incomplete-message="false"
            #default="{ state: { valid } }"
            @submit="onRegister()"
          >
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
            <CustomFormKit
              type="submit"
              label="Registreer"
              input-class="form-btn-primary"
              :disabled="!valid"
            />
          </FormKit>
        </template>
      </div>
      <div class="col-xl-6 col-sm-12 d-flex justify-content-center">
        <img class="float-end w-50" src="/assets/images/mascot/mascotte_happy.png" alt="mascot" />
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth.store.js';
import { CustomFormKit } from '../../shared/components/index.js';

const { register } = useAuthStore();

/** @type {import('vue').Ref<{ email: string, username: string, password: string, passwordConfirm: string }>} */
const user = ref({
  email: '',
  username: '',
  password: '',
  passwordConfirm: ''
});

/** @type {import('vue').Ref<boolean>} */
const success = ref(false);

/** @return {Promise<void>} */
async function onRegister() {
  try {
    await register(user.value);

    success.value = true;
  } catch (error) {
    console.error(error);
  }
}
</script>
