<template>
  <div class="my-2 w-100 border shadow p-4 rounded-3">
    <h2>{{ title }}</h2>
    <div class="d-flex flex-row flex-wrap justify-content-center gap-4">
      <div class="d-flex flex-row flex-wrap flex-item">
        <CheckBox
          v-for="(challengeDay, i) in challengeDays"
          v-model:checked="challengeDay.earned"
          :key="i"
          :challengeDay="challengeDay"
          :dayNumber="i + 1"
          :todayNumber="todayNumber"
          :imageName="imageName"
          :imagePath="`url(${inject('serverBaseUrl')}${
            this.userChallenge.user.profile_image_path
          })`"
          :isOwner="isOwner"
          :aria-hidden="!isOwner"
        ></CheckBox>
      </div>
      <div class="d-flex flex-column">
        <p>{{ earnedText }} dagen afgerond</p>
        <button class="w-100" v-if="showButton" :class="getClass" @click="check(todayNumber)">
          Vink vandaag {{ buttonText }}
        </button>
      </div>
    </div>
    <CompletedModal :badgeName="badgeName" :badgeImagePath="badgeImagePath"></CompletedModal>
  </div>
</template>

<script>
import CheckBox from './ChallengeCheckBox.vue';
import Modal from 'bootstrap/js/dist/modal';
import CompletedModal from './CompletedModal.vue';
import { inject } from 'vue';

export default {
  name: 'ChallengeProgress',
  components: { CompletedModal, CheckBox },
  data() {
    return {
      user: Object,
      title: String,
      challengeDays: [],
      numberOfEarned: Number,
      earnedText: String,
      buttonText: String,
      showButton: Boolean,
      imageName: String,

      badgeName: String,
      badgeImagePath: String
    };
  },
  props: {
    userChallenge: Object,
    todayNumber: Number,
    isActive: Boolean,
    isOwner: Boolean
  },
  created() {
    this.title = this.getTitle();
    this.challengeDays = this.userChallenge.challenge_days;
    this.numberOfEarned = this.getNumberOfEarned();
    this.earnedText = this.getEarnedText();
    this.showButton = this.isActive && this.isOwner;
    this.imageName = this.getImageName();

    // Testing badges:
    this.badgeName = 'paard';
    this.badgeImagePath = '/assets/images/badges/paard.png';
  },
  methods: {
    inject,
    getTitle() {
      return this.isOwner ? 'Mijn voortgang' : `Voortgang van ${this.userChallenge.user.username}`;
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
    },
    getImageName() {
      const path = this.userChallenge.user.profile_image_path;
      const image = path.substring(path.lastIndexOf('/') + 1);
      return image.substring(0, image.lastIndexOf('.'));
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
          // TODO: set completed + set badge
          const completedModal = new Modal(document.getElementById('completedModal'));
          completedModal.toggle();
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
