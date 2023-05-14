<template>
  <div class="my-4">
    <h2>{{ title }}</h2>
    <div class="d-flex flex-row flex-wrap gap-5">
      <div class="d-flex flex-row flex-wrap flex-item">
        <CheckBox
          v-for="i in challengeDays.length"
          v-model:checked="challengeDays[i - 1].earned"
          :key="i"
          :id="challengeDays[i - 1].id"
          :dayNumber="i"
          :todayNumber="todayNumber"
          :imageName="this.user.profile_picture"
          :imagePath="`url('../assets/profile_pictures/${this.user.profile_picture}.png')`"
          :isOwner="isOwner"
        ></CheckBox>
      </div>
      <div class="d-flex flex-column">
        <p>{{ calculation }} dagen</p>
        <button
          v-if="isOwner"
          :class="challengeDays[todayNumber - 1].earned ? 'btn btn-secondary' : 'btn btn-primary'"
          @click="check(todayNumber)"
        >
          Vink vandaag {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CheckBox from './ChallengeCheckBox.vue'
import data from './data.json'

export default {
  name: 'ChallengeProgress',
  components: { CheckBox },
  data() {
    return {
      user: Object,
      challengeDays: [],
      buttonText: String,
      calculation: String,
      numberOfEarned: Number
    }
  },
  props: {
    userChallengeId: Number,
    todayNumber: Number,
    isOwner: Boolean
  },
  created() {
    this.user = this.getUser()
    this.title = this.isOwner ? 'Mijn voortgang' : `Voortgang van ${this.user.username}`
    this.challengeDays = this.getChallengeDays()
    this.numberOfEarned = this.challengeDays.reduce(
      (count, day) => (day.earned ? count + 1 : count),
      0
    )
    this.calculation = `${this.numberOfEarned}
      van de ${this.challengeDays.length}`
    this.imageName = this.user.profile_picture
    this.buttonText = 'aan'
  },
  methods: {
    getUser() {
      const users = data.users
      for (const user of users) {
        if (this.userChallengeId === user.id) {
          return user
        }
      }
    },
    getChallengeDays() {
      const days = []
      for (const challengeDay of data.challenge_days) {
        if (this.userChallengeId === challengeDay.user_challenge_id) {
          days.push(challengeDay)
        }
      }
      return days
    },
    check(i) {
      this.challengeDays[i - 1].earned = !this.challengeDays[i - 1].earned
    }
  },
  watch: {
    challengeDays: {
      handler() {
        this.buttonText = this.challengeDays[this.todayNumber - 1].earned ? 'uit' : 'aan'
        this.numberOfEarned = this.challengeDays.reduce(
          (count, day) => (day.earned ? count + 1 : count),
          0
        )
        this.calculation = `${this.numberOfEarned} van de ${this.challengeDays.length}`
        if (this.numberOfEarned === this.challengeDays.length) {
          alert('Make alert here')
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped></style>
