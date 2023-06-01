<template>
  <main class="container d-flex justify-content-center">
    <section class="col-12 col-sm-10 col-lg-7" :class="{ 'd-none': done$ }">
      <h1>Reset Password</h1>
      <p>Wat is het email addres wat je gekoppeld hebt aan je account?</p>
      <FormKit
        type="form"
        :actions="false"
        @submit="sendResetPasswordRequest"
        #default="{ state: { valid } }"
      >
        <CustomFormKit
          name="email"
          label="Email addres"
          placeholder="voorbeeld@host.nl"
          validation="required|email"
          v-model:model-value="email$"
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
import { notify } from '@kyvg/vue3-notification';

const authService = AuthService.instance();

/** @type {import('vue').Ref<string>} */
const email$ = ref();
const loading$ = ref(false);
const done$ = ref(false);

async function sendResetPasswordRequest() {
  try {
    loading$.value = true;

    await authService.requestPasswordReset(email$.value);

    done$.value = true;
  } catch (error) {
    console.error('Something went wrong while sending a request to reset your password', error);
  } finally {
    loading$.value = false;
  }
}
</script>
