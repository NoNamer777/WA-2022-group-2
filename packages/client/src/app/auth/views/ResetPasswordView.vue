<template>
  <main class="container d-flex justify-content-center">
    <section class="col-12 col-sm-10 col-lg-7" :class="{ 'd-none': done }">
      <h1>Reset Password</h1>
      <p>Welke gebruikersnaam gebruik je tijdens het inloggen?</p>
      <FormKit
        type="form"
        :actions="false"
        @submit="sendResetPasswordRequest"
        #default="{ state: { valid } }"
      >
        <CustomFormKit
          name="username"
          label="Gebruikersnaam"
          placeholder="johndoe"
          validation="required"
          v-model:model-value="username"
        />
        <CustomFormKit
          type="submit"
          label="Stuur request"
          name="submit"
          :disabled="!valid"
        ></CustomFormKit>
      </FormKit>
    </section>
  </main>
</template>

<script setup>
import { CustomFormKit } from '../../shared/components';
import { ref } from 'vue';
import { AuthService } from '../services/index.js';

/** @type {AuthService} */
const authService = AuthService.instance();

/** @type {import('vue').Ref<string>} */
const username = ref();

/** @type {import('vue').Ref<boolean>} */
const loading = ref(false);

/** @type {import('vue').Ref<boolean>} */
const done = ref(false);

/** @return {Promise<void>} */
async function sendResetPasswordRequest() {
  try {
    loading.value = true;

    await authService.requestPasswordReset(username.value);

    done.value = true;
  } catch (error) {
    console.error('Something went wrong while sending a request to reset your password', error);
  } finally {
    loading.value = false;
  }
}
</script>
