<template>
  <main>
    <div class="d-flex flex-row flex-wrap justify-content-between">
      <div>
        <div class="mb-1 w-100">
          <div class="d-flex flex-row flex-wrap w-100 mr-auto justify-content-between">
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
            <h1 v-else>{{ challenge.name }}</h1>
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
            class="btn btn-sm btn-primary dropdown-toggle my-2 me-1"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
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
            <li class="dropdown-divider" />
            <li>
              <button
                class="dropdown-item small text-secondary"
                role="menuitem"
                @click="leaveChallenge"
              >
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
            <li>
              <a class="dropdown-item small" role="menuitem" :href="'/challenge/create'">
                Maak nieuwe challenge aan
              </a>
            </li>
            <li class="dropdown-divider" />
            <li v-for="challenge in currentChallenges" :key="challenge.id">
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
import { nextTick, ref } from 'vue';
import { ChallengeService } from '../services/index.js';
import { UserChallengeService } from '../services/user_challenge.service.js';
import { useRoute } from 'vue-router';

export default {
  name: 'ChallengeProgressView',
  components: { CustomFormKit, ChallengeProgress },
  setup() {
    const authStore = useAuthStore();
    const user = authStore.user;
    const route = useRoute();
    const challenge = ref('');
    const currentChallenges = ref([]);
    const userChallenges = ref([]);
    const startDate = ref();
    const today = ref(1);
    const todayNumber = ref(0);
    const isActive = ref(true);
    const dayTitle = ref('');
    const isEditing = ref(false);

    const getChallenge = async () => {
      try {
        challenge.value = await ChallengeService.instance().getChallengeById(route.params.userId);
        startDate.value = getDateString(challenge.value.start_date);
        todayNumber.value = getTodaysDayNumber(challenge.value.start_date);
        isActive.value = getIsActive(challenge.value.start_date, challenge.value.end_date);
        dayTitle.value = getTodayTitle();
      } catch (error) {
        console.error(error);
      }
    };

    const getAllChallenges = async () => {
      try {
        const challenges = await ChallengeService.instance().getChallenges(user.id);
        currentChallenges.value = challenges.currentChallenges;
      } catch (error) {
        console.error(error);
      }
    };

    const getUserChallenges = async () => {
      // TODO: sort userchallenges in backend?
      userChallenges.value = await UserChallengeService.instance().getUserChallengesById(
        route.params.userId
      );
      userChallenges.value = getAndSortUserChallenges(userChallenges.value);
    };

    const getAndSortUserChallenges = (challenges) => {
      const sorted = challenges.sort((a, b) => a.username < b.username);
      return sorted.sort((a, b) => (b.user_id === user.id) - (a.user_id === user.id));
    };

    const getDateString = (date) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('nl-NL', options);
    };
    const getTodaysDayNumber = (date) => {
      const todayDiff = new Date().getTime() - new Date(date).getTime();
      return Math.ceil(todayDiff / (1000 * 60 * 60 * 24));
    };
    const getIsActive = (startDate, endDate) => {
      const start = new Date(startDate).getTime();
      let end = new Date(endDate).setHours(23, 59, 59);
      end = new Date(end).getTime();
      const today = new Date().getTime();
      return end >= today && start <= today;
    };
    const getTodayTitle = () => {
      today.value = getDateString(new Date());
      return isActive.value ? `Dag ${todayNumber.value}, ${today.value}` : `${today.value}`;
    };

    return {
      user,
      challenge,
      getChallenge,
      currentChallenges,
      getAllChallenges,
      userChallenges,
      getUserChallenges,
      startDate,
      getDateString,
      todayNumber,
      today,
      dayTitle,
      isActive,
      isEditing
    };
  },
  mounted() {
    this.getChallenge();
    this.getAllChallenges();
    this.getUserChallenges();
  },
  methods: {
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
