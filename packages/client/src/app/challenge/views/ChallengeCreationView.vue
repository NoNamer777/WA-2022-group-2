<template>
  <main class="container">
    <section class="row h-100 d-flex align-items-center">
      <div class="col-xl-6 col-sm-12 mb-5">
        <h1 class="mb-5">Daag je gezinsleden uit voor een challenge!</h1>
        <FormKit type="form" @submit="createChallenge" :actions="false" :incomplete-message="false">
          <CustomFormKit
            v-model="challenge.name"
            label="Wat wil je doen?"
            name="name"
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
          <CustomFormKit
            v-model="challenge.amountOfDays"
            type="select"
            label="Selecteer het aantal dagen"
            placeholder="Selecteer het aantal dagen"
            name="amountOfDays"
            :options="[5, 7, 10]"
            validation="required"
          />
          <!--  TODO: fetch groups from backend -->
          <CustomFormKit
            v-model="challenge.group"
            type="select"
            label="Selecteer groep"
            placeholder="Selecteer groep"
            name="group"
            :options="[
              { label: 'Groep 1', value: 1 },
              { label: 'Groep 2', value: 2 },
              { label: 'Alleen ik', value: null }
            ]"
            help="Zie je geen groepen? Maak er een aan op Mijn Wasted!"
          />
          <CustomFormKit type="submit" label="Maak challenge aan" input-class="form-btn-primary" />
        </FormKit>
      </div>
      <!-- TODO: Add image -->
    </section>
  </main>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { CustomFormKit } from '../../shared/index.js';
import { ChallengeSuggestionService } from '../services/challenge.suggestion.service.js';

export default {
  name: 'ChallengeCreationView',
  components: { CustomFormKit },
  setup() {
    const router = useRouter();
    const suggestions = [];
    const yesterday = ref();

    const populateSuggestions = () => {
      ChallengeSuggestionService.instance()
        .getSelection()
        .then((challenges) => {
          challenges.forEach((challenge) => {
            suggestions.push(challenge.name);
          });
        });
    };

    const getDate = (days) => {
      let date = new Date();
      date.setDate(date.getDate() - days);
      return date;
    };

    const challenge = ref({
      name: '',
      startDate: '',
      amountOfDays: '',
      group: ''
    });
    const createChallenge = () => {
      /* output submit object */
      console.log(JSON.stringify(challenge.value));
      /* TODO: */
      /* Make logic for the following tables (in the backend):
       * - challenge (group id not supported yet in this UI), calculate end date
       * - user challenges with challenge id and user ids (including user's own id), completed false
       * - challenge days for the amount of days, with user challenge ids, earned false
       *
       * Route to active view, routing to be done */
      router.push('/challenge');
    };
    return {
      suggestions,
      populateSuggestions,
      yesterday,
      getDate,
      challenge,
      createChallenge
    };
  },
  mounted() {
    this.yesterday = this.getDate(2);
    this.populateSuggestions();
  }
};
</script>
