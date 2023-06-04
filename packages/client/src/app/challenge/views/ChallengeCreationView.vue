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
            v-model="challenge.start_date"
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
            v-model="challenge.amount_of_days"
            type="select"
            label="Selecteer het aantal dagen"
            placeholder="Selecteer het aantal dagen"
            name="amountOfDays"
            :options="[1, 2, 5, 7, 10]"
            validation="required"
          />
          <CustomFormKit
            v-model="challenge.group_id"
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

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { CustomFormKit } from '../../shared/index.js';
import { ChallengeSuggestionService } from '../services/challenge.suggestion.service.js';
import { useAuthStore } from '../../auth/index.js';
import { GroupService } from '../../group/services/group.service.js';
import { ChallengeService } from '../services/index.js';

export default {
  name: 'ChallengeCreationView',
  components: { CustomFormKit },
  setup() {
    const authStore = useAuthStore();
    const user = authStore.user;
    const router = useRouter();
    const suggestions = ref([]);
    const yesterday = ref();
    const groups = ref([{ label: 'Alleen ik', value: null }]);

    const populateSuggestions = async () => {
      try {
        const suggestionData = await ChallengeSuggestionService.instance().getSelection();
        suggestionData.forEach((suggestion) => suggestions.value.push(suggestion.name));
      } catch (error) {
        console.error(error);
      }
    };

    const getDate = (days) => {
      let date = new Date();
      date.setDate(date.getDate() - days);
      return date;
    };

    const populateGroups = async () => {
      try {
        const groupData = await GroupService.instance().getAllForUser(user.id);
        groupData.forEach(
          (group) =>
            (groups.value = [...groups.value, { label: group.name, value: group.id.toString() }])
        );
      } catch (error) {
        console.error(error);
      }
    };

    const challenge = ref({
      name: '',
      start_date: '',
      end_date: '',
      amount_of_days: '',
      group_id: ''
    });

    const createChallenge = () => {
      /* output submit object */
      const start = new Date(challenge.value.start_date);
      const end = new Date(
        start.setDate(start.getDate() + parseInt(challenge.value.amount_of_days) - 1)
      );
      challenge.value.end_date = end.toISOString().split('T')[0];
      delete challenge.value.amount_of_days;

      try {
        const challengeResponse = ChallengeService.instance().postChallenge(
          user.id,
          challenge.value
        );
        console.log(challengeResponse);
      } catch (error) {
        console.error(error);
      }

      /* TODO: Route to active view, routing to be done */
      router.push('/challenge/8/progress');
    };

    return {
      suggestions,
      populateSuggestions,
      yesterday,
      getDate,
      groups,
      populateGroups,
      challenge,
      createChallenge
    };
  },

  mounted() {
    this.yesterday = this.getDate(2);
    this.populateSuggestions();
    this.populateGroups();
  }
};
</script>
