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
        :userChallenge="userChallenge"
        :challengeDays="challengeDays.filter((day) => day.user_challenge_id === userChallenge.id)"
        :todayNumber="todayNumber"
        :imageName="this.users.find((u) => userChallenge.user_id === u.id).profile_picture"
        :isOwner="this.user.id === userChallenge.user_id"
        :title="
          this.user.id === userChallenge.user_id
            ? 'Mijn voortgang'
            : `Voortgang van ${this.users.find((u) => userChallenge.user_id === u.id).username}`
        "
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
      users: [],
      challenge: Object,
      userChallenges: [],
      challengeDays: [],
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
    this.challengeDays = data.challenge_days
    this.todayNumber = this.getTodaysDayNumber()
    this.startDate = this.getStartDate()
    this.users = this.getUsers()
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
    },
    getUsers() {
      /* placeholder to fetch users from unique id's of user_challenges = participating users */
      /* NB include unique combination of user_id AND challenge_id, not included below */
      let users = []
      const ids = Array.from(
        new Set(this.userChallenges.map((userChallenge) => userChallenge.user_id))
      ).sort()
      for (const user of data.users) {
        for (const id of ids) {
          if (user.id === id) {
            users.push(user)
          }
        }
      }
      return users
    }
  }
}
</script>

<style scoped></style>
