<template>
  <main class="container">
    <section class="row h-100 d-flex align-items-center">
      <div class="col-xl-6 col-sm-12 mb-5">
        <h1 class="mb-5">Daag je groepsleden uit voor een challenge!</h1>
        <FormKit type="form" @submit="createChallenge" :actions="false" :incomplete-message="false">
          <CustomFormKit
            v-model="challenge.name"
            label="Wat wil je doen?"
            name="challenge-name"
            placeholder="Fruit naar school in plaats van voorverpakte snacks"
            validation="required|length:5,80"
            :dataList="suggestions"
          />
          <CustomFormKit
            v-model="challenge.startDate"
            type="date"
            label="Startdatum"
            name="startDate"
            :validation="[['required'], ['date'], ['date_after', yesterday]]"
            :validation-messages="{
              date_after: 'Startdatum kan niet voor gisteren zijn.'
            }"
          />
          <!-- TODO: Remove challenge for one and two days (for dev purposes) -->
          <CustomFormKit
            v-model="challenge.numberOfDays"
            type="select"
            label="Selecteer het aantal dagen"
            placeholder="Selecteer het aantal dagen"
            name="numberOfDays"
            :options="[1, 2, 5, 7, 10]"
            validation="required"
          />
          <CustomFormKit
            v-model="challenge.groupId"
            type="select"
            label="Selecteer groep"
            placeholder="Selecteer groep"
            name="group"
            :options="groups"
            help="Zie je geen groepen? Maak er een aan op Mijn Wasted!"
          />
          <CustomFormKit type="submit" label="Maak challenge aan" input-class="form-btn-primary" />
        </FormKit>
      </div>
      <!-- TODO: Add image -->
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ChallengeSuggestionService, ChallengeService } from '../services';
import { useAuthStore } from '../../auth';
import { GroupService } from '../../group';
import { CustomFormKit } from '../../shared';
import { storeToRefs } from 'pinia';

const { user: authenticatedUser } = storeToRefs(useAuthStore());
const router = useRouter();

/** @type {import('vue').Ref<string[]>} */
const suggestions = ref([]);

/** @type {import('vue').Ref<Date>} */
const yesterday = ref();

/** @type {import('vue').Ref<[{ label: string, value: string | null }]>} */
const groups = ref([{ label: 'Alleen ik', value: null }]);

/** @type {import('vue').Ref<Challenge>} */
const challenge = ref({
  name: '',
  startDate: '',
  endDate: '',
  numberOfDays: '1',
  groupId: null
});

onMounted(async () => {
  yesterday.value = getDate(2);
  await populateSuggestions();
  await populateGroups();
});

/** @return {Promise<void>} */
async function populateSuggestions() {
  try {
    const results = await ChallengeSuggestionService.instance().getSuggestions();

    results.forEach((suggestion) => (suggestions.value = [...suggestions.value, suggestion.name]));
  } catch (error) {
    console.error(error);
  }
}

/** @return {Promise<void>} */
async function populateGroups() {
  try {
    const groupData = await GroupService.instance().getAllForUser(authenticatedUser.value.id);
    groupData.forEach(
      (group) =>
        (groups.value = [...groups.value, { label: group.name, value: group.id.toString() }])
    );
  } catch (error) {
    console.error(error);
  }
}

/** @return {Promise<void>} */
async function createChallenge() {
  const start = new Date(challenge.value.startDate);
  const end = new Date(start.setDate(start.getDate() + parseInt(challenge.value.numberOfDays)) - 1);

  challenge.value.endDate = end.toISOString().split('T')[0];

  try {
    const challengeResponse = await ChallengeService.instance().create(
      authenticatedUser.value.id,
      challenge.value
    );
    await router.push({
      name: 'challenge_progress',
      params: { challengeId: challengeResponse.id }
    });
  } catch (error) {
    console.error(error);
  }
}

/** @return {Date} */
function getDate(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);

  return date;
}
</script>
