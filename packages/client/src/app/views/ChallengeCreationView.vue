<template>
  <main class="container">
    <section class="row h-100 d-flex align-items-center">
      <div class="col-xl-6 col-sm-12 mb-5">
        <h1 class="mb-5">Daag een gezinslid uit voor een challenge!</h1>
        <FormKit
          type="form"
          @submit="create(challenge)"
          :actions="false"
          :incomplete-message="false"
        >
          <CustomFormKit
            v-model:value="challenge"
            label="Wat wil je doen?"
            name="text"
            placeholder="Fruit naar school in plaats van voorverpakte snacks!"
            validation="required|length:5,80"
          />
          <CustomFormKit
            v-model:value="challenge"
            type="date"
            label="Startdatum"
            name="startDate"
            :validation="[['required'], ['date'], ['date_after', yesterday]]"
            :validation-messages="{
              date_after: 'Startdatum kan niet voor gisteren zijn.'
            }"
          />
          <CustomFormKit
            v-model:value="challenge"
            type="select"
            label="Selecteer het aantal dagen"
            placeholder="5"
            name="days"
            :options="[5, 7, 14]"
            validation="required"
          />
          <CustomFormKit
            v-model:value="challenge"
            type="select"
            multiple
            label="Selecteer gezinsleden"
            placeholder="Selecteer gezinsleden"
            name="members"
            :options="[
              { label: 'Jennifer', value: 1 },
              { label: 'Ahmed', value: 4 },
              { label: 'Oscar', value: 3 }
            ]"
            validation="required"
          />
          <CustomFormKit type="submit" label="Maak aan" input-class="form-btn-primary" />
        </FormKit>
      </div>
      <!--      <div class="col-xl-6 col-sm-12 d-flex justify-content-center">-->
      <!--        <img class="float-end w-100" src="/assets/images/mascot/happy_bin_login.png" alt="mascot" />-->
      <!--      </div>-->
    </section>
  </main>
</template>

<script>
import CustomFormKit from '../components/form/CustomFormKit.vue'

export default {
  name: 'ChallengeCreationView.vue',
  components: { CustomFormKit },
  data() {
    return {
      yesterday: Date
    }
  },
  created() {
    this.yesterday = this.getDate(2)
  },
  methods: {
    create(challenge) {
      console.log(challenge)
    },
    getDate(days) {
      let date = new Date()
      date.setDate(date.getDate() - days)
      return date
    }
  }
}
</script>
