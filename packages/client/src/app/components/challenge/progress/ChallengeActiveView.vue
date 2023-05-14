<template>
  <main>
    <div class="mb-4">
      <div class="d-flex flex-row flex-wrap w-100 justify-content-between">
        <h1>{{ challenge.name }}</h1>
        <button class="btn btn-primary h-50">Pas aan</button>
      </div>
      <p>Startdatum: {{ startDate }}</p>
    </div>
    <p>Vandaag: Dag {{ todayNumber }}</p>

    <div>
      <ChallengeProgress
        v-for="userChallenge in userChallenges"
        :key="userChallenge.id"
        :userChallengeId="userChallenge.id"
        :todayNumber="todayNumber"
        :isOwner="this.user.id === userChallenge.user_id"
      />
    </div>
  </main>
</template>

<script>
import ChallengeProgress from './ChallengeProgress.vue'
import data from './data.json'

/* send in user and challenge */

export default {
  name: 'ChallengeProgressView.vue',
  components: { ChallengeProgress },
  data() {
    return {
      user: Object,
      challenge: Object,
      userChallenges: [],
      startDate: Date,
      amountOfDays: Number,
      todayNumber: Number
    }
  },
  created() {
    this.user = data.users[0]
    this.challenge = data.challenges[0]
    /* make methods to fetch user_challenges and challenge_days, sort user_challenges to display current user first */
    this.userChallenges = data.user_challenges.sort(
      (a, b) => (b.user_id === this.user.id) - (a.user_id === this.user.id)
    )
    this.todayNumber = this.getTodaysDayNumber()
    this.startDate = this.getStartDate()
  },
  methods: {
    getTodaysDayNumber() {
      const startDate = new Date(data.challenges[0].start_date)
      const todayDiff = new Date().getTime() - startDate.getTime()
      return Math.ceil(todayDiff / (1000 * 60 * 60 * 24))
    },
    getStartDate() {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(data.challenges[0].start_date).toLocaleDateString('nl-NL', options)
    }
  }
}
</script>

<style scoped></style>
