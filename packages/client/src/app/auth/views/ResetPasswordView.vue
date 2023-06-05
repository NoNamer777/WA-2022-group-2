<template>
  <main class="container d-flex justify-content-center">
    <section class="col-12 col-sm-10 col-lg-7">
      <template v-if="done">
        <h1>Success</h1>
        <p>
          Je wachtwoord is successvol veranderd.
          <br /><br />
          Log nu snel in om verder te gaan met je challenges.
        </p>
      </template>
      <template v-else>
        <h1>Wachtwoord herstellen</h1>
        <p>Voer je nieuwe wachtwoord in</p>
        <FormKit
          type="form"
          :actions="false"
          @submit="onResetPassword"
          #default="{ state: { valid } }"
        >
          <CustomFormKit
            type="password"
            name="password"
            label="Wachtwoord"
            validation="required|password|length:8,40"
            v-model:model-value="form.password"
          />
          <CustomFormKit
            type="password"
            name="passwordConfirm"
            label="Bevestig Wachtwoord"
            validation="required|confirm:password"
            v-model:model-value="form.passwordConfirm"
          />
          <CustomFormKit
            type="submit"
            label="Bevestigen"
            name="submit"
            input-class="form-btn-primary"
            :disabled="!valid"
          ></CustomFormKit>
        </FormKit>
      </template>
    </section>
  </main>
</template>

<script setup>
import { CustomFormKit } from '../../shared/components';
import { onBeforeMount, ref } from 'vue';
import { AuthService } from '../services/index.js';
import { useRoute, useRouter } from 'vue-router';

/** @type {AuthService} */
const authService = AuthService.instance();

/** @type {import('vue-router').Router} */
const router = useRouter();

/** @type {import('vue-router').RouteLocationNormalizedLoaded} */
const route = useRoute();

/** @type {import('vue').Ref<{ password: string, passwordConfirm: string }>} */
const form = ref({
  password: null,
  passwordConfirm: null
});

/** @type {import('vue').Ref<boolean>} */
const done = ref(false);

onBeforeMount(async () => {
  const token = route.query['token'];

  await storeTokenFromRoute(token);
});

/** @return {Promise<void>} */
async function onResetPassword() {
  try {
    await authService.resetPassword(form.value);

    done.value = true;

    // Remove the stored token once the password has been reset.
    localStorage.removeItem('jwt-token');
  } catch (error) {
    console.error('Something went wrong while requesting a reset of your password', error);
  }
}

/** @return {Promise<void>} */
async function storeTokenFromRoute(token) {
  if (!token) return;
  // Save the token that is passed along from the email to the localstorage,
  // so that we can pass it along via the http request.
  localStorage.setItem('jwt-token', token);

  // Remove the token from the route, so that it is not visible anymore for a User.
  await router.replace({ query: {} });
}
</script>
