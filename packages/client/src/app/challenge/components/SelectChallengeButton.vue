<template>
  <div class="btn-group">
    <button
      type="button"
      class="btn btn-sm btn-tertiary text-dark dropdown-toggle my-2 ms-1"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Wissel challenge
    </button>
    <ul class="dropdown-menu" role="menu">
      <li>
        <a class="dropdown-item small" role="menuitem" :href="'/challenge/create'">
          Maak nieuwe challenge aan
        </a>
      </li>
      <li class="dropdown-divider" />
      <li v-for="challenge in activeChallenges" :key="challenge.id">
        <a
          class="dropdown-item small"
          role="menuitem"
          :href="`/challenge/${challenge.id}/progress`"
        >
          {{ challenge.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { ChallengeService } from '../services';
import { useAuthStore } from '../../auth';
import { storeToRefs } from 'pinia';

const { user: authenticatedUser } = storeToRefs(useAuthStore());

/** @type {import('vue').Ref<Array<Challenge[]>>} */
const activeChallenges = ref([]);

onMounted(async () => {
  await getAllActiveChallengesForUser();
});

async function getAllActiveChallengesForUser() {
  try {
    activeChallenges.value = (
      await ChallengeService.instance().getAllForUser(authenticatedUser.value.id)
    ).activeChallenges;
  } catch (error) {
    console.error(error);
  }
}
</script>
