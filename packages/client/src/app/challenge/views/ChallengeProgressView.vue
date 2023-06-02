<template>
  <main>
    <div class="d-flex flex-row flex-wrap justify-content-between">
      <div>
        <div class="mb-1 w-100">
          <div v-if="isEditing" tabindex="-1" ref="input">
            <FormKit type="form" @submit="saveText" :actions="false" :incomplete-message="false">
              <CustomFormKit
                @submit="saveText"
                v-model="challenge.name"
                label="Challenge naam"
                name="name"
                :placeholder="challenge.name"
                validation="required|length:5,80"
              />
              <div>
                <CustomFormKit type="submit" label="Sla op" input-class="form-btn-tertiary" />
              </div>
            </FormKit>
          </div>
          <div v-else class="d-flex flex-row flex-wrap w-100 mr-auto justify-content-between">
            <h1>{{ challenge.name }}</h1>
          </div>
          <p class="fw-bold">
            Startdatum: <span class="fw-normal">{{ startDate }}</span>
          </p>
        </div>
        <p class="fw-bold">
          Vandaag:
          <span class="fw-normal"> {{ dayTitle }}</span>
        </p>
      </div>
      <div v-if="!isEditing" class="h-25 mb-2 d-flex flex-wrap">
        <div class="btn-group">
          <button
            type="button"
            ref="editButton"
            class="btn btn-sm btn-secondary dropdown-toggle my-2 me-1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Pas challenge aan
          </button>
          <ul class="dropdown-menu" role="menu">
            <li>
              <button class="dropdown-item small" role="menuitem" @click="adjustText">
                Pas titel aan
              </button>
            </li>
            <li>
              <button class="dropdown-item small" role="menuitem" @click="leaveChallenge">
                Verlaat challenge
              </button>
            </li>
          </ul>
        </div>
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
            <!-- TODO: v-if if available, for each for the amount of challenges with link-->
            <li>
              <a class="dropdown-item small" role="menuitem" href="#">
                Andere challenge met een lange titel
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="d-flex flex-row flex-wrap justify-content-start gap-xl-2">
      <ChallengeProgress
        v-for="userChallenge in userChallenges"
        :key="userChallenge.id"
        :userChallengeId="userChallenge.id"
        :todayNumber="todayNumber"
        :isActive="isActive"
        :isOwner="getIsOwner(userChallenge)"
        :class="getClass(userChallenge)"
      />
    </div>
  </main>
</template>

<script>
import { ChallengeProgress } from '../components/index.js';
import data from '../data.json';
import { useAuthStore } from '../../auth/index.js';
import CustomFormKit from '../../shared/components/form/CustomFormKit.vue';
import { nextTick } from 'vue';

/* TODO: send in user and challenge, move logic to backend, refactor to composition API */

export default {
  name: 'ChallengeProgressView',
  components: { CustomFormKit, ChallengeProgress },
  setup() {
    const authStore = useAuthStore();
    const user = authStore.user;
    return { user };
  },
  data() {
    return {
      challenge: Object,
      userChallenges: [],
      startDate: Date,
      today: Date,
      todayNumber: Number,
      dayTitle: String,
      isActive: Boolean,
      isEditing: Boolean
    };
  },
  created() {
    this.challenge = data.challenges[0];
    this.userChallenges = this.getAndSortUserChallenges();
    this.startDate = this.getDateString(data.challenges[0].start_date);
    this.today = this.getDateString(new Date());
    this.todayNumber = this.getTodaysDayNumber();
    this.isActive = this.getIsActive();
    this.dayTitle = this.getTodayTitle();
    this.isEditing = false;
  },
  methods: {
    getAndSortUserChallenges() {
      const sorted = data.user_challenges.sort((a, b) => a.username < b.username);
      return sorted.sort((a, b) => (b.user_id === this.user.id) - (a.user_id === this.user.id));
    },
    getDateString(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('nl-NL', options);
    },
    getTodaysDayNumber() {
      const startDate = new Date(data.challenges[0].start_date);
      const todayDiff = new Date().getTime() - startDate.getTime();
      return Math.ceil(todayDiff / (1000 * 60 * 60 * 24));
    },
    getIsActive() {
      const startDate = new Date(data.challenges[0].start_date).getTime();
      const endDate = new Date(data.challenges[0].end_date).getTime();
      const today = new Date().setHours(0, 0, 0, 0);
      return endDate >= today && startDate <= today;
    },
    getTodayTitle() {
      return this.isActive ? `Dag ${this.todayNumber}, ${this.today}` : `${this.today}`;
    },
    getIsOwner(userChallenge) {
      return this.user.id === userChallenge.user_id;
    },
    getClass(userChallenge) {
      return this.getIsOwner(userChallenge) ? 'bg-white' : 'bg-opponent';
    },
    adjustText() {
      this.isEditing = true;
      nextTick(() => {
        this.$refs.input.focus();
      });
    },
    saveText() {
      // TODO: Save challenge name
      this.isEditing = false;
      nextTick(() => {
        this.$refs.editButton.focus();
      });
    },
    leaveChallenge() {
      // TODO: handle leaving challenge
      console.log(`${this.user.username} is leaving ${this.challenge.name}`);
    }
  }
};
</script>
