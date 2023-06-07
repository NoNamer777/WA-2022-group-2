<template>
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#new-group">
    Groep aanmaken
  </button>
  <div
    class="modal fade"
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
            v-if="!group.value"
            type="form"
            :actions="false"
            @submit="createGroupRequest"
            #default="{ state: { valid } }"
          >
            <CustomFormKit
              name="username"
              label="Naam"
              placeholder="johndoe"
              validation="required"
              v-model:model-value="name"
            />
            <CustomFormKit
              type="submit"
              label="Stuur request"
              name="submit"
              input-class="form-btn-primary"
              :disabled="!valid"
            ></CustomFormKit>
          </FormKit>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CustomFormKit } from '../../shared/components';
import { ref } from 'vue';
import { usePersonalPageStore } from '../stores/personal_page.store.js';

/** @type {import('vue').Ref<string>} */
const name = ref();

/** @type {import('vue').Ref<boolean>} */
const group = ref({});

/** @return {Promise<void>} */
async function createGroupRequest() {
  const { createGroup } = usePersonalPageStore();
  group.value = createGroup(name);
}
</script>

<style scoped></style>
