<template>
  <button
    @click="handleModalOpen"
    type="button"
    class="btn btn-primary h-100"
    data-bs-toggle="modal"
    data-bs-target="#join-group"
  >
    Deelnemen aan groep
  </button>
  <div
    class="modal fade"
    ref="modal"
    id="join-group"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Deelnemen aan groep</h1>
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
            @submit="joinGroupRequest"
            #default="{ state: { valid } }"
          >
            <CustomFormKit
              name="code"
              label="Groepscode"
              placeholder="Vul de groepscode in! 🎮"
              validation="required|length:1,32"
              v-model:model-value="code"
            />
            <CustomFormKit
              type="submit"
              label="Deelnemen"
              name="submit"
              input-class="form-btn-primary"
              :disabled="!valid"
            ></CustomFormKit>
          </FormKit>
          <div v-else>
            <p>
              Je bent nu lid geworden van <span class="text-primary">{{ group.name }}</span> !
            </p>
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

const { joinGroup } = useGroupStore();

/** @type {import('vue').Ref<string>} */
let code = ref('');

/** @type {import('vue').Ref<Object>} */
let group = ref({});

/** @type {import('vue').Ref<Object>} */
const modal = ref(null);
/** @return {Promise<void>} */
async function joinGroupRequest() {
  group.value = await joinGroup(code.value);
}

const handleModalOpen = () => {
  group.value = null;
  code.value = null;
};
</script>
