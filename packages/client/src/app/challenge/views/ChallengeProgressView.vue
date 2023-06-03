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
        :userChallenge="userChallenge"
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
import { useAuthStore } from '../../auth/index.js';
import CustomFormKit from '../../shared/components/form/CustomFormKit.vue';
import { nextTick } from 'vue';
import { ChallengeService } from '../services/index.js';
import { UserChallengeService } from '../services/user_challenge.service.js';

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
    this.getChallenge();
    this.getUserChallenges();
    this.today = this.getDateString(new Date());
    this.isEditing = false;
  },
  methods: {
    async getChallenge() {
      try {
        // TODO: populate correct challenge id
        this.challenge = await ChallengeService.instance().getChallengeById(66);
        this.startDate = this.getDateString(this.challenge.start_date);
        this.todayNumber = this.getTodaysDayNumber(this.challenge.start_date);
        this.isActive = this.getIsActive(this.challenge.start_date, this.challenge.end_date);
        this.dayTitle = this.getTodayTitle();
      } catch (error) {
        console.error(error);
      }
    },
    async getUserChallenges() {
      // TODO: populate correct challenge id
      this.userChallenges = await UserChallengeService.instance().getUserChallengesById(66);
      this.userChallenges = this.getAndSortUserChallenges(this.userChallenges);
      console.log(this.userChallenges);
    },
    getAndSortUserChallenges(challenges) {
      const sorted = challenges.sort((a, b) => a.username < b.username);
      return sorted.sort((a, b) => (b.user_id === this.user.id) - (a.user_id === this.user.id));
    },
    getDateString(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('nl-NL', options);
    },
    getTodaysDayNumber(date) {
      const todayDiff = new Date().getTime() - new Date(date).getTime();
      return Math.ceil(todayDiff / (1000 * 60 * 60 * 24));
    },
    getIsActive(startDate, endDate) {
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();
      const today = new Date().setHours(0, 0, 0, 0);
      return end >= today && start <= today;
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
