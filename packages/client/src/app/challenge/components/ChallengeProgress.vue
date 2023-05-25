<template>
  <div class="my-4">
    <h2>{{ title }}</h2>
    <div class="d-flex flex-row flex-wrap gap-4">
      <div class="d-flex flex-row flex-wrap flex-item">
        <CheckBox
          v-for="(challengeDay, i) in challengeDays"
          v-model:checked="challengeDay.earned"
          :key="i"
          :id="challengeDay.id"
          :dayNumber="i + 1"
          :todayNumber="todayNumber"
          :imageName="this.user.profile_picture"
          :imagePath="`url('../assets/profile_pictures/${this.user.profile_picture}.png')`"
          :isOwner="isOwner"
        ></CheckBox>
      </div>
      <div class="d-flex flex-column">
        <p>{{ earnedText }} dagen afgerond</p>
        <button class="w-100" v-if="showButton" :class="getClass" @click="check(todayNumber)">
          Vink vandaag {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CheckBox from './ChallengeCheckBox.vue';
import data from '../data.json';

export default {
  name: 'ChallengeProgress',
  components: { CheckBox },
  data() {
    return {
      user: Object,
      title: String,
      challengeDays: [],
      numberOfEarned: Number,
      earnedText: String,
      buttonText: String,
      showButton: Boolean
    };
  },
  props: {
    userChallengeId: Number,
    todayNumber: Number,
    isActive: Boolean,
    isOwner: Boolean
  },
  created() {
    this.user = this.getUser();
    this.title = this.getTitle();
    this.challengeDays = this.getChallengeDays();
    this.numberOfEarned = this.getNumberOfEarned();
    this.earnedText = this.getEarnedText();
    this.imageName = this.user.profile_picture;
    this.showButton = this.isActive && this.isOwner;
  },
  methods: {
    getUser() {
      const users = data.users;
      for (const user of users) {
        if (this.userChallengeId === user.id) {
          return user;
        }
      }
    },
    getTitle() {
      return this.isOwner ? 'Mijn voortgang' : `Voortgang van ${this.user.username}`;
    },
    getChallengeDays() {
      /* fetch challengeDays based on userChallengeId */
      const days = [];
      for (const challengeDay of data.challenge_days) {
        if (this.userChallengeId === challengeDay.user_challenge_id) {
          days.push(challengeDay);
        }
      }
      return days;
    },
    getNumberOfEarned() {
      return this.challengeDays.reduce((count, day) => (day.earned ? count + 1 : count), 0);
    },
    getEarnedText() {
      return `${this.numberOfEarned}
      van de ${this.challengeDays.length}`;
    },
    check(i) {
      this.challengeDays[i - 1].earned = !this.challengeDays[i - 1].earned;
    }
  },
  watch: {
    challengeDays: {
      handler() {
        if (this.showButton) {
          this.buttonText = this.challengeDays[this.todayNumber - 1].earned ? 'uit' : 'aan';
        }
        this.numberOfEarned = this.getNumberOfEarned();
        this.earnedText = this.getEarnedText();
        if (this.isOwner && this.numberOfEarned === this.challengeDays.length) {
          alert('Make alert here');
        }
      },
      deep: true
    }
  },
  computed: {
    getClass() {
      return this.challengeDays[this.todayNumber - 1].earned
        ? 'btn btn-secondary'
        : 'btn btn-primary';
    }
  }
};
</script>

<style scoped></style>
