<template>
  <main>
    <div class="mb-4">
      <div class="d-flex flex-row flex-wrap w-100 justify-content-between">
        <h1>{{ challenge.name }}</h1>
        <button class="btn btn-primary h-50">Pas aan</button>
      </div>
      <p>Startdatum: {{ startDate }}</p>
    </div>
    <p>Vandaag: {{ dayTitle }}</p>

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
<<<<<<<< HEAD:packages/client/src/app/challenge/views/ChallengeActiveView.vue
import { ChallengeProgress } from '../components/index.js';
import data from '../data.json';
import { useAuthStore } from '../../auth/index.js';
========
import ChallengeProgress from '../../components/challenge/progress/ChallengeProgress.vue';
import data from '../../components/challenge/progress/data.json';
import { useAuthStore } from '../../stores';
>>>>>>>> main:packages/client/src/app/views/challenge/ChallengeProgressView.vue

/* TODO: send in user and challenge, move logic to backend */

export default {
  name: 'ChallengeProgressView',
  components: { ChallengeProgress },
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
      isActive: Boolean
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
      return this.getIsOwner(userChallenge) ? 'owner' : 'shrink';
    }
  }
};
</script>

<style scoped>
.owner {
  flex-basis: 100%;
}
.shrink {
  transform: scale(0.75);
  transform-origin: left;
}
</style>
