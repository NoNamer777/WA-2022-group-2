<template>
  <button
    @click="handleModalOpen"
    type="button"
    class="btn btn-primary h-100"
    data-bs-toggle="modal"
    data-bs-target="#new-group"
  >
    Groep aanmaken
  </button>
  <div
    class="modal fade"
    ref="modal"
    id="new-group"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Groep aanmaken</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <FormKit
            v-if="!group"
            type="form"
            :actions="false"
            @submit="createGroupRequest"
            #default="{ state: { valid } }"
          >
            <CustomFormKit
              name="name"
              label="Naam"
              placeholder="Vul je groepsnaam in! 🎮"
              validation="required|length:3,255"
              v-model:model-value="name"
            />
            <CustomFormKit
              type="submit"
              label="Aanmaken"
              name="submit"
              input-class="form-btn-primary"
              :disabled="!valid"
            ></CustomFormKit>
          </FormKit>
          <div v-else>
            <p>
              <span class="text-primary">{{ group.name }}</span> is aangemaakt! Deel de onderstaande
              code met andere!
            </p>
            <div class="input-group mb-3">
              <input :value="group.code" readonly />
              <button class="btn btn-primary" @click="copyToClipboard">Kopiëren</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

<script setup>
import { CustomFormKit } from '../../shared/components/index.js';
import { ref } from 'vue';
import { useGroupStore } from '../stores/group.store.js';

/** @type {import('vue').Ref<string>} */
let name = ref('');

/** @type {import('vue').Ref<Object>} */
let group = ref({});

/** @type {import('vue').Ref<Object>} */
const modal = ref(null);
/** @return {Promise<void>} */
async function createGroupRequest() {
  const { createGroup } = useGroupStore();
  group.value = await createGroup(name.value);
}

function handleModalOpen() {
  group.value = null;
  name.value = null;
}

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(group.value.code);
    alert('gekopieërd!');
  } catch (err) {
    alert('Er is iets misgegaan');
    console.error(err);
  }
}
</script>
