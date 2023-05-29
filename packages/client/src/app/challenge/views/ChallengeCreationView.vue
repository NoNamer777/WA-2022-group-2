<template>
  <main class="container">
    <section class="row h-100 d-flex align-items-center">
      <div class="col-xl-6 col-sm-12 mb-5">
        <h1 class="mb-5">Daag een gezinslid uit voor een challenge!</h1>
        <FormKit type="form" @submit="create" :actions="false" :incomplete-message="false">
          <!--  TODO: a new table in database with challenge suggestions only, fetch e.g. 5 random suggestions -->
          <CustomFormKit
            v-model="challenge.name"
            label="Wat wil je doen?"
            name="name"
            placeholder="Fruit naar school in plaats van voorverpakte snacks!"
            validation="required|length:5,80"
            :dataList="['Challenge 1', 'Challenge 2', 'Challenge 3']"
          />
          <CustomFormKit
            v-model="challenge.startDate"
            type="date"
            label="Startdatum"
            name="startDate"
            :validation="`[['required'], ['date'], ['date_after', yesterday]]`"
            :validation-messages="{
              date_after: 'Startdatum kan niet voor gisteren zijn.'
            }"
          />
          <CustomFormKit
            v-model="challenge.amountOfDays"
            type="select"
            label="Selecteer het aantal dagen"
            placeholder="5"
            name="amountOfDays"
            :options="[5, 7, 10]"
            validation="required"
          />
          <!--  TODO: fetch users from backend -->
          <CustomFormKit
            v-model="challenge.members"
            type="select"
            :is-multiple="true"
            label="Selecteer gezinsleden"
            placeholder="Selecteer gezinsleden"
            name="members"
            :options="[
              { label: 'Jennifer', value: 1 },
              { label: 'Ahmed', value: 4 },
              { label: 'Oscar', value: 3 }
            ]"
          />
          <CustomFormKit type="submit" label="Maak challenge aan" input-class="form-btn-primary" />
        </FormKit>
      </div>
      <!-- Add image -->
    </section>
  </main>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../auth/index.js';
import { CustomFormKit } from '../../shared/index.js';

export default {
  name: 'ChallengeCreationView',
  components: { CustomFormKit },
  setup() {
    const authStore = useAuthStore();
    const user = authStore.user;
    const router = useRouter();

    const challenge = ref({
      name: '',
      startDate: '',
      amountOfDays: '',
      members: []
    });
    const create = () => {
      /* add user */
      challenge.value.members.push(user.id);
      /* output submit object */
      console.log(JSON.stringify(challenge.value));
      /* TODO: */
      /* Make logic for the following tables (in the backend):
       * - challenge (group id not supported yet in this UI), calculate end date
       * - user challenges with challenge id and user ids (including user's own id), completed false
       * - challenge days for the amount of days, with user challenge ids, earned false
       *
       * Route to active view, routing to be done */
      router.push('/challengeTest');
    };
    return {
      challenge,
      create
    };
  },
  data() {
    return {
      yesterday: Date
    };
  },
  created() {
    this.yesterday = this.getDate(2);
  },
  methods: {
    getDate(days) {
      let date = new Date();
      date.setDate(date.getDate() - days);
      return date;
    }
  }
};
</script>
