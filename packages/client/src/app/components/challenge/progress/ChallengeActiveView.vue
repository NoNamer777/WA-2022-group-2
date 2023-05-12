<template>
  <main>
    <div class="mb-4">
      <div class="d-flex flex-row flex-wrap w-100 justify-content-between">
        <h1>{{ challenge.name }}</h1>
        <button class="btn btn-primary h-50">Pas aan</button>
      </div>
      <p>Startdatum: {{ startDate }}</p>
    </div>
    <p>Vandaag: Dag {{ today }}</p>

    <div>
      <ChallengeProgress
        v-for="userChallenge in userChallenges"
        :key="userChallenge.id"
        :userChallenge="userChallenge"
        :challengeDays="challengeDays.filter((day) => day.user_challenge_id === userChallenge.id)"
        :today="today"
        :imageName="this.profilePictures[userChallenge.id - 1]"
        :owner="this.user.id === userChallenge.user_id"
        :title="
          this.user.id === userChallenge.user_id
            ? 'Mijn voortgang'
            : `Voortgang van ${userChallenge.user_id}`
        "
      />
    </div>
  </main>
</template>

<script>
import ChallengeProgress from './ChallengeProgress.vue'
import data from './data.json'

export default {
  name: 'ChallengeProgressView.vue',
  components: { ChallengeProgress },
  data() {
    return {
      user: Object,
      challenge: Object,
      userChallenges: [],
      challengeDays: [],
      startDate: Date,
      amountOfDays: Number,
      today: Number,
      profilePictures: []
    }
  },
  created() {
    this.getDays()
    this.user = data.users[0]
    this.challenge = data.challenges[0]
    this.userChallenges = data.user_challenges
    this.challengeDays = data.challenge_days
    this.profilePictures = ['papegaai', 'narwal', 'olifant']
  },
  methods: {
    getDays() {
      const startDate = new Date(data.challenges[0].start_date)
      const todayDiff = new Date().getTime() - startDate.getTime()
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      this.startDate = startDate.toLocaleDateString('nl-NL', options)
      this.today = Math.ceil(todayDiff / (1000 * 60 * 60 * 24))
    }
  }
}
</script>

<style scoped></style>
